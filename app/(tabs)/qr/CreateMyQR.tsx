import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import mockDataBankingCard from "../../../assets/banking-card.json"
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";


export default function CreateMyQR ()
{
    const params = useLocalSearchParams();
    //{cardSTK} là thuộc tính ở cha khi truyền param xuống cho con, nếu thuộc tính không giống nhau sẽ bị undefinded
    const { cardSTK } = params;
    const [ amount, setAmount ] = useState( "" );
    const [ content, setContent ] = useState( "" );
    const [ data, setData ] = useState( mockDataBankingCard );
    const currentCard = data.find( ( item ) => item.STK === cardSTK );

    const handleSubmit = () =>
    {
        if ( amount === "" || content === "" )
        {
            alert( "Vui lòng nhập đầy đủ thông tin" );
            return;
        }
        
        const data = {
            STK: currentCard?.STK,
            amount: amount,
            content: content,
        };

        console.log( "data", data );

        router.push( {
            pathname: "/(tabs)/qr/DisplayQR",
            params: {
                data: JSON.stringify( data )
            },
        } );

    }
    return (
        <View className="flex-1 bg-white">
            <View className="p-4 ">
                <TouchableOpacity onPress={ () => router.back() }>
                    <Ionicons name="arrow-back" size={ 24 } color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-bold">Tạo mã QR giao dịch</Text>

                <View className="mt-4 p-4 rounded-md">
                    <Text className="">Tài khoản ngân hàng</Text>
                    <View className="border justify-between flex-row items-center px-6 rounded-full">
                        <Text className="">{ currentCard?.STK }</Text>
                        <Image source={ { uri: currentCard?.logoBanking } } className="w-20 h-12" resizeMode="contain" />
                    </View>


                </View>

                <View className="mt-4 p-4 rounded-md">
                    <Text className="">Số tiền giao dịch</Text>
                    <TextInput className="border px-4 rounded-full"
                        placeholder="Nhập số tiền thanh toán"
                        keyboardType="numeric"
                        value={  amount  }
                        onChangeText={ setAmount }
                    />
                </View>


                <View className="mt-4 p-4 rounded-md">
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