import React, { useRef, useState } from 'react';
import { View, Text, FlatList, Dimensions, ViewToken } from 'react-native';

const { width } = Dimensions.get( 'window' );

const BankCardCarousel = () =>
{
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );// index của card đang active

    const viewabilityConfig = useRef( {
        viewAreaCoveragePercentThreshold: 50, // card phải hiển thị >50% mới tính là active, viewAreaCoveragePercentThreshold: vùng nhìn của card
    } );

    const onViewRef = useRef( ( { viewableItems }: { viewableItems: ViewToken[] } ) =>
    {
        if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
        {
            setCurrentCardIndex( viewableItems[ 0 ].index );
        }
    } );

    const bankCards = [
        { id: '1', bankName: 'Bank A', cardNumber: '**** **** **** 1234' },
        { id: '2', bankName: 'Bank B', cardNumber: '**** **** **** 5678' },
        { id: '3', bankName: 'Bank C', cardNumber: '**** **** **** 9101' },
    ];

    return (
        <View style={ { flex: 1 } }>
            <FlatList
                data={ bankCards }
                horizontal //kích hoạt cuồn ngang
                pagingEnabled // tự động cuộn đến card gần nhất
                showsHorizontalScrollIndicator={ false } // ẩn thanh cuộn ngang
                keyExtractor={ ( item ) => item.id }
                renderItem={ ( { item } ) => (
                    <View style={ { width, alignItems: 'center', justifyContent: 'center' } }>
                        <View style={ {
                            width: width * 0.8,// chiều rộng của card
                            height: 200,// chiều cao của card
                            backgroundColor: '#4A90E2',
                            borderRadius: 20,
                            padding: 20,
                            alignItems: 'center',
                        } }
                        >
                            <Text style={ { color: '#fff', fontSize: 20 } }>{ item.bankName }</Text>
                            <Text style={ { color: '#fff', fontSize: 16 } }>{ item.cardNumber }</Text>
                        </View>
                    </View>
                ) }
                onViewableItemsChanged={ onViewRef.current }// hàm gọi khi có item được hiển thị
                viewabilityConfig={ viewabilityConfig.current }// Sử dụng để xác định các item nào đang hiển thị
            />

            {/* Thông tin chi tiết của card đang active */ }
            <View style={ { padding: 20 } }>
                <Text>Hiển thị thông tin card đang active:</Text>
                <Text style={ { fontWeight: 'bold' } }>{ bankCards[ currentCardIndex ].bankName }</Text>
                <Text>{ bankCards[ currentCardIndex ].cardNumber }</Text>
            </View>
        </View>
    );
};

export default BankCardCarousel;
