import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import FloatingInputs from "@/components/input/FloatingInput";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterWithPhoneNumber ()
{
    const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );

    const handleBackToRegister = () =>
    {
        router.back();
    };

    const handleSubmit = () =>
    {
        if ( phoneNumber.length < 10 )
        {
            alert( 'Số điện thoại không hợp lệ' );
            return;
        }
        router.replace( { pathname: '/(auth)/verify-otp', params: { phoneNumber } } );
    }

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
                        <Text className="text-4xl font-bold text-white">Số Điện Thoại</Text>
                        <Text className="text-md text-gray-400 mt-1">Nhập số điện thoại để đăng ký tài khoản</Text>
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
                            selectionColor={ "white" }
                        />
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ handleSubmit }
                        className="mt-14 px-4 border-2 border-white justify-center h-16 self-center w-[300px] rounded-xl"
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Gửi mã OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </>
    );
}