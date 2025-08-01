import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useFabStore } from "@/store/useFABStore";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolate, Easing } from "react-native-reanimated";
import ActionFAB from "@/components/button/ActionFAB";

export default function FABMenu ()
{
    const open = useFabStore( ( state ) => state.isOpen );
    const setOpen = useFabStore( ( state ) => state.setOpen );

    const progress = useSharedValue( 0 );

    useEffect( () =>
    {
        progress.value = withTiming( open ? 1 : 0, {
            duration: 300,
            easing: Easing.out( Easing.exp ),
        } );
    }, [ open ] );
    //-------------------------------------- END -------------------------------------- //

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
    //-------------------------------------- END -------------------------------------- //

    const iconListStyle = useAnimatedStyle( () => ( {
        opacity: interpolate( progress.value, [ 0, 1 ], [ 1, 0 ] ),
    } ) );


    const iconCloseStyle = useAnimatedStyle( () => ( {
        opacity: interpolate( progress.value, [ 0, 1 ], [ 0, 1 ] ),
        position: "absolute"
    } ) );

    const toggleMenu = () => setOpen( !open );

    return (
        <View className="items-end space-y-3">
            { open && (
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
            ) }

            {/* FAB chính */ }
            <TouchableOpacity
                onPress={ toggleMenu }
                className="p-4 bg-[#505678] rounded-full justify-center items-center"
            >
                <Animated.View style={ rotateStyle }>
                    {/* Icon list */ }
                    <Animated.Image
                        source={ require( "@/assets/images/menu-white.png" ) }
                        className="w-5 h-5"
                        resizeMode="contain"
                        style={ iconListStyle }
                    />
                    {/* Icon close (X) */ }
                    <Animated.Image
                        source={ require( "@/assets/images/plus-white.png" ) }
                        className="w-5 h-5"
                        resizeMode="contain"
                        style={ iconCloseStyle }
                    />
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
}
