import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Dimensions, ViewToken, TouchableOpacity } from 'react-native';
import data from "../assets/banking-card.json"
import BankingCard from './BankCard';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarCharts from './BarChart';

export default function MyCard ()
{
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    const bankCard = data;

    // Đảm bảo viewability callback không bị thay đổi giữa các render
    const onViewRef = useCallback( ( { viewableItems }: { viewableItems: ViewToken[] } ) =>
    {
        if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
        {
            setCurrentCardIndex( viewableItems[ 0 ].index ?? 0 );
        }
    }, [] );

    //Config cho FlatList
    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50,//thẻ chỉ cần hiển thị khoản 50% diện tích sẽ được tính là đang focus
    };

    // Khi currentCardIndex thay đổi => lưu lại card tương ứng
    useEffect( () =>
    {
        const selectedCard = bankCard[ currentCardIndex ];
        const storeCard = async () =>
        {
            try
            {
                await AsyncStorage.setItem( 'selectedCard', JSON.stringify( selectedCard ) );
                console.log( 'Lưu card:', selectedCard.bankName );
            } catch ( error )
            {
                console.error( 'Lỗi khi lưu selectedCard:', error );
            }
        };
        storeCard();
    }, [ currentCardIndex ] );

    //Hàm xem tất cả các banking card
    const handleSeenAllCard = () =>
    {
        router.push( '/bank-account/listCard' );
    };

    return (
        <View className='flex-1 bg-white'>
            <FlatList
                data={ bankCard }
                horizontal//kích hoạt cuộn ngang
                pagingEnabled
                showsHorizontalScrollIndicator={ false }
                keyExtractor={ ( item ) => item.id }
                snapToInterval={ 330 }
                snapToAlignment='center'
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
                onViewableItemsChanged={ onViewRef }
                viewabilityConfig={ viewabilityConfig }
                contentContainerStyle={ { paddingHorizontal: 20 } }
            />

            {/* active dot */ }
            <View className='flex-row justify-between gap-4'>
                <Text></Text>
                <View className="flex-row justify-center items-center my-2 ml-8">
                    { bankCard.map( ( _, index ) => (
                        <View
                            key={ index }
                            className={ `mx-1 rounded-full ${ currentCardIndex === index ? 'bg-blue-500 w-4 h-2' : 'bg-red-500 w-2 h-2' }` }
                        />
                    ) ) }
                </View>

                {/* xem tất cả các banking card */ }
                <TouchableOpacity className='p-2' onPress={ handleSeenAllCard }>
                    <Text className='bg-black rounded-full p-[5px] text-blue-500 font-semibold text-sm'>
                        Xem tất cả
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Bảng thống kê dạng cột */ }
            <View className='bg-blue-200 rounded-xl mx-2'>
                <BarCharts id={ bankCard[ currentCardIndex ].id } />
            </View>
        </View>
    );
}


