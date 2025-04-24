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

      <QuickActionGrid  />

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

