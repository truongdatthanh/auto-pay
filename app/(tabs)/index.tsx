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
import QuickActionGrid from '@/components/QuickActionGrid';
import BankCardCarousel from '../test/bankcardActive';
import MyCard from '@/components/MyCard';

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
  const [ bankData, setBankData ] = useState( mockBanking );

  return (
    <ScrollView
      contentContainerStyle={ { paddingBottom: 100 } }
      showsVerticalScrollIndicator={ false }
      className='bg-white flex-1'
    >
      {/* <View className='mb-2 bg-white'>
        <ImageSlider />
      </View> */}


      <View className='py-4'>
        <MyCard />
      </View>


      <QuickActionGrid />

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

