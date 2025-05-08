import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StatusBar, TouchableOpacity, SafeAreaView, Platform, Animated, Alert } from 'react-native';

export default function PinInput ()
{
    const [ pin, setPin ] = useState( '' );
    const inputRef = useRef<TextInput>( null );

    // Tạo mảng các giá trị animation cho hiệu ứng nhảy
    const jumpAnimValues = useRef( Array( 6 ).fill( 0 ).map( () => new Animated.Value( 0 ) ) ).current;

    // Tạo mảng các giá trị animation cho hiển thị/ẩn quả bóng
    const visibilityAnimValues = useRef( Array( 6 ).fill( 0 ).map( () => new Animated.Value( 0 ) ) ).current;

    const handleChange = async ( text: string ) =>
    {
        if ( /^\d*$/.test( text ) && text.length <= 6 )
        {
            // Nếu đang thêm số mới
            if ( text.length > pin.length )
            {
                const newIndex = text.length - 1;

                // Animate quả bóng nhảy lên
                Animated.sequence( [
                    // Nhảy lên
                    Animated.timing( jumpAnimValues[ newIndex ], {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    } ),
                    // Trở về vị trí ban đầu
                    Animated.timing( jumpAnimValues[ newIndex ], {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    } )
                ] ).start();

                // Hiển thị quả bóng và giữ nguyên
                Animated.timing( visibilityAnimValues[ newIndex ], {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                } ).start();
            } else if ( text.length < pin.length )
            {
                // Nếu đang xóa số, ẩn quả bóng
                const indexToHide = pin.length - 1;
                Animated.timing( visibilityAnimValues[ indexToHide ], {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                } ).start();
            }
            setPin( text );
            if ( text.length === 6 )
            {
                inputRef.current?.blur();
            }
        }
    };

    const handleSubmit = async ( text: string ) =>
    {
        if ( text.length === 6 )
        {
            inputRef.current?.blur();
            await AsyncStorage.setItem( "pin", text );
            setTimeout( () =>
            {
                router.push( "/(auth)/confirmPin" );
                setPin( "" );
                // Reset animations
                visibilityAnimValues.forEach( anim => anim.setValue( 0 ) );
            }, 300 ); // Đợi animation hoàn tất
        } else
        {
            Alert.alert( "Vui lòng nhập đủ 6 số", "Mã PIN phải có 6 số", [
                {
                    text: "OK",
                    onPress: () => inputRef.current?.focus(),
                } ] );
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className="flex-1 bg-white" style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }>
                <View className="flex-1 bg-white px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.back() } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-[#1c40f2]">Tạo Mã PIN</Text>
                        <Text className="text-md text-gray-500 mt-1">Nhập mã PIN của bạn gồm 6 số </Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Khu vực nhập PIN */ }
                    <View className="mt-20 justify-center items-center">
                        <Pressable onPress={ () => inputRef.current?.focus() } className="w-full items-center">
                            <View className="flex-row justify-between items-center w-72 px-4 py-4 rounded-xl">
                                { Array.from( { length: 6 } ).map( ( _, i ) => (
                                    <View key={ i } className="items-center">
                                        {/* Quả bóng - sẽ hiển thị và giữ nguyên khi nhập */ }
                                        <Animated.View
                                            style={ {
                                                width: 12,
                                                height: 12,
                                                borderRadius: 6,
                                                backgroundColor: '#1c40f2',
                                                marginBottom: 8,
                                                opacity: visibilityAnimValues[ i ],
                                                transform: [
                                                    {
                                                        translateY: jumpAnimValues[ i ].interpolate( {
                                                            inputRange: [ 0, 1 ],
                                                            outputRange: [ 0, -10 ]
                                                        } )
                                                    }
                                                ]
                                            } }
                                        />
                                        {/* Dấu gạch ngang - đổi màu khi đã nhập */ }
                                        <View
                                            className={ `w-8 h-1 rounded-full ${ i < pin.length ? 'bg-[#1c40f2]' : 'bg-gray-300' }` }
                                        />
                                    </View>
                                ) ) }
                            </View>

                            {/* Input ẩn */ }
                            <TextInput
                                ref={ inputRef }
                                className="h-1 w-1 opacity-0"
                                keyboardType="number-pad"
                                value={ pin }
                                onChangeText={ handleChange }
                                maxLength={ 6 }
                                autoFocus
                            />
                        </Pressable>

                        {/* submit */ }
                        <TouchableOpacity
                            onPress={ () => handleSubmit( pin ) }
                            className="mt-14 px-4 bg-[#1c40f2] h-16 justify-center w-72 rounded-xl">
                            <Text className="text-center text-white text-lg font-bold">
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                        {/* -----------------------------------------End----------------------------------------- */ }
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </View>
            </SafeAreaView>
        </>
    );
}


