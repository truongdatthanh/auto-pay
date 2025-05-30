import { LinkProps, router, useFocusEffect } from 'expo-router';
import React, { useRef, useCallback } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';

interface WaveButtonProps
{
    to: LinkProps[ 'href' ];
    children: React.ReactNode;
    className?: string;
}

export default function WaveButton ( { to, children, className = '',...props }: WaveButtonProps )
{
    const widthAnim = useRef( new Animated.Value( 0 ) ).current;

    useFocusEffect(
        useCallback( () =>
        {
            widthAnim.setValue( 0 );
        }, [] )
    );

    const handlePress = () =>
    {
        widthAnim.setValue( 0 );
        Animated.timing( widthAnim, {
            toValue: 1,
            duration: 400, 
            easing: Easing.inOut( Easing.ease ), 
            useNativeDriver: false,
        } ).start( () =>
        {
            router.push( to );
        } );
    };

    const animatedStyle = {
        width: widthAnim.interpolate( {
            inputRange: [ 0, 1 ],
            outputRange: [ '0%', '100%' ],
        } ),
    };

    return (
        <Pressable {...props} onPress={ handlePress } className="relative overflow-hidden rounded-lg">
            {/* Wave effect background */ }
            <Animated.View
                className="absolute left-0 top-0 h-full bg-gray-200 z-0"
                style={ [ animatedStyle, { borderRadius: 8 } ] } 
            />
            <View className={ `relative z-10 px-4 py-3 items-center justify-center ${ className }` }>
                { children }
            </View>
        </Pressable>
    );
}
