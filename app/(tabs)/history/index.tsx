import { View, Text, TouchableOpacity, SectionList, Alert, StatusBar, Modal, Image } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, groupByDate } from '@/utils/formatDate';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import CardInfo from '@/components/card/CardInfo';
import NotFound from '@/app/error/404';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AppHeaderInfo from '@/components/header/App.headerInfo';
import { IBankingTransaction } from '@/interface/IBanking';
import { ISection } from '@/interface/ISection';
import Loading from '@/components/loading/Loading';

export default function History ()
{
  const [ currentCard, setCurrentCard ] = useState<IBankingTransaction | null>( null );
  const [ startDate, setStartDate ] = useState( new Date() );
  const [ endDate, setEndDate ] = useState( new Date() );
  const [ showStartPicker, setShowStartPicker ] = useState( false );
  const [ showEndPicker, setShowEndPicker ] = useState( false );
  const [ sections, setSections ] = useState<ISection[]>( [] );
  const [ refreshing, setRefreshing ] = useState( false );
  const [ showFilterModal, setShowFilterModal ] = useState( false );
  const [ isLoading, setIsLoading ] = useState( true );

  // Fetch selected card
  useFocusEffect(
    useCallback( () =>
    {
      const fetchSelectedCard = async () =>
      {
        try
        {
          const card = await AsyncStorage.getItem( 'selectedCard' );
          if ( card ) setCurrentCard( JSON.parse( card ) );
        } catch ( error )
        {
          console.error( "Error fetching selected card:", error );
        } finally
        {
          setIsLoading( false );
        }
      };
      fetchSelectedCard();
    }, [] )
  );
  // -------------------------------------- END ------------------------------------- //

  // Filter on card change
  useEffect( () =>
  {
    if ( currentCard ) handleFilterByDate();
  }, [ currentCard ] );
  // -------------------------------------- END ------------------------------------- //

  // Hàm lọc dữ liệu theo ngày đã chọn
  const handleFilterByDate = () =>
  {
    if ( !currentCard?.transactionHistory ) return;

    const start = new Date( startDate ).setHours( 0, 0, 0, 0 );
    const end = new Date( endDate ).setHours( 0, 0, 0, 0 );

    if ( start > end )
    {
      Alert.alert( "Ngày không hợp lệ", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc." );
      return;
    }

    const filtered = currentCard.transactionHistory.filter( item =>
    {
      const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
      return itemDate >= start && itemDate <= end;
    } );

    setSections( groupByDate( filtered ) );
  };
  // ------------------------------------- END ------------------------------------- //

  // Hàm lọc dữ liệu theo khoảng ngày
  const handleRecentDays = ( days: number ) =>
  {
    if ( !currentCard?.transactionHistory ) return;

    const now = new Date();
    const past = new Date();
    past.setDate( now.getDate() - days );

    setStartDate( past );
    setEndDate( now );

    const filtered = currentCard.transactionHistory.filter( item =>
    {
      const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
      return itemDate >= past.setHours( 0, 0, 0, 0 ) && itemDate <= now.setHours( 0, 0, 0, 0 );
    } );

    setSections( groupByDate( filtered ) );
    setShowFilterModal( false );
  };
  // ------------------------------------- END ------------------------------------- //

  // Hàm áp dụng bộ lọc tùy chỉnh
  const applyCustomFilter = () =>
  {
    handleFilterByDate();
    setShowFilterModal( false );
  };
  // ------------------------------------- END ------------------------------------- //

  // Hàm reset
  const handleResetFilterDate = () =>
  {
    const today = new Date();
    setStartDate( today );
    setEndDate( today );
    handleFilterByDate();
  };
  // ------------------------------------- END ------------------------------------- //

  // Hàm refresh dữ liệu
  const onRefresh = useCallback( () =>
  {
    setRefreshing( true );
    setTimeout( () =>
    {
      handleFilterByDate();
      setRefreshing( false );
    }, 800 );
  }, [ currentCard, startDate, endDate ] );
  // ------------------------------------- END ------------------------------------- //

  if ( isLoading ) return <Loading message="Đang tải dữ liệu..." />;

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      {/* Header */ }
      <AppHeaderInfo
        title="Lịch Sử Giao Dịch"
        onPress={ () => router.replace( "/(tabs)" ) }
        rightComponent={
          <TouchableOpacity className="p-2 rounded-full" onPress={ () => setShowFilterModal( true ) }>
            <Feather name="filter" size={ 20 } color="white" />
          </TouchableOpacity>
        }
      />
      {/* -----------------------------------------End----------------------------------------- */ }

      {/* Container */ }
      <View className="flex-1 bg-black">
        {/* Header */ }
        <View className="flex-row items-center justify-between p-4 rounded-t-3xl bg-white">
          <Text className="text-lg font-semibold">Thời gian</Text>
          <Text className="text-gray-500 text-sm">
            { formatDate( startDate ) }{ startDate.getTime() !== endDate.getTime() ? ` - ${ formatDate( endDate ) }` : "" }
          </Text>
        </View>
        {/* -----------------------------------------End----------------------------------------- */ }

        {/* List */ }
        { sections.length === 0 ? (
          <View className="flex-1 items-center justify-center bg-white p-4">
            <NotFound contentErr="Không có giao dịch nào!!!" />
          </View>
        ) : (
          <SectionList
            scrollEventThrottle={ 16 }
            sections={ sections }
            keyExtractor={ ( item, index ) => `${ item.transactionId }-${ index }` }
            renderItem={ ( { item } ) => (
              <Animated.View entering={ FadeInDown.duration( 400 ) }>
                <CardInfo
                  id={ currentCard?.id || '' }
                  STK={ currentCard?.STK || '' }
                  name={ currentCard?.name || '' }
                  date={ item.date }
                  amount={ item.amount }
                  content={ item.description }
                  logoBanking={ currentCard?.logoBanking || '' }
                  transactionId={ item.transactionId }
                />
              </Animated.View>
            ) }
            renderSectionHeader={ ( { section: { title } } ) => (
              <Text className="px-4 py-2 bg-gray-100 text-gray-700 font-semibold">
                { formatDate( title ) }
              </Text>
            ) }
            stickySectionHeadersEnabled
            refreshing={ refreshing }
            onRefresh={ onRefresh }
            showsVerticalScrollIndicator={ false }
            className="bg-white"
            contentContainerStyle={ { paddingBottom: 100, paddingTop: 10 } }
          />
        ) }
        {/* -----------------------------------------End----------------------------------------- */ }


        {/* Filter Modal */ }
        <Modal
          visible={ showFilterModal }
          transparent
          animationType="slide"
          onRequestClose={ () => setShowFilterModal( false ) }
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
                { [ 7, 30, 90 ].map( day => (
                  <TouchableOpacity
                    key={ day }
                    className="py-2 px-4 bg-blue-50 rounded-full border border-blue-200"
                    onPress={ () => handleRecentDays( day ) }
                  >
                    <Text className="text-blue-600">{ day === 90 ? "3 tháng" : `${ day } ngày` } gần đây</Text>
                  </TouchableOpacity>
                ) ) }
              </View>

              {/* Custom date range */ }
              <View className='flex-row justify-between items-center mb-3'>
                <Text className="text-gray-500 font-medium">Tùy chỉnh khoảng thời gian:</Text>
                <TouchableOpacity className='p-2 rounded-lg bg-black' onPress={ handleResetFilterDate }>
                  <Image source={ require( '@/assets/images/clean.png' ) } className="w-5 h-5" resizeMode='contain' />
                </TouchableOpacity>
              </View>

              <View className="mb-6">
                { [
                  { label: "Từ ngày", date: startDate, setShow: setShowStartPicker, show: showStartPicker, onChange: setStartDate },
                  { label: "Đến ngày", date: endDate, setShow: setShowEndPicker, show: showEndPicker, onChange: setEndDate },
                ].map( ( { label, date, setShow, show, onChange }, idx ) => (
                  <View key={ idx } className="flex-row items-center justify-between mb-4">
                    <Text className="text-gray-700">{ label }:</Text>
                    <TouchableOpacity
                      className="flex-row items-center bg-gray-100 py-2 px-4 rounded-lg"
                      onPress={ () => setShow( true ) }
                    >
                      <MaterialIcons name="date-range" size={ 18 } color="#64748b" />
                      <Text className="ml-2 text-gray-700">{ formatDate( date ) }</Text>
                    </TouchableOpacity>
                    { show && (
                      <DateTimePicker
                        value={ date }
                        mode="date"
                        display="default"
                        onChange={ ( _, selectedDate ) =>
                        {
                          setShow( false );
                          if ( selectedDate ) onChange( selectedDate );
                        } }
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
        {/* -----------------------------------------End----------------------------------------- */ }
      </View>
      {/* -----------------------------------------End----------------------------------------- */ }
    </>
  );
}
