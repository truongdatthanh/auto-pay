import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native';

export default function Register ()
{
    const router = useRouter();
    const pathname = usePathname();
    const [ fullName, setFullName ] = useState( 'Dat ne' );
    const [ email, setEmail ] = useState( 'truongdat1@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );
    const [ confirmPassword, setConfirmPassword ] = useState( '123456' );

    const handleSubmit = () =>
    {
        console.log( 'fullName', fullName );
        console.log( 'email', email );
        console.log( 'password', password );
        console.log( 'confirmPassword', confirmPassword );
        if ( password !== confirmPassword )
        {
            alert( 'Mat khau khong khop' );
            return;
        }

        const user = {
            fullName,
            email,
            password,
        };

        router.push( {
            pathname: '/login',
            params: user,
        } );
        alert( 'Dang ky thanh cong' );
    }
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 bg-white p-8 items-center justify-center">
                <Text className="text-center text-lg mb-4">Đây là trang: { pathname }</Text>
                <Text className="text-3xl font-bold mb-8 text-center">Register</Text>
                <View className="w-full max-w-sm mx-auto space-y-4">
                    <TextInput
                        className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                        placeholder="Full Name"
                        value={ fullName }
                        onChangeText={ setFullName }
                    />
                    <TextInput
                        className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                        placeholder="Email"
                        keyboardType="email-address"
                        value={ email }
                        onChangeText={ setEmail }
                    />
                    <TextInput
                        className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                        placeholder="Password"
                        secureTextEntry
                        value={ password }
                        onChangeText={ setPassword }
                    />
                    <TextInput
                        className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={ confirmPassword }
                        onChangeText={ setConfirmPassword }
                    />
                    <TouchableOpacity
                        className="bg-blue-500 p-4 rounded-lg w-full"
                        onPress={ handleSubmit }
                    >
                        <Text className="text-white text-center font-bold text-lg">Create Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}