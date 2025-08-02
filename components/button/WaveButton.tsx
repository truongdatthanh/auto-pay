import { LinkProps, router, useFocusEffect } from 'expo-router';
import React, { useRef, useCallback } from 'react';
import { Animated, Easing, Pressable, View } from 'react-native';

interface WaveButtonProps
{
    to: LinkProps[ 'href' ];
    children: React.ReactNode;
    className?: string;
}

export default function WaveButton ( { to, children, className = '', ...props }: WaveButtonProps )
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
        <Pressable { ...props } onPress={ handlePress } className="relative overflow-hidden">
            {/* Wave effect background */ }
            <Animated.View
                className="absolute left-0 top-0 h-full bg-gray-200/20 z-0"
                style={ [ animatedStyle, { borderRadius: 0 } ] }
            />
            <View className={ `relative z-10 px-4 py-3 items-center justify-center ${ className }` }>
                { children }
            </View>
        </Pressable>
    );
}

// import { LinkProps, router, useFocusEffect } from 'expo-router';
// import React, { useRef, useCallback } from 'react';
// import { Animated, Easing, Pressable, View } from 'react-native';

// interface WaveButtonProps
// {
//     to: LinkProps[ 'href' ];
//     children: React.ReactNode;
//     className?: string;
//     buttonClassName?: string; // Màu nền và styling
//     waveClassName?: string; // Màu wave effect
//     variant?: 'primary' | 'secondary' | 'danger'; // Predefined variants
// }

// // Predefined variants cho dễ maintain
// const variants = {
//     primary: {
//         button: 'bg-blue-500',
//         wave: 'bg-blue-300'
//     },
//     secondary: {
//         button: 'bg-gray-500',
//         wave: 'bg-gray-300'
//     },
//     danger: {
//         button: 'bg-red-500',
//         wave: 'bg-red-300'
//     }
// };

// export default function WaveButton ( {
//     to,
//     children,
//     className = '',
//     buttonClassName = '',
//     waveClassName = '',
//     variant,
//     ...props
// }: WaveButtonProps )
// {
//     const widthAnim = useRef( new Animated.Value( 0 ) ).current;

//     useFocusEffect(
//         useCallback( () =>
//         {
//             widthAnim.setValue( 0 );
//         }, [] )
//     );

//     const handlePress = () =>
//     {
//         widthAnim.setValue( 0 );
//         Animated.timing( widthAnim, {
//             toValue: 1,
//             duration: 400,
//             easing: Easing.inOut( Easing.ease ),
//             useNativeDriver: false,
//         } ).start( () =>
//         {
//             router.push( to );
//         } );
//     };

//     const animatedStyle = {
//         width: widthAnim.interpolate( {
//             inputRange: [ 0, 1 ],
//             outputRange: [ '0%', '100%' ],
//         } ),
//     };

//     // Determine classes based on variant or custom classes
//     const finalButtonClass = variant
//         ? variants[ variant ].button
//         : buttonClassName;

//     const finalWaveClass = variant
//         ? variants[ variant ].wave
//         : ( waveClassName || 'bg-gray-200' );

//     return (
//         <Pressable
//             { ...props }
//             onPress={ handlePress }
//             className={ `relative overflow-hidden ${ finalButtonClass }` }
//         >
//             {/* Wave effect background */ }
//             <Animated.View
//                 className={ `absolute left-0 top-0 h-full z-0 ${ finalWaveClass }` }
//                 style={ [ animatedStyle, { borderRadius: 0 } ] }
//             />
//             <View className={ `relative z-10 px-4 py-3 items-center justify-center ${ className }` }>
//                 { children }
//             </View>
//         </Pressable>
//     );
// }