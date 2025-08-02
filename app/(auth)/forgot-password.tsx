
import LoginInput from "@/components/input/LoginInput";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
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
        router.replace( "/(auth)/success" );
    }
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="bg-white flex-1">
                <View className="p-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.replace( '/(auth)/login' ) } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 40 } color="black" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-black">Quên mật khẩu</Text>
                        <Text className="text-md text-black mt-1">Vui lòng nhập <Text className="text-black text-lg italic font-bold">*số điện thoại*</Text> đã đăng ký tài khoản</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </View>

                <View className="px-5">
                    <LoginInput iconSource={ require( "@/assets/images/dots.png" ) }
                        value={ phoneNumber }
                        onChangeText={ setPhoneNumber }
                        placeholder="Số điện thoại..."
                    />
                    <TouchableOpacity className="bg-black w-[300px] self-center mt-4 p-4 rounded-3xl" onPress={ handleSubmit }>
                        <Text className="text-center text-white text-lg font-bold">Xác nhận</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView >
        </>
    )
}