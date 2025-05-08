// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import
// {
//     Platform,
//     SafeAreaView,
//     StatusBar,
//     Text,
//     TouchableOpacity,
//     View,
// } from "react-native";
// import { TextInput } from "react-native-gesture-handler";

// export default function WithPhoneNumber ()
// {
//     const handleBackToRegister = () =>
//     {
//         router.back();
//     };

//     return (
//         <>
//             <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//             <SafeAreaView
//                 className="flex-1 bg-white"
//                 style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }
//             >
//                 <View>
//                     <TouchableOpacity onPress={ handleBackToRegister } className="absolute top-4 left-2">
//                         <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
//                     </TouchableOpacity>
//                     <View className="mt-16">
//                         <Text>Nhập Số Điện Thoại</Text>
//                         <Text>Nhập số điên thoại để đăng ký tài khoản</Text>
//                     </View>
//                     <TextInput placeholder="Nhap so dien thoai tai day" />

//                     <TouchableOpacity onPress={ () => { } }>
//                         <Text>
//                             Gửi mã OTP
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </SafeAreaView>
//         </>
//     );
// }

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function WithPhoneNumber ()
{
    const handleBackToRegister = () =>
    {
        router.back();
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <SafeAreaView
                className="flex-1 bg-white"
                style={ {
                    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
                } }
            >
                <View className="flex-1 px-6">
                    {/* Back Button */ }
                    <TouchableOpacity
                        onPress={ handleBackToRegister }
                        className="absolute top-4 left-4 z-10"
                    >
                        <Ionicons name="arrow-back" size={ 28 } color="#1c40f2" />
                    </TouchableOpacity>

                    {/* Header */ }
                    <View className="mt-20">
                        <Text className="text-2xl font-bold text-gray-900 mb-2">
                            Nhập Số Điện Thoại
                        </Text>
                        <Text className="text-base text-gray-600">
                            Nhập số điện thoại để đăng ký tài khoản
                        </Text>
                    </View>

                    {/* Input */ }
                    <View className="mt-8">
                        <TextInput
                            placeholder="Nhập số điện thoại tại đây"
                            keyboardType="phone-pad"
                            className="border border-gray-300 rounded-xl px-4 py-3 text-base text-gray-800 bg-white"
                        />
                    </View>

                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ () => { } }
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