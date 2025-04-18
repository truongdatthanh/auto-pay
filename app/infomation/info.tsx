import { View, Text, Button, Touchable, TouchableOpacity, Image, SafeAreaView, ScrollView } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IUser
{
    id: number;
    fullName: string;
    email: string;
    password: string;
}

export default function Information ()
{
    const avatar = '../../assets/images/500.jpg';
    const [ user, setUser ] = useState<IUser>();

    const handleLogout = () =>
    {
        router.replace( '/login' );
        alert( 'Logout successful' );
        console.log( 'Ban da dang xuat' );
    };

    const handleChangePassword = () =>
    {
        router.push( '/change-password' );
    };

    useEffect( () =>
    {
        const getUser = async () =>
        {
            const user = await AsyncStorage.getItem( 'user' );
            if ( !user )
            {
                router.replace( '/login' );
            }
            console.log( 'user', user );
            setUser( JSON.parse( user || '{}' ) );
        };
        getUser();
    }, [] );

    return (
        <ScrollView className='bg-#cccccc flex-1'>
            <View className='items-center bg-#cccccc h-full p-4 mt-10 justify-center'>
                <Image source={ require( avatar ) } className='h-28 w-28 rounded-full' />
                <Text className='text-lg font-semibold'>{ user?.fullName }</Text>
            </View>

            <View className='bg-white px-6 py-8'>
                <Text>Day la cho cai dat ca nhan</Text>
            </View>
            
        </ScrollView>
    );
}


{/* <View className="flex-1 bg-white px-6 py-8">
    <View className="bg-gray-100 p-4 rounded-xl shadow-md">
        <View className="flex-row items-center mb-4">
            <FontAwesome name="user-circle" size={ 18 } color="black" />
            <Text className="text-lg ml-2">
                <Text className="font-semibold">Tên:</Text> { user?.fullName }
            </Text>
        </View>

        <View className="flex-row items-center mb-4">
            <MaterialIcons name="email" size={ 20 } color="black" />
            <Text className="text-lg ml-2">
                <Text className="font-semibold">Email:</Text> { user?.email }
            </Text>
        </View>

        <View className="flex-row items-center mb-4">
            <FontAwesome5 name="user-lock" size={ 24 } color="black" />
            <Text className="text-lg ml-2">
                <Text className="font-semibold">Quyền:</Text> Admin
            </Text>
        </View>

    </View>

    <View className="mt-8">
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg shadow-md" onPress={ handleChangePassword }>
            <Text className="text-white text-lg ml-2">Đổi mật khẩu</Text>
        </TouchableOpacity>
    </View>

    <View className="mt-8">
        <TouchableOpacity className="bg-blue-500 p-4 rounded-lg shadow-md" onPress={ handleLogout }>
            <Text className="text-white text-lg ml-2">Đăng xuất</Text>
        </TouchableOpacity>
    </View>
</View> */}