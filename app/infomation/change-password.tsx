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
        router.replace( "/auth/login" )
        alert( 'Đổi mật khẩu thành công' );
    }
    return (
        <View className="bg-white p-8 flex-1">
            <TextInput
                className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                placeholder="Nhập mật khẩu cũ"
                value={ oldPassword }
                onChangeText={ setOldPassword }
            />
            <TextInput
                className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                placeholder="Nhập mật khẩu mới"
                value={ newPassword }
                onChangeText={ setNewPassword }
            />
            <TextInput
                className="w-full mb-4 border border-gray-300 p-4 rounded-lg bg-gray-50"
                placeholder="Xác nhận mật khẩu"
                value={ confirmPassword }
                onChangeText={ setConfirmPassword }
            />
            <TouchableOpacity className="bg-blue-500 p-4 rounded-lg shadow-md" onPress={ handleSubmit }>
                <Text className="text-white text-lg text-center">Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}