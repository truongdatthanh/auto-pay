
import FloatingInputs from "@/components/input/FloatingInput";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
            <View className="mb-6 gap-6">
                <FloatingInputs label="Mật khẩu cũ" value={ oldPassword } onChangeText={ setOldPassword } placeholder="Nhập mật khẩu cũ" />
                <FloatingInputs label="Mật khẩu mới" value={ newPassword } onChangeText={ setNewPassword } placeholder="Nhập mật khẩu mới" />
                <FloatingInputs label="Xác nhận mật khẩu" value={ confirmPassword } onChangeText={ setConfirmPassword } placeholder="Xác nhận mật khẩu mới" />
            </View>
            <TouchableOpacity className="bg-[#1c40f2] p-4 rounded-lg" onPress={ handleSubmit }>
                <Text className="text-white text-lg text-center">Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
}



// // Kiểm tra độ mạnh của mật khẩu
// const checkPasswordStrength = ( password: string ) =>
// {
//     let strength = 0;
//     let feedback = '';

//     if ( password.length === 0 )
//     {
//         setPasswordStrength( 0 );
//         setPasswordFeedback( '' );
//         return;
//     }

//     // Kiểm tra độ dài
//     if ( password.length >= 8 ) strength += 1;

//     // Kiểm tra chữ hoa
//     if ( /[A-Z]/.test( password ) ) strength += 1;

//     // Kiểm tra chữ thường
//     if ( /[a-z]/.test( password ) ) strength += 1;

//     // Kiểm tra số
//     if ( /[0-9]/.test( password ) ) strength += 1;

//     // Kiểm tra ký tự đặc biệt
//     if ( /[^A-Za-z0-9]/.test( password ) ) strength += 1;

//     // Phản hồi dựa trên độ mạnh
//     if ( strength <= 2 )
//     {
//         feedback = 'Yếu';
//     } else if ( strength <= 4 )
//     {
//         feedback = 'Trung bình';
//     } else
//     {
//         feedback = 'Mạnh';
//     }

//     setPasswordStrength( strength );
//     setPasswordFeedback( feedback );
// };
