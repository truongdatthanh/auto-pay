import React, { useRef, useState } from 'react';

import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ViewToken } from 'react-native';
import data from "../../../assets/banking-card.json"
import BankingCard from '@/components/BankCard';
import LineCharts from '@/app/test/lineChart';
export default function BankAccountDetail ()
{
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    const bankCard = data;

    const viewabilityConfig = useRef( {
        viewAreaCoveragePercentThreshold: 50,
    } );

    const onViewRef = useRef( ( { viewableItems }: { viewableItems: ViewToken[] } ) =>
    {
        if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
        {
            setCurrentCardIndex( viewableItems[ 0 ].index ?? 0 );
        }
    } );

    return (
        <View className='flex-1 bg-white'>
            <FlatList
                data={ bankCard }
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={ false }
                keyExtractor={ ( item ) => item.id }
                snapToInterval={ 330 } // khoảng cách giữa các item
                snapToAlignment='center' // căn giữa item
                renderItem={ ( { item } ) => (
                    <View className="items-center justify-center" style={ { marginRight: 10 } }>
                        <BankingCard
                            key={ item.id }
                            id={ item.id }
                            STK={ item.STK }
                            name={ item.name }
                            logoBanking={ item.logoBanking }
                            bankName={ item.bankName }
                        />
                    </View>
                ) }
                onViewableItemsChanged={ onViewRef.current }
                viewabilityConfig={ viewabilityConfig.current }
                contentContainerStyle={ { paddingHorizontal: 20 } }
            />

            <View className='bg-blue-200 rounded-xl p-4 mb-24'>
                <LineCharts id={ bankCard[ currentCardIndex ].id } />
            </View>
        </View>
    );
};


