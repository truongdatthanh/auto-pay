import FloatingInputs from "@/components/FloatingInput";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";


export default function Register ()
{
    const router = useRouter();
    const [ fullName, setFullName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ checked, setChecked ] = useState( false );
    const [ keyboardVisible, setKeyboardVisible ] = useState( false );

    // Theo dõi trạng thái hiển thị của bàn phím
    useEffect( () =>
    {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () =>
            {
                setKeyboardVisible( true );
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () =>
            {
                setKeyboardVisible( false );
            }
        );

        return () =>
        {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [] );

    const handleSubmit = () =>
    {
        router.push( '/(auth)/pin' );
    }

    const handleBackToLogin = () =>
    {
        router.back();
    }

    const handleSetChecked = () =>
    {
        setChecked( !checked );
    }

    const handleSignUpWithPhoneNumber = () =>
    {
        router.push( '/(auth)/phone-number' );
    }
    return (
        <>
            <KeyboardAvoidingView
                className="flex-1 bg-white"
                style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }
            >

                {/*  Header  */ }
                <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={ false }>
                    {/* Back button */ }
                    <TouchableOpacity onPress={ handleBackToLogin } className="absolute top-4">
                        <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-3xl text-[#1c40f2] font-bold">ĐĂNG KÝ</Text>
                        <Text className="pt-4 text-5xl font-bold text-[#1c40f2]">TÀI KHOẢN</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Form đăng ký */ }
                    <View className='mt-12'>
                        <FloatingInputs
                            label='Họ tên'
                            value={ fullName }
                            onChangeText={ setFullName }
                            containerClassName='mb-4'
                            inputClassName='h-12'
                            placeholder='Họ tên...'
                            selectionColor={ "#1c40f2" }
                        />
                        <FloatingInputs
                            label='Email'
                            value={ email }
                            onChangeText={ setEmail }
                            containerClassName='mb-4'
                            inputClassName='h-12'
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholder='Email...'
                            selectionColor={ "#1c40f2" }
                        />
                        <FloatingInputs
                            label="Mật khẩu"
                            value={ password }
                            onChangeText={ setPassword }
                            secureTextEntry={ true }
                            showPasswordToggle={ true }
                            containerClassName="mb-4"
                            inputClassName='h-12'
                            placeholder="Mật khẩu..."
                            selectionColor={ "#1c40f2" }
                        />
                        <FloatingInputs
                            label="Xác nhận mật khẩu"
                            value={ confirmPassword }
                            onChangeText={ setConfirmPassword }
                            secureTextEntry={ true }
                            showPasswordToggle={ true }
                            containerClassName="mb-4"
                            inputClassName='h-12'
                            placeholder="Xác nhận mật khẩu..."
                            selectionColor={ "#1c40f2" }
                        />
                        <View className="flex-row my-2 mb-6 items-center">
                            <Pressable
                                onPress={ () => handleSetChecked() }
                                className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? 'bg-[#1c40f2]' : 'bg-white'
                                    }` }
                            >
                                { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
                            </Pressable>
                            <Text>Tôi đồng ý với mọi </Text>
                            <Link className='text-[#1c40f2] underline font-medium' href={ "/term" }>Chính sách & điều khoản</Link>
                        </View>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </ScrollView>
                {/* -----------------------------------------End----------------------------------------- */ }

                {/* Footer */ }
                { !keyboardVisible && (
                    <View className="px-4 pb-4 align-bottom">
                        <TouchableOpacity
                            className="mt-2 bg-[#1c40f2] rounded-xl justify-center w-full"
                            onPress={ handleSubmit }
                        >
                            <View className="flex-row items-center justify-center p-4">
                                <Text className="text-white font-semibold ml-2">Đăng Ký</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mt-2 justify-center "
                            onPress={ handleSignUpWithPhoneNumber }
                        >
                            <Text className="text-gray-500 text-center font-bold text-md">Sử Dụng Số Điện Thoại</Text>
                        </TouchableOpacity >
                        <View className="p-4 flex-row items-center justify-center">
                            <Text className="text-center text-gray-500">Bạn đã có tài khoản? </Text>
                            <Link href="/login" className="text-[#1c40f2] font-bold text-lg">Đăng nhập</Link>
                        </View>
                    </View>
                ) }
                {/* -----------------------------------------End----------------------------------------- */ }
            </KeyboardAvoidingView >
        </>
    );
}
