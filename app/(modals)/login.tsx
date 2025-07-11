import FloatingInputs from "@/components/input/FloatingInput";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState, useEffect, useCallback } from "react";
import { ScrollView, Text, TouchableOpacity, View, Alert } from "react-native";
import Modal from "react-native-modal";
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { useBiometricStore } from "@/store/useBiometricStore";

interface LoginModalProps
{
    isVisible?: boolean;
    onRequestClose?: () => void;
}

export default function LoginModal ( {
    isVisible = false,
    onRequestClose,
}: LoginModalProps )
{
    const scrollViewRef = useRef<ScrollView | null>( null );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ isBiometricSupported, setIsBiometricSupported ] = useState( false );
    const biometricEnabled = useBiometricStore( ( state ) => state.biometricEnabled );

    useEffect( () =>
    {
        if ( isVisible && scrollViewRef.current )
        {
            scrollViewRef.current.scrollTo( { y: 0, animated: false } );
        }
    }, [ isVisible ] );

    //Kiểm tra thiết bị có hỗ trợ sinh trắc học không ?
    // useEffect( () =>
    // {
    //     checkBiometricSupport();
    // }, [] );

    // const checkBiometricSupport = async () =>
    // {
    //     const compatible = await LocalAuthentication.hasHardwareAsync();
    //     const enrolled = await LocalAuthentication.isEnrolledAsync();
    //     setIsBiometricSupported( compatible && enrolled );
    // };

    useEffect( () =>
    {
        let isMounted = true;
        const checkBiometricSupport = async () =>
        {
            try
            {
                const [ compatible, enrolled ] = await Promise.all( [
                    LocalAuthentication.hasHardwareAsync(),
                    LocalAuthentication.isEnrolledAsync()
                ] );

                if ( isMounted )
                {
                    setIsBiometricSupported( compatible && enrolled );
                }
            } catch ( error )
            {
                console.error( 'Error checking biometric:', error );
                if ( isMounted )
                {
                    setIsBiometricSupported( false );
                }
            }
        };

        checkBiometricSupport();

        // Cleanup function
        return () =>
        {
            isMounted = false; // Đánh dấu component đã unmount
        };
    }, [] );
    // ============================= END ============================= //

    //Chuyển đến screen quên mật khẩu
    const handleForgotPassword = () =>
    {
        router.push( "/auth/forgot-password" );
    };
    // ============================= END ============================= //


    // ============================= ĐĂNG NHẬP ============================= //
    //Xử lý sự kiện đăng nhập
    const handleLogin = useCallback( async () =>
    {
        try
        {
            const user = { email: email.trim(), password: password.trim() };
            await SecureStore.setItemAsync( "user", JSON.stringify( user ) );
            router.replace( "/(tabs)/home" );
        } catch ( e )
        {
            console.log( "400" )
        }
    }, [ email, password ] );
    // ============================= END ============================= //

    //Xử lý sự kiện đăng nhập bằng sinh trắc học
    const handleBiometricLogin = useCallback( async () =>
    {
        try
        {
            const haveUser = await SecureStore.getItemAsync( "user" );
            const user = JSON.parse( haveUser || "{}" );
            console.log( "user", user )
            console.log( "HaveUser: ", haveUser );


            const result = await LocalAuthentication.authenticateAsync( {
                promptMessage: 'Đăng nhập bằng sinh trắc học',
                cancelLabel: 'Hủy',
                disableDeviceFallback: false,
            } );

            if ( !result.success )
            {
                return;
            }

            if ( !user.email || !user.password || biometricEnabled === false )
            {
                Alert.alert( "Thông báo", "Vui lòng bật đăng nhập sinh trắc học trong phần cài đặt." );
                return;
            }

            router.replace( "/(tabs)/home" );

        } catch ( error )
        {
            Alert.alert( 'Lỗi', 'Không thể sử dụng sinh trắc học' );
        }
    }, [ isBiometricSupported, biometricEnabled ] );
    // ============================= END ============================= //

    return (
        <Modal
            isVisible={ isVisible }
            onSwipeComplete={ onRequestClose }
            swipeDirection="down"
            backdropOpacity={ 0 }
            onBackdropPress={ onRequestClose }
            style={ { justifyContent: "flex-end", margin: 0 } }
        >
            <View className="flex-1 justify-end relative">
                <View className="bg-white p-5 h-[70%]" style={ { borderTopLeftRadius: 50, borderTopRightRadius: 50 } }>
                    <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-2" />
                    <Text className="text-black font-bold text-3xl self-center mt-4">Đăng nhập tại đây!</Text>
                    <ScrollView
                        ref={ scrollViewRef }
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ { flexGrow: 1 } }
                    >
                        <View className="mt-10">
                            <View className="gap-6 mb-4">
                                <FloatingInputs
                                    label="Email"
                                    onChangeText={ setEmail }
                                    value={ email }
                                    placeholder="Nhập email"
                                    labelClassName="bg-white"
                                    autoCapitalize="none"
                                />
                                <FloatingInputs
                                    secureTextEntry
                                    showPasswordToggle
                                    label="Mật khẩu"
                                    onChangeText={ setPassword }
                                    value={ password }
                                    placeholder="Nhập mật khẩu"
                                    labelClassName="bg-white"
                                />
                            </View>
                            <View className="mb-4">
                                <TouchableOpacity className="self-end" onPress={ handleForgotPassword }>
                                    <Text className="text-sm font-semibold">Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={ handleLogin } className="px-4 bg-black rounded-3xl w-full self-center mb-4">
                                <View className="flex-row items-center justify-center py-4">
                                    <MaterialIcons name="login" size={ 20 } color="white" />
                                    <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Divider */ }
                            <View className="flex-row items-center mb-4">
                                <View className="flex-1 h-px bg-gray-300" />
                                <Text className="mx-4 text-gray-500 text-sm">hoặc</Text>
                                <View className="flex-1 h-px bg-gray-300" />
                            </View>

                            {/* Biometric Login Button */ }
                            { isBiometricSupported && (
                                <TouchableOpacity
                                    onPress={ handleBiometricLogin }
                                    className="px-4 bg-gray-100 border border-gray-300 rounded-3xl w-full self-center"
                                >
                                    <View className="flex-row items-center justify-center py-4">
                                        <MaterialIcons name="fingerprint" size={ 20 } color="black" />
                                        <Text className="text-black font-semibold ml-2">Đăng nhập bằng sinh trắc học</Text>
                                    </View>
                                </TouchableOpacity>
                            ) }
                        </View>
                    </ScrollView>
                </View>
            </View >
        </Modal >
    );
}


//#region base
// import FloatingInputs from "@/components/input/FloatingInput";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useRef, useState } from "react";
// import { Modal, ModalProps, ScrollView, Text, TouchableOpacity, View } from "react-native";


// interface LoginModalProps extends ModalProps
// {
//     isVisible?: boolean;
//     onRequestClose?: () => void
// }

// export default function LoginModal ( { isVisible = false, onRequestClose }: LoginModalProps )
// {
//     const scrollViewRef = useRef<ScrollView | null>( null );
//     const [ email, setEmail ] = useState( "" );
//     const [ password, setPassword ] = useState( "" );
//     const handleLogin = () =>
//     {
//         router.replace( "/(tabs)/home" );
//     }

//     const handleForgotPassword = () =>
//     {
//         router.push( "/auth/forgot-password" )
//     }
//     return (
//         <>
//             <Modal
//                 visible={ isVisible }
//                 onRequestClose={ onRequestClose }
//                 transparent
//                 animationType="slide"
//             >
//                 <View className="flex-1 justify-end relative">
//                     <TouchableOpacity className="absolute left-4 top-10 bg-white p-3 rounded-full" onPress={ onRequestClose }>
//                         <Ionicons name="chevron-back" size={ 24 } color="black" />
//                         {/* <Text className="font-semibold text-black">Quay lại</Text> */ }
//                     </TouchableOpacity>
//                     <View className="bg-white p-5 h-[70%]" style={ { borderTopLeftRadius: 50, borderTopRightRadius: 50 } }>
//                         <Text className="text-black font-bold text-3xl self-center mt-4">Đăng nhập tại đây!</Text>
//                         <ScrollView
//                             ref={ scrollViewRef }
//                             keyboardShouldPersistTaps="handled"
//                             showsVerticalScrollIndicator={ false }
//                             contentContainerStyle={ { flexGrow: 1 } }
//                         >
//                             <View className="mt-10">
//                                 <View className="gap-6 mb-4">
//                                     <FloatingInputs
//                                         label="Email"
//                                         onChangeText={ setEmail }
//                                         value={ email }
//                                         placeholder="Nhập email"
//                                         labelClassName="bg-white"
//                                     />
//                                     <FloatingInputs
//                                         showPasswordToggle
//                                         label="Mật khẩu"
//                                         onChangeText={ setPassword }
//                                         value={ password }
//                                         placeholder="Nhập mật khẩu"
//                                         labelClassName="bg-white"
//                                     />
//                                 </View>
//                                 <View className="mb-4">
//                                     <TouchableOpacity className="self-end" onPress={ handleForgotPassword }>
//                                         <Text className="text-sm font-semibold">Quên mật khẩu?</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <TouchableOpacity onPress={ handleLogin } className="px-4 bg-black rounded-3xl w-full self-center">
//                                     <View className="flex-row items-center justify-center py-4">
//                                         <MaterialIcons name="login" size={ 20 } color="white" />
//                                         <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>
//                         </ScrollView>
//                     </View>
//                 </View >
//             </Modal >
//         </>
//     );
// }
//#endregion