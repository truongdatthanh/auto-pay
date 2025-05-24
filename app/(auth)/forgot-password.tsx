import FloatingInputs from "@/components/input/FloatingInput";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword ()
{
    const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );

    const handleSubmit = () =>
    {
        if ( phoneNumber.length < 10 )
        {
            alert( 'Số điện thoại không hợp lệ' );
            return;
        }
        router.replace( "/success" );
    }
    return (
        <>
            <StatusBar style="light" />
            <SafeAreaView className="bg-black flex-1">
                <View className="flex-1 p-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.replace( '/(auth)/login' ) } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 40 } color="white" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-white">Quên mật khẩu</Text>
                        <Text className="text-md text-gray-400 mt-1">Vui lòng nhập <Text className="text-white text-lg italic ">*số điện thoại*</Text> đã đăng ký tài khoản</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                    <FloatingInputs
                        label="Số điện thoại"
                        value={ phoneNumber }
                        onChangeText={ setPhoneNumber }
                        containerClassName="mb-4 mt-8"
                        inputClassName="h-12"
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        placeholder="Số điện thoại..."
                        selectionColor="white"
                    />
                    <TouchableOpacity className="border-2 border-white w-[300px] self-center mt-4 p-4 rounded-xl" onPress={ handleSubmit }>
                        <Text className="text-center text-white text-lg font-bold">Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        </>
    )
}