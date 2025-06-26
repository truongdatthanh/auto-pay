import { View, Text, TouchableOpacity, SectionList, StatusBar, Image, Modal, ActivityIndicator } from 'react-native';
import { useCallback, useState, useEffect, useMemo, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import CardInfo from '@/components/card/CardInfo';
import NotFound from '@/app/error/404';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AppHeaderInfo from '@/components/header/App.headerInfo';
import Loading from '@/components/loading/Loading';
import { groupByDate } from '@/utils/groupByDate';
import { formatDayMonthYear } from '@/utils/format';
import { useCardStore } from '@/store/useCardStore';
import { validateDateRange } from '@/utils/validation';

const INITIAL_LOAD_SIZE = 10;
const LOAD_MORE_SIZE = 10;

export default function History ()
{
  const selectedCard = useCardStore( state => state.selectedCard );
  const sectionListRef = useRef<SectionList>( null );

  // Initialize dates properly - show all historical data by default
  const [ startDate, setStartDate ] = useState( () =>
  {
    const pastDate = new Date();
    pastDate.setFullYear( pastDate.getFullYear() - 2 );
    return pastDate;
  } );

  const [ endDate, setEndDate ] = useState( () => new Date() );
  const [ showStartPicker, setShowStartPicker ] = useState( false );
  const [ showEndPicker, setShowEndPicker ] = useState( false );
  const [ refreshing, setRefreshing ] = useState( false );
  const [ showFilterModal, setShowFilterModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( true );

  // Optimized pagination states
  const [ loadedItemsCount, setLoadedItemsCount ] = useState( INITIAL_LOAD_SIZE );
  const [ isLoadingMore, setIsLoadingMore ] = useState( false );

  // Memoize all filtered transactions (stable reference)
  const allFilteredTransactions = useMemo( () =>
  {
    if ( !selectedCard?.transactionHistory ) return [];

    try
    {
      const start = new Date( startDate ).setHours( 0, 0, 0, 0 );
      const end = new Date( endDate ).setHours( 0, 0, 0, 0 );

      return selectedCard.transactionHistory.filter( item =>
      {
        const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
        return itemDate >= start && itemDate <= end;
      } );
    } catch ( error )
    {
      console.error( 'Error filtering transactions:', error );
      return [];
    }
  }, [ selectedCard?.transactionHistory, startDate, endDate ] );

  // Memoize grouped sections ONCE and keep stable
  const allGroupedSections = useMemo( () =>
  {
    if ( !allFilteredTransactions.length ) return [];

    try
    {
      return groupByDate( allFilteredTransactions );
    } catch ( error )
    {
      console.error( 'Error grouping transactions:', error );
      return [];
    }
  }, [ allFilteredTransactions ] );

  // Get visible sections with windowing approach
  const visibleSections = useMemo( () =>
  {
    if ( !allGroupedSections.length ) return [];

    let itemCount = 0;
    const sections = [];

    for ( const section of allGroupedSections )
    {
      const sectionItemCount = section.data.length;

      if ( itemCount + sectionItemCount <= loadedItemsCount )
      {
        // Include entire section
        sections.push( section );
        itemCount += sectionItemCount;
      } else if ( itemCount < loadedItemsCount )
      {
        // Include partial section
        const remainingCount = loadedItemsCount - itemCount;
        sections.push( {
          ...section,
          data: section.data.slice( 0, remainingCount )
        } );
        itemCount = loadedItemsCount;
        break;
      } else
      {
        break;
      }
    }

    return sections;
  }, [ allGroupedSections, loadedItemsCount ] );

  // Check if has more data
  const hasMoreData = useMemo( () =>
  {
    const totalItems = allFilteredTransactions.length;
    return loadedItemsCount < totalItems;
  }, [ allFilteredTransactions.length, loadedItemsCount ] );

  // Reset pagination when filter changes
  useEffect( () =>
  {
    setLoadedItemsCount( INITIAL_LOAD_SIZE );
    setIsLoadingMore( false );
  }, [ startDate, endDate ] );

  // Initial loading effect
  useEffect( () =>
  {
    setIsLoading( true );
    if ( selectedCard?.transactionHistory )
    {
      setIsLoading( false );
    }
  }, [ selectedCard?.transactionHistory ] );

  // Optimized load more handler
  const handleLoadMore = useCallback( () =>
  {
    if ( isLoadingMore || !hasMoreData ) return;

    setIsLoadingMore( true );

    // Use requestAnimationFrame for smoother performance
    requestAnimationFrame( () =>
    {
      setTimeout( () =>
      {
        setLoadedItemsCount( prev =>
        {
          const newCount = prev + LOAD_MORE_SIZE;
          return Math.min( newCount, allFilteredTransactions.length );
        } );
        setIsLoadingMore( false );
      }, 300 ); // Reduced delay for better UX
    } );
  }, [ isLoadingMore, hasMoreData, allFilteredTransactions.length ] );

  // Handle filter by recent days
  const handleRecentDays = useCallback( ( days: number ) =>
  {
    if ( !selectedCard?.transactionHistory ) return;

    const now = new Date();
    const past = new Date();
    past.setDate( now.getDate() - days );

    setStartDate( past );
    setEndDate( now );
    setShowFilterModal( false );
  }, [ selectedCard?.transactionHistory ] );

  // Apply custom filter
  const applyCustomFilter = useCallback( () =>
  {
    if ( !validateDateRange( startDate, endDate ) ) return;
    setShowFilterModal( false );
  }, [ startDate, endDate, validateDateRange ] );

  // Reset filter dates
  const handleResetFilterDate = useCallback( () =>
  {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setFullYear( pastDate.getFullYear() - 10 );
    setStartDate( pastDate );
    setEndDate( today );
  }, [] );

  // Optimized refresh handler
  const onRefresh = useCallback( () =>
  {
    setRefreshing( true );
    setLoadedItemsCount( INITIAL_LOAD_SIZE );

    // Scroll to top smoothly
    sectionListRef.current?.scrollToLocation( {
      sectionIndex: 0,
      itemIndex: 0,
      animated: true
    } );

    setTimeout( () =>
    {
      setRefreshing( false );
    }, 500 );
  }, [] );

  // Handle date picker change
  const handleDateChange = useCallback( ( type: 'start' | 'end' ) =>
    ( event: any, selectedDate?: Date ) =>
    {
      if ( type === 'start' )
      {
        setShowStartPicker( false );
        if ( selectedDate ) setStartDate( selectedDate );
      } else
      {
        setShowEndPicker( false );
        if ( selectedDate ) setEndDate( selectedDate );
      }
    }, []
  );

  // Stable render functions with React.memo equivalent optimization
  const renderSectionHeader = useCallback( ( { section: { title } }: any ) => (
    <View className="px-4 py-2 bg-gray-100">
      <Text className="text-gray-700 font-semibold">
        { formatDayMonthYear( title ) }
      </Text>
    </View>
  ), [] );

  const renderItem = useCallback( ( { item, index }: any ) => (
    <View key={ `${ item.transactionId }-${ index }` }>
      <CardInfo
        id={ selectedCard?.id || '' }
        STK={ selectedCard?.STK || '' }
        name={ selectedCard?.name || '' }
        date={ item.time }
        amount={ item.amount }
        content={ item.description }
        logoBanking={ selectedCard?.logoBanking || '' }
        transactionId={ item.transactionId }
      />
    </View>
  ), [ selectedCard ] );

  // Optimized footer component
  const ListFooterComponent = useMemo( () =>
  {
    if ( isLoadingMore )
    {
      return (
        <View className="py-4 items-center">
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return <View className="h-4" />;
  }, [ hasMoreData, isLoadingMore ] );

  // Stable key extractor
  const keyExtractor = useCallback( ( item: any, index: number ) =>
    `${ item.transactionId }-${ index }`, []
  );

  // Optimized end reached handler
  const onEndReached = useCallback( () =>
  {
    if ( !isLoadingMore && hasMoreData )
    {
      handleLoadMore();
    }
  }, [ isLoadingMore, hasMoreData, handleLoadMore ] );

  // Quick filter options
  const quickFilterOptions = useMemo( () => [
    { days: 7, label: '7 ngày gần đây' },
    { days: 30, label: '30 ngày gần đây' },
    { days: 90, label: '3 tháng gần đây' }
  ], [] );

  // Date picker configs
  const datePickerConfigs = useMemo( () => [
    {
      label: "Từ ngày",
      date: startDate,
      show: showStartPicker,
      setShow: setShowStartPicker,
      onChange: handleDateChange( 'start' )
    },
    {
      label: "Đến ngày",
      date: endDate,
      show: showEndPicker,
      setShow: setShowEndPicker,
      onChange: handleDateChange( 'end' )
    }
  ], [ startDate, endDate, showStartPicker, showEndPicker, handleDateChange ] );



  if ( isLoading ) return <Loading message="Đang tải dữ liệu..." />;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Header */ }
      <AppHeaderInfo
        title="Lịch Sử Giao Dịch"
        onPress={ () => router.replace( "/(tabs)/home" ) }
        rightComponent={
          <TouchableOpacity
            className="p-2 rounded-full"
            onPress={ () => setShowFilterModal( true ) }
          >
            <Feather name="filter" size={ 20 } color="white" />
          </TouchableOpacity>
        }
      />

      {/* Container */ }
      <View className="flex-1 bg-[#041838]">
        {/* Header Info */ }
        <View className="flex-row items-center justify-between p-4 rounded-t-3xl bg-white">
          <Text className="text-lg font-semibold">Thời gian</Text>
          <Text className="text-gray-500 text-sm">
            { formatDayMonthYear( startDate ) }
            { startDate.getTime() !== endDate.getTime() && ` - ${ formatDayMonthYear( endDate ) }` }
          </Text>

        </View>


        {/* List */ }
        { visibleSections.length === 0 ? (
          <View className="flex-1 items-center justify-center bg-white p-4">
            <NotFound contentErr="Không có giao dịch nào!!!" />
          </View>
        ) : (
          <SectionList
            ref={ sectionListRef }
            sections={ visibleSections }
            keyExtractor={ keyExtractor }
            renderItem={ renderItem }
            renderSectionHeader={ renderSectionHeader }
            ListFooterComponent={ ListFooterComponent }
            stickySectionHeadersEnabled={ true }
            refreshing={ refreshing }
            onRefresh={ onRefresh }
            showsVerticalScrollIndicator={ false }
            className="bg-white"
            contentContainerStyle={ { paddingBottom: 120, paddingTop: 10 } }
            onEndReached={ onEndReached }
            onEndReachedThreshold={ 0.1 }
            scrollEventThrottle={ 16 }
            removeClippedSubviews={ true }
            maxToRenderPerBatch={ 10 }
            updateCellsBatchingPeriod={ 50 }
            initialNumToRender={ 10 }
            windowSize={ 10 }
            getItemLayout={ undefined }
          />
        ) }

        {/* Filter Modal */ }
        <Modal
          visible={ showFilterModal }
          transparent
          animationType="slide"
          onRequestClose={ () => setShowFilterModal( false ) }
          statusBarTranslucent
        >
          <View className="flex-1 justify-end bg-black/50">
            <Animated.View entering={ FadeInDown.duration( 300 ) } className="bg-white rounded-t-3xl p-5">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold text-gray-800">Tùy chọn</Text>
                <TouchableOpacity onPress={ () => setShowFilterModal( false ) }>
                  <Ionicons name="close" size={ 24 } color="#64748b" />
                </TouchableOpacity>
              </View>

              {/* Quick filter buttons */ }
              <Text className="text-gray-500 mb-3 font-medium">Lọc nhanh:</Text>
              <View className="flex-row flex-wrap gap-2 mb-6">
                { quickFilterOptions.map( ( { days, label } ) => (
                  <TouchableOpacity
                    key={ days }
                    className="py-2 px-4 bg-blue-50 rounded-full border border-blue-200"
                    onPress={ () => handleRecentDays( days ) }
                  >
                    <Text className="text-blue-600">{ label }</Text>
                  </TouchableOpacity>
                ) ) }
              </View>

              {/* Custom date range */ }
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-gray-500 font-medium">Tùy chỉnh khoảng thời gian:</Text>
                <TouchableOpacity
                  className="p-2 rounded-lg bg-black"
                  onPress={ handleResetFilterDate }
                >
                  <Image
                    source={ require( '@/assets/images/clean.png' ) }
                    className="w-5 h-5"
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>

              <View className="mb-6">
                { datePickerConfigs.map( ( { label, date, setShow, show, onChange }, idx ) => (
                  <View key={ idx } className="flex-row items-center justify-between mb-4">
                    <Text className="text-gray-700">{ label }:</Text>
                    <TouchableOpacity
                      className="flex-row items-center bg-gray-100 py-2 px-4 rounded-lg"
                      onPress={ () => setShow( true ) }
                    >
                      <MaterialIcons name="date-range" size={ 18 } color="#64748b" />
                      <Text className="ml-2 text-gray-700">{ formatDayMonthYear( date ) }</Text>
                    </TouchableOpacity>
                    { show && (
                      <DateTimePicker
                        value={ date }
                        mode="date"
                        display="default"
                        onChange={ onChange }
                      />
                    ) }
                  </View>
                ) ) }
              </View>

              <TouchableOpacity
                className="bg-black w-[300px] self-center py-3 rounded-xl items-center"
                onPress={ applyCustomFilter }
              >
                <Text className="text-white font-bold text-lg">Áp dụng</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>
      </View >
    </>
  );
}

//#region base
// import { View, Text, TouchableOpacity, SectionList, StatusBar, Image, Modal } from 'react-native';
// import { useCallback, useState, useEffect, useMemo } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
// import CardInfo from '@/components/card/CardInfo';
// import NotFound from '@/app/error/404';
// import { router } from 'expo-router';
// import Animated, { FadeInDown } from 'react-native-reanimated';
// import AppHeaderInfo from '@/components/header/App.headerInfo';
// import Loading from '@/components/loading/Loading';
// import { groupByDate } from '@/utils/groupByDate';
// import { formatDayMonthYear } from '@/utils/format';
// import { useCardStore } from '@/store/useCardStore';
// import { validateDateRange } from '@/utils/validation';

// export default function History ()
// {
//   const selectedCard = useCardStore( state => state.selectedCard );

//   // Initialize dates properly
//   const [ startDate, setStartDate ] = useState( () => new Date() );
//   const [ endDate, setEndDate ] = useState( () => new Date() );
//   const [ showStartPicker, setShowStartPicker ] = useState( false );
//   const [ showEndPicker, setShowEndPicker ] = useState( false );
//   const [ refreshing, setRefreshing ] = useState( false );
//   const [ showFilterModal, setShowFilterModal ] = useState( false );
//   const [ isLoading, setIsLoading ] = useState( true );

//   // Memoize filtered sections to avoid unnecessary recalculations
//   const sections = useMemo( () =>
//   {
//     if ( !selectedCard?.transactionHistory ) return [];

//     try
//     {
//       const start = new Date( startDate ).setHours( 0, 0, 0, 0 );
//       const end = new Date( endDate ).setHours( 0, 0, 0, 0 );

//       const filtered = selectedCard.transactionHistory.filter( item =>
//       {
//         const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
//         return itemDate >= start && itemDate <= end;
//       } );

//       return groupByDate( filtered );
//     } catch ( error )
//     {
//       console.error( 'Error filtering transactions:', error );
//       return [];
//     }
//   }, [ selectedCard?.transactionHistory, startDate, endDate ] );
//   //------------------------------------ END ------------------------------------//

//   // Initial loading effect
//   useEffect( () =>
//   {
//     setIsLoading( true );
//     if ( selectedCard?.transactionHistory )
//     {
//       setIsLoading( false );
//     }
//   }, [ selectedCard?.transactionHistory ] );
//   //------------------------------------ END ------------------------------------//



//   // Handle filter by recent days
//   const handleRecentDays = useCallback( ( days: number ) =>
//   {
//     if ( !selectedCard?.transactionHistory ) return;

//     const now = new Date();
//     const past = new Date();
//     past.setDate( now.getDate() - days );

//     setStartDate( past );
//     setEndDate( now );
//     setShowFilterModal( false );
//   }, [ selectedCard?.transactionHistory ] );
//   //------------------------------------ END ------------------------------------//

//   // Apply custom filter
//   const applyCustomFilter = useCallback( () =>
//   {
//     if ( !validateDateRange( startDate, endDate ) ) return;
//     setShowFilterModal( false );
//   }, [ startDate, endDate, validateDateRange ] );
//   //------------------------------------ END ------------------------------------//

//   // Reset filter dates
//   const handleResetFilterDate = useCallback( () =>
//   {
//     const today = new Date();
//     setStartDate( today );
//     setEndDate( today );
//   }, [] );
//   //------------------------------------ END ------------------------------------//

//   // Refresh data
//   const onRefresh = useCallback( () =>
//   {
//     setRefreshing( true );
//     setTimeout( () =>
//     {
//       setRefreshing( false );
//     }, 800 );
//   }, [] );
//   //------------------------------------ END ------------------------------------//

//   // Handle date picker change
//   const handleDateChange = useCallback( ( type: 'start' | 'end' ) =>
//     ( event: any, selectedDate?: Date ) =>
//     {
//       if ( type === 'start' )
//       {
//         setShowStartPicker( false );
//         if ( selectedDate ) setStartDate( selectedDate );
//       } else
//       {
//         setShowEndPicker( false );
//         if ( selectedDate ) setEndDate( selectedDate );
//       }
//     }, []
//   );
//   //------------------------------------ END ------------------------------------//

//   // Render section header
//   const renderSectionHeader = useCallback( ( { section: { title } }: any ) => (
//     <Text className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold">
//       { formatDayMonthYear( title ) }
//     </Text>
//   ), [] );
//   //------------------------------------ END ------------------------------------//

//   // Render item
//   const renderItem = useCallback( ( { item }: any ) => (
//     <Animated.View entering={ FadeInDown.duration( 400 ) }>
//       <CardInfo
//         id={ selectedCard?.id || '' }
//         STK={ selectedCard?.STK || '' }
//         name={ selectedCard?.name || '' }
//         date={ item.time }
//         amount={ item.amount }
//         content={ item.description }
//         logoBanking={ selectedCard?.logoBanking || '' }
//         transactionId={ item.transactionId }
//       />
//     </Animated.View>
//   ), [ selectedCard ] );
//   //------------------------------------ END ------------------------------------//

//   // Key extractor
//   const keyExtractor = useCallback( ( item: any, index: number ) =>
//     `${ item.transactionId }-${ index }`, []
//   );
//   //------------------------------------ END ------------------------------------//

//   // Quick filter options
//   const quickFilterOptions = useMemo( () => [
//     { days: 7, label: '7 ngày gần đây' },
//     { days: 30, label: '30 ngày gần đây' },
//     { days: 90, label: '3 tháng gần đây' }
//   ], [] );
//   //------------------------------------ END ------------------------------------//

//   // Date picker configs
//   const datePickerConfigs = useMemo( () => [
//     {
//       label: "Từ ngày",
//       date: startDate,
//       show: showStartPicker,
//       setShow: setShowStartPicker,
//       onChange: handleDateChange( 'start' )
//     },
//     {
//       label: "Đến ngày",
//       date: endDate,
//       show: showEndPicker,
//       setShow: setShowEndPicker,
//       onChange: handleDateChange( 'end' )
//     }
//   ], [ startDate, endDate, showStartPicker, showEndPicker, handleDateChange ] );
//   //------------------------------------ END ------------------------------------//


//   if ( isLoading ) return <Loading message="Đang tải dữ liệu..." />;


//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//       {/* Header */ }
//       <AppHeaderInfo
//         title="Lịch Sử Giao Dịch"
//         onPress={ () => router.replace( "/(tabs)/home" ) }
//         rightComponent={
//           <TouchableOpacity
//             className="p-2 rounded-full"
//             onPress={ () => setShowFilterModal( true ) }
//           >
//             <Feather name="filter" size={ 20 } color="white" />
//           </TouchableOpacity>
//         }
//       />

//       {/* Container */ }
//       <View className="flex-1 bg-black">
//         {/* Header */ }
//         <View className="flex-row items-center justify-between p-4 rounded-t-3xl bg-white">
//           <Text className="text-lg font-semibold">Thời gian</Text>
//           <Text className="text-gray-500 text-sm">
//             { formatDayMonthYear( startDate ) }
//             { startDate.getTime() !== endDate.getTime() && ` - ${ formatDayMonthYear( endDate ) }` }
//           </Text>
//         </View>

//         {/* List */ }
//         { sections.length === 0 ? (
//           <View className="flex-1 items-center justify-center bg-white p-4">
//             <NotFound contentErr="Không có giao dịch nào!!!" />
//           </View>
//         ) : (
//           <SectionList
//             scrollEventThrottle={ 16 }
//             sections={ sections }
//             keyExtractor={ keyExtractor }
//             renderItem={ renderItem }
//             renderSectionHeader={ renderSectionHeader }
//             stickySectionHeadersEnabled
//             refreshing={ refreshing }
//             onRefresh={ onRefresh }
//             showsVerticalScrollIndicator={ false }
//             className="bg-white"
//             contentContainerStyle={ { paddingBottom: 120, paddingTop: 10 } }
//           />
//         ) }

//         {/* Filter Modal */ }
//         <Modal
//           visible={ showFilterModal }
//           transparent
//           animationType="slide"
//           onRequestClose={ () => setShowFilterModal( false ) }
//         >
//           <View className="flex-1 justify-end bg-black/50">
//             <Animated.View entering={ FadeInDown.duration( 300 ) } className="bg-white rounded-t-3xl p-5">
//               <View className="flex-row justify-between items-center mb-6">
//                 <Text className="text-xl font-bold text-gray-800">Tùy chọn</Text>
//                 <TouchableOpacity onPress={ () => setShowFilterModal( false ) }>
//                   <Ionicons name="close" size={ 24 } color="#64748b" />
//                 </TouchableOpacity>
//               </View>

//               {/* Quick filter buttons */ }
//               <Text className="text-gray-500 mb-3 font-medium">Lọc nhanh:</Text>
//               <View className="flex-row flex-wrap gap-2 mb-6">
//                 { quickFilterOptions.map( ( { days, label } ) => (
//                   <TouchableOpacity
//                     key={ days }
//                     className="py-2 px-4 bg-blue-50 rounded-full border border-blue-200"
//                     onPress={ () => handleRecentDays( days ) }
//                   >
//                     <Text className="text-blue-600">{ label }</Text>
//                   </TouchableOpacity>
//                 ) ) }
//               </View>

//               {/* Custom date range */ }
//               <View className="flex-row justify-between items-center mb-3">
//                 <Text className="text-gray-500 font-medium">Tùy chỉnh khoảng thời gian:</Text>
//                 <TouchableOpacity
//                   className="p-2 rounded-lg bg-black"
//                   onPress={ handleResetFilterDate }
//                 >
//                   <Image
//                     source={ require( '@/assets/images/clean.png' ) }
//                     className="w-5 h-5"
//                     resizeMode="contain"
//                   />
//                 </TouchableOpacity>
//               </View>

//               <View className="mb-6">
//                 { datePickerConfigs.map( ( { label, date, setShow, show, onChange }, idx ) => (
//                   <View key={ idx } className="flex-row items-center justify-between mb-4">
//                     <Text className="text-gray-700">{ label }:</Text>
//                     <TouchableOpacity
//                       className="flex-row items-center bg-gray-100 py-2 px-4 rounded-lg"
//                       onPress={ () => setShow( true ) }
//                     >
//                       <MaterialIcons name="date-range" size={ 18 } color="#64748b" />
//                       <Text className="ml-2 text-gray-700">{ formatDayMonthYear( date ) }</Text>
//                     </TouchableOpacity>
//                     { show && (
//                       <DateTimePicker
//                         value={ date }
//                         mode="date"
//                         display="default"
//                         onChange={ onChange }
//                       />
//                     ) }
//                   </View>
//                 ) ) }
//               </View>

//               <TouchableOpacity
//                 className="bg-black w-[300px] self-center py-3 rounded-xl items-center"
//                 onPress={ applyCustomFilter }
//               >
//                 <Text className="text-white font-bold text-lg">Áp dụng</Text>
//               </TouchableOpacity>
//             </Animated.View>
//           </View>
//         </Modal>
//       </View>
//     </>
//   );
// }
//#endregion

