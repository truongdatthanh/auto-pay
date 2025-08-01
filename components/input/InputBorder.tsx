import { Text, TextInput, View, TextInputProps, TouchableOpacity, Keyboard } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

type Props = TextInputProps & {
    label?: string;
    error?: string | null;
    containerClassName?: string;
    inputClassName?: string;
    isPassword?: boolean;
};

export default function InputBorder ( {
    label,
    value,
    error,
    onChangeText,
    placeholder,
    containerClassName = '',
    inputClassName = '',
    isPassword = false,
    ...rest
}: Props )
{
    const [ focused, setFocused ] = useState( false );
    const [ showPwd, setShowPwd ] = useState( isPassword ? true : false );
    const inputRef = useRef<TextInput>( null );
    useEffect( () =>
    {
        const hideSub = Keyboard.addListener( 'keyboardDidHide', () =>
        {
            setFocused( false );
            inputRef.current?.blur();
        } );
        return () =>
        {
            hideSub.remove();
        };
    }, [] );

    return (
        <View>
            <View className={ `border-b border-gray-500 ${ containerClassName }` }>
                { ( focused || value ) && (
                    <Text className='text-sm text-gray-50 ml-1 mb-[-6px]'>
                        { value ? label : `Vui lòng nhập ${ label?.toLowerCase() }` }
                    </Text>
                ) }
                <View className='flex-row items-center justify-between'>
                    <TextInput
                        { ...rest }
                        ref={ inputRef }
                        value={ value }
                        onFocus={ () => setFocused( true ) }
                        onBlur={ () => setFocused( false ) }
                        onChangeText={ onChangeText }
                        placeholder={ placeholder }
                        placeholderTextColor='gray'
                        secureTextEntry={ isPassword ? showPwd : false }
                        className={ `text-white flex-1 ${ inputClassName }` }
                    />
                    { isPassword && (
                        <TouchableOpacity className='p-2' onPress={ () => setShowPwd( !showPwd ) }>
                            <Ionicons
                                name={ showPwd ? 'eye-off-outline' : 'eye-outline' }
                                size={ 20 }
                                color={ ( focused || value ) ? "white" : "gray" }
                            />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>

            { error && (
                <View className="mt-2 flex-row items-center">
                    <View className='w-5 h-5 bg-red-100 border-red-700 border rounded-full items-center justify-center'>
                        <Ionicons name="close" size={ 14 } color="red" />
                    </View>
                    <Text className="ml-1 text-red-300 text-sm ">{ error }</Text>
                </View>
            ) }
        </View>
    );
}

