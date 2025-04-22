import InputField from "@/components/InputField";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChangePassword ()
{
    const [ oldPassword, setOldPassword ] = useState( '' );
    const [ newPassword, setNewPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );

    const handleSubmit = () =>
    {
        if ( newPassword !== confirmPassword )
        {
            alert( 'Mật khẩu mới không khớp' );
            return;
        }
        router.replace( "/login" )
        alert( 'Đổi mật khẩu thành công' );
    }
    return (
        <View className="bg-white p-8 flex-1">
            <View className="mb-6">
                <InputField label="Mật khẩu cũ" value={ oldPassword } onChangeText={ setOldPassword } placeholder="Nhập mật khẩu cũ" />
                <InputField label="Mật khẩu mới" value={ newPassword } onChangeText={ setNewPassword } placeholder="Nhập mật khẩu mới" />
                <InputField label="Xác nhận mật khẩu" value={ confirmPassword } onChangeText={ setConfirmPassword } placeholder="Xác nhận mật khẩu" />
            </View>
            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg shadow-md" onPress={ handleSubmit }>
                <Text className="text-white text-lg text-center">Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}