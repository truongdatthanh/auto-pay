import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, ViewToken, TouchableOpacity } from 'react-native';
import data from "../assets/banking-card.json"
import BankingCard from './BankCard';
import Chart from '@/app/test/chart';
import { router } from 'expo-router';

export default function MyCard ()
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

    const handleSeenAllCard = () =>
    {
        router.push( '/bank-account/listCard' );
    };

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
                contentContainerStyle={ { paddingHorizontal: 20 } } // khoảng cách giữa các item
            />

            <TouchableOpacity className='p-4 flex-row justify-end' onPress={ handleSeenAllCard }>
                <Text className='text-blue-500 font-semibold text-sm'>
                    Xem tất cả
                </Text>
            </TouchableOpacity>

            <View className='bg-blue-200 rounded-xl mx-2'>
                <Chart id={ bankCard[ currentCardIndex ].id } />
            </View>


        </View>
    );
};

