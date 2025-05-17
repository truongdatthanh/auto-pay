//#region code chuẩn cơm mẹ nấu
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import data from "../assets/banking-card.json";
import BankingCard from './BankCard';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BarCharts from './BarChart';
import { Ionicons } from '@expo/vector-icons';

export default function MyCard ()
{
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    const [ isAtLastCard, setIsAtLastCard ] = useState( false );
    const [ showViewAllButton, setShowViewAllButton ] = useState( false );
    const [ hasStoppedAtLastCard, setHasStoppedAtLastCard ] = useState( false );
    const bankCard = data;
    const flatListRef = useRef<FlatList>( null );
    const cardWidth = 330; //Chiều rộng của card để snap
    const isScrollingRef = useRef( false );//Kiểm tra xem có đang cuộn không
    const extraPadding = 60; //Khoảng trống sau thẻ cuối cùng
    const buttonThreshold = 30; // Ngưỡng vuốt để hiện nút (giảm xuống để dễ hiện nút hơn)


    //sử dụng useCallback để chắc chắn onViewRef không bị thay đổi giữa các render
    const onViewRef = useCallback( ( { viewableItems }: { viewableItems: any[] } ) =>
    {
        if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
        {
            const index = viewableItems[ 0 ].index ?? 0;
            setCurrentCardIndex( index );

            //kiểm tra xem có phải thẻ cuối cùng không
            const isLast = index === bankCard.length - 1;
            setIsAtLastCard( isLast );

            // nếu đã dừng ở thẻ cuối cùng, đánh dấu đã dừng
            if ( isLast && !isScrollingRef.current )
            {
                setHasStoppedAtLastCard( true );
            }

            // nếu không phải thẻ cuối cùng, reset các trạng thái
            if ( !isLast )
            {
                setShowViewAllButton( false );
                setHasStoppedAtLastCard( false );
            }
        }
    }, [ bankCard.length ] );

    // Config cho FlatList
    const viewabilityConfig = {
        viewAreaCoveragePercentThreshold: 50, // Card sẽ được tính là đang focus khi hiển thị trên 50% diện tích
    };

    // Lưu card được chọn vào AsyncStorage
    useEffect( () =>
    {
        const selectedCard = bankCard[ currentCardIndex ];
        const storeCard = async () =>
        {
            try
            {
                await AsyncStorage.setItem( 'selectedCard', JSON.stringify( selectedCard ) );
                console.log( 'Lưu thẻ vào AsyncStorage:', selectedCard.bankName );
            } catch ( error )
            {
                console.error( 'Lưu thẻ thất bại:', error );
            }
        };
        storeCard();
    }, [ currentCardIndex ] );

    // Xem tất cả các banking card
    const handleSeenAllCard = () =>
    {
        router.push( '/bank-account/list-card' );
    };

    // xử lý khi cuộn
    const handleScroll = ( event: NativeSyntheticEvent<NativeScrollEvent> ) =>
    {

        isScrollingRef.current = true;

        //kiểm tra xem có phải thẻ cuối cùng và đã dừng ở thẻ cuối cùng trước đó không
        if ( isAtLastCard && hasStoppedAtLastCard )
        {
            const offsetX = event.nativeEvent.contentOffset.x;
            const lastCardPosition = cardWidth * ( bankCard.length - 1 );
            const extraScrollDistance = offsetX - lastCardPosition;

            // hiển thị nút khi người dùng đã kéo thêm một chút
            if ( extraScrollDistance >= buttonThreshold )
            {
                setShowViewAllButton( true );
            } else
            {
                setShowViewAllButton( false );
            }
        }
    };

    // xử lý khi dừng cuộn
    const handleScrollEnd = () =>
    {
        isScrollingRef.current = false;

        if ( isAtLastCard )
        {
            setHasStoppedAtLastCard( true );
        }
    };

    // Animations for the "See all" button and the arrow
    const fadeAnim = useRef( new Animated.Value( 0 ) ).current;
    const slideAnim = useRef( new Animated.Value( 20 ) ).current; // For button slide in
    const arrowAnim = useRef( new Animated.Value( 0 ) ).current; // For arrow opacity

    useEffect( () =>
    {
        if ( showViewAllButton )
        {
            // Animate arrow first, then show the button
            Animated.sequence( [
                Animated.timing( arrowAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                } ),
                Animated.timing( fadeAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                } )
            ] ).start();
        } else
        {
            Animated.timing( fadeAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            } ).start();
            Animated.timing( arrowAnim, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            } ).start();
        }
    }, [ showViewAllButton ] );

    // tự động snap về thẻ cuối cùng nếu người dùng kéo quá xa mà không đủ để hiện nút
    const handleScrollEndDrag = ( event: NativeSyntheticEvent<NativeScrollEvent> ) =>
    {
        handleScrollEnd();

        if ( isAtLastCard )
        {
            const offsetX = event.nativeEvent.contentOffset.x;
            const lastCardPosition = cardWidth * ( bankCard.length - 1 );
            const extraScrollDistance = offsetX - lastCardPosition;

            // If the scroll is not enough to show the button, snap to the last card
            if ( extraScrollDistance > 0 && extraScrollDistance < buttonThreshold )
            {
                flatListRef.current?.scrollToOffset( { offset: lastCardPosition, animated: true } );
            }
        }
    };

    return (
        <View className="flex-1">
            <View className="relative">
                <FlatList
                    ref={ flatListRef }
                    data={ bankCard }
                    horizontal
                    pagingEnabled={ false }
                    showsHorizontalScrollIndicator={ false }
                    keyExtractor={ ( item ) => item.id }
                    snapToInterval={ cardWidth }
                    snapToAlignment="center"
                    onScroll={ handleScroll }
                    onMomentumScrollEnd={ handleScrollEnd }
                    onScrollEndDrag={ handleScrollEndDrag }
                    scrollEventThrottle={ 16 }
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
                    contentContainerStyle={ {
                        paddingHorizontal: 16,
                        paddingRight: isAtLastCard ? 20 + extraPadding : 20,
                    } }
                />
                {/* -----------------------------------------End----------------------------------------- */ }

                {/* Animated Arrow */ }
                <Animated.View
                    style={ {
                        position: 'absolute',
                        right: 20,
                        top: 0,
                        bottom: 0,
                        opacity: arrowAnim,
                        transform: [
                            {
                                translateY: arrowAnim.interpolate( {
                                    inputRange: [ 0, 1 ],
                                    outputRange: [ 20, 0 ],
                                } ),
                            },
                        ],
                    } }
                >
                    <View className='bg-white/20 rounded-full p-4 ml-4'>
                        <Ionicons name="arrow-forward" size={ 24 } color="white" />
                    </View>
                </Animated.View>

                {/* Button "Xem tất cả" */ }
                <Animated.View
                    style={ {
                        position: 'absolute',
                        right: 20,
                        top: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        opacity: fadeAnim,
                        transform: [
                            {
                                translateX: slideAnim,
                            },
                        ],
                    } }
                    pointerEvents={ showViewAllButton ? 'auto' : 'none' }
                >
                    <TouchableOpacity
                        onPress={ handleSeenAllCard }
                        className="items-center justify-center bg-blue-50 rounded-2xl h-[180px] w-[120px]"
                    >
                        <View className="items-center">
                            <View className="bg-blue-100 rounded-full p-3 mb-3">
                                <Ionicons name="card-outline" size={ 24 } color="#1c40f2" />
                            </View>
                            <Text className="text-blue-600 font-medium text-sm text-center">Xem tất cả thẻ</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            {/* -----------------------------------------End----------------------------------------- */ }

            {/* Active dot */ }
            <View className='h-[24px] items-center justify-center'>
                <View className="flex-row justify-center items-center">
                    { bankCard.map( ( _, index ) => (
                        <View
                            key={ index }
                            className={ `mx-1 rounded-full ${ currentCardIndex === index ? 'bg-blue-500 w-6 h-2' : 'bg-gray-500 w-2 h-2' }` }
                        />
                    ) ) }
                </View>
            </View>
            {/* -----------------------------------------End----------------------------------------- */ }


            {/* Bar Chart */ }
            {/* <View className='mx-5 bg-white rounded-2xl shadow-xl mt-2'>
                <BarCharts id={ bankCard[ currentCardIndex ].id } />
            </View> */}
        </View>
    );
}
//#endregion

