// import { View, Text, Button, Touchable, TouchableOpacity, Image, SafeAreaView, ScrollView, Modal, StatusBar } from 'react-native';
// import { router, usePathname } from 'expo-router';
// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Octicons from '@expo/vector-icons/Octicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { AntDesign } from '@expo/vector-icons';

// interface IUser
// {
//     id: number;
//     fullName: string;
//     email: string;
//     password: string;
// }

// export default function UserHome ()
// {
//     const avatar = '../../../assets/images/500.jpg';
//     const [ user, setUser ] = useState<IUser>();
//     const [ isVisible, setIsVisible ] = useState( false );

//     useEffect( () =>
//     {
//         const getUser = async () =>
//         {
//             const user = await AsyncStorage.getItem( 'user' );
//             if ( !user )
//             {
//                 router.replace( '/(auth)/login' );
//             }
//             console.log( 'user', user );
//             setUser( JSON.parse( user || '{}' ) );
//         };
//         getUser();
//     }, [] );


//     return (
//         <>
//             <ScrollView className='bg-#cccccc flex-1' contentContainerStyle={ { paddingBottom: 20 } }>
//                 <TouchableOpacity className='absolute top-12 left-4 p-4 rounded-full z-10' onPress={ () => router.back() }>
//                     <Ionicons name="arrow-back-outline" size={ 24 } color="black" />
//                 </TouchableOpacity>
//                 <View className='items-center bg-#cccccc p-4 mt-20'>
//                     <Image source={ require( avatar ) } className='h-28 w-28 rounded-full' />
//                     <Text className='text-lg font-semibold'>{ user?.fullName }</Text>
//                     <Text className='text-sm text-gray-500'>{ user?.email }</Text>
//                 </View>

//                 <View className='m-4'>
//                     <Text className='text-xl font-bold'>Thông tin cá nhân</Text>
//                     <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/(tabs)/user/profile' ) }>
//                             <Text className='text-md font-semibold'>Thông tin cá nhân</Text>
//                             <FontAwesome5 name="user-alt" size={ 24 } color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View className='m-4'>
//                     <Text className='text-xl font-bold'>Cài đặt</Text>
//                     <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => void ( 0 ) }>
//                             <Text className='text-md font-semibold'>Cài đặt hệ thống</Text>
//                             <Ionicons name="settings" size={ 24 } color="black" />
//                         </TouchableOpacity>

//                         <View className='border-b border-gray-300'></View>

//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/biometric' ) }>
//                             <Text className='text-md font-semibold'>Cài đặt sinh trắc học</Text>
//                             <Ionicons name="finger-print" size={ 24 } color="black" />
//                         </TouchableOpacity>

//                         <View className='border-b border-gray-300'></View>

//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => setIsVisible( !isVisible ) }>
//                             <Text className='text-md font-semibold'>Kiểm tra phiên bản app</Text>
//                             <Octicons name="versions" size={ 24 } color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View className='m-4'>
//                     <Text className='text-xl font-bold'>Hỗ trợ</Text>
//                     <View className='bg-white border-2 border-white rounded-xl mt-2 gap-4 p-4 '>
//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/report-problem' ) }>
//                             <Text className='text-md font-semibold'>Báo cáo vấn đề</Text>
//                             <AntDesign name="questioncircleo" size={ 24 } color="black" />
//                         </TouchableOpacity>

//                         <View className='border-b border-gray-300'></View>

//                         <TouchableOpacity className='flex-row items-center justify-between p-2' onPress={ () => router.push( '/user/contact' ) }>
//                             <Text className='text-md font-semibold'>Liên hệ với chúng tôi</Text>
//                             <FontAwesome name="phone" size={ 24 } color="black" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View className='m-4'>
//                     <TouchableOpacity onPress={ () => router.replace( "/login" ) } className='mt-2 bg-[#1c40f2] rounded-xl h-16 justify-center w-full'>
//                         <Text className='text-center text-white font-semibold '>Đăng xuất</Text>
//                     </TouchableOpacity>
//                 </View>

//                 <Text className='text-center text-gray-500 mt-4'>
//                     Phiên bản ứng dụng v1.0.0
//                 </Text>

//                 <Modal
//                     animationType='fade'
//                     visible={ isVisible }
//                     transparent={ true }
//                     onRequestClose={ () => setIsVisible( !isVisible ) }
//                     className='justify-center items-center bg-white mt-20'

//                 >
//                     <View className='flex-1 justify-center items-center bg-black/40'>
//                         <View className='bg-white p-6 rounded-2xl w-[300] shadow-2xl'>
//                             <View className='mb-4'>
//                                 <Text className='text-lg font-semibold'>Kiểm tra phiên bản ứng dụng</Text>
//                             </View>
//                             <Text className='text-md font-semibold'>Phiên bản hiện tại: v1.0.0</Text>
//                             <TouchableOpacity
//                                 onPress={ () => setIsVisible( false ) }
//                                 className='bg-blue-500 mt-6 py-4 rounded-xl'
//                             >
//                                 <Text className='text-white text-center font-semibold'>Đóng</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </Modal>
//             </ScrollView>
//         </>
//     );
// }

import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StatusBar, SafeAreaView, Platform } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

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
    const appVersion = 'v1.0.0';

    useEffect( () =>
    {
        const getUser = async () =>
        {
            const user = await AsyncStorage.getItem( 'user' );
            if ( !user )
            {
                router.replace( '/(auth)/login' );
            }
            setUser( JSON.parse( user || '{}' ) );
        };
        getUser();
    }, [] );

    const handleLogout = async () =>
    {
        try
        {
            await AsyncStorage.removeItem( 'user' );
            router.replace( '/login' );
        } catch ( error )
        {
            console.error( 'Error logging out:', error );
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ScrollView
                className="flex-1 bg-gray-100"
                contentContainerStyle={ { paddingBottom: 30 } }
                showsVerticalScrollIndicator={ false }
            >
                <LinearGradient
                    colors={ [ '#1c40f2', '#3b5fe2' ] }
                    start={ { x: 0, y: 0 } }
                    end={ { x: 1, y: 1 } }
                    className="pt-16 pb-8 rounded-b-3xl"
                >
                    <TouchableOpacity
                        className="absolute top-12 left-4 p-2 bg-white/20 rounded-full z-10"
                        onPress={ () => router.back() }
                    >
                        <Ionicons name="arrow-back-outline" size={ 22 } color="white" />
                    </TouchableOpacity>

                    <Animated.View
                        entering={ FadeIn.duration( 600 ) }
                        className="items-center px-4"
                    >
                        <View className="border-4 border-white rounded-full">
                            <Image source={ require( avatar ) } className="h-24 w-24 rounded-full" />
                        </View>
                        <Text className="text-xl font-bold text-white mt-3">{ user?.fullName }</Text>
                        <Text className="text-sm text-white/80">{ user?.email }</Text>
                    </Animated.View>
                </LinearGradient>

                {/* Thông tin cá nhân */ }
                <Animated.View
                    entering={ FadeInDown.duration( 600 ).delay( 200 ) }
                    className="mx-4 -mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <View className="p-4 border-b border-gray-100">
                        <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
                    </View>

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => router.push( '/(tabs)/user/profile' ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                            <FontAwesome5 name="user-alt" size={ 16 } color="#1c40f2" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Thông tin cá nhân</Text>
                            <Text className="text-xs text-gray-500 mt-1">Xem và cập nhật thông tin cá nhân của bạn</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>
                </Animated.View>
                {/* -----------------------------------------End----------------------------------------- */}

                {/*Cài đặt */ }
                <Animated.View
                    entering={ FadeInDown.duration( 600 ).delay( 300 ) }
                    className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <View className="p-4 border-b border-gray-100">
                        <Text className="text-lg font-bold text-gray-800">Cài đặt</Text>
                    </View>

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => router.push( '/user/system-setting' ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
                            <Ionicons name="settings" size={ 18 } color="#4b5563" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Cài đặt hệ thống</Text>
                            <Text className="text-xs text-gray-500 mt-1">Tùy chỉnh giao diện và thông báo</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>

                    <View className="h-[1px] bg-gray-100 mx-4" />

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => router.push( '/user/biometric' ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
                            <Ionicons name="finger-print" size={ 18 } color="#8b5cf6" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Cài đặt sinh trắc học</Text>
                            <Text className="text-xs text-gray-500 mt-1">Bảo mật tài khoản bằng vân tay hoặc Face ID</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>

                    <View className="h-[1px] bg-gray-100 mx-4" />

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => setIsVisible( true ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
                            <Octicons name="versions" size={ 18 } color="#10b981" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Kiểm tra phiên bản app</Text>
                            <Text className="text-xs text-gray-500 mt-1">Phiên bản hiện tại: { appVersion }</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>
                </Animated.View>
                {/* -----------------------------------------End----------------------------------------- */}

                {/* Hỗ trợ */ }
                <Animated.View
                    entering={ FadeInDown.duration( 600 ).delay( 400 ) }
                    className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <View className="p-4 border-b border-gray-100">
                        <Text className="text-lg font-bold text-gray-800">Hỗ trợ</Text>
                    </View>

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => router.push( '/user/report-problem' ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3">
                            <AntDesign name="questioncircleo" size={ 18 } color="#f59e0b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Báo cáo vấn đề</Text>
                            <Text className="text-xs text-gray-500 mt-1">Gửi báo cáo lỗi hoặc đề xuất cải tiến</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>

                    <View className="h-[1px] bg-gray-100 mx-4"></View>

                    <TouchableOpacity
                        className="flex-row items-center p-4 active:bg-gray-50"
                        onPress={ () => router.push( '/user/contact' ) }
                    >
                        <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
                            <FontAwesome name="phone" size={ 18 } color="#ef4444" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-base font-medium text-gray-800">Liên hệ với chúng tôi</Text>
                            <Text className="text-xs text-gray-500 mt-1">Thông tin liên hệ và hỗ trợ</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>
                </Animated.View>
                {/* -----------------------------------------End----------------------------------------- */}

                {/* Logout Button */ }
                <Animated.View
                    entering={ FadeInDown.duration( 600 ).delay( 500 ) }
                    className="mx-4 mt-5"
                >
                    <TouchableOpacity
                        onPress={ handleLogout }
                        className="bg-white border border-red-500 rounded-xl overflow-hidden"
                    >
                        <View className="flex-row items-center justify-center p-4">
                            <Feather name="log-out" size={ 18 } color="#ef4444" />
                            <Text className="text-red-500 font-semibold ml-2">Đăng xuất</Text>
                        </View>
                    </TouchableOpacity>
                </Animated.View>

                <Text className="text-center text-gray-500 text-xs mt-6">
                    AutoPAY • Phiên bản { appVersion }
                </Text>

                {/* Version Check Modal */ }
                <Modal
                    animationType="fade"
                    visible={ isVisible }
                    transparent={ true }
                    onRequestClose={ () => setIsVisible( false ) }
                >
                    <View className="flex-1 justify-center items-center bg-black/50">
                        <Animated.View
                            entering={ FadeIn.duration( 300 ) }
                            className="bg-white m-5 p-6 rounded-2xl w-[85%] shadow-xl"
                        >
                            <View className="items-center mb-4">
                                <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-3">
                                    <Octicons name="versions" size={ 28 } color="#1c40f2" />
                                </View>
                                <Text className="text-xl font-bold text-gray-800">Thông tin phiên bản</Text>
                            </View>

                            <View className="bg-gray-50 p-4 rounded-xl mb-4">
                                <View className="flex-row justify-between mb-2">
                                    <Text className="text-gray-500">Phiên bản hiện tại:</Text>
                                    <Text className="font-semibold text-gray-800">{ appVersion }</Text>
                                </View>
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500">Phiên bản mới nhất:</Text>
                                    <Text className="font-semibold text-gray-800">{ appVersion }</Text>
                                </View>
                            </View>

                            <Text className="text-center text-gray-600 mb-4">
                                Ứng dụng của bạn đã được cập nhật lên phiên bản mới nhất.
                            </Text>

                            <TouchableOpacity
                                onPress={ () => setIsVisible( false ) }
                                className="bg-blue-500 py-4 rounded-xl"
                            >
                                <Text className="text-white text-center font-semibold">Đóng</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    );
}