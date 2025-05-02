import { View, Text, FlatList, ScrollView, Dimensions, TouchableOpacity, Image, TextInput } from 'react-native';
import mockBankCard from '../../assets/banking-card.json'
import { useEffect, useState } from 'react';
import mockBanking from '../../assets/banking.json';
import QuickActionGrid from '@/components/QuickActionGrid';
import MyCard from '@/components/MyCard';


export default function Home ()
{
  const [ bankData, setBankData ] = useState( mockBanking );

  return (
    <ScrollView
      contentContainerStyle={ { paddingBottom: 100 } }
      showsVerticalScrollIndicator={ false }
      className='bg-white flex-1'
    >

      <View className='py-4'>
        <MyCard />
      </View>

      <QuickActionGrid />

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
  );
}

