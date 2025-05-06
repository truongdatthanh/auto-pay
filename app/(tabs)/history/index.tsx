import { View, Text, TouchableOpacity, Platform, SectionList, Alert } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate, groupByDate } from '@/utils/formatDate';
import Feather from '@expo/vector-icons/Feather';
import CardInfo from '@/components/CardInfo';
import NotFound from '@/app/error/404';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

interface ITransaction
{
  transactionId: string;
  date: string;
  amount: number;
  description: string;
  senderName: string;
  senderSTK: string;
  receiverSTK: string;
}

interface IBankingTransaction
{
  id: string;
  STK: string;
  name: string;
  logoBanking: string;
  bankName: string;
  transactionHistory: ITransaction[];
}

interface Section
{
  title: string;
  data: ITransaction[]; // hoặc `any[]` nếu chưa có interface cho dữ liệu
}

export default function History ()
{
  const [ currentCard, setCurrentCard ] = useState<IBankingTransaction | null>( null );
  const [ startDate, setStartDate ] = useState( new Date() );
  const [ endDate, setEndDate ] = useState( new Date() );
  const [ showStartPicker, setShowStartPicker ] = useState( false );
  const [ showEndPicker, setShowEndPicker ] = useState( false );
  const [ sections, setSections ] = useState<Section[]>( [] );
  const [ refreshing, setRefreshing ] = useState( false );


  //Lấy dữ liệu
  useFocusEffect(
    useCallback( () =>
    {
      const fetchSelectedCard = async () =>
      {
        const card = await AsyncStorage.getItem( 'selectedCard' );
        if ( card )
        {
          setCurrentCard( JSON.parse( card ) );
        }
      };
      fetchSelectedCard();
    }, [] )
  );

  //Xuất dữ liệu ra màn hình
  useEffect( () =>
  {
    handleFilterByDate();
  }, [ startDate, endDate, currentCard ] );


  //Hàm lọc dữ liệu theo ngày đã chọn
  const handleFilterByDate = () =>
  {
    if ( !currentCard?.transactionHistory ) return;

    const start = new Date( startDate ).setHours( 0, 0, 0, 0 );
    const end = new Date( endDate ).setHours( 0, 0, 0, 0 );

    if ( start > end )
    {
      Alert.alert( "Ngày không hợp lệ", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc." );
      setStartDate( new Date() );
      return;
    }

    const filtered = currentCard.transactionHistory.filter( item =>
    {
      const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
      return itemDate >= start && itemDate <= end;
    } );

    setSections( groupByDate( filtered ) );
  };


  //Hàm lọc dữ liệu theo khoảng ngày
  //days là số ngày vd 7 ngày, 3 tháng = 90 ngày,...
  const handleRecentDays = ( days: number ) =>
  {
    if ( !currentCard?.transactionHistory ) return;

    const now = new Date();
    const past = new Date();
    past.setDate( now.getDate() - days );

    const start = past.setHours( 0, 0, 0, 0 );
    const end = now.setHours( 0, 0, 0, 0 );

    const filtered = currentCard.transactionHistory.filter( item =>
    {
      const itemDate = new Date( item.date ).setHours( 0, 0, 0, 0 );
      return itemDate >= start && itemDate <= end;
    } );

    setStartDate( past );
    setEndDate( now );
    setSections( groupByDate( filtered ) );
  };


  //Hàm chọn ngày bắt đầu
  const onChangeStartDate = ( _: any, selectedDate?: Date ) =>
  {
    setShowStartPicker( false );
    if ( selectedDate )
    {
      setStartDate( selectedDate );
    }
  };

  //Hàm chọn ngày kết thúc
  const onChangeEndDate = ( _: any, selectedDate?: Date ) =>
  {
    setShowEndPicker( false );
    if ( selectedDate )
    {
      setEndDate( selectedDate );
    }
  };

  //Hàm refresh dữ liệu
  const onRefresh = useCallback( () =>
  {
    setRefreshing( true );
    setTimeout( () =>
    {
      handleFilterByDate();
      setRefreshing( false );
    }, 1000 );
  }, [ currentCard, startDate, endDate ] );

  return (
    <View className="flex-1 bg-white">
      {/* Header: Bộ lọc ngày */ }
      <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
        <Text className="text-lg font-semibold">Thời gian</Text>
        <View className="flex-row items-center">
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
          <Text className="font-bold text-lg px-2">-</Text>
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
              onChange={ onChangeEndDate }
            />
          ) }
        </View>
      </View>

      {/* Bộ lọc nhanh */ }
      <View className="flex-row justify-around mt-2 mb-2 px-4">
        <TouchableOpacity onPress={ () => handleRecentDays( 7 ) }>
          <Text className="text-sm text-blue-600 underline">7 ngày gần đây</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => handleRecentDays( 90 ) }>
          <Text className="text-sm text-blue-600 underline">3 tháng gần đây</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () =>
        {
          if ( currentCard?.transactionHistory )
          {
            setSections( groupByDate( currentCard.transactionHistory ) );
          }
        } }>
          <Text className="text-sm text-red-500 underline">Tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Hiển thị danh sách hoặc thông báo lỗi */ }
      { sections.length === 0 ? (
        <NotFound contentErr="Không có giao dịch nào!!!" />
      ) : (
        <SectionList
          sections={ sections }
          keyExtractor={ ( item, index ) => `${ item.transactionId }-${ index }` }
          renderItem={ ( { item } ) => (
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
  );
}