import { View, Text, TouchableOpacity, Platform, SectionList, Alert } from 'react-native';
import { useCallback, useState, useEffect, useRef } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, groupByDate } from '@/utils/formatDate';
import Feather from '@expo/vector-icons/Feather';
import CardInfo from '@/components/CardInfo';
import mockBanking from '../../../assets/data.json';
import NotFound from '@/app/error/404';

export default function History ()
{
  const [ endDate, setEndDate ] = useState( new Date() );//Lấy ra ngày hôm nay
  const [ startDate, setStartDate ] = useState( new Date() );
  const [ showStartPicker, setShowStartPicker ] = useState( false );
  const [ showEndPicker, setShowEndPicker ] = useState( false );
  const [ sections, setSections ] = useState( groupByDate( mockBanking ) );
  const [ refreshing, setRefreshing ] = useState( false );

  const [ selectedDate, setSelectedDate ] = useState();
  console.log( selectedDate );


  // Lọc theo khoảng ngày - vd: 7 ngày gần đây, 3 tháng gần đây
  function handleRecentDays ( days: number )
  {
    const now = new Date();
    const past = new Date( now );
    past.setDate( now.getDate() - days ); // Thay đổi ngày trực tiếp
    const nowDate = now.setHours( 0, 0, 0, 0 ); //setHours(0, 0, 0, 0) để set mặc định ngày giờ là 00:00:00
    const passDate = past.setHours( 0, 0, 0, 0 );
    const filtered = mockBanking.filter( item =>
    {
      const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
      return itemDate >= passDate && itemDate <= nowDate;
    } );
    setSections( groupByDate( filtered ) );
  }

  // Lọc theo ngày cụ thể
  const handleFilterByDate = () =>
  {
    const start = startDate.setHours( 0, 0, 0, 0 );
    const end = endDate.setHours( 0, 0, 0, 0 );

    if ( start > end )
    {
      Alert.alert( "Ngày của bạn không hợp lệ" );
      setStartDate( new Date );
    }

    const filtered = mockBanking.filter(
      item =>
      {
        const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
        return itemDate >= start && itemDate <= end;
      }
    );
    setSections( groupByDate( filtered ) );
  };

  // Hàm chọn ngày kết thúc
  const onChange = ( event: any, selectedDate?: Date ) =>
  {
    setShowEndPicker( Platform.OS === 'ios' );
    if ( selectedDate )
    {
      setEndDate( selectedDate );
      handleFilterByDate();
    }
  };

  //Hàm chọn ngày bắt đầu
  const onChangeStartDate = ( event: any, selectedDate?: Date ) =>
  {
    setShowStartPicker( Platform.OS === 'ios' );
    if ( selectedDate )
    {
      setStartDate( selectedDate );
      handleFilterByDate();
    }
  }


  // Hiển thị dữ liệu theo ngày hiện tại khi mở màn hình
  useEffect( () =>
  {
    handleFilterByDate();  // Lọc dữ liệu theo ngày hiện tại
  }, [ startDate, endDate ] );


  // Hàm refresh dữ liệu
  const onRefresh = useCallback( () =>
  {
    setRefreshing( true );
    setTimeout( () =>
    {
      console.log( "refreshing" );
      handleFilterByDate();
      setRefreshing( false );
    }, 1500 );
  }, [] );

  return (
    <>
      <View className='flex-1 bg-white'>
        <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
          <Text className="text-lg font-semibold">Thời gian</Text>
          {/* set hộp thoại lịch ẩn/ hiện và chọn ngày */ }
          <View className='flex-row items-center'>
            <TouchableOpacity
              className="py-2 rounded-md flex-row items-center border p-2"
              onPress={ () => setShowStartPicker( true ) }
            >
              <Text className="font-semibold">{ formatDate( startDate ) }</Text>
            </TouchableOpacity>
            { showStartPicker && (
              <DateTimePicker
                value={ startDate }
                mode="date"
                display="default"
                onChange={ onChangeStartDate }
              />
            ) }
            <Text className='font-bold text-lg px-2'>-</Text>
            <TouchableOpacity
              className="py-2 rounded-md flex-row items-center border p-2"
              onPress={ () => setShowEndPicker( true ) }
            >
              <Text className="font-semibold mr-2">{ formatDate( endDate ) }</Text>
              <Feather name="calendar" size={ 19 } color="black" />
            </TouchableOpacity>
            { showEndPicker && (
              <DateTimePicker
                value={ endDate }
                mode="date"
                display="default"
                onChange={ onChange }
              />
            ) }
          </View>
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

        { sections.length === 0 ? (
          <NotFound contentErr="Không có giao dịch nào!!!" />
        ) : (
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
            contentContainerStyle={ { paddingBottom: 100 } }
          />
        ) }
      </View>
    </>
  );
}


