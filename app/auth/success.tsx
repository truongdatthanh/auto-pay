import { router } from "expo-router";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RegisterSuccess ()
{

    const handleLogin = () =>
    {
        router.replace( '/auth/login' );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-black">
                <View className="flex-1 justify-center items-center">
                    <View className="w-[200px] h-[200px]">
                        <Image source={ require( '../../assets/images/success.png' ) } className="w-full h-full rounded-lg" resizeMode="contain" />
                        {/* red */ }
                        <View className="h-4 w-4 absolute bg-white/50 rounded-full top-10 right-0"></View>
                        {/* blue */ }
                        <View className="h-2 w-2 absolute bg-white rounded-full bottom-4 right-10"></View>
                        {/* black */ }
                        <View className="h-2 w-2 absolute bg-white/50 rounded-full top-16 left-0" ></View>
                        {/* yellow */ }
                        <View className="h-4 w-4 absolute bg-white rounded-full bottom-5 left-5"></View>
                        {/* green */ }
                        <View className="h-4 w-4 absolute bg-white rounded-full top- left-20"></View>
                    </View>
                </View>

                <View className="flex-1">
                    <View className="mx-8">
                        <Text className="text-3xl font-bold mb-2 text-white">Đăng Ký Tài Khoản Thành Công</Text>
                        <Text className="text-md text-gray-400">Tài khoản của bạn đã đăng ký thành công</Text>
                        <Text className="text-md text-gray-400">Ấn tiếp tục để tiếp tục để quay lại đăng nhập</Text>
                    </View>
                </View>

                <TouchableOpacity className="border-2 border-white w-[300px] self-center m-8 p-4 rounded-xl" onPress={ handleLogin }>
                    <Text className="text-center text-white text-lg font-bold">Tiếp tục</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </>
    );
}