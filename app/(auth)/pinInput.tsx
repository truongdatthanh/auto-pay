import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Pressable, StatusBar, TouchableOpacity } from 'react-native';

export default function PinInput ()
{
    const [ pin, setPin ] = useState( '' );
    const inputRef = useRef<TextInput>( null );

    const handleChange = ( text: string ) =>
    {
        if ( /^\d*$/.test( text ) && text.length <= 4 )
        {
            console.log( 'text', text );
            setPin( text );
            if ( text.length === 4 )
            {
                inputRef.current?.blur();

            }
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View className="flex-1 bg-white px-4">
                <TouchableOpacity onPress={ () => router.back() } className="absolute top-4 left-4">
                    <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                </TouchableOpacity>
                {/* Title ở góc trái trên */ }
                <View className="mt-16">
                    <Text className="text-4xl font-bold text-[#1c40f2]">Tạo Mã PIN</Text>
                    <Text className="text-md text-gray-500 mt-1">Nhập PIN của bạn</Text>
                </View>

                {/* Khu vực nhập PIN */ }
                <View className="mt-20 justify-center items-center">
                    <Pressable onPress={ () => inputRef.current?.focus() } className="w-full items-center">
                        <View className="flex-row justify-between items-center w-64 px-6 py-4 rounded-xl">
                            { Array.from( { length: 4 } ).map( ( _, i ) => (
                                <View
                                    key={ i }
                                    className={ `w-6 h-6 rounded-full ${ i < pin.length ? 'bg-[#1c40f2]' : 'bg-gray-300'
                                        }` }
                                />
                            ) ) }
                        </View>

                        {/* Input ẩn */ }
                        <TextInput
                            ref={ inputRef }
                            className="h-1 w-1 opacity-0"
                            keyboardType="phone-pad"
                            value={ pin }
                            onChangeText={ handleChange }
                            maxLength={ 4 }
                            autoFocus
                        />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
