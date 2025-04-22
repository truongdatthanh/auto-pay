import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ForgotPassword ()
{
    const [ phoneNumber, setPhoneNumber ] = useState( '' );
    return (
        <>
            <View className="bg-white flex-1 p-4">
                <Text className="text-2xl font-bold">Vui lòng nhập *số điện thoại đã đăng ký tài khoản</Text>
                <TextInput
                    className="w-full my-4 border-b-2 border-gray-300 rounded-lg"
                    placeholder="Số điện thoại"
                    keyboardType="phone-pad"
                    value={ phoneNumber }
                    onChangeText={ setPhoneNumber }
                />
                <TouchableOpacity className="bg-blue-500 mt-4 p-4 rounded-full" onPress={ () => { } }>
                    <Text className="text-center text-white text-lg font-bold">Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}