import { Image, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback, Alert, BackHandler, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '@/utils/validators';
import { useAuthStore } from '@/store/useAuthStore';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { BlurView } from 'expo-blur';
import { useBiometricStore } from '@/store/useBiometricStore';
import { MaterialIcons } from '@expo/vector-icons';
import useBiometricSupport from '@/hooks/useBiometricSupport';
import useForm from '@/hooks/useForm';
import useStatusBar from '@/hooks/useStatusBar';
import AuthScreenWrapper from '@/components/auth/AuthScreenWrapper';
import * as LocalAuthentication from 'expo-local-authentication';
import InputBorder from '@/components/input/InputBorder';


export default function Login ()
{
    const { values, handleChange } = useForm( {
        email: 'truongdat@gmail.com',
        password: '123123',
    } );
    const [ emailError, setEmailError ] = useState<string | null>( null );
    const [ passwordError, setPasswordError ] = useState<string | null>( null );
    const isBiometricSupported = useBiometricSupport();
    const biometricEnabled = useBiometricStore( ( state ) => state.biometricEnabled );
    const [ isSubmit, setIsSubmit ] = useState( false );
    const navigation = useNavigation();
    const { login } = useAuthStore();

    // Sử dụng hook useStatusBar
    useStatusBar();

    useFocusEffect(
        useCallback( () =>
        {
            if ( navigation.canGoBack() ) return;

            const backAction = () =>
            {
                Alert.alert( 'Xác nhận', 'Bạn có chắc chắn muốn thoát ứng dụng?', [
                    { text: 'Hủy', onPress: () => null, style: 'cancel' },
                    { text: 'Thoát', onPress: () => BackHandler.exitApp() },
                ] );
                return true;
            };

            const backHandler = BackHandler.addEventListener( 'hardwareBackPress', backAction );

            return () => backHandler.remove();
        }, [ navigation ] )
    );

    const handleEmailChange = ( text: string ) =>
    {
        if ( emailError ) setEmailError( null );
        handleChange( 'email', text );
    };

    const handlePasswordChange = ( text: string ) =>
    {
        if ( passwordError ) setPasswordError( null );
        handleChange( 'password', text );
    };

    const handleLogin = useCallback( async () =>
    {
        Keyboard.dismiss();
        const emailValidateError = validateEmail( values.email );
        const passwordValidateError = validatePassword( values.password );
        setEmailError( emailValidateError );
        setPasswordError( passwordValidateError );
        if ( emailValidateError || passwordValidateError ) return;
        try
        {
            setIsSubmit( true );
            const user = { email: values.email.trim() };
            await login( user );
            router.replace( '/(tabs)/home' );
        } catch ( e )
        {
            Alert.alert( 'Lỗi', 'Đăng nhập thất bại' );
        }
        finally
        {
            setIsSubmit( false )
        }
    }, [ values.email, values.password, login ] );

    const handleBiometricLogin = useCallback( async () =>
    {
        try
        {
            if ( biometricEnabled === false )
            {
                Alert.alert( "Thông báo", "Vui lòng bật đăng nhập sinh trắc học trong phần cài đặt." );
                return;
            }
            const result = await LocalAuthentication.authenticateAsync( {
                promptMessage: 'Đăng nhập bằng sinh trắc học',
                cancelLabel: 'Hủy',
                disableDeviceFallback: false,
            } );
            if ( !result.success ) return;
            const user = { email: values.email.trim(), password: values.password.trim() };
            await login( user );
            router.replace( "/(tabs)/home" );
        } catch ( error )
        {
            Alert.alert( 'Lỗi', 'Không thể sử dụng sinh trắc học' );
        }
    }, [ isBiometricSupported, biometricEnabled ] );

    return (
        <TouchableWithoutFeedback onPress={ Keyboard.dismiss } accessible={ false }>
            <AuthScreenWrapper>
                <View className='flex-1 items-center justify-center p-4'>
                    <BlurView
                        style={ {
                            borderRadius: 24,
                            overflow: 'hidden',
                        } }
                        intensity={ 20 }
                        tint="light"
                        className="w-full max-w-sm p-6 pb-8"
                    >
                        <View className='items-center mb-10'>
                            <Image
                                source={ require( "@/assets/images/logo-autopay-cachdieu-white.png" ) }
                                style={ {
                                    height: 48,
                                    width: 180,
                                } }
                                resizeMode='contain'
                            />
                            <Text className="text-gray-200 text-[11px]">
                                Tiện lợi - Nhanh chóng - Bảo mật
                            </Text>
                        </View>

                        <View className="gap-4">
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
                        </View>
                        <View className="flex-row justify-end my-4">
                            <TouchableOpacity onPress={ () => router.push( '/(auth)/forgot-password' ) }>
                                <Text className="text-blue-300 text-sm text-gray-200">Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row items-center gap-2">
                            <TouchableOpacity
                                onPress={ handleLogin }
                                className="bg-black flex-1 rounded-3xl py-4 items-center justify-center"
                                activeOpacity={ 0.8 }
                            >
                                { isSubmit ? <ActivityIndicator size="small" color="white" /> : <Text className="text-white font-bold text-base">Đăng nhập</Text> }
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={ handleBiometricLogin }
                                className="bg-gray-100 rounded-3xl items-center justify-center w-14 h-14"
                                activeOpacity={ 0.8 }
                            >
                                <MaterialIcons name="fingerprint" size={ 28 } color="black" />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
                <View className='flex-row justify-center mb-8'>
                    <Text className="text-gray-300 text-sm">Bạn chưa có tài khoản?{ " " }</Text>
                    <TouchableOpacity onPress={ () => router.replace( '/(auth)/register' ) }>
                        <Text className="text-white font-semibold text-sm italic">Đăng ký ngay</Text>
                    </TouchableOpacity>
                </View>
            </AuthScreenWrapper>
        </TouchableWithoutFeedback>
    );
}

