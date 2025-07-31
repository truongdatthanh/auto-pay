import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TextInputProps, Image, TouchableOpacity, ImageSourcePropType, Keyboard, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface LoginInputProps extends TextInputProps
{
    iconSource: ImageSourcePropType;
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
}

export default function LoginInput ( {
    iconSource,
    secureTextEntry = false,
    showPasswordToggle = false,
    ...rest
}: LoginInputProps )
{
    const [ hidePassword, setHidePassword ] = useState( secureTextEntry );
    const [ isFocused, setIsFocused ] = useState( false );
    const inputRef = useRef<TextInput>( null );

    const togglePasswordVisibility = () =>
    {
        setHidePassword( !hidePassword );
    };

    useEffect( () =>
    {
        const hideSub = Keyboard.addListener( 'keyboardDidHide', () =>
        {
            setIsFocused( false );
            inputRef.current?.blur(); // 👈 Giải pháp triệt để để ẩn cả con trỏ
        } );

        return () =>
        {
            hideSub.remove();
        };
    }, [] );

    return (
        <View className={ `flex-row items-center border ${ isFocused ? 'border-blue-500' : 'border-black' } rounded-3xl px-2 gap-2 py-1 overflow-hidden` } >
            <Image source={ iconSource } className="w-10 h-8" resizeMode="contain" />
            <TextInput
                ref={ inputRef }
                className="flex-1"
                placeholderTextColor="black"
                secureTextEntry={ hidePassword }
                onFocus={ () => setIsFocused( true ) }
                onBlur={ () => setIsFocused( false ) }
                { ...rest }
            />
            { showPasswordToggle && (
                <TouchableOpacity onPress={ togglePasswordVisibility } className='p-2'>
                    <Ionicons
                        name={ hidePassword ? 'eye-outline' : 'eye-off-outline' }
                        size={ 24 }
                    />
                </TouchableOpacity>
            ) }
        </View>
    );
};
