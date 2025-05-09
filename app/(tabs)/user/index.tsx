import { View, Text, Button, Touchable, TouchableOpacity, Image, SafeAreaView, ScrollView, Modal, StatusBar } from 'react-native';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign } from '@expo/vector-icons';

interface IUser
{
    id: number;
    fullName: string;
    email: string;
    password: string;
}

export default function UserHome ()
{
    const avatar = '../../../assets/images/500.jpg';
    const [ user, setUser ] = useState<IUser>();
    const [ isVisible, setIsVisible ] = useState( false );

    useEffect( () =>
    {
        const getUser = async () =>
        {
            const user = await AsyncStorage.getItem( 'user' );
            if ( !user )
            {
                router.replace( '/(auth)/login' );
            }
            console.log( 'user', user );
            setUser( JSON.parse( user || '{}' ) );
        };
        getUser();
    }, [] );


    return (
        <>
            <ScrollView className='bg-#cccccc flex-1' contentContainerStyle={ { paddingBottom: 20 } }>
                <TouchableOpacity className='absolute top-12 left-4 p-4 rounded-full z-10' onPress={ () => router.back() }>
                    <Ionicons name="arrow-back-outline" size={ 24 } color="black" />
                </TouchableOpacity>
                <View className='items-center bg-#cccccc p-4 mt-20'>
                    <Image source={ require( avatar ) } className='h-28 w-28 rounded-full' />
                    <Text className='text-lg font-semibold'>{ user?.fullName }</Text>
                    <Text className='text-sm text-gray-500'>{ user?.email }</Text>
                </View>

                <View className='m-4'>
                    <Text className='text-xl font-bold'>Thông tin cá nhân</Text>
                    <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/(tabs)/user/profile' ) }>
                            <Text className='text-md font-semibold'>Thông tin cá nhân</Text>
                            <FontAwesome5 name="user-alt" size={ 24 } color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='m-4'>
                    <Text className='text-xl font-bold'>Cài đặt</Text>
                    <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => void ( 0 ) }>
                            <Text className='text-md font-semibold'>Cài đặt hệ thống</Text>
                            <Ionicons name="settings" size={ 24 } color="black" />
                        </TouchableOpacity>

                        <View className='border-b border-gray-300'></View>

                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/biometric' ) }>
                            <Text className='text-md font-semibold'>Cài đặt sinh trắc học</Text>
                            <Ionicons name="finger-print" size={ 24 } color="black" />
                        </TouchableOpacity>

                        <View className='border-b border-gray-300'></View>

                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => setIsVisible( !isVisible ) }>
                            <Text className='text-md font-semibold'>Kiểm tra phiên bản app</Text>
                            <Octicons name="versions" size={ 24 } color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='m-4'>
                    <Text className='text-xl font-bold'>Hỗ trợ</Text>
                    <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/report-problem' ) }>
                            <Text className='text-md font-semibold'>Báo cáo vấn đề</Text>
                            <AntDesign name="questioncircleo" size={ 24 } color="black" />
                        </TouchableOpacity>

                        <View className='border-b border-gray-300'></View>

                        <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/contact' ) }>
                            <Text className='text-md font-semibold'>Liên hệ với chúng tôi</Text>
                            <FontAwesome name="phone" size={ 24 } color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className='m-4'>
                    <TouchableOpacity onPress={ () => router.replace( "/login" ) } className='mt-2 bg-[#1c40f2] rounded-xl h-16 justify-center w-full'>
                        <Text className='text-center text-white font-semibold '>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>

                <Text className='text-center text-gray-500 mt-4'>
                    Phiên bản ứng dụng v1.0.0
                </Text>

                <Modal
                    animationType='fade'
                    visible={ isVisible }
                    transparent={ true }
                    onRequestClose={ () => setIsVisible( !isVisible ) }
                    className='justify-center items-center bg-white mt-20'

                >
                    <View className='flex-1 justify-center items-center bg-black/40'>
                        <View className='bg-white p-6 rounded-2xl w-[300] shadow-2xl'>
                            <View className='mb-4'>
                                <Text className='text-lg font-semibold'>Kiểm tra phiên bản ứng dụng</Text>
                            </View>
                            <Text className='text-md font-semibold'>Phiên bản hiện tại: v1.0.0</Text>
                            <TouchableOpacity
                                onPress={ () => setIsVisible( false ) }
                                className='bg-blue-500 mt-6 py-4 rounded-xl'
                            >
                                <Text className='text-white text-center font-semibold'>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    );
}
