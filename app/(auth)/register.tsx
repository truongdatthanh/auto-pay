import FloatingInputs from "@/components/FloatingInput";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Register ()
{
    const router = useRouter();
    const [ fullName, setFullName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ checked, setChecked ] = useState( false );
    const [ keyboardVisible, setKeyboardVisible ] = useState( false );
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

    const scrollToTop = () =>
    {
        scrollViewRef.current?.scrollToPosition( 0, 0, true );
    };

    useEffect( () =>
    {
        const keyboardDidShowListener = Keyboard.addListener( "keyboardDidShow", () =>
        {
            setKeyboardVisible( true );
        } );
        const keyboardDidHideListener = Keyboard.addListener( "keyboardDidHide", () =>
        {
            setKeyboardVisible( false );
        } );

        return () =>
        {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [] );

    const handleSubmit = () =>
    {
        router.push( "/(auth)/pin" );
    };

    const handleBackToLogin = () =>
    {
        router.back();
    };

    const handleSetChecked = () =>
    {
        setChecked( !checked );
    };

    const handleSignUpWithPhoneNumber = () =>
    {
        router.push( "/(auth)/phone-number" );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className="flex-1 bg-black">
                    <KeyboardAwareScrollView
                        ref={ scrollToTop }
                        enableOnAndroid
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ { flexGrow: 1 } }
                        keyboardDismissMode="interactive"
                        keyboardOpeningTime={ 250 }
                    >
                        <View className="flex-1 px-4 pb-5">
                            {/* Back button */ }
                            <TouchableOpacity
                                onPress={ handleBackToLogin }
                                className="absolute top-4 left-3 z-10"
                            >
                                <Ionicons name="return-up-back" size={ 40 } color="white" />
                            </TouchableOpacity>

                            {/* Title */ }
                            <View className="mt-20">
                                <Text className="text-3xl text-white font-bold">ĐĂNG KÝ</Text>
                                <Text className="pt-4 text-5xl font-bold text-white">TÀI KHOẢN</Text>
                            </View>

                            {/* Form đăng ký */ }
                            <View className="mt-12 gap-2">
                                <FloatingInputs
                                    label="Họ tên"
                                    value={ fullName }
                                    onChangeText={ setFullName }
                                    containerClassName="mb-4"
                                    inputClassName="h-12"
                                    placeholder="Họ tên..."
                                    selectionColor="white"
                                />
                                <FloatingInputs
                                    label="Email"
                                    value={ email }
                                    onChangeText={ setEmail }
                                    containerClassName="mb-4"
                                    inputClassName="h-12"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    placeholder="Email..."
                                    selectionColor="white"
                                />
                                <FloatingInputs
                                    label="Mật khẩu"
                                    value={ password }
                                    onChangeText={ setPassword }
                                    secureTextEntry={ true }
                                    showPasswordToggle={ true }
                                    containerClassName="mb-4"
                                    inputClassName="h-12"
                                    placeholder="Mật khẩu..."
                                    selectionColor="white"
                                />
                                <FloatingInputs
                                    label="Xác nhận mật khẩu"
                                    value={ confirmPassword }
                                    onChangeText={ setConfirmPassword }
                                    secureTextEntry={ true }
                                    showPasswordToggle={ true }
                                    containerClassName="mb-4"
                                    inputClassName="h-12"
                                    placeholder="Xác nhận mật khẩu..."
                                    selectionColor="white"
                                />
                                <View className="flex-row my-2 mb-6 items-center">
                                    <Pressable
                                        onPress={ handleSetChecked }
                                        className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? "bg-[#1c40f2]" : "bg-white"
                                            }` }
                                    >
                                        { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
                                    </Pressable>
                                    <Text className="text-gray-400">Tôi đồng ý với mọi </Text>
                                    <Link
                                        href="/term"
                                        className="text-white underline font-medium"
                                    >
                                        Chính sách & điều khoản
                                    </Link>
                                </View>
                            </View>
                        </View>
                        {/* Footer tách riêng, nằm dưới cùng */ }
                        { !keyboardVisible && (
                            <View className="px-4 pb-4 align-bottom">
                                <TouchableOpacity
                                    className="mt-2 border-2 border-white rounded-xl justify-center items-center self-center w-[300px] py-4"
                                    onPress={ handleSubmit }
                                >
                                    <Text className="text-white font-semibold text-base">Đăng Ký</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="mt-3 justify-center"
                                    onPress={ handleSignUpWithPhoneNumber }
                                >
                                    <Text className="text-gray-400 text-center font-bold text-base">
                                        Sử Dụng Số Điện Thoại
                                    </Text>
                                </TouchableOpacity>
                                <View className="p-4 flex-row items-center justify-center">
                                    <Text className="text-center text-gray-400">
                                        Bạn đã có tài khoản?{ " " }
                                    </Text>
                                    <Link
                                        href="/login"
                                        className="text-white font-bold text-lg"
                                    >
                                        Đăng nhập
                                    </Link>
                                </View>
                            </View>
                        ) }

                    </KeyboardAwareScrollView >
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}


