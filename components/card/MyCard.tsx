import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated, NativeSyntheticEvent, NativeScrollEvent, Image } from 'react-native';
import data from "@/assets/banking-card.json";
import BankingCard from './BankingCard';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useCardStore } from '@/store/useCardStore';


export default function MyCard ()
{
    const bankCard = data;
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    const [ isAtLastCard, setIsAtLastCard ] = useState( false );
    const [ showViewAllButton, setShowViewAllButton ] = useState( false );
    const [ hasStoppedAtLastCard, setHasStoppedAtLastCard ] = useState( false );
    const { setSelectedCard } = useCardStore();
    const flatListRef = useRef<FlatList>( null );
    const cardWidth = 330; //Chiều rộng của card để snap
    const isScrollingRef = useRef( false );//Kiểm tra xem có đang cuộn không
    const extraPadding = 60; //Khoảng trống sau thẻ cuối cùng
    const buttonThreshold = 30; // Ngưỡng vuốt để hiện nút (giảm xuống để dễ hiện nút hơn)


    //sử dụng useCallback để chắc chắn onViewRef không bị thay đổi giữa các render
    const onViewRef = useCallback( ( { viewableItems }: { viewableItems: any[] } ) =>
    {
        // console.log("viewitem: ", viewableItems)
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

    //Lưu card vào zustand
    useEffect( () =>
    {
        const selectedCard = bankCard[ currentCardIndex ];
        const storeCard = async () =>
        {
            try
            {
                await setSelectedCard( selectedCard );
                console.log( "Lưu thẻ ngân hàng thành công!!!" )
            } catch ( error )
            {
                console.error( 'Lưu thẻ thất bại:', error );
            }
        };
        storeCard();
    }, [ currentCardIndex ] );
    //-------------------------------------- END -------------------------------------- //


    // Xem tất cả các banking card
    const handleSeenAllCard = () =>
    {
        router.push( '/bank/list' );
    };
    //-------------------------------------- END -------------------------------------- //

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
    //-------------------------------------- END -------------------------------------- //

    // xử lý khi dừng cuộn
    const handleScrollEnd = () =>
    {
        isScrollingRef.current = false;

        if ( isAtLastCard )
        {
            setHasStoppedAtLastCard( true );
        }
    };
    //-------------------------------------- END -------------------------------------- //

    // Animations for the "See all" button and the arrow
    const fadeAnim = useRef( new Animated.Value( 0 ) ).current;
    const slideAnim = useRef( new Animated.Value( 20 ) ).current; // For button slide in
    useEffect( () =>
    {
        if ( showViewAllButton )
        {
            Animated.sequence( [
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

        }
    }, [ showViewAllButton ] );
    //-------------------------------------- END -------------------------------------- //

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
    //-------------------------------------- END -------------------------------------- //

    //Hàm render dot
    // const renderDotIndicator = useCallback( () => (
    //     <View className='h-[24px] items-center justify-center'>
    //         <View className="flex-row justify-center items-center">
    //             { bankCard.map( ( _, index ) => (
    //                 <View
    //                     key={ index }
    //                     className={ `mx-1 rounded-full ${ currentCardIndex === index
    //                         ? 'bg-black w-6 h-2'
    //                         : 'border-2 w-2 h-2'
    //                         }` }
    //                 />
    //             ) ) }
    //         </View>
    //     </View>
    // ), [ bankCard.length, currentCardIndex ] );
    //-------------------------------------- END -------------------------------------- //

    return (
        <View>
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


                {/* Button "Xem tất cả" */ }
                <Animated.View
                    style={ {
                        position: 'absolute',
                        right: 5,
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
                        className="items-center justify-center h-[180px] w-[120px]"
                    >
                        <View className="items-center">
                            <View className="bg-white/20 rounded-full p-3 mb-1">
                                <Ionicons name="card-outline" size={ 24 } color="white" />
                            </View>
                            <Text className="text-white font-semibold text-[10px] text-center">Xem tất cả thẻ</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>
            </View>
            {/* -----------------------------------------End----------------------------------------- */ }

            {/* Active dot */ }
            {/* { renderDotIndicator() } */ }
            {/* -----------------------------------------End----------------------------------------- */ }
        </View>
    );
}
