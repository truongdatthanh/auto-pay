// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';

// interface FloatingInputsProps extends TextInputProps//tạo interface kế thừa từ TextInputProps
// {
//     label: string;
//     value: string;
//     onChangeText: ( text: string ) => void;
//     error?: string;
//     containerClassName?: string;
//     labelClassName?: string;
//     inputClassName?: string;
//     errorClassName?: string;
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
//     ...props//gom các props còn lại của TextInputProps
// }: FloatingInputsProps )
// {
//     const [ isFocused, setIsFocused ] = useState( false );

//     return (
//         <View className={ ` ${ containerClassName }` }>
//             <View className={ `border rounded-lg px-4 py-2 relative ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400' } ${ error ? 'border-red-500' : '' }` }>
//                 <Text
//                     className={ `absolute -top-2.5 left-3 px-1 bg-white text-xs ${ isFocused ? 'text-[#1c40f2]' : 'text-gray-600'
//                         } ${ error ? 'text-red-500' : '' } ${ labelClassName }` }
//                 >
//                     { label }
//                 </Text>

//                 <TextInput
//                     className={ `text-base text-black py-1 ${ inputClassName }` }
//                     value={ value }
//                     onChangeText={ onChangeText }
//                     onFocus={ () => setIsFocused( true ) }
//                     onBlur={ () => setIsFocused( false ) }
//                     { ...props }
//                 />
//             </View>

//             { error && (
//                 <Text className={ `text-xs text-red-500 mt-1 ml-3 ${ errorClassName }` }>
//                     { error }
//                 </Text>
//             ) }
//         </View>
//     );
// }

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TextInputProps } from 'react-native';
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

    const togglePasswordVisibility = () =>
    {
        setHidePassword( !hidePassword );
    };

    return (
        <View className={ `${ containerClassName }` }>
            <View className={ `border rounded-lg px-4 py-2 relative ${ isFocused ? 'border-[#1c40f2]' : 'border-gray-400' } ${ error ? 'border-red-500' : '' }` }>
                <Text
                    className={ `absolute -top-2.5 left-3 px-1 bg-white text-xs ${ isFocused ? 'text-[#1c40f2]' : 'text-gray-600'
                        } ${ error ? 'text-red-500' : '' } ${ labelClassName }` }
                >
                    { label }
                </Text>

                <View className="flex-row items-center">
                    <TextInput
                        className={ `text-base text-black py-1 flex-1 ${ inputClassName }` }
                        value={ value }
                        onChangeText={ onChangeText }
                        onFocus={ () => setIsFocused( true ) }
                        onBlur={ () => setIsFocused( false ) }
                        secureTextEntry={ hidePassword }
                        { ...props }
                    />

                    { showPasswordToggle && (
                        <TouchableOpacity onPress={ togglePasswordVisibility }>
                            <Ionicons
                                name={ hidePassword ? "eye-outline" : "eye-off-outline" }
                                size={ 24 }
                                color={ isFocused ? "#1c40f2" : "gray" }
                            />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>

            { error && (
                <Text className={ `text-xs text-red-500 mt-1 ml-3 ${ errorClassName }` }>
                    { error }
                </Text>
            ) }
        </View>
    );
}