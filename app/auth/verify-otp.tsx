import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, Animated, Keyboard, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerifyOTP ()
{
    const params = useLocalSearchParams();
    const phone = params?.phoneNumber;
    const [ otp, setOtp ] = useState( '' );
    const [ timeLeft, setTimeLeft ] = useState( 90 ); // 5 phút = 300 giây
    const [ isResending, setIsResending ] = useState( false );
    const inputRef = useRef<TextInput>( null );

    // Tạo mảng các giá trị animation cho hiệu ứng nhảy
    const jumpAnimValues = useRef( Array( 4 ).fill( 0 ).map( () => new Animated.Value( 0 ) ) ).current;

    // Đếm ngược thời gian
    useEffect( () =>
    {
        if ( timeLeft === 0 ) return;

        const timer = setInterval( () =>
        {
            setTimeLeft( prevTime =>
            {
                if ( prevTime <= 1 )
                {
                    clearInterval( timer );
                    return 0;
                }
                return prevTime - 1;
            } );
        }, 1000 );

        return () => clearInterval( timer );
    }, [ timeLeft ] );

    // Format thời gian thành mm:ss
    const formatTime = ( seconds: number ) =>
    {
        const minutes = Math.floor( seconds / 60 );
        const remainingSeconds = seconds % 60;
        return `${ minutes.toString().padStart( 2, '0' ) }:${ remainingSeconds.toString().padStart( 2, '0' ) }`;
    };

    const handleChange = ( text: string ) =>
    {
        if ( /^\d*$/.test( text ) && text.length <= 4 )
        {
            // Nếu đang thêm số mới
            if ( text.length > otp.length )
            {
                const newIndex = text.length - 1;
                const newDigit = text.charAt( newIndex );

                // Animate chữ số nhảy lên
                Animated.sequence( [
                    // Nhảy lên
                    Animated.timing( jumpAnimValues[ newIndex ], {
                        toValue: 1,
                        duration: 150,
                        useNativeDriver: true,
                    } ),
                    // Trở về vị trí ban đầu
                    Animated.timing( jumpAnimValues[ newIndex ], {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    } )
                ] ).start();
            }

            setOtp( text );

            // Tự động xác thực khi đủ 4 số
            if ( text.length === 4 )
            {
                inputRef.current?.blur();
            }
        }
    };

    const verifyOtp = ( code: string ) =>
    {
        // Giả lập xác thực OTP - trong thực tế sẽ gọi API
        if ( code === '1234' )
        { // Mã OTP mẫu
            Alert.alert( "Thành công", "Xác thực OTP thành công!", [
                { text: "OK", onPress: () => router.replace( "/auth/success" ) }
            ] );
        } else
        {
            Alert.alert( "Thất bại", "Mã OTP không chính xác. Vui lòng thử lại.", [
                {
                    text: "OK", onPress: () =>
                    {
                        setOtp( '' );
                        inputRef.current?.focus();
                    }
                }
            ] );
        }
    };

    const handleResendOtp = () =>
    {
        console.log( 'Gửi lại mã OTP 1', isResending );
        if ( timeLeft === 0 || !isResending )
        {
            console.log( 'Gửi lại mã OTP' );
            setIsResending( true );

            setTimeout( () =>
            {
                setTimeLeft( 90 );
                setIsResending( false );
                console.log( 'Gửi lại mã OTP', isResending );
                Alert.alert( "Đã gửi lại", "Mã OTP mới đã được gửi đến số điện thoại của bạn." );
            }, 500 );
        }
    };
    const handleBackToRegister = () =>
    {
        router.replace( '/auth/register' );
    };

    return (
        <>
            <StatusBar style="light" />
            <SafeAreaView className="flex-1 bg-black">
                <View className="flex-1 px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ handleBackToRegister } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 40 } color="white" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-white">Xác thực OTP</Text>
                        <Text className="text-md text-gray-400 mt-1">
                            Nhập mã OTP 4 số đã được gửi đến số điện thoại
                        </Text>
                        <Text className="text-white italic text-lg font-semibold">*{ phone }</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Khu vực nhập OTP */ }
                    <View className="mt-4 justify-center items-center">
                        <Pressable onPress={ () => inputRef.current?.focus() } className="w-full items-center">
                            <View className="flex-row justify-center items-center w-72 px-4 py-2 rounded-xl">
                                { Array.from( { length: 4 } ).map( ( _, i ) => (
                                    <View key={ i } className="items-center mx-3">
                                        {/* Chữ số - hiển thị và nhảy khi nhập */ }
                                        <Animated.Text
                                            style={ {
                                                fontSize: 28,
                                                fontWeight: 'bold',
                                                color: 'white',
                                                height: 40,
                                                marginBottom: 4,
                                                transform: [
                                                    {
                                                        translateY: jumpAnimValues[ i ].interpolate( {
                                                            inputRange: [ 0, 1 ],
                                                            outputRange: [ 0, -10 ]
                                                        } )
                                                    }
                                                ]
                                            } }
                                        >
                                            { i < otp.length ? otp.charAt( i ) : '' }
                                        </Animated.Text>
                                        {/* Dấu gạch ngang - đổi màu khi đã nhập */ }
                                        <View
                                            className={ `w-12 h-1 rounded-full ${ i < otp.length ? 'bg-white' : 'bg-gray-600' }` }
                                        />
                                    </View>
                                ) ) }
                            </View>

                            <TextInput
                                ref={ inputRef }
                                className="h-1 w-1 opacity-0"
                                keyboardType="number-pad"
                                value={ otp }
                                onChangeText={ handleChange }
                                maxLength={ 4 }
                                autoFocus
                            />
                        </Pressable>

                        {/* Thời gian đếm ngược */ }
                        <View className="flex-row items-center justify-center">
                            <Text className="text-gray-400">Mã OTP sẽ hết hạn sau </Text>
                            <Text className={ `font-bold ${ timeLeft > 60 ? 'text-white' : 'text-red-500' }` }>
                                { formatTime( timeLeft ) }
                            </Text>
                        </View>

                        {/* Gửi lại mã */ }
                        <View className="flex-row items-center justify-center mt-4">
                            <Text className="text-gray-400">Không nhận được mã? </Text>
                            <TouchableOpacity
                                onPress={ handleResendOtp }
                                disabled={ isResending }
                            >
                                {
                                    isResending ? (
                                        <ActivityIndicator size="small" color="#1c40f2" />
                                    ) : (
                                        <Text className="underline text-white font-semibold text-md">
                                            Gửi lại mã OTP
                                        </Text>
                                    )
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ () => verifyOtp( otp ) }
                        disabled={ otp.length !== 4 }
                        className={ `mt-12 py-4 rounded-xl w-[300px] self-center ${ otp.length === 4 ? 'border-2 border-white' : 'border-2 border-gray-600' }` }
                    >
                        <Text className={ `${ otp.length === 4 ? 'text-white' : 'text-gray-600' } text-base font-semibold text-center` }>
                            Xác nhận
                        </Text>
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </View>
            </SafeAreaView>
        </>
    );
}