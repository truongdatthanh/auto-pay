import { Image, StatusBar, Text, TouchableOpacity, View, Keyboard, Platform, TouchableWithoutFeedback, Alert, BackHandler } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import FloatingInputs from '@/components/input/FloatingInput';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import KeyboardAwareScrollView
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login ()
{
    const logo = 'https://interdata.vn/assets/interdata-logo.png';
    const router = useRouter();
    const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );
    const [ keyboardVisible, setKeyboardVisible ] = useState( false );

    useEffect( () =>
    {
        const keyboardDidShowListener = Keyboard.addListener( 'keyboardDidShow', () => setKeyboardVisible( true ) );
        const keyboardDidHideListener = Keyboard.addListener( 'keyboardDidHide', () => setKeyboardVisible( false ) );
        return () =>
        {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [] );

    const user = [
        { id: 1, email: 'truongdat@gmail.com', fullName: 'Truong Thanh Dat', password: '123456' },
        { id: 2, email: '123456@gmail.com', fullName: 'Truong Thanh Dat 1', password: '123456' },
    ];

    const handleLogin = () =>
    {
        const userFound = user.find( ( u ) => u.email === email && u.password === password );
        if ( userFound )
        {
            AsyncStorage.setItem( 'user', JSON.stringify( userFound ) );
            router.replace( '/(tabs)/home' );
        } else
        {
            alert( 'Tên đăng nhập hoặc mật khẩu không đúng' );
        }
    };

    const handleRegister = () =>
    {
        router.push( '/auth/register' );
    };

    const handleForgotPassword = () =>
    {
        router.replace( '/auth/forgot-password' );
    };

    useEffect( () =>
    {
        const backAction = () =>
        {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn thoát ứng dụng?',
                [
                    {
                        text: 'Hủy',
                        onPress: () => null,
                        style: 'cancel',
                    },
                    {
                        text: 'Thoát',
                        onPress: () => BackHandler.exitApp(),
                    },
                ]
            );
            return true; // Ngăn back mặc định
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [] );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className="flex-1 bg-black">
                    <KeyboardAwareScrollView
                        contentContainerStyle={ { flexGrow: 1 } }
                        enableOnAndroid={ true }
                        keyboardOpeningTime={ 250 }
                        showsVerticalScrollIndicator={ false }
                    >
                        <View className="items-center justify-center flex-1 px-6">
                            <View className="w-full max-w-sm justify-center">
                                <View className="mb-8">
                                    <Image style={ { width: 'auto', height: 100 } } source={ { uri: logo } } />
                                </View>

                                <View className="gap-2">
                                    <FloatingInputs
                                        label="Email"
                                        value={ email }
                                        onChangeText={ setEmail }
                                        containerClassName="mb-4"
                                        inputClassName="h-12"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholder="Email..."
                                        selectionColor="#1c40f2"
                                    />
                                    <FloatingInputs
                                        label="Mật khẩu"
                                        value={ password }
                                        onChangeText={ setPassword }
                                        secureTextEntry
                                        containerClassName="mb-4"
                                        inputClassName="h-12"
                                        placeholder="Mật khẩu..."
                                        selectionColor="#1c40f2"
                                    />
                                </View>

                                <View className="flex-row justify-end items-center">
                                    <TouchableOpacity onPress={ handleForgotPassword }>
                                        <Text className="text-white font-semibold text-md">Quên mật khẩu?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        { !keyboardVisible && (
                            <View className="p-6 align-bottom items-center">
                                <TouchableOpacity
                                    className="border-2 border-white rounded-xl w-[300px] overflow-hidden"
                                    onPress={ handleLogin }
                                >
                                    <View className="flex-row items-center justify-center p-4">
                                        <MaterialIcons name="login" size={ 24 } color="white" />
                                        <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
                                    </View>
                                </TouchableOpacity>

                                <View className="p-4 flex-row items-center justify-center">
                                    <Text className="text-gray-400">Bạn chưa có tài khoản? </Text>
                                    <TouchableOpacity onPress={ handleRegister }>
                                        <Text className="text-white font-bold text-lg">Đăng ký ngay</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) }
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}
