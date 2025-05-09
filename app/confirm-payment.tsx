import { decodeEMVCo } from "@/utils/decodeEMVCode";
import { useLocalSearchParams, router } from "expo-router";
import { View, Text, TouchableOpacity, StatusBar, SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useState } from "react";
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";

export default function ConfirmPayment ()
{
    const params = useLocalSearchParams();

    const data = decodeEMVCo( params.data as string );
    
    const [ loading, setLoading ] = useState( false );


    const handleContinue = () =>
    {
        setLoading( true );
        setTimeout( () =>
        {
            router.push( {
                pathname: "/select-bank",
                params: { data: JSON.stringify( data ) }
            } );
        }, 300 );
    };

    return (
        <SafeAreaView style={ { flex: 1, backgroundColor: 'white' } }>
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <ScrollView>
                {/* Header */ }
                <View className="px-4 py-4 flex-row items-center">
                    <TouchableOpacity onPress={ () => router.back() } className="p-2">
                        <Ionicons name="arrow-back" size={ 24 } color="#1c40f2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold ml-2">Xác nhận thanh toán</Text>
                </View>

                {/* Main Content */ }
                <View className="px-6 py-4">
                    {/* Transaction Card */ }
                    <View className="bg-white rounded-2xl shadow-md p-5 mb-6">
                        <View className="items-center mb-4">
                            <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
                                <FontAwesome name="bank" size={ 30 } color="#1c40f2" />
                            </View>
                            <Text className="text-lg font-medium">Thông tin giao dịch</Text>
                        </View>

                        <View className="border-t border-gray-200 pt-4">
                            <View className="flex-row justify-between py-3">
                                <Text className="text-gray-500">Số tài khoản</Text>
                                <Text className="font-medium">{ data.STK }</Text>
                            </View>

                            <View className="flex-row justify-between py-3 border-t border-gray-100">
                                <Text className="text-gray-500">Ngân hàng</Text>
                                <Text className="font-medium">BIN: { data.bin }</Text>
                            </View>

                            <View className="flex-row justify-between py-3 border-t border-gray-100">
                                <Text className="text-gray-500">Số tiền</Text>
                                <Text className="font-bold text-lg text-blue-600">
                                    { formatCurrencyVND( data.amount ) }
                                </Text>
                            </View>

                            { data.content && (
                                <View className="flex-row justify-between py-3 border-t border-gray-100">
                                    <Text className="text-gray-500">Nội dung</Text>
                                    <Text className="font-medium">{ data.content }</Text>
                                </View>
                            ) }
                        </View>
                    </View>

                    {/* Logo AutoPay */ }
                    <View className="items-center mb-6">
                        <Text className="text-xl text-black font-bold">⛛ AutoPAY</Text>
                        <Text className="text-gray-500 text-sm">Thanh toán an toàn, tiện lợi</Text>
                    </View>

                    {/* Disclaimer */ }
                    <View className="bg-blue-50 p-4 rounded-lg mb-8">
                        <Text className="text-gray-700 text-sm">
                            Vui lòng kiểm tra kỹ thông tin trước khi tiếp tục. Bạn sẽ được chọn ngân hàng để thanh toán ở bước tiếp theo.
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */ }
            <View className="px-6 py-4 border-t border-gray-200">
                <TouchableOpacity
                    className={ `bg-[#1c40f2] py-4 rounded-xl items-center ${ loading ? 'opacity-70' : '' }` }
                    onPress={ handleContinue }
                    disabled={ loading }
                >
                    <Text className="text-white font-bold text-lg">
                        { loading ? 'Đang xử lý...' : 'Tiếp tục thanh toán' }
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}