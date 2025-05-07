import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface BorderHeaderInputProps extends TextInputProps//tạo interface kế thừa từ TextInputProps
{
    label: string;
    value: string;
    onChangeText: ( text: string ) => void;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
}

export default function BorderHeaderInput ( {
    label,
    value,
    onChangeText,
    error,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    ...props//gom các props còn lại của TextInputProps
}: BorderHeaderInputProps )
{
    const [ isFocused, setIsFocused ] = useState( false );

    return (
        <View className={ `mb-4 ${ containerClassName }` }>
            <View className={ `border rounded-lg px-4 py-2 relative ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400' } ${ error ? 'border-red-500' : '' }` }>
                {/* Header label positioned on the border */ }
                <Text
                    className={ `absolute -top-2.5 left-3 px-1 bg-white text-xs ${ isFocused ? 'text-[#1c40f2]' : 'text-gray-600'
                        } ${ error ? 'text-red-500' : '' } ${ labelClassName }` }
                >
                    { label }
                </Text>

                <TextInput
                    className={ `text-base text-black py-1 ${ inputClassName }` }
                    value={ value }
                    onChangeText={ onChangeText }
                    onFocus={ () => setIsFocused( true ) }
                    onBlur={ () => setIsFocused( false ) }
                    { ...props }
                />
            </View>

            {/* Error message */ }
            { error && (
                <Text className={ `text-xs text-red-500 mt-1 ml-3 ${ errorClassName }` }>
                    { error }
                </Text>
            ) }
        </View>
    );
}