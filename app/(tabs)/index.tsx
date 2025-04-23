import BankingCard from '@/components/BankCard';
import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import mockBankCard from '../../assets/banking-card.json'
import { useEffect, useState } from 'react';
import Chart from '../test/chart';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import mockBanking from '../../assets/banking.json';
import { router } from 'expo-router';

interface IBanking
{
  id: number;
  name: string;
  code: string;
  bin: number;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string
}

export default function Home ()
{
  const [ data, setData ] = useState( mockBankCard );
  console.log( data );

  const [ bankData, setBankData ] = useState( mockBanking );

  // useEffect( () =>
  // {
  //   const fetchData = async () =>
  //   {
  //     try
  //     {
  //       const response = await fetch( 'https://api.vietqr.io/v2/banks' );
  //       const json = await response.json();
  //       setBankData( json.data );
  //     } catch ( error )
  //     {
  //       console.error( error );
  //     }
  //   };
  //   fetchData();
  // }, [] );

  const itemClass = 'w-1/4 items-center mb-4 border border-gray-300 rounded-lg p-2';
  const textClass = 'text-center text-sm font-semibold';

  return (
    <ScrollView
      contentContainerStyle={ { paddingBottom: 100 } }
      showsVerticalScrollIndicator={ false }
      className='bg-white flex-1'
    >
      {/* <View className='mb-2 bg-white'>
        <ImageSlider />
      </View> */}
      <ScrollView
        horizontal={ true }
        showsHorizontalScrollIndicator={ false }
        contentContainerStyle={ { paddingLeft: 45 } }
        snapToInterval={ 300 }
        className='h-300 py-2 shadow-md'
      >
        { data.map( ( item ) => (
          <View key={ item.id } style={ { marginRight: 20 } }>
            <BankingCard
              key={ item.id }
              id={ item.id }
              STK={ item.STK }
              name={ item.name }
              logoBanking={ item.logoBanking }
              bankName={ item.bankName }
            />
          </View>
        ) ) }
      </ScrollView>

      <View className='p-4 flex-row items-center justify-between bg-white'>
        <Chart />
        <View>
          <View>
            <Text >1000VND</Text>
            <Text >0 Giao dich den </Text>
          </View>
          <View>
            <Text >1000VND</Text>
            <Text >0 Giao dich di </Text>
          </View>

        </View>
      </View>



      <View className="flex-row flex-wrap bg-white p-4 justify-between">
        <TouchableOpacity className={ itemClass }>
          <Image source={ require( '../../assets/images/logo-autopay-4.png' ) } className="w-10 h-10" />
          <Text className={ textClass }>Kích hoạt AutoPAY</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <Ionicons name="qr-code-sharp" size={ 35 } color="black" />
          <Text className={ textClass }>QR của tôi</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <AntDesign name="sharealt" size={ 35 } color="black" />
          <Text className={ textClass }>Chia sẻ biến động số dư</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <FontAwesome5 name="store" size={ 35 } color="black" />
          <Text className={ textClass }>Quản lý cửa hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass } onPress={ () => router.push( '/bank-account' ) }>
          <Ionicons name="information-circle-outline" size={ 35 } color="black" />
          <Text className={ textClass }>Chi tiết tài khoản</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <FontAwesome5 name="list" size={ 35 } color="black" />
          <Text className={ textClass }>Lịch sử giao dịch</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <EvilIcons name="chart" size={ 50 } color="black" />
          <Text className={ textClass }>Thống kê giao dịch</Text>
        </TouchableOpacity>

        <TouchableOpacity className={ itemClass }>
          <FontAwesome5 name="money-check" size={ 37 } color="black" />
          <Text className={ textClass }>Gia hạn dịch vụ</Text>
        </TouchableOpacity>
      </View>



      <View className='p-2 bg-white '>
        <Text className='text-xl font-semibold'>Ngân hàng kết nối</Text>
      </View>

      <View className="flex-row flex-wrap justify-evenly">
        { bankData.map( ( item ) => (
          <TouchableOpacity
            onPress={ () => console.log( item.name ) }
            key={ item.id }
            className="w-1/3 items-center p-2"
          >
            <Image
              source={ { uri: item.logo } }
              className="w-[120] h-[80] rounded-md border border-gray-500 "
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) ) }
      </View>
    </ScrollView >
  );
}

