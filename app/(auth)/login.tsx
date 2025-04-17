
import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login ()
{
    const logo = 'https://interdata.vn/assets/interdata-logo.png'
    const pathname = usePathname();
    const router = useRouter();
    const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );

    const navigation = useNavigation();
    const user = [
        { id: 1, email: 'truongdat@gmail.com',fullName: "Truong Thanh Dat", password: '123456' },
        { id: 2, email: '123456@gmail.com',fullName: "Truong Thanh Dat 1", password: '123456' },
    ]

    const handleLogin = () =>
    {
        console.log( 'email', email );
        console.log( 'password', password );
        const userFound = user.find( ( user ) => user.email === email && user.password === password );
        if ( userFound )
        {
            AsyncStorage.setItem( 'user', JSON.stringify( userFound ) );
            router.replace( '/' );
        }
        else
        {
            alert( 'Ten dang nhap hoac mat khau bi sai roi' );
        }
    }

    const handleRegister = () =>
    {
        router.push( '/register' );
    }

    return (
        <>
            <SafeAreaView className='flex-1 min-h-screen'>
                <View className="flex-1 bg-white p-8 items-center justify-center">
                    <Text>Đây là trang: { pathname }</Text>
                    <View className="flex w-full max-w-sm justify-center">
                        <View className="mb-8">
                            <Image style={ { width: 'auto', height: 100 } } source={ { uri: logo } } />
                        </View>
                        <TextInput
                            className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
                            placeholder="Email"
                            keyboardType="email-address"
                            value={ email }
                            onChangeText={ setEmail }
                        />
                        <TextInput
                            className="w-full mb-6 p-4 border border-gray-300 rounded-lg"
                            placeholder="Password"
                            value={ password }
                            onChangeText={ setPassword }
                            secureTextEntry
                        />
                        <Button
                            title="Đăng nhập"
                            onPress={ handleLogin }
                        />
                        <TouchableOpacity className="mt-4">
                            <Text className="text-center text-blue-500">Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity className="mt-4" onPress={ handleRegister }>
                            <Text className="text-center text-blue-500">Chua co tai khoan? Dang ky di</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}

