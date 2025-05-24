// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, TextInputProps } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// interface FloatingInputsProps extends TextInputProps
// {
//     label: string;
//     value: string;
//     onChangeText: ( text: string ) => void;
//     error?: string;
//     containerClassName?: string;
//     labelClassName?: string;
//     inputClassName?: string;
//     errorClassName?: string;
//     secureTextEntry?: boolean;
//     showPasswordToggle?: boolean;
// }

// export default function FloatingInputs ( {
//     label,
//     value,
//     onChangeText,
//     error,
//     containerClassName = '',
//     labelClassName = '',
//     inputClassName = '',
//     errorClassName = '',
//     secureTextEntry = false,
//     showPasswordToggle = false,
//     ...props
// }: FloatingInputsProps )
// {
//     const [ isFocused, setIsFocused ] = useState( false );
//     const [ hidePassword, setHidePassword ] = useState( secureTextEntry );

//     const togglePasswordVisibility = () =>
//     {
//         setHidePassword( !hidePassword );
//     };

//     return (
//         <View className={ `${ containerClassName }` }>
//             <View className={ `border rounded-lg px-4 py-2 relative ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400' } ${ error ? 'border-red-500' : '' }` }>
//                 <Text
//                     className={ `absolute -top-2.5 left-3 px-1 bg-black text-xs ${ isFocused ? 'text-[#1c40f2]' : 'text-gray-400' } ${ error ? 'text-red-500' : '' } ${ labelClassName }` }
//                 >
//                     { label }
//                 </Text>

//                 <View className="flex-row items-center">
//                     <TextInput
//                         className={ `text-base text-gray-400 py-1 flex-1 ${ inputClassName }` }
//                         value={ value }
//                         onChangeText={ onChangeText }
//                         onFocus={ () => setIsFocused( true ) }
//                         onBlur={ () => setIsFocused( false ) }
//                         secureTextEntry={ hidePassword }
//                         { ...props }
//                         placeholderTextColor={ isFocused ? "#1c40f2" : "gray" }
//                     />

//                     { showPasswordToggle && (
//                         <TouchableOpacity onPress={ togglePasswordVisibility }>
//                             <Ionicons
//                                 name={ hidePassword ? "eye-outline" : "eye-off-outline" }
//                                 size={ 24 }
//                                 color={ isFocused ? "#1c40f2" : "gray" }
//                             />
//                         </TouchableOpacity>
//                     ) }
//                 </View>
//             </View>

//             { error && (
//                 <Text className={ `text-xs text-red-500 mt-1 ml-3 ${ errorClassName }` }>
//                     { error }
//                 </Text>
//             ) }
//         </View>
//     );
// }

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, TextInputProps, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FloatingInputsProps extends TextInputProps
{
    label: string;
    value: string;
    onChangeText: ( text: string ) => void;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
    errorClassName?: string;
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
}

export default function FloatingInputs ( {
    label,
    value,
    onChangeText,
    error,
    containerClassName = '',
    labelClassName = '',
    inputClassName = '',
    errorClassName = '',
    secureTextEntry = false,
    showPasswordToggle = false,
    ...props
}: FloatingInputsProps )
{
    const [ isFocused, setIsFocused ] = useState( false );
    const [ hidePassword, setHidePassword ] = useState( secureTextEntry );
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
        <View className={ `${ containerClassName }` }>
            <View
                className={ `border rounded-lg px-4 py-2 relative ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400'
                    } ${ error ? 'border-red-500' : '' }` }
            >
                <Text
                    className={ `absolute -top-2.5 left-3 px-1 bg-black text-xs ${ isFocused ? 'text-[#1c40f2]' : 'text-gray-400'
                        } ${ error ? 'text-red-500' : '' } ${ labelClassName }` }
                >
                    { label }
                </Text>

                <View className="flex-row items-center">
                    <TextInput
                        ref={ inputRef }
                        className={ `text-base text-gray-400 py-1 flex-1 ${ inputClassName }` }
                        value={ value }
                        onChangeText={ onChangeText }
                        onFocus={ () => setIsFocused( true ) }
                        onBlur={ () => setIsFocused( false ) }
                        secureTextEntry={ hidePassword }
                        { ...props }
                        placeholderTextColor={ isFocused ? '#1c40f2' : 'gray' }
                    />

                    { showPasswordToggle && (
                        <TouchableOpacity onPress={ togglePasswordVisibility }>
                            <Ionicons
                                name={ hidePassword ? 'eye-outline' : 'eye-off-outline' }
                                size={ 24 }
                                color={ isFocused ? '#1c40f2' : 'gray' }
                            />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>

            { error && (
                <Text className={ `text-xs text-red-500 mt-1 ml-3 ${ errorClassName }` }>{ error }</Text>
            ) }
        </View>
    );
}

