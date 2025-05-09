import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image, TextInput, Alert, StatusBar } from 'react-native';
import { useEffect, useState } from 'react';
import mockBanking from '../../assets/banking.json';
import MyCard from '@/components/MyCard';
import { AntDesign, EvilIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import VietQRImage from '../test/linking';

export default function Home ()
{
  const [ bankData, setBankData ] = useState( mockBanking );

  const handleGoToMyQR = () =>
  {
    router.replace( {
      pathname: "/(tabs)/qr",
      params: { tabIndex: 1 }
    } )
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView
        contentContainerStyle={ { paddingBottom: 100 } }
        showsVerticalScrollIndicator={ false }
        className='bg-white flex-1'
      >

        <View className='py-4'>
          <MyCard />
        </View>

        {/* <VietQRImage
        accountName='Truong Thanh Dat'
        accountNumber='246134029400001'
        amount={ 10000 }
        addInfo='abc'
        bankCode='nab'
      /> */}

        <View className="flex-row flex-wrap bg-white justify-between">
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white'>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <Image source={ require( '../../assets/images/logo-autopay-4.png' ) } className="w-6 h-6" />
              <Text className='text-xs font-semibold text-center'>Kích hoạt AutoPAY</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white' onPress={ handleGoToMyQR }>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <Ionicons name="qr-code-sharp" size={ 20 } color="black" />
              <Text className='text-xs font-semibold text-center'>QR của tôi</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white'>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <AntDesign name="sharealt" size={ 20 } color="black" />
              <Text className='text-xs font-semibold text-center'>Chia sẻ biến động số dư</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white'>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <FontAwesome5 name="store" size={ 20 } color="black" />
              <Text className='text-xs font-semibold text-center'>Quản lý cửa hàng</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white' onPress={ () => router.push( '/bank-account' ) }>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <Ionicons name="information-circle-outline" size={ 25 } color="black" />
              <Text className='text-xs font-semibold text-center'>Chi tiết tài khoản</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white' onPress={ () => router.push( '/(tabs)/history' ) }>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <FontAwesome5 name="list" size={ 20 } color="black" />
              <Text className='text-xs font-semibold text-center'>Lịch sử giao dịch</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white' onPress={ () => router.replace( '/(tabs)/history/statistics' ) }>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <EvilIcons name="chart" size={ 30 } color="black" />
              <Text className='text-xs font-semibold text-center'>Thống kê giao dịch</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='w-1/4 max-h-40 p-2 bg-white'>
            <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
              <FontAwesome5 name="money-check" size={ 20 } color="black" />
              <Text className='text-xs font-semibold text-center'>Gia hạn dịch vụ</Text>
            </View>
          </TouchableOpacity>
        </View >

        <View className='p-2 bg-white '>
          <Text className='text-xl font-semibold'>Ngân hàng kết nối</Text>
        </View>
        <View className="flex-row flex-wrap justify-between px-2">
          { bankData.map( ( item ) => (
            <TouchableOpacity
              key={ item.id }
              onPress={ () => console.log( item.name ) }
              className="w-[19%] aspect-square items-center justify-center mb-3 border border-gray-400 rounded-md"
            >
              <Image
                source={ { uri: item.logo } }
                className="w-full h-[50]"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) ) }
        </View>

      </ScrollView >
    </>
  );
}



