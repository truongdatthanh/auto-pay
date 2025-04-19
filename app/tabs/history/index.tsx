// import { View, Text, TouchableOpacity, Platform, ScrollView, FlatList } from 'react-native';
// import { useCallback, useState } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { formatDate } from '@/utils/formatDate';
// import Feather from '@expo/vector-icons/Feather';
// import CardInfo from '@/components/CardInfo';
// import mockBanking from '../../../assets/data.json';

// export default function History ()
// {

//   const [ date, setDate ] = useState( new Date() );
//   const [ showPicker, setShowPicker ] = useState( false );
//   const [ data, setData ] = useState( mockBanking );
//   const [ refreshing, setRefreshing ] = useState( false );

//   const onChange = ( event: any, selectedDate?: Date ) =>
//   {
//     setShowPicker( Platform.OS === 'ios' );
//     if ( selectedDate )
//     {
//       setDate( selectedDate );
//     }
//   };

//   const onRefresh = useCallback( () =>
//   {
//     setRefreshing( true );

//     setTimeout( () =>
//     {
//       setData( mockBanking );
//       setRefreshing( false );
//     }, 1500 );
//   }, [] );


//   return (
//     <>
//       <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
//         <Text className="text-lg font-semibold ">Thời gian</Text>
//         <TouchableOpacity
//           className="px-4 py-2 rounded-md flex-row items-center"
//           onPress={ () => setShowPicker( true ) }
//         >
//           <Text className="font-semibold mr-2">{ formatDate( date ) }</Text>
//           <Feather name="calendar" size={ 19 } color="black" />
//         </TouchableOpacity>

//         { showPicker && (
//           <DateTimePicker
//             value={ date }
//             mode="date"
//             display="default"
//             onChange={ onChange }
//           />
//         ) }
//       </View>

//       <Text className='mb-2'>Lịch sử giao dịch</Text>

//       <FlatList
//         data={ data }
//         keyExtractor={ ( item ) => item.id.toString() }
//         renderItem={ ( { item } ) => (
//           <CardInfo
//             id={ item.id }
//             STK={ item.STK }
//             name={ item.name }
//             date={ item.date }
//             amount={ item.amount }
//             content={ item.content }
//             logoBanking={ item.logoBanking }
//             transactionId={ item.transactionId }
//           />
//         ) }
//         showsVerticalScrollIndicator={ false }
//         refreshing={ refreshing }
//         onRefresh={ onRefresh }
//         className='bg-black py-4'
//       />
//     </>
//   );
// }


// import { View, Text, TouchableOpacity, Platform, SectionList } from 'react-native';
// import { useCallback, useState } from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { formatDate } from '@/utils/formatDate';
// import Feather from '@expo/vector-icons/Feather';
// import CardInfo from '@/components/CardInfo';
// import mockBanking from '../../../assets/data.json';

// export default function History() {
//   const [date, setDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);
//   const [sections, setSections] = useState(groupByDate(mockBanking));
//   const [refreshing, setRefreshing] = useState(false);

//   // Nhóm dữ liệu theo ngày
//   function groupByDate(data: any[]) {
//     const grouped: { [key: string]: any[] } = {};
//     data.forEach(item => {
//       const dateKey = new Date(item.date).toDateString();
//       if (!grouped[dateKey]) grouped[dateKey] = [];
//       grouped[dateKey].push(item);
//     });

//     return Object.keys(grouped).map(date => ({
//       title: date,
//       data: grouped[date],
//     }));
//   }

//   // Lọc theo ngày cụ thể
//   const handleFilterByDate = (selectedDate: Date) => {
//     const selectedDay = selectedDate.toDateString();
//     const filtered = mockBanking.filter(
//       item => new Date(item.date).toDateString() === selectedDay
//     );
//     setSections(groupByDate(filtered));
//   };

//   // Lọc theo khoảng ngày
//   const handleRecentDays = (days: number) => {
//     const now = new Date();
//     const past = new Date();
//     past.setDate(now.getDate() - days);

//     const filtered = mockBanking.filter(item => {
//       const itemDate = new Date(item.date);
//       return itemDate >= past && itemDate <= now;
//     });

//     setSections(groupByDate(filtered));
//   };

//   // Hàm chọn ngày
//   const onChange = (event: any, selectedDate?: Date) => {
//     setShowPicker(Platform.OS === 'ios');
//     if (selectedDate) {
//       setDate(selectedDate);
//       handleFilterByDate(selectedDate);
//     }
//   };

//   // Hàm refresh dữ liệu
//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setSections(groupByDate(mockBanking));
//       setRefreshing(false);
//     }, 1500);
//   }, []);

//   return (
//     <>
//       <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
//         <Text className="text-lg font-semibold">Thời gian</Text>
//         <TouchableOpacity
//           className="px-4 py-2 rounded-md flex-row items-center"
//           onPress={() => setShowPicker(true)}
//         >
//           <Text className="font-semibold mr-2">{formatDate(date)}</Text>
//           <Feather name="calendar" size={19} color="black" />
//         </TouchableOpacity>

//         {showPicker && (
//           <DateTimePicker
//             value={date}
//             mode="date"
//             display="default"
//             onChange={onChange}
//           />
//         )}
//       </View>

//       {/* Nút lọc nhanh */}
//       <View className="flex-row justify-around mt-2 mb-2 px-4">
//         <TouchableOpacity onPress={() => handleRecentDays(7)}>
//           <Text className="text-sm text-blue-600 underline">7 ngày gần đây</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => handleRecentDays(90)}>
//           <Text className="text-sm text-blue-600 underline">3 tháng gần đây</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => setSections(groupByDate(mockBanking))}>
//           <Text className="text-sm text-red-500 underline">Tất cả</Text>
//         </TouchableOpacity>
//       </View>

//       <Text className="mb-2 px-4 font-semibold">Lịch sử giao dịch</Text>

//       <SectionList
//         sections={sections}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <CardInfo
//             id={item.id}
//             STK={item.STK}
//             name={item.name}
//             date={item.date}
//             amount={item.amount}
//             content={item.content}
//             logoBanking={item.logoBanking}
//             transactionId={item.transactionId}
//           />
//         )}
//         renderSectionHeader={({ section: { title } }) => (
//           <Text className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold">{title}</Text>
//         )}
//         stickySectionHeadersEnabled
//         refreshing={refreshing}
//         onRefresh={onRefresh}
//         showsVerticalScrollIndicator={false}
//         className="bg-black py-4"
//       />
//     </>
//   );
// }

import { View, Text, TouchableOpacity, Platform, SectionList } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, groupByDate } from '@/utils/formatDate';
import Feather from '@expo/vector-icons/Feather';
import CardInfo from '@/components/CardInfo';
import mockBanking from '../../../assets/data.json';

export default function History ()
{
  const [ date, setDate ] = useState( new Date() );
  const [ showPicker, setShowPicker ] = useState( false );
  const [ sections, setSections ] = useState( groupByDate( mockBanking ) );
  const [ refreshing, setRefreshing ] = useState( false );

  // Lọc theo ngày cụ thể
  const handleFilterByDate = ( selectedDate: Date ) =>
  {
    const selectedDay = selectedDate.toDateString();
    const filtered = mockBanking.filter(
      item => new Date( item.date ).toDateString() === selectedDay
    );
    setSections( groupByDate( filtered ) );
  };

  // Lọc theo khoảng ngày
  const handleRecentDays = ( days: number ) =>
  {
    const now = new Date();
    const past = new Date();
    console.log( "past", past );
    console.log( "now", now.getDate() );
    past.setDate( now.getDate() - days );
    console.log( "past- - ", past.setDate( now.getDate() - days ) );
    console.log( "now- - ", now.getDate() - days);

    const filtered = mockBanking.filter( item =>
    {
      const itemDate = new Date( item.date );
      return itemDate >= past && itemDate <= now;
    } );
    setSections( groupByDate( filtered ) );
  };

  // Hàm chọn ngày
  const onChange = ( event: any, selectedDate?: Date ) =>
  {
    setShowPicker( Platform.OS === 'ios' );
    if ( selectedDate )
    {
      setDate( selectedDate );
      handleFilterByDate( selectedDate );
    }
  };

  // Hàm refresh dữ liệu
  const onRefresh = useCallback( () =>
  {
    setRefreshing( true );
    setTimeout( () =>
    {
      console.log( "refreshing" );
      handleFilterByDate( date )

      setRefreshing( false );
    }, 1500 );
  }, [] );

  // Hiển thị dữ liệu theo ngày hiện tại khi mở màn hình
  useEffect( () =>
  {
    handleFilterByDate( date );  // Lọc dữ liệu theo ngày hiện tại
  }, [ date ] );

  return (
    <>
      <View className='flex-1 bg-white'>
        <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
          <Text className="text-lg font-semibold">Thời gian</Text>
          <TouchableOpacity
            className="px-4 py-2 rounded-md flex-row items-center"
            onPress={ () => setShowPicker( true ) }
          >
            <Text className="font-semibold mr-2">{ formatDate( date ) }</Text>
            <Feather name="calendar" size={ 19 } color="black" />
          </TouchableOpacity>

          { showPicker && (
            <DateTimePicker
              value={ date }
              mode="date"
              display="default"
              onChange={ onChange }
            />
          ) }
        </View>

        {/* Nút lọc nhanh */ }
        <View className="flex-row justify-around mt-2 mb-2 px-4">
          <TouchableOpacity onPress={ () => handleRecentDays( 7 ) }>
            <Text className="text-sm text-blue-600 underline">7 ngày gần đây</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => handleRecentDays( 90 ) }>
            <Text className="text-sm text-blue-600 underline">3 tháng gần đây</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => setSections( groupByDate( mockBanking ) ) }>
            <Text className="text-sm text-red-500 underline">Tất cả</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={ sections }
          keyExtractor={ ( item ) => item.id.toString() }
          renderItem={ ( { item } ) => (
            <CardInfo
              id={ item.id }
              STK={ item.STK }
              name={ item.name }
              date={ item.date }
              amount={ item.amount }
              content={ item.content }
              logoBanking={ item.logoBanking }
              transactionId={ item.transactionId }
            />
          ) }
          renderSectionHeader={ ( { section: { title } } ) => (
            <Text className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold">{ title }</Text>
          ) }
          stickySectionHeadersEnabled
          refreshing={ refreshing }
          onRefresh={ onRefresh }
          showsVerticalScrollIndicator={ false }
          className="bg-white"
        />
      </View>
    </>
  );
}

