// import { View, Text, Switch } from 'react-native';
// import { useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function SystemSetting ()
// {
//     const [ isDarkMode, setIsDarkMode ] = useState( false );

//     const toggleDarkMode = async () =>
//     {
//         const newValue = !isDarkMode;
//         await AsyncStorage.setItem( 'dark_mode_enabled', newValue.toString() );
//         setIsDarkMode( newValue );
//     };

//     return (
//         <>
//             <View className="m-4 bg-white rounded-xl p-4 flex-row justify-between items-center">
//                 <Text className="text-md font-semibold">Chế độ tối</Text>
//                 <Switch value={ isDarkMode } onValueChange={ toggleDarkMode } />
//             </View>
//         </>
//     );
// }


import { View, Text, Switch, Alert, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Dùng expo-camera:
import { Camera } from 'expo-camera';
// Hoặc dùng react-native-permissions:
// import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';

export default function SystemSetting ()
{
    const [ isDarkMode, setIsDarkMode ] = useState( false );
    const [ cameraPermission, setCameraPermission ] = useState( false );

    useEffect( () =>
    {
        checkCameraPermission();
        loadDarkModeSetting();
    }, [] );

    const loadDarkModeSetting = async () =>
    {
        try
        {
            const darkMode = await AsyncStorage.getItem( 'dark_mode_enabled' );
            if ( darkMode !== null )
            {
                setIsDarkMode( darkMode === 'true' );
            }
        } catch ( error )
        {
            console.log( 'Error loading dark mode setting:', error );
        }
    };

    const checkCameraPermission = async () =>
    {
        try
        {
            const { status } = await Camera.getCameraPermissionsAsync();
            setCameraPermission( status === 'granted' );
        } catch ( error )
        {
            console.log( 'Error checking camera permission:', error );
            setCameraPermission( false );
        }
    };

    const toggleDarkMode = async () =>
    {
        const newValue = !isDarkMode;
        try
        {
            await AsyncStorage.setItem( 'dark_mode_enabled', newValue.toString() );
            setIsDarkMode( newValue );
        } catch ( error )
        {
            console.log( 'Error saving dark mode setting:', error );
        }
    };

    const toggleCameraPermission = async () =>
    {
        try
        {
            if ( cameraPermission )
            {
                // Nếu đã có quyền, hướng dẫn người dùng tắt trong Settings
                Alert.alert(
                    'Quyền Camera',
                    'Để tắt quyền camera, vui lòng vào Cài đặt > Ứng dụng > [Tên app] > Quyền',
                    [
                        { text: 'Hủy', style: 'cancel' },
                        { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
                    ]
                );
            } else
            {
                // Yêu cầu quyền camera
                const { status } = await Camera.requestCameraPermissionsAsync();

                if ( status === 'granted' )
                {
                    setCameraPermission( true );
                    Alert.alert( 'Thành công', 'Đã cấp quyền camera' );
                } else if ( status === 'denied' )
                {
                    Alert.alert(
                        'Quyền bị từ chối',
                        'Bạn cần cấp quyền camera để sử dụng tính năng quét QR',
                        [
                            { text: 'Hủy', style: 'cancel' },
                            { text: 'Mở Cài đặt', onPress: () => Linking.openSettings() }
                        ]
                    );
                }
            }
        } catch ( error )
        {
            console.log( 'Error handling camera permission:', error );
            Alert.alert( 'Lỗi', 'Không thể thay đổi quyền camera' );
        }
    };

    return (
        <View className="m-4 space-y-4">
            {/* Dark Mode Setting */ }
            <View className="bg-white rounded-xl p-4 flex-row justify-between items-center">
                <Text className="text-md font-semibold">Chế độ tối</Text>
                <Switch value={ isDarkMode } onValueChange={ toggleDarkMode } />
            </View>

            {/* Camera Permission Setting */ }
            <View className="bg-white rounded-xl p-4 flex-row justify-between items-center">
                <View className="flex-1">
                    <Text className="text-md font-semibold">Quyền Camera</Text>
                    <Text className="text-sm text-gray-500 mt-1">
                        Cần thiết để quét mã QR
                    </Text>
                </View>
                <Switch
                    value={ cameraPermission }
                    onValueChange={ toggleCameraPermission }
                />
            </View>
        </View>
    );
}