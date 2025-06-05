import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import LoginInput from "@/components/input/LoginInput";

export default function RegisterWithPhoneNumber ()
{
    const [ phoneNumber, setPhoneNumber ] = useState<string>( '0943369278' );

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
        router.replace( { pathname: '/auth/verify-otp', params: { phoneNumber } } );
    }

    return (
        <>
            <StatusBar style="light" />
            <SafeAreaView className="flex-1 bg-[#cbd5e1] gap-8">
                <View className="px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ handleBackToRegister } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 40 } color="black" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-black">Số Điện Thoại</Text>
                        <Text className="text-md text-black mt-1">Nhập số điện thoại để đăng ký tài khoản</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </View>


                {/* Input */ }
                <View className="px-5 flex-1 pt-8 rounded-t-3xl bg-[#f1f5f9]">
                    <LoginInput iconSource={ require( "@/assets/images/dots.png" ) }
                        value={ phoneNumber }
                        onChangeText={ setPhoneNumber }
                        placeholder="Số điện thoại..."
                    />

                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ handleSubmit }
                        className={ `mt-14 px-4 ${phoneNumber.length < 10 ? "bg-gray-400" : "bg-black"} justify-center h-16 self-center w-[300px] rounded-3xl` }
                        disabled={ phoneNumber.length < 10 ? true : false }
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