import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFabStore } from "@/store/useFABStore";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, interpolate, Easing} from "react-native-reanimated";
import ActionFAB from "@/components/button/ActionFAB";

export default function FABMenu ()
{
    const open = useFabStore( state => state.isOpen );
    const setOpen = useFabStore( state => state.setOpen );

    // shared value để điều khiển animation
    const progress = useSharedValue( 0 );

    // Khi open thay đổi thì chạy animation progress
    useEffect( () =>
    {
        progress.value = withTiming( open ? 1 : 0, { duration: 300, easing: Easing.out( Easing.exp ) } );
    }, [ open ] );

    // animation cho nút + / x (xoay và thay đổi icon)
    const animatedIconStyle = useAnimatedStyle( () =>
    {
        return {
            transform: [
                { rotate: `${ interpolate( progress.value, [ 0, 1 ], [ 0, 45 ] ) }deg` }, // xoay 45 độ khi mở
                { scale: withTiming( open ? 1.1 : 1, { duration: 200 } ) }, // phóng to nhẹ khi mở
            ],
        };
    } );


    const toggleMenu = () => setOpen( !open );

    return (
        <View className="items-end space-y-3">
            { open && (
                <>
                    <View className="gap-4 mb-4">
                        <ActionFAB
                            label="Thống kê"
                            icon={ require( "@/assets/images/fluctuation_white.png" ) }
                            url="/statistics"
                            toggleMenu={ toggleMenu }
                            index={ 1 }
                        />
                        <ActionFAB
                            label="Biến động số dư"
                            icon={ require( "@/assets/images/spreadsheet-app_white.png" ) }
                            url="/balance/fluctuation"
                            toggleMenu={ toggleMenu }
                            index={ 0 }
                        />
                    </View>
                </>
            ) }

            {/* Nút FAB chính */ }
            <TouchableOpacity
                onPress={ toggleMenu }
                className="w-14 h-14 bg-[#6b21a8] rounded-xl justify-center items-center shadow-lg"
            >
                <Animated.View style={ animatedIconStyle }>
                    <Ionicons name="add" size={ 28 } color="white" />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}


