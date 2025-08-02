import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, ActivityIndicator, Image, BackHandler } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword, validateTerms } from '@/utils/validators';
import useForm from "@/hooks/useForm";
import useStatusBar from "@/hooks/useStatusBar";
import AuthScreenWrapper from "@/components/auth/AuthScreenWrapper";
import { BlurView } from "expo-blur";
import InputBorder from "@/components/input/InputBorder";

export default function Register ()
{
    const { values, handleChange } = useForm( { email: 'truongdatzzz612@gmail.com', password: '20032003', fullName: 'DatTruongne', confirmPassword: '20032003' } )
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );
    const [ fullNameError, setFullNameError ] = useState<string | null>( null );
    const [ emailError, setEmailError ] = useState<string | null>( null );
    const [ passwordError, setPasswordError ] = useState<string | null>( null );
    const [ confirmPasswordError, setConfirmPasswordError ] = useState<string | null>( null );
    const [ termsError, setTermsError ] = useState<string | null>( null );
    const [ checked, setChecked ] = useState( true )
    const [ isSubmit, setIsSubmit ] = useState( false )

    useStatusBar();

    useFocusEffect( () =>
    {
        const onBackPress = () =>
        {
            // Quay lại login khi back ở màn register
            router.replace( '/login' );
            return true; // chặn back mặc định
        };

        BackHandler.addEventListener( 'hardwareBackPress', onBackPress );
        return () =>
            BackHandler.addEventListener( 'hardwareBackPress', onBackPress ).remove();
    } );

    const scrollToTop = () =>
    {
        scrollViewRef.current?.scrollToPosition( 0, 0, true );
    };

    const handleFullNameChange = ( text: string ) =>
    {
        if ( fullNameError ) setFullNameError( null );
        handleChange( "fullName", text )
    };

    const handleEmailChange = ( text: string ) =>
    {
        if ( emailError ) setEmailError( null );
        handleChange( "email", text )
    };

    const handlePasswordChange = ( text: string ) =>
    {
        if ( passwordError ) setPasswordError( null );
        handleChange( "password", text )
        if ( confirmPasswordError && text === values.confirmPassword )
        {
            setConfirmPasswordError( null );
        }
    };

    const handleConfirmPasswordChange = ( text: string ) =>
    {
        if ( confirmPasswordError ) setConfirmPasswordError( null );
        handleChange( "confirmPassword", text )
    };

    const handleSubmit = async () =>
    {
        Keyboard.dismiss();

        const fullNameValidationError = validateFullName( values.fullName );
        const emailValidationError = validateEmail( values.email );
        const passwordValidationError = validatePassword( values.password );
        const confirmPasswordValidationError = validateConfirmPassword( values.confirmPassword, values.password );
        const termsValidationError = validateTerms( checked );

        setFullNameError( fullNameValidationError );
        setEmailError( emailValidationError );
        setPasswordError( passwordValidationError );
        setConfirmPasswordError( confirmPasswordValidationError );
        setTermsError( termsValidationError );

        if ( fullNameValidationError || emailValidationError || passwordValidationError ||
            confirmPasswordValidationError || termsValidationError )
        {
            scrollToTop();
            return;
        }

        try
        {
            setIsSubmit( true );
            // Simulate API call
            await new Promise( resolve => setTimeout( resolve, 1000 ) );

            //Nhận email => xác nhận => pin
            Alert.alert(
                'Đăng ký thành công!',
                'Vui lòng kiểm tra email để xác thực tài khoản.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push( "/(auth)/pin" )
                    }
                ]
            );
        } catch ( error )
        {
            Alert.alert( 'Lỗi', 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.' );
        } finally
        {
            setIsSubmit( false );
        }
    };

    const handleSetChecked = () =>
    {
        setChecked( !checked );
        if ( termsError )
        {
            setTermsError( null );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
            <AuthScreenWrapper>
                <KeyboardAwareScrollView
                    ref={ scrollViewRef }
                    enableOnAndroid
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={ false }
                    keyboardDismissMode="interactive"
                    keyboardOpeningTime={ 250 }
                    contentContainerStyle={ {
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 24,
                        paddingVertical: 32,
                    } }
                >
                    {/* Header */ }
                    <View className="mb-6">
                        <View className="flex-row items-center">
                            <Text className="text-white text-[20px] font-bold mb-2 mr-2 leading-none">Đăng ký tài khoản</Text>
                            <Image source={ require( "@/assets/images/logo-autopay-cachdieu-white.png" ) } style={ { width: 120, height: 30 } } resizeMode="contain" />
                        </View>
                        <Text className="pt-2 text-gray-200">Nền tảng thanh toán an toàn & tiện lợi</Text>
                    </View>

                    {/* Form */ }
                    <View className="items-center justify-center">
                        <BlurView
                            style={ { borderRadius: 24, overflow: 'hidden' } }
                            intensity={ 20 }
                            tint="light"
                            className="w-full max-w-sm p-6 pb-8"
                        >
                            <View className="gap-4">
                                <InputBorder
                                    label="Họ tên"
                                    value={ values.fullName }
                                    onChangeText={ handleFullNameChange }
                                    placeholder="Họ tên"
                                    error={ fullNameError }
                                />
                                <InputBorder
                                    label="Email"
                                    value={ values.email }
                                    onChangeText={ handleEmailChange }
                                    placeholder="Email"
                                    error={ emailError }
                                    autoCapitalize="none"
                                />
                                <InputBorder
                                    label="Mật khẩu"
                                    value={ values.password }
                                    onChangeText={ handlePasswordChange }
                                    placeholder="Mật khẩu"
                                    error={ passwordError }
                                    isPassword
                                />
                                <InputBorder
                                    label="Xác nhận mật khẩu"
                                    value={ values.confirmPassword }
                                    onChangeText={ handleConfirmPasswordChange }
                                    placeholder="Xác nhận mật khẩu"
                                    error={ passwordError }
                                    isPassword
                                />

                                {/* Checkbox */ }
                                <View className="mb-4">
                                    <View className="flex-row items-center">
                                        <Pressable
                                            onPress={ handleSetChecked }
                                            className={ `w-5 h-5 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? "bg-black" : "" }` }
                                        >
                                            { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
                                        </Pressable>
                                        <View className="flex-row items-center flex-wrap">
                                            <Text className="text-gray-200 text-sm">Tôi đồng ý với mọi </Text>
                                            <TouchableOpacity onPress={ () => router.prefetch( "/(auth)/term" ) }>
                                                <Text className="text-white text-sm underline font-medium">
                                                    Chính sách & điều khoản
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Đăng ký */ }
                            <TouchableOpacity
                                onPress={ handleSubmit }
                                className="bg-black rounded-3xl py-4 items-center justify-center mt-4"
                                activeOpacity={ 0.8 }
                            >
                                { isSubmit ? <ActivityIndicator color="white" size="small" /> : <Text className="text-white font-bold text-base">Đăng ký</Text> }

                            </TouchableOpacity>

                            {/* Separator */ }
                            <View className="flex-row items-center justify-between my-4">
                                <View className="w-[40%] h-[1px] bg-gray-500" />
                                <Text className="text-[11px] text-gray-500">hoặc</Text>
                                <View className="w-[40%] h-[1px] bg-gray-500" />
                            </View>

                            {/* Phone login */ }
                            <TouchableOpacity
                                className="border rounded-3xl py-4 items-center justify-center"
                                onPress={ () => router.push( "/(auth)/phone-number" ) }
                            >
                                <Text className="text-gray-400 text-center text-sm">Số điện thoại</Text>
                            </TouchableOpacity>
                        </BlurView>
                    </View>
                </KeyboardAwareScrollView>

                {/* Link đăng nhập */ }
                <View className="flex-row justify-center mb-8">
                    <Text className="text-gray-300 text-sm">Đã có tài khoản? </Text>
                    <TouchableOpacity onPress={ () => router.replace( '/(auth)/login' ) }>
                        <Text className="text-white font-semibold text-sm italic">Đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </AuthScreenWrapper>
        </TouchableWithoutFeedback>
    );
}


