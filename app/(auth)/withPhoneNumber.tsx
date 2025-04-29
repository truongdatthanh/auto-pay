import { Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import MyTabView from "../test/slidescreen";

export default function WithPhoneNumber ()
{
    return (
        // <View className="flex-1 justify-center items-center bg-white">
        //     <Text className="text-2xl font-bold">Vui Lòng Nhập Số Điện Thoại Để Đăng ký tài khoản</Text>

        //     <View className="border flex-row justify-between w-full items-center">
        //         <Text className="pr-4 border-r-2 border-black">Mã vùng</Text>
        //         <TextInput keyboardType="numeric" autoFocus className="flex-1 ml-2"/>
        //     </View>
        // </View>
        <MyTabView />
    );
}