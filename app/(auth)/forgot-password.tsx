import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword ()
{
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    return (
        <>
            <SafeAreaView className="flex-1" style={ { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, } }>
                <View className="flex-1 bg-white px-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.back() } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mt-16">
                        <Text className="text-4xl font-bold text-[#1c40f2]">Quên mật khẩu</Text>
                        <Text className="text-md text-gray-500 mt-1">
                            Vui lòng nhập *số điện thoại đã đăng ký tài khoản
                        </Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    <View></View>
                </View>
            </SafeAreaView>
        </>
    )
}