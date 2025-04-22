import BankingCard from '@/components/BankCard';
import { View, Text, FlatList, ScrollView, Dimensions, Animated } from 'react-native';
import mockBankCard from '../../assets/banking-card.json'
import { useState } from 'react';
import ImageSlider from '@/components/ImageSlider';
import Chart from '../chart';


export default function Home ()
{
  const [ data, setData ] = useState( mockBankCard );
  console.log( data );
  const { width: screenWidth } = Dimensions.get( 'window' );
  console.log( screenWidth );
  const cardWidth = 300;
  const sidePadding = ( screenWidth - cardWidth ) / 2;
  console.log( sidePadding );

  return (
    <View className="flex-1">
      <View className='mb-2 bg-#ccc'>
        <ImageSlider />
      </View>
      <View className="h-300 bg-blue-300 py-2 shadow-md">
        <ScrollView
          horizontal={ true }
          showsHorizontalScrollIndicator={ false }
          contentContainerStyle={ { paddingLeft: 45 } }
          snapToInterval={ 300 }
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

        <Chart />
      </View>
    </View>
  );
}

