import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import mockBanking from '@/assets/banking.json';
import MyCard from '@/components/card/MyCard';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';


export default function Home ()
{
  const bankData = mockBanking;
  console.log( "Home mouted" );

  const handleAddCard = ( item: any ) =>
  {
    router.push( {
      pathname: "/bank-account/add",
      params: {
        data: JSON.stringify( item )
      }
    } )
  }

  return (
    <>
      <StatusBar style='light' />
      {/* Container */ }
      <View className='flex-1 bg-black overflow-hidden'>
        {/* Header */ }
        <View className="flex-row p-4 pt-8 items-center justify-between">
          <TouchableOpacity onPress={ () => void ( 0 ) } className='ml-1'>
            <Text className="text-white text-2xl font-bold ">⛛ AUTOPAY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => router.push( '/notificate' ) } className="flex-row items-center relative">
            <View className="">
              <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
            </View>
            <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
              <Text className="text-[6px] font-bold text-white">99+</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* -----------------------------------------End----------------------------------------- */ }

        <ScrollView
          contentContainerStyle={ { paddingBottom: 100 } }
          showsVerticalScrollIndicator={ false }
          className='bg-slate-50 flex-1'
          scrollEventThrottle={ 16 }
        >

          {/* Header Card Section */ }
          <View className='py-2'>
            <MyCard />
          </View>
          {/* -----------------------------------------End----------------------------------------- */ }

          {/* <MyLineChart /> */ }

          {/* Action */ }
          {/* <View className='m-4 bg-white rounded-xl shadow-md border border-gray-200'>
            <Text className="text-xl font-bold px-4 py-2">Chức năng</Text>
            <View className="flex-row flex-wrap gap-y-4 pt-2 pb-4">
              { Actions
                .slice() // copy mảng tránh làm thay đổi gốc
                .sort( ( a, b ) => a.id - b.id ) // sắp xếp theo id tăng dần
                .map( ( item ) => (
                  <TouchableOpacity key={ item.id } className="items-center w-1/4" onPress={ item.navigate }>
                    <View className="p-1 rounded-xl shadow-sm border bg-white">
                      <Image source={ item.icon } className="w-10 h-10" />
                    </View>
                    <Text className="mt-2 text-[11px] font-semibold text-center">
                      { item.name }
                    </Text>
                  </TouchableOpacity>
                ) ) }

              <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-white border rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/all.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-slate-600">Tất cả</Text>
              </TouchableOpacity> */}
          {/* -----------------------------------------End----------------------------------------- */ }
          {/* </View>
          </View> */}
          {/* -----------------------------------------End----------------------------------------- */ }

          {/* Bank */ }
          <View className='mx-4 px-4 bg-white rounded-xl shadow-md border border-gray-200'>
            <View className='py-2'>
              <Text className="text-md font-bold text-black">Ngân hàng liên kết</Text>
              <Text className='text-sm text-gray-400'>Chọn ngân hàng để thêm/ liên kết</Text>
            </View>

            <View className='py-2 pb-4 gap-1'>
              { bankData.map( ( item ) => (
                <TouchableOpacity
                  key={ item.id }
                  onPress={ () => handleAddCard( item ) }
                  className='bg-blue-50 px-4 py-2 rounded-lg flex-row items-center justify-between'
                >
                  <View className='flex-row items-center flex-1'>
                    <Image
                      source={ { uri: item.logo } }
                      className="w-16 h-10"
                      resizeMode="contain"
                    />
                    <Text className='text-sm flex-1 font-semibold'>{ item.name }</Text>
                  </View>

                  <AntDesign name="right" size={ 16 } color="gray" />
                </TouchableOpacity>
              ) ) }
            </View>
          </View>
          {/* -----------------------------------------End----------------------------------------- */ }
        </ScrollView >
      </View>
    </>
  );
}

