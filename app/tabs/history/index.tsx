import { View, Text, TouchableOpacity, Platform, ScrollView, FlatList } from 'react-native';
import { useCallback, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '@/utils/formatDate';
import Feather from '@expo/vector-icons/Feather';
import CardInfo from '@/components/CardInfo';

export default function History ()
{
  const mockDataBanking = [
    {
      id: 1,
      STK: '123456789',
      name: 'Truong Thanh Dat',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Truong Thanh Dat chuyen khoan',
      logoBanking: 'https://bidv.com.vn/wps/wcm/connect/674b6448-d23b-484e-b4d3-1e86fa68bd0d/Logo+Nguyen+ban+nen+trang.png?MOD=AJPERES&CACHEID=ROOTWORKSPACE-674b6448-d23b-484e-b4d3-1e86fa68bd0d-pfdjkOq'
    },
    {
      id: 2,
      STK: '4531234534345',
      name: 'Nguyễn Văn A',
      date: '2025-10-01',
      amount: 2000000,
      content: 'Nguyen Van A chuyen khoan',
      logoBanking: 'https://static.wixstatic.com/media/9d8ed5_75753932a80340b587d1764b072c64df~mv2.png/v1/fill/w_560,h_560,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9d8ed5_75753932a80340b587d1764b072c64df~mv2.png'
    },
    {
      id: 3,
      STK: '453453453378',
      name: 'Nguyễn Văn B',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Xin chao the gioi',
      logoBanking: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png'
    },
    {
      id: 4,
      STK: '2224567843',
      name: 'Yassuo',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Xin chao the gioi',
      logoBanking: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png'
    },
    {
      id: 5,
      STK: '4444445645345',
      name: 'Zed thanh lich',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Xin chao the gioi',
      logoBanking: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png'
    },
    {
      id: 6,
      STK: '78974345345678',
      name: 'LeeSin Q hut',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Xin chao the gioi',
      logoBanking: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png'
    },
    {
      id: 7,
      STK: '4564534554',
      name: '????????',
      date: '2023-10-01',
      amount: 1000000,
      content: 'Xin chao the gioi',
      logoBanking: 'https://cdn.haitrieu.com/wp-content/uploads/2022/02/Icon-Vietcombank.png'
    },
  ];


  const [ date, setDate ] = useState( new Date() );
  const [ showPicker, setShowPicker ] = useState( false );
  const [ data, setData ] = useState( mockDataBanking );
  const [ refreshing, setRefreshing ] = useState( false );

  const onChange = ( event: any, selectedDate?: Date ) =>
  {
    setShowPicker( Platform.OS === 'ios' );
    if ( selectedDate )
    {
      setDate( selectedDate );
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setData(mockDataBanking); 
      setRefreshing(false);
    }, 1500); 
  }, [] );
  

  return (
    <>
      <View className="p-4 flex-row items-center justify-between bg-white shadow-lg">
        <Text className="text-lg font-semibold ">Thời gian</Text>
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

      <Text className='mb-2'>Lịch sử giao dịch</Text>

      <FlatList
        data={ mockDataBanking }
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
          />
        ) }
        showsVerticalScrollIndicator={ false }
        refreshing={ refreshing }
        onRefresh={ onRefresh }
      />
    </>
  );
}

