import React, { useState } from 'react';
import { Text, TextInput, View, TextInputProps } from 'react-native';

interface FloatingInputProps
{
    label: string;
    value: string;
    onChangeText: ( text: string ) => void;
    secureTextEntry?: boolean;
    keyboardType?: TextInputProps[ 'keyboardType' ];
}

export default function FloatingInput ( {
    label,
    value,
    onChangeText,
    secureTextEntry = false,
    keyboardType = 'default',
}: FloatingInputProps )
{
    const [ isFocused, setIsFocused ] = useState( false );
    const showLabelAbove = isFocused || value !== '';
    return (
        <View className="mb-4 relative">
            { showLabelAbove && (
                <Text className="absolute -top-2 left-3 text-xs text-[#1c40f2] bg-white px-1 z-10">
                    { label }
                </Text>
            ) }
            <View className={ `border rounded-lg px-3 pt-4 pb-1 bg-white ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400'}` }>
                <TextInput
                    className="text-base text-black h-10 p-0"
                    value={ value }
                    onChangeText={ onChangeText }
                    onFocus={ () => setIsFocused( true ) }
                    onBlur={ () => setIsFocused( false ) }
                    secureTextEntry={ secureTextEntry }
                    keyboardType={ keyboardType }
                    placeholder={ showLabelAbove ? '' : label }
                    placeholderTextColor="#999"
                />
            </View>
        </View>
    );
}
