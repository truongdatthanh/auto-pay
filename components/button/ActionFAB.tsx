import { Route, router } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import { useEffect } from "react";

interface ActionFABProps
{
    url: Route;
    label: string;
    icon: ImageSourcePropType; 
    toggleMenu: () => void;
    index: number;
}

export default function ActionFAB ( { url, label, icon, toggleMenu, index }: ActionFABProps )
{
    const opacity = useSharedValue( 0 );
    const translateY = useSharedValue( 20 );
    const translateLabelX = useSharedValue( 30 );

    useEffect( () =>
    {
        opacity.value = withDelay( index * 100, withTiming( 1, { duration: 300 } ) );
        translateY.value = withDelay( index * 100, withTiming( 0, { duration: 300, easing: Easing.out( Easing.exp ) } ) );
        translateLabelX.value = withDelay( index * 100, withTiming( 0, { duration: 300 } ) );
    }, [] );

    const containerStyle = useAnimatedStyle( () => ( {
        opacity: opacity.value,
        transform: [ { translateY: translateY.value } ],
    } ) );

    const labelStyle = useAnimatedStyle( () => ( {
        transform: [ { translateX: translateLabelX.value } ],
    } ) );

    const handlePress = () =>
    {
        toggleMenu();
        router.push( url );
    };

    return (
        <Animated.View style={ containerStyle }>
            <TouchableOpacity onPress={ handlePress } className="flex-row items-center justify-end space-x-2">
                <Animated.View style={ labelStyle } className="bg-white/20 rounded-full h-12 justify-center px-4 mr-2">
                    <Text className="text-white">{ label }</Text>
                </Animated.View>
                <View className="bg-white/20 p-4 rounded-full">
                    <Image source={ icon } className="w-5 h-5" resizeMode="contain" />
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}
