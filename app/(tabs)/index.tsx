// import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image, TextInput, Alert, StatusBar, SafeAreaView, Platform, Button } from 'react-native';
// import { useEffect, useState } from 'react';
// import mockBanking from '../../assets/banking.json';
// import MyCard from '@/components/MyCard';
// import { AntDesign, EvilIcons, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { Link, Route, router } from 'expo-router';
// import useHideTabBarOnScroll from '@/hooks/useHideTabbarOnScroll';
// import { Actions } from '@/utils/action';

// export default function Home ()
// {
//   const bankData = mockBanking;

//   const { handleScroll } = useHideTabBarOnScroll();

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//       <SafeAreaView className="flex-1 bg-[#1c40f2]" style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }>
//         <View className="flex-row p-4 items-center justify-between ">
//           <TouchableOpacity onPress={ () => void ( 0 ) } className='ml-2'>
//             <Text className="text-white text-2xl font-bold">⛛ AUTOPAY</Text>
//           </TouchableOpacity>

//           <TouchableOpacity onPress={ () => router.push( '/notificate' ) } className="flex-row items-center relative">
//             <View className="">
//               <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
//             </View>
//             <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
//               <Text className="text-[6px] font-bold text-white">99+</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         <ScrollView
//           contentContainerStyle={ { paddingBottom: 50 } }
//           showsVerticalScrollIndicator={ false }
//           className='bg-slate-50 flex-1'
//           onScroll={ handleScroll }
//           scrollEventThrottle={ 16 }
//         >

//           <View className='py-2'>
//             <MyCard />
//           </View>

//           {/* Action */ }
//           <View className='m-4 bg-white rounded-xl shadow-md border border-gray-200'>
//             <Text className="text-xl font-bold px-4 py-2">Chức năng</Text>
//             <View className="flex-row flex-wrap gap-y-4 pt-2 pb-4">
//               { Actions
//                 .slice() // copy mảng tránh làm thay đổi gốc
//                 .sort( ( a, b ) => a.id - b.id ) // sắp xếp theo id tăng dần
//                 .map( ( item ) => (
//                   <TouchableOpacity key={ item.id } className="items-center w-1/4" onPress={ item.navigate }>
//                     <View
//                       className="p-1 rounded-xl shadow-sm border"
//                       style={ { backgroundColor: item.backgroundColor, borderColor: item.borderColor } }
//                     >
//                       <Image source={ item.icon } className="w-10 h-10" />
//                     </View>
//                     <Text
//                       className="mt-2 text-[11px] font-semibold text-center"
//                       style={ { color: item.color } }
//                     >
//                       { item.name }
//                     </Text>
//                   </TouchableOpacity>
//                 ) ) }

//               <TouchableOpacity className="items-center w-1/4" onPress={ () => void ( 0 ) }>
//                 <View className="p-1 bg-slate-100 border border-slate-300 rounded-xl shadow-sm">
//                   <Image source={ require( '@/assets/images/all.png' ) } className="w-10 h-10" />
//                 </View>
//                 <Text className="mt-2 text-[11px] font-semibold text-center text-slate-600">Tất cả</Text>
//               </TouchableOpacity>
//               {/* -----------------------------------------End----------------------------------------- */ }
//             </View>
//           </View>
//           {/* -----------------------------------------End----------------------------------------- */ }

//           {/* Bank */ }
//           <View className='mx-4 bg-white rounded-xl shadow-md border border-gray-200'>
//             <Text className="text-xl font-bold px-4 py-2">Ngân hàng liên kết</Text>
//             <View className="flex-row flex-wrap justify-between px-2">
//               { bankData.map( ( item ) => (
//                 <TouchableOpacity
//                   key={ item.id }
//                   onPress={ () => console.log( item.name ) }
//                   className="w-[19%] aspect-square items-center justify-center mb-3 border border-gray-400 rounded-md"
//                 >
//                   <Image
//                     source={ { uri: item.logo } }
//                     className="w-full h-[50]"
//                     resizeMode="contain"
//                   />
//                 </TouchableOpacity>
//               ) ) }
//             </View>
//           </View>
//           {/* -----------------------------------------End----------------------------------------- */ }
//         </ScrollView >
//       </SafeAreaView >
//     </>
//   );
// }

import { View, Text, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView, Platform } from 'react-native';
import mockBanking from '../../assets/banking.json';
import MyCard from '@/components/MyCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useHideTabBarOnScroll from '@/hooks/useHideTabbarOnScroll';
import { Actions } from '@/utils/action';
import { useContext } from 'react';
import { ThemeContext } from '@/context/ThemeContext';

export default function Home ()
{
  // Lấy theme & toggleTheme từ context
  const { theme, toggleTheme } = useContext( ThemeContext );
  const isDark = theme === 'dark';
  const bankData = mockBanking;
  const { handleScroll } = useHideTabBarOnScroll();

  return (
    <>
      <StatusBar barStyle={ isDark ? 'light-content' : 'dark-content' } backgroundColor="transparent" translucent />
      <SafeAreaView className={ `${ isDark ? 'bg-black' : 'bg-[#1c40f2]' } flex-1` }
        style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }
      >
        <View className="flex-row p-4 items-center justify-between">
          <TouchableOpacity onPress={ () => void 0 } className="ml-2">
            <Text className="text-white text-2xl font-bold">⛛ AUTOPAY</Text>
          </TouchableOpacity>

          <View className="flex-row items-center">
            {/* Nút chuyển đổi theme */ }
            <TouchableOpacity
              onPress={ toggleTheme }
              className="mr-4 p-2 rounded bg-gray-300 dark:bg-gray-700"
            >
              <MaterialCommunityIcons
                name={ isDark ? 'weather-sunny' : 'weather-night' }
                size={ 24 }
                color={ isDark ? 'yellow' : 'black' }
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => router.push( '/notificate' ) } className="relative">
              <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
              <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
                <Text className="text-[6px] font-bold text-white">99+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={ { paddingBottom: 50 } }
          showsVerticalScrollIndicator={ false }
          className={ `${ isDark ? 'bg-gray-900' : 'bg-slate-50' } flex-1` }
          onScroll={ handleScroll }
          scrollEventThrottle={ 16 }
        >
          <View className="py-2">
            <MyCard />
          </View>

          <View className={ `${ isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } m-4 rounded-xl shadow-md border` } >
            <Text className="text-xl font-bold px-4 py-2 text-black dark:text-white">Chức năng</Text>
            <View className="flex-row flex-wrap gap-y-4 pt-2 pb-4">
              { Actions.sort( ( a, b ) => a.id - b.id ).map( ( item ) => (
                <TouchableOpacity key={ item.id } className="items-center w-1/4" onPress={ item.navigate }>
                  <View
                    className="p-1 rounded-xl shadow-sm border"
                    style={ { backgroundColor: item.backgroundColor, borderColor: item.borderColor } }
                  >
                    <Image source={ item.icon } className="w-10 h-10" />
                  </View>
                  <Text className="mt-2 text-[11px] font-semibold text-center" style={ { color: item.color } }>
                    { item.name }
                  </Text>
                </TouchableOpacity>
              ) ) }
              <TouchableOpacity className="items-center w-1/4" onPress={ () => void 0 }>
                <View className="p-1 bg-slate-100 border border-slate-300 rounded-xl shadow-sm">
                  <Image source={ require( '@/assets/images/all.png' ) } className="w-10 h-10" />
                </View>
                <Text className="mt-2 text-[11px] font-semibold text-center text-slate-600">Tất cả</Text>
              </TouchableOpacity>
            </View>


            <View className={ `${ isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200' } m-4 rounded-xl shadow-md border` }>
              <Text className="text-xl font-bold px-4 py-2 text-black dark:text-white">Ngân hàng liên kết</Text>
              <View className="flex-row flex-wrap justify-between px-2">
                { bankData.map( ( item ) => (
                  <TouchableOpacity
                    key={ item.id }
                    onPress={ () => console.log( item.name ) }
                    className="w-[19%] aspect-square items-center justify-center mb-3 border border-gray-400 rounded-md"
                  >
                    <Image source={ { uri: item.logo } } className="w-full h-[50]" resizeMode="contain" />
                  </TouchableOpacity>
                ) ) }
              </View>
            </View >
            {/* -----------------------------------------End----------------------------------------- */ }
          </View>
        </ScrollView >
      </SafeAreaView >
    </>
  );
}