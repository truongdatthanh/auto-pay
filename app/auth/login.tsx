import { Image, StatusBar, Text, TouchableOpacity, View, Keyboard, Platform, TouchableWithoutFeedback, Alert, BackHandler, TextInput, } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import LoginInput from '@/components/input/LoginInput';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function Login ()
{
    const user = [
        { id: 1, email: 'truongdat@gmail.com', fullName: 'Truong Thanh Dat', password: '123456' },
        { id: 2, email: '123456@gmail.com', fullName: 'Truong Thanh Dat 1', password: '123456' },
    ];

    const logo = 'https://interdata.vn/assets/interdata-logo.png';
    const router = useRouter();
    const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
    const [ password, setPassword ] = useState( '123456' );
    const [ emailError, setEmailError ] = useState<string | null>( null );
    const [ passwordError, setPasswordError ] = useState<string | null>( null );

    useEffect( () =>
    {
        const backAction = () =>
        {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn thoát ứng dụng?',
                [
                    { text: 'Hủy', onPress: () => null, style: 'cancel' },
                    { text: 'Thoát', onPress: () => BackHandler.exitApp() },
                ]
            );
            return true;
        };

        const backHandler = BackHandler.addEventListener( 'hardwareBackPress', backAction );
        return () => backHandler.remove();
    }, [] );

    const handleLogin = () =>
    {
        const emailValidationError = validateEmail( email );
        const passwordValidationError = validatePassword( password );

        setEmailError( emailValidationError );
        setPasswordError( passwordValidationError );

        if ( emailValidationError || passwordValidationError )
        {
            return;
        }

        const userFound = user.find( ( u ) => u.email === email && u.password === password );
        if ( userFound )
        {
            AsyncStorage.setItem( 'user', JSON.stringify( userFound ) );
            router.replace( '/(tabs)/home' );
        } else
        {
            Alert.alert( 'Lỗi đăng nhập', 'Tên đăng nhập hoặc mật khẩu không đúng' );
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

    const handleEmailChange = ( text: string ) =>
    {
        setEmail( text );
        if ( emailError )
        {
            setEmailError( null );
        }
    };

    const handlePasswordChange = ( text: string ) =>
    {
        setPassword( text );
        if ( passwordError )
        {
            setPasswordError( null );
        }
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className="flex-1 bg-white">
                    <KeyboardAwareScrollView
                        contentContainerStyle={ {
                            flexGrow: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingHorizontal: 20
                        } }
                        enableOnAndroid
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                    >
                        <View className="w-full max-w-sm">
                            {/* Logo */ }
                            <View className="items-center mb-8">
                                <Image
                                    style={ { width: 180, height: 60, resizeMode: 'contain' } }
                                    source={ { uri: logo } }
                                />
                            </View>

                            {/* Form Inputs với Error Layout Cố Định */ }
                            <View className="mb-2">
                                {/* Email Input Container - Cố định chiều cao */ }
                                <View className="h-20 mb-2">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/mail-black.png" ) }
                                        placeholder='Email'
                                        onChangeText={ handleEmailChange }
                                        value={ email }
                                    />
                                    {/* Error Container - Cố định chiều cao */ }
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { emailError && (
                                            <Text className="text-red-500 text-sm">
                                                * { emailError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>

                                {/* Password Input Container - Cố định chiều cao */ }
                                <View className="h-20">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/unlock-black.png" ) }
                                        placeholder='Mật khẩu'
                                        showPasswordToggle
                                        secureTextEntry
                                        onChangeText={ handlePasswordChange }
                                        value={ password }
                                    />
                                    {/* Error Container - Cố định chiều cao */ }
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { passwordError && (
                                            <Text className="text-red-500 text-sm">
                                                * { passwordError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>
                            </View>

                            {/* Forgot Password */ }
                            <View className="flex-row justify-end mb-6">
                                <TouchableOpacity onPress={ handleForgotPassword }>
                                    <Text className="text-blue-500 font-semibold">Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Login Button */ }
                            <TouchableOpacity
                                onPress={ handleLogin }
                                className="bg-blue-500 rounded-xl w-full mb-4 shadow-sm"
                                activeOpacity={ 0.8 }
                            >
                                <View className="flex-row items-center justify-center py-4">
                                    <MaterialIcons name="login" size={ 20 } color="white" />
                                    <Text className="text-white font-semibold ml-2 text-base">Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Register Link */ }
                            <View className="flex-row justify-center">
                                <Text className="text-gray-600">Bạn chưa có tài khoản? </Text>
                                <TouchableOpacity onPress={ handleRegister }>
                                    <Text className="text-blue-500 font-semibold">Đăng ký ngay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}


// import LoginInput from "@/components/input/LoginInput";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useState } from "react";
// import { Pressable } from "react-native";
// import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import RegisterModal from "./register";

// export default function Login ()
// {
//     const [ showModalLogin, setShowModalLogin ] = useState( false );
//     const [ showModalRegister, setShowModalRegister ] = useState( false );
//     const user = [
//         { id: 1, email: 'truongdat@gmail.com', fullName: 'Truong Thanh Dat', password: '123456' },
//         { id: 2, email: '123456@gmail.com', fullName: 'Truong Thanh Dat 1', password: '123456' },
//     ];

//     const logo = 'https://interdata.vn/assets/interdata-logo.png';
//     const [ email, setEmail ] = useState( 'truongdat@gmail.com' );
//     const [ password, setPassword ] = useState( '123456' );
//     const [ fullName, setFullName ] = useState( '' );


//     const handleSetShowModalLogin = () =>
//     {
//         setShowModalLogin( true );
//     }

//     const handleSetShowModaRegister = () =>
//     {
//         setShowModalRegister( true );
//     }

//     const handleForgotPassword = () =>
//     {
//         router.replace( '/auth/forgot-password' );
//     };

//     const handleLogin = () =>
//     {
//         router.replace( "/(tabs)/home" )
//     }

//     const handleRegisterSuccess = () =>
//     {
//         console.log( 'Đăng ký thành công!' );
//         // Có thể navigate hoặc thực hiện action khác
//         // router.push('/home');
//     };

//     const handleSwitchToPhoneNumber = () =>
//     {
//         console.log( 'Chuyển sang đăng ký bằng số điện thoại' );
//         // Có thể mở modal đăng ký bằng SĐT hoặc navigate
//         // router.push('/auth/phone-number');
//     };

//     const handleSwitchToLogin = () =>
//     {
//         console.log( 'Chuyển sang đăng nhập' );
//         // Có thể mở modal đăng nhập hoặc navigate
//         // setShowLoginModal(true);
//     };

//     return (
//         <>
//             <SafeAreaView className="flex-1">
//                 <View className="flex-1 bg-red-500">
//                     <TouchableOpacity onPress={ handleSetShowModalLogin }>
//                         <Text className="text-black">Login</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={ handleSetShowModaRegister }>
//                         <Text className="text-black">Register</Text>
//                     </TouchableOpacity>
//                 </View>

//             </SafeAreaView>

//             <Modal
//                 visible={ showModalLogin }
//                 transparent
//                 animationType="slide"
//                 onRequestClose={ () => setShowModalLogin( false ) }
//             >
//                 <>
//                     <View className="flex-1 bg-black/70 justify-end">
//                         <View className="bg-white rounded-t-3xl p-5 h-[70%]">
//                             <ScrollView className="">
//                                 <View className="">
//                                     <Text className="text-black font-bold text-3xl self-center">Đăng Nhập</Text>

//                                     <View className="gap-6 mb-3 mt-10">
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/mail-black.png" ) }
//                                             placeholder='Email'
//                                             onChangeText={ setEmail }
//                                             value={ email }
//                                         />
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/unlock-black.png" ) }
//                                             placeholder='Mật khẩu'
//                                             showPasswordToggle
//                                             secureTextEntry
//                                             onChangeText={ setPassword }
//                                             value={ password }
//                                         />
//                                     </View>

//                                     <View className="flex-row justify-end mb-6">
//                                         <TouchableOpacity onPress={ handleForgotPassword }>
//                                             <Text className="text-blue-600 font-bold">Quên mật khẩu?</Text>
//                                         </TouchableOpacity>
//                                     </View>

//                                     <TouchableOpacity onPress={ handleLogin } className="px-4 border rounded-3xl w-full self-center">
//                                         <View className="flex-row items-center justify-center py-4">
//                                             <MaterialIcons name="login" size={ 20 } color="black" />
//                                             <Text className="text-black font-semibold ml-2">Đăng nhập</Text>
//                                         </View>
//                                     </TouchableOpacity>

//                                     <View className="border-t border-gray-200 my-10" />

//                                     <View className="flex-row justify-center">
//                                         <Text className="text-gray-500">Bạn chưa có tài khoản?</Text>
//                                         <TouchableOpacity onPress={ () => router.push( "/auth/register" ) }>
//                                             <Text className="text-blue-500 font-bold ml-1">Đăng ký ngay</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </ScrollView>
//                         </View>
//                     </View>
//                 </>
//             </Modal>


//             <RegisterModal visible={ showModalRegister } onRequestClose={ () => setShowModalRegister( false ) } />
//         </>
//     );
// }