import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image, TextInput, Alert, StatusBar, SafeAreaView, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import mockBanking from '../../assets/banking.json';
import MyCard from '@/components/MyCard';
import { AntDesign, EvilIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useHideTabBarOnScroll from '@/hooks/useHideTabbarOnScroll';


export default function Home ()
{
  const bankData = mockBanking;


  const { handleScroll } = useHideTabBarOnScroll();


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
      <SafeAreaView className="flex-1 bg-[#1c40f2]" style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }>
        <View className="flex-row p-4 items-center justify-between ">
          <TouchableOpacity onPress={ () => void ( 0 ) } className='ml-2'>
            <Text className="text-white text-2xl font-bold">⛛ AUTOPAY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ () => void ( 0 ) } className="flex-row items-center relative">
            <View className="">
              <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
            </View>
            <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
              <Text className="text-[6px] font-bold text-white">99+</Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={ { paddingBottom: 100 } }
          showsVerticalScrollIndicator={ false }
          className='bg-slate-50 flex-1'
          onScroll={ handleScroll }
          scrollEventThrottle={ 16 }
        >

          <View className='py-2'>
            <MyCard />
          </View>

          {/* Quick Actions */ }
          <View className="flex-row mx-4 bg-white p-4 rounded-xl shadow-md border border-gray-200 justify-between">
            {/* Chuyển tiền cho mầy nè */ }
            <TouchableOpacity className="items-center w-24" onPress={ () => router.push( '/transfer' ) }>
              <View className="p-1 bg-blue-100 border border-blue-300 rounded-xl shadow-sm">
                <Image source={ require( '@/assets/images/dollar.png' ) } className="w-10 h-10" />
              </View>
              <Text className="mt-2 text-[11px] font-semibold text-center text-blue-700">Chuyển tiền</Text>
            </TouchableOpacity>
            <View className='w-1 border border-gray-300 rounded-md' />
            {/* QR của tao */ }
            <TouchableOpacity className="items-center w-24" onPress={ () => handleGoToMyQR() }>
              <View className="p-1 bg-green-100 border border-green-300 rounded-xl shadow-sm">
                <Image source={ require( '@/assets/images/qr-code.png' ) } className="w-10 h-10" />
              </View>
              <Text className="mt-2 text-[11px] font-semibold text-center text-green-700">QR của tao</Text>
            </TouchableOpacity>
            <View className='w-1 border border-gray-300 rounded-md' />
            {/* Chuyển tiền cho tao */ }
            <TouchableOpacity className="items-center w-24" onPress={ () => void ( 0 ) }>
              <View className="p-1 bg-red-100 border border-red-300 rounded-xl shadow-sm">
                <Image source={ require( '@/assets/images/money.png' ) } className="w-10 h-10" />
              </View>
              <Text className="mt-2 text-[11px] font-semibold text-center text-red-700">Nhận tiền</Text>
            </TouchableOpacity>
          </View>
          {/* -----------------------------------------End----------------------------------------- */ }


          {/* Action */ }
          <View className='m-4 bg-white rounded-xl shadow-md border border-gray-200'>
            <Text className="text-xl font-bold px-4 py-2">Chức năng</Text>
            <View className="flex-row flex-wrap gap-y-4 pt-2 pb-4">

              {/* row = 1 */ }
              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push( '/transfer' ) }>
                <View className="p-1 bg-blue-100 border border-blue-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/dollar.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-blue-600">Chuyển tiền</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => handleGoToMyQR() }>
                <View className="p-1 bg-emerald-100 border border-emerald-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/qr-code.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-emerald-600">QR của tao</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push('/qr/create') }>
                <View className="p-1 bg-rose-100 border border-rose-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/money.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-rose-600">Nhận tiền</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push( '/bank-account' ) }>
                <View className="p-1 bg-yellow-50 border border-yellow-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/info.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-yellow-600">Chi tiết tài khoản</Text>
              </TouchableOpacity>
              {/* -----------------------------------------End----------------------------------------- */ }

              {/* row = 2 */ }
              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push( '/(tabs)/history' ) }>
                <View className="p-1 bg-pink-100 border border-pink-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/history.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-pink-500">Lịch sử giao dịch</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push( '/statistics' ) }>
                <View className="p-1 bg-violet-100 border border-violet-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/spreadsheet-app.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-violet-600">Thống kê</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => router.push( '/share-balance-fluctuation' ) }>
                <View className="p-1 bg-orange-100 border border-orange-400 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/share.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-orange-500">Biến động số dư</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-slate-100 border border-slate-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/all.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-slate-600">Tất cả</Text>
              </TouchableOpacity>
              {/* -----------------------------------------End----------------------------------------- */ }

              {/* row = 3 */ }
              {/* <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-red-100 border border-red-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/money.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-red-700">Đang phát triển</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-blue-100 border border-blue-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/dollar.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-blue-700">Đang phát triển</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-green-100 border border-green-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/qr-code.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-green-700">Đang phát triển</Text>
              </TouchableOpacity>

              <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
                <View className="p-1 bg-red-100 border border-red-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/money.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-red-700">Đang phát triển</Text>
              </TouchableOpacity> */}
              {/* -----------------------------------------End----------------------------------------- */ }
            </View>
          </View>


          {/* -----------------------------------------End----------------------------------------- */ }

          {/* Bank */ }
          <View className='mx-4 bg-white rounded-xl shadow-md border border-gray-200'>

            <Text className="text-xl font-bold px-4 py-2">Ngân hàng liên kết</Text>

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
          </View>
          {/* -----------------------------------------End----------------------------------------- */ }
        </ScrollView >
      </SafeAreaView >
    </>
  );
}

// import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView, Platform, GestureResponderEvent } from 'react-native';
// import { ReactNode, useEffect, useState } from 'react';
// import mockBanking from '../../assets/banking.json';
// import MyCard from '@/components/MyCard';
// import { AntDesign, EvilIcons, FontAwesome5, Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import useHideTabBarOnScroll from '@/hooks/useHideTabbarOnScroll';
// import Animated, { FadeInDown } from 'react-native-reanimated';

// interface QuickActionButtonProps {
//   icon: ReactNode;
//   title: string;
//   onPress: (event: GestureResponderEvent) => void;
//   color?: 'blue' | 'green' | 'red' | 'yellow' | 'gray'; // giới hạn màu nếu muốn
// }

// export default function Home ()
// {
//   const bankData = mockBanking;
//   const { handleScroll } = useHideTabBarOnScroll();

//   const handleGoToMyQR = () =>
//   {
//     router.replace( {
//       pathname: "/(tabs)/qr",
//       params: { tabIndex: 1 }
//     } );
//   }

//   const QuickActionButton = ( { icon, title, onPress, color = "blue" } : QuickActionButtonProps ) => (
//     <TouchableOpacity
//       className={ `items-center w-[30%] mb-4` }
//       onPress={ onPress }
//     >
//       <View className={ `p-3 bg-${ color }-50 border border-${ color }-200 rounded-2xl shadow-sm` }>
//         { icon }
//       </View>
//       <Text className={ `mt-2 text-xs font-medium text-center text-${ color }-700` }>{ title }</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//       <SafeAreaView className="flex-1 bg-[#1c40f2]" style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }>
//         {/* Header */ }
//         <View className="flex-row p-4 items-center justify-between">
//           <TouchableOpacity className="ml-2">
//             <Text className="text-white text-2xl font-bold">⛛ AUTOPAY</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             onPress={ () => router.push( '/notificate' ) }
//             className="flex-row items-center relative"
//           >
//             <MaterialCommunityIcons name="bell" size={ 24 } color="white" />
//             <View className="bg-red-500 h-5 w-5 rounded-full justify-center items-center absolute z-10 top-[-5] right-[-5]">
//               <Text className="text-[10px] font-bold text-white">99+</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <ScrollView
//           contentContainerStyle={ { paddingBottom: 100 } }
//           showsVerticalScrollIndicator={ false }
//           className="bg-slate-50 flex-1"
//           onScroll={ handleScroll }
//           scrollEventThrottle={ 16 }
//         >
//           {/* Card Section */ }
//           <Animated.View entering={ FadeInDown.delay( 100 ).duration( 400 ) } className="py-2">
//             <MyCard />
//           </Animated.View>

//           {/* Quick Actions */ }
//           <Animated.View entering={ FadeInDown.delay( 200 ).duration( 400 ) } className="mx-4 my-4">
//             <View className="bg-white p-4 rounded-xl shadow-md">
//               <Text className="text-lg font-bold mb-4 text-gray-800">Quick Actions</Text>
//               <View className="flex-row flex-wrap justify-between">
//                 <QuickActionButton
//                   icon={ <Image source={ require( '@/assets/images/dollar.png' ) } className="w-10 h-10" /> }
//                   title="Transfer Money"
//                   onPress={ () => router.push( "/transfer" ) }
//                   color="blue"
//                 />
//                 <QuickActionButton
//                   icon={ <Ionicons name="qr-code-sharp" size={ 24 } color="#10b981" /> }
//                   title="My QR Code"
//                   onPress={ handleGoToMyQR }
//                   color="green"
//                 />
//                 <QuickActionButton
//                   icon={ <AntDesign name="sharealt" size={ 24 } color="#f59e0b" /> }
//                   title="Share Balance"
//                   onPress={ () => router.push( '/share-balance-fluctuation' ) }
//                   color="yellow"
//                 />
//               </View>
//             </View>
//           </Animated.View>

//           {/* Services */ }
//           <Animated.View entering={ FadeInDown.delay( 300 ).duration( 400 ) } className="mx-4 my-2">
//             <View className="bg-white p-4 rounded-xl shadow-md">
//               <Text className="text-lg font-bold mb-4 text-gray-800">Services</Text>
//               <View className="flex-row flex-wrap justify-between">
//                 <QuickActionButton
//                   icon={ <FontAwesome5 name="store" size={ 20 } color="#6366f1" /> }
//                   title="Store Management"
//                   onPress={ () => { } }
//                   color="indigo"
//                 />
//                 <QuickActionButton
//                   icon={ <Ionicons name="information-circle-outline" size={ 24 } color="#8b5cf6" /> }
//                   title="Account Details"
//                   onPress={ () => router.push( '/bank-account' ) }
//                   color="purple"
//                 />
//                 <QuickActionButton
//                   icon={ <FontAwesome5 name="list" size={ 20 } color="#ec4899" /> }
//                   title="Transaction History"
//                   onPress={ () => router.push( '/(tabs)/history' ) }
//                   color="pink"
//                 />
//                 <QuickActionButton
//                   icon={ <EvilIcons name="chart" size={ 30 } color="#0891b2" /> }
//                   title="Statistics"
//                   onPress={ () => router.replace( '/statistics' ) }
//                   color="cyan"
//                 />
//                 <QuickActionButton
//                   icon={ <FontAwesome5 name="money-check" size={ 20 } color="#059669" /> }
//                   title="Renew Service"
//                   onPress={ () => { } }
//                   color="emerald"
//                 />
//                 <QuickActionButton
//                   icon={ <Image source={ require( '../../assets/images/logo-autopay-4.png' ) } className="w-6 h-6" /> }
//                   title="Activate AutoPAY"
//                   onPress={ () => { } }
//                   color="blue"
//                 />
//               </View>
//             </View>
//           </Animated.View>

//           {/* Connected Banks */ }
//           <Animated.View entering={ FadeInDown.delay( 400 ).duration( 400 ) } className="mx-4 my-2 mb-6">
//             <View className="bg-white p-4 rounded-xl shadow-md">
//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-lg font-bold text-gray-800">Connected Banks</Text>
//                 <TouchableOpacity>
//                   <Feather name="plus" size={ 20 } color="#1c40f2" />
//                 </TouchableOpacity>
//               </View>
//               <View className="flex-row flex-wrap justify-between">
//                 { bankData.slice( 0, 6 ).map( ( item ) => (
//                   <TouchableOpacity
//                     key={ item.id }
//                     onPress={ () => console.log( item.name ) }
//                     className="w-[30%] aspect-square items-center justify-center mb-3 bg-gray-50 border border-gray-200 rounded-lg p-2"
//                   >
//                     <Image
//                       source={ { uri: item.logo } }
//                       className="w-full h-[40]"
//                       resizeMode="contain"
//                     />
//                     <Text className="text-xs text-gray-600 mt-1">{ item.name }</Text>
//                   </TouchableOpacity>
//                 ) ) }
//                 { bankData.length > 6 && (
//                   <TouchableOpacity
//                     className="w-[30%] aspect-square items-center justify-center mb-3 bg-gray-50 border border-gray-200 rounded-lg"
//                   >
//                     <Text className="text-sm font-medium text-blue-600">View All</Text>
//                   </TouchableOpacity>
//                 ) }
//               </View>
//             </View>
//           </Animated.View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// }
