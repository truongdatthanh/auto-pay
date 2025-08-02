import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useFabStore } from "@/store/useFABStore";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Easing, runOnJS } from "react-native-reanimated";
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import FloatingActionItem from "@/components/fab/FloatingActionItem";


// Nút Floating chính
export default function FloatingActionButton ()
{
    const open = useFabStore( ( state ) => state.isOpen );
    const setOpen = useFabStore( ( state ) => state.setOpen );
    const { offsetX: storeX, offsetY: storeY, setOffset } = useFabStore();
    const [ isActive, setIsActive ] = useState( false );

    // useSharedValue là một hook đặc biệt của thư viện react - native - reanimated dùng để:
    // Tạo ra một biến động( reactive value ) có thể được dùng bên trong các animation hoặc gesture, mà không gây re - render React component.
    const progress = useSharedValue( 0 );
    const offsetX = useSharedValue( storeX );
    const offsetY = useSharedValue( storeY );
    const savedOffsetX = useSharedValue( storeX );
    const savedOffsetY = useSharedValue( storeY );

    useEffect( () =>
    {
        progress.value = withTiming( open ? 1 : 0, {
            duration: 300,
            easing: Easing.out( Easing.exp ),
        } );
    }, [ open ] );

    // Function to toggle menu (wrapped for runOnJS)
    // để xử lý gesture không phải crash app 
    // JS thread và UI thread (1)
    // Để có thể chạy được JS trong UI thread phải dùng runOnJS
    const toggleMenuJS = () =>
    {
        setOpen( !open );
    };

    // Drag gesture
    const dragGesture = Gesture.Pan()
        .onStart( () =>
        {
            offsetX.value = savedOffsetX.value;
            offsetY.value = savedOffsetY.value;
            runOnJS( setIsActive )( true )
        } )
        .onUpdate( ( e ) =>
        {
            offsetX.value = savedOffsetX.value + e.translationX;
            offsetY.value = savedOffsetY.value + e.translationY;
        } )
        .onEnd( () =>
        {
            savedOffsetX.value = offsetX.value;
            savedOffsetY.value = offsetY.value;
            runOnJS( setIsActive )( false )
            runOnJS( setOffset )( offsetX.value, offsetY.value ); // lưu lại vị trí
        } );

    // Tap gesture - use runOnJS for safe state update
    const tapGesture = Gesture.Tap()
        .onEnd( () =>
        {
            runOnJS( toggleMenuJS )();
        } );

    // Combine gestures
    // Gesture.Race() - dùng kết hợp nhiều gesture lại theo thứ tự [0, 1, ...] 
    // gesture nào đứng trước sẽ được xử lý trước
    const composedGesture = Gesture.Race( dragGesture, tapGesture );

    const rotateStyle = useAnimatedStyle( () =>
    {
        return {
            transform: [
                {
                    rotate: `${ interpolate( progress.value, [ 0, 1 ], [ 0, 45 ] ) }deg`,
                },
                {
                    scale: withTiming( open ? 1.1 : 1, { duration: 200 } ),
                },
            ],
        };
    } );

    const iconListStyle = useAnimatedStyle( () => ( {
        opacity: interpolate( progress.value, [ 0, 1 ], [ 1, 0 ] ),
    } ) );

    const iconCloseStyle = useAnimatedStyle( () => ( {
        opacity: interpolate( progress.value, [ 0, 1 ], [ 0, 1 ] ),
        position: "absolute"
    } ) );

    // Animated style for dragging
    const dragAnimatedStyle = useAnimatedStyle( () => ( {
        transform: [
            { translateX: offsetX.value },
            { translateY: offsetY.value },
        ],
    } ) );

    const toggleMenu = () => setOpen( !open );

    return (
        <View style={ { position: 'absolute', bottom: 80, right: 20, zIndex: 1100 } }>
            <Animated.View style={ [ dragAnimatedStyle ] }>
                <View className="items-end space-y-3">
                    { open && (
                        <View className="gap-4 mb-4">
                            <FloatingActionItem
                                label="Thống kê"
                                icon={ require( "@/assets/images/fluctuation_white.png" ) }
                                url="/statistics"
                                toggleMenu={ toggleMenu }
                                index={ 1 }
                            />
                            <FloatingActionItem
                                label="Biến động số dư"
                                icon={ require( "@/assets/images/spreadsheet-app_white.png" ) }
                                url="/balance/fluctuation"
                                toggleMenu={ toggleMenu }
                                index={ 0 }
                            />
                        </View>
                    ) }

                    {/* FAB chính với gesture */ }
                    <GestureDetector gesture={ composedGesture }>
                        <Animated.View className={ `p-4 rounded-full justify-center items-center border border-gray-600 ${ isActive ? "bg-black" : "bg-black/50" }` }>
                            <Animated.View style={ rotateStyle }>
                                {/* Icon list */ }
                                <Animated.Image
                                    source={ require( "@/assets/images/menu-white.png" ) }
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                    style={ iconListStyle }
                                />
                                {/* Icon close (X) */ }
                                <Animated.Image
                                    source={ require( "@/assets/images/plus-white.png" ) }
                                    className="w-6 h-6"
                                    resizeMode="contain"
                                    style={ iconCloseStyle }
                                />
                            </Animated.View>
                        </Animated.View>
                    </GestureDetector>
                </View>
            </Animated.View>
        </View >
    );
}

