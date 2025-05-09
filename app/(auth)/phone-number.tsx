import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import FloatingInputs from "../test/floatinglabel";
import { useState } from "react";

export default function RegisterWithPhoneNumber ()
{
    const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );

    const handleBackToRegister = () =>
    {
        router.back();
    };

    const handleSubmit = () =>
    {
        router.push( { pathname: '/(auth)/otp', params: { phoneNumber } } );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-white" style={ { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, } }>
                <View className="flex-1 px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ handleBackToRegister } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-[#1c40f2]">Số Điện Thoại</Text>
                        <Text className="text-md text-gray-500 mt-1">Nhập số điện thoại để đăng ký tài khoản</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Input */ }
                    <View className="mt-8">
                        <FloatingInputs
                            label="Số điện thoại"
                            value={ phoneNumber }
                            onChangeText={ setPhoneNumber }
                            containerClassName="mt-4"
                            inputClassName="h-12"
                            keyboardType="phone-pad"
                            placeholder="Nhập số điện thoại tại đây..."
                            selectionColor={ "#1c40f2" }
                        />
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ handleSubmit }
                        className="mt-6 bg-blue-600 py-3 rounded-xl items-center"
                    >
                        <Text className="text-white text-base font-semibold">
                            Gửi mã OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}