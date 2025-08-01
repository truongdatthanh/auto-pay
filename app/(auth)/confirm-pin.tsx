import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StatusBar, TouchableOpacity, Platform, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ConfirmPinInput ()
{
    const [ confirmPin, setConfirmPin ] = useState( '' );
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
            if ( text.length > confirmPin.length )
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
            } else if ( text.length < confirmPin.length )
            {   // Nếu đang xóa số, ẩn quả bóng
                const indexToHide = confirmPin.length - 1;
                Animated.timing( visibilityAnimValues[ indexToHide ], {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                } ).start();
            }
            setConfirmPin( text );
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
            const storedPin = await AsyncStorage.getItem( "pin" );
            if ( storedPin === text )
            {
                // PIN khớp, chuyển đến trang chính
                router.replace( "/(auth)/success" );
            } else
            {
                // PIN không khớp, hiển thị thông báo lỗi
                Alert.alert( "PIN không khớp", "Vui lòng nhập lại", [
                    {
                        text: "OK",
                        onPress: () => inputRef.current?.focus(),
                    } ] );


                setTimeout( () =>
                {
                    setConfirmPin( "" );
                    // Reset animations
                    visibilityAnimValues.forEach( anim => anim.setValue( 0 ) );
                }, 300 ); // Đợi animation hoàn tất
            }
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
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-[#cbd5e1]">
                <View className="flex-1 px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.back() } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 40 } color="black" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-black">Xác nhận mã PIN</Text>
                        <Text className="text-md text-black mt-1">Nhập mã PIN của bạn gồm 6 số </Text>
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
                                                backgroundColor: 'black',
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
                                            className={ `w-8 h-1 rounded-full ${ i < confirmPin.length ? 'bg-black' : 'bg-gray-500' }` }
                                        />
                                    </View>
                                ) ) }
                            </View>

                            {/* Input ẩn */ }
                            <TextInput
                                ref={ inputRef }
                                className="h-1 w-1 opacity-0"
                                keyboardType="number-pad"
                                value={ confirmPin }
                                onChangeText={ handleChange }
                                maxLength={ 6 }
                                autoFocus
                            />
                        </Pressable>

                        {/* submit */ }
                        <TouchableOpacity
                            onPress={ () => handleSubmit( confirmPin ) }
                            className="mt-14 px-4 bg-black h-16 justify-center w-[300px] rounded-xl">
                            <Text className="text-center text-white text-lg font-bold">
                                Xác nhận
                            </Text>
                        </TouchableOpacity>
                        {/* -----------------------------------------End----------------------------------------- */ }
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}














