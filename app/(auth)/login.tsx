
import { Button, Image, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login ()
{
    const logo = 'https://interdata.vn/assets/interdata-logo.png'
    const router = useRouter();
    const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );


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
        }
        else
        {
            alert( 'Ten dang nhap hoac mat khau bi sai roi' );
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
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className='flex-1'>
                <View className="flex-1 bg-white p-8 items-center justify-center">
                    <View className="flex w-full max-w-sm justify-center">
                        <View className="mb-8">
                            <Image style={ { width: 'auto', height: 100 } } source={ { uri: logo } } />
                        </View>
                        <TextInput
                            className="mb-4 h-16 pl-8 border border-gray-500 rounded-full"
                            placeholder="Email"
                            keyboardType="email-address"
                            value={ email }
                            onChangeText={ setEmail }
                        />
                        <TextInput
                            className="mb-4 h-16 pl-8 border border-gray-500 rounded-full"
                            placeholder="Password"
                            value={ password }
                            onChangeText={ setPassword }
                            secureTextEntry
                        />

                        <View className='mb-4 flex-row justify-end items-center'>
                            <TouchableOpacity onPress={ handleForgotPassword }>
                                <Text className="text-center text-sm text-[#1c40f2] font-semibold underline">Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View className='absolute bottom-3 w-full p-4 z-0'>
                    <TouchableOpacity
                        className="mt-2 bg-[#1c40f2] rounded-full h-16 justify-center w-full"
                        onPress={ handleLogin }
                    >
                        <Text className="text-white text-center font-bold text-md">Đăng nhập</Text>
                    </TouchableOpacity>

                    <View className="p-4 flex-row items-center justify-center mt-2">
                        <Text className="text-center text-base">Bạn chưa có tài khoản? </Text>
                        <TouchableOpacity className="flex-row items-center justify-center" onPress={ handleRegister }>
                            <Text className="text-[#1c40f2] font-bold text-lg">Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

