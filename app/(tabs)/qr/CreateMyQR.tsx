
import { generateQR } from "@/utils/generateQR";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";


export default function CreateMyQR ()
{
    const params = useLocalSearchParams();
    const [ amount, setAmount ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const stk = params.STK || "Chưa có số tài khoản";
    console.log( "params", params );

    const handleSubmit = () =>
    {
        if ( amount === "" || content === "" )
        {
            alert( "Vui lòng nhập đầy đủ thông tin" );
            return;
        }

        const data = {
            STK: stk,
            amount: amount,
            content: content,
        };

        console.log( "data", data );

        router.push( {
            pathname: "/(tabs)/qr/DisplayQR",
            params: { data: JSON.stringify( data ) },
        } );

    }
    return (
        <View className="flex-1 bg-white">
            <View className="p-4 ">
                <TouchableOpacity onPress={ () => router.back() }>
                    <Ionicons name="arrow-back" size={ 24 } color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">Tạo mã QR giao dịch</Text>

                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                    <Text className="">Tài khoản ngân hàng</Text>
                    <Text className="border border-gray-400 p-4">{ params.STK }</Text>
                </View>

                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                    <Text className="">Số tiền giao dịch</Text>
                    <TextInput className="border border-gray-400 p-4"
                        placeholder="Nhập số tiền thanh toán"
                        keyboardType="numeric"
                        value={ amount }
                        onChangeText={ setAmount }
                    />
                </View>


                <View className="mt-4 p-4 bg-gray-200 rounded-md">
                    <Text className="">Nội dung</Text>
                    <TextInput className="border border-gray-400 p-4"
                        placeholder="Nội dung giao dịch"
                        keyboardType="default"
                        multiline={ true }
                        numberOfLines={ 4 }
                        textAlignVertical="top"
                        maxLength={ 100 }
                        value={ content }
                        onChangeText={ setContent }
                    />
                </View>

                <TouchableOpacity className="bg-blue-500 p-4 rounded-md mt-4" onPress={ handleSubmit }>
                    <Text className="text-white text-center">Tạo mã QR</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}