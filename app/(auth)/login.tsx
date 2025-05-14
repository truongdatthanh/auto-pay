import { Image, SafeAreaView, StatusBar, Text, TouchableOpacity, View, Keyboard, Platform, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FloatingInputs from '../test/floatinglabel';
import { MaterialIcons } from '@expo/vector-icons';


export default function Login ()
{
    const logo = 'https://interdata.vn/assets/interdata-logo.png'
    const logo1 = '../../assets/images/Logo-login-autopay-1.jpg'
    const router = useRouter();
    const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );
    const [ keyboardVisible, setKeyboardVisible ] = useState( false );

    // Theo dõi trạng thái hiển thị của bàn phím
    useEffect( () =>
    {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () =>
            {
                setKeyboardVisible( true );
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () =>
            {
                setKeyboardVisible( false );
            }
        );

        return () =>
        {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [] );

    const user = [
        { id: 1, email: 'truongdat@gmail.com', fullName: "Truong Thanh Dat", password: '123456' },
        { id: 2, email: '123456@gmail.com', fullName: "Truong Thanh Dat 1", password: '123456' },
    ]

    const handleLogin = () =>
    {
        console.log( 'email', email );
        console.log( 'password', password );
        const userFound = user.find( ( user ) => user.email === email && user.password === password );
        if ( userFound )
        {
            AsyncStorage.setItem( 'user', JSON.stringify( userFound ) );
            router.replace( '/(tabs)' );
        } else
        {
            alert( 'Tên đăng nhập hoặc mật khẩu không đúng' );
        }
    }

    const handleRegister = () =>
    {
        router.push( '/(auth)/register' );
    }

    const handleForgotPassword = () =>
    {
        router.push( '/(auth)/forgot-password' );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className='flex-1 bg-white' >
                    <View className="items-center justify-center flex-1 mt-20" >
                        <View className="w-full max-w-sm justify-center">
                            <View className="mb-8">
                                <Image style={ { width: 'auto', height: 100 } } source={ { uri: logo } } />
                                {/* <Image className='h-[150px] w-full' source={ require( logo1 ) } /> */ }
                            </View>
                            <View className='gap-2'>
                                <FloatingInputs
                                    label='Email'
                                    value={ email }
                                    onChangeText={ setEmail }
                                    containerClassName='mb-4'
                                    inputClassName='h-12'
                                    keyboardType="email-address"
                                    autoCapitalize="none"//Không viết hoa chữ cái đầu tiên
                                    placeholder='Email...'
                                    selectionColor={ "#1c40f2" }
                                />
                                <FloatingInputs
                                    label='Mật khẩu'
                                    value={ password }
                                    onChangeText={ setPassword }
                                    secureTextEntry
                                    containerClassName='mb-4'
                                    inputClassName='h-12'
                                    placeholder='Mật khẩu...'
                                    selectionColor={ "#1c40f2" }
                                />
                            </View>

                            <View className='flex-row justify-end items-center'>
                                <TouchableOpacity onPress={ handleForgotPassword }>
                                    <Text className="text-center text-md text-[#1c40f2] font-semibold">Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    { !keyboardVisible && (
                        <View className='w-full p-6'>
                            <TouchableOpacity
                                className="bg-[#1c40f2] rounded-xl overflow-hidden"
                                onPress={ handleLogin }
                            >
                                <View className="flex-row items-center justify-center p-4">
                                    <MaterialIcons name="login" size={ 24 } color="white" />
                                    <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>
                            <View className="p-4 flex-row items-center justify-center">
                                <Text className="text-center text-gray-500">Bạn chưa có tài khoản? </Text>
                                <TouchableOpacity className="flex-row items-center justify-center" onPress={ handleRegister }>
                                    <Text className="text-[#1c40f2] font-bold text-lg">Đăng ký ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) }
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}
