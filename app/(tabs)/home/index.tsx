
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { FlatList } from 'react-native';
import MyCard from '@/components/card/MyCard';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import QuickActions from '@/components/action/QuickActions';
import TransactionList from '@/components/transaction/TransactionList';

export default function Home ()
{
  console.log( "Home mounted" );

  // Dữ liệu cho FlatList, mỗi phần là một mục
  const sections = [
    { id: 'card', component: <MyCard /> },
    { id: 'quick-actions', component: <QuickActions /> },
    { id: 'transactions', component: <TransactionList /> },
  ];

  return (
    <>
      <StatusBar style="light" />
      {/* Container */ }
      <View className="flex-1 bg-black overflow-hidden">
        {/* Header */ }
        <View className="flex-row p-4 pt-8 items-center justify-between">
          <Text className="text-white text-2xl leading-none font-bold">⛛ AUTOPAY</Text>
          <View className="flex-row gap-4 items-center justify-center">
            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => router.push( '/notification' ) }
              className="flex-row items-center relative"
              accessibilityLabel="Xem thông báo"
            >
              <View className="relative h-8 w-8 items-center justify-center">
                <Image
                  source={ require( '@/assets/images/bell.png' ) }
                  className="w-7 h-7"
                  resizeMode="contain"
                />
                <View className="bg-red-500 h-3 w-3 rounded-full absolute z-10 top-0.5 right-1" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => router.push( '/user' ) }
              accessibilityLabel="Xem thông tin người dùng"
            >
              <View className="relative h-8 w-8 items-center justify-center">
                <Image
                  source={ require( '@/assets/images/user-white.png' ) }
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */ }
        <View className='bg-[#cbd5e1]'>
          <FlatList
            data={ sections }
            renderItem={ ( { item } ) => (
              <View className={ item.id === 'transactions' ? 'bg-[#f9fafb] flex-1 rounded-t-xl shadow-md border border-gray-300 pb-32' : 'py-2' }>
                { item.component }
              </View>
            ) }
            keyExtractor={ ( item ) => item.id }
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={ { paddingBottom: 100 } }
          />
        </View>
      </View>
    </>
  );
}




// import { View, Text, ScrollView, TouchableOpacity, Image, Pressable } from 'react-native';
// import MyCard from '@/components/card/MyCard';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import QuickActions from '@/components/action/QuickActions';
// import TransactionList from '@/components/transaction/TransactionList';

// export default function Home ()
// {
//   console.log( "Home mouted" );
//   return (
//     <>
//       <StatusBar style='light' />
//       {/* Container */ }
//       <View className='flex-1 bg-black overflow-hidden'>
//         {/* Header */ }
//         <View className="flex-row p-4 pt-8 items-center justify-between">
//           {/* <View className=' border border-red-500 flex-row'> */ }
//           <Text className="text-white text-2xl leading-none font-bold">⛛ AUTOPAY</Text>
//           <View className='flex-row gap-2 items-center justify-center'>
//             <TouchableOpacity activeOpacity={ 0.7 } onPress={ () => router.push( '/notification' ) } className="flex-row items-center relative ">
//               <View className="relative h-8 w-8 items-center justify-center">
//                 <Image source={ require( "@/assets/images/bell.png" ) } className='w-7 h-8' resizeMode='contain' />
//                 <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-0.5 right-0.5">
//                   <Text className="text-[6px] font-bold text-white">99+</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity activeOpacity={ 0.7 } onPress={ () => router.push( '/user' ) }>
//               <View className="relative h-8 w-8 items-center jusity-center">
//                 <Image source={ require( "@/assets/images/user-white.png" ) } className='w-7 h-8' resizeMode='contain' />
//               </View>
//             </TouchableOpacity>
//           </View>
//           {/* </View> */ }
//         </View>

//         {/* Content */ }
//         <ScrollView
//           //contentContainerStyle={ { paddingBottom: 100 } }
//           showsVerticalScrollIndicator={ false }
//           className='bg-[#cbd5e1] flex-1'
//           scrollEventThrottle={ 16 }
//         >
//           {/* Header Card Section */ }
//           <View className='py-2'>
//             <MyCard />
//           </View>

//           <View className='bg-[#f9fafb] mt-10 gap-8 rounded-t-xl shadow-md border border-gray-300 pb-32'>
//             <View className='-mt-10'>
//               <QuickActions />
//             </View>
//             <TransactionList />
//             {/* <BankingList /> */ }
//           </View>
//         </ScrollView >
//       </View>
//     </>
//   );
// }