import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import MyCard from '@/components/card/MyCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import QuickActions from '@/components/action/QuickActions';
import TransactionList from '@/components/transaction/TransactionList';
import BankingList from '@/components/banking/BankingList';

export default function Home ()
{
  console.log( "Home mouted" );
  return (
    <>
      <StatusBar style='light' />
      {/* Container */ }
      <View className='flex-1 bg-black overflow-hidden'>
        {/* Header */ }
        <View className="flex-row p-4 pt-8 items-center justify-between">
          <TouchableOpacity onPress={ () => void ( 0 ) } className='ml-1 flex-1'>
            <Text className="text-white text-2xl font-bold ">⛛ AUTOPAY</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => router.push( '/notification' ) } className="flex-row items-center relative">
            <View className="">
              <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
            </View>
            <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
              <Text className="text-[6px] font-bold text-white">99+</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={ () => router.push( '/user' ) } className="p-2 bg-white/20 rounded-full ml-4">
            <Image source={ require( "@/assets/images/user-white.png" ) } className='h-6 w-6' resizeMode='contain' />
          </TouchableOpacity>
        </View>

        {/* Content */ }
        <ScrollView
          //contentContainerStyle={ { paddingBottom: 100 } }
          showsVerticalScrollIndicator={ false }
          className='bg-[#cbd5e1] flex-1'
          scrollEventThrottle={ 16 }
        >
          {/* Header Card Section */ }
          <View className='py-2'>
            <MyCard />
          </View>

          <View className='bg-[#f9fafb] mt-10 gap-8 rounded-t-xl shadow-md border border-gray-300 pb-32'>
            <View className='-mt-10'>
              <QuickActions />
            </View>
            <TransactionList />
            <BankingList />
          </View>
        </ScrollView >
      </View>
    </>
  );
}
