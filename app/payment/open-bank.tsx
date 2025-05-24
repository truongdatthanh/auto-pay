import { useEffect, useState } from "react";
import { Linking, Alert, View, Text, Image, TouchableOpacity, ActivityIndicator, SafeAreaView, StatusBar } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { bankDeepLinks } from "@/utils/deeplink";
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

export default function OpenBank ()
{
    const { url, data } = useLocalSearchParams();
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState( false );

    // Tìm thông tin ngân hàng từ url
    const bankInfo = bankDeepLinks.find( bank => bank.url === url );

    useEffect( () =>
    {
        // Hiển thị loading trong 1.5 giây trước khi mở app ngân hàng
        const timer = setTimeout( () =>
        {
            const deepLink = `${ url }`;

            Linking.canOpenURL( deepLink )
                .then( supported =>
                {
                    if ( supported )
                    {
                        return Linking.openURL( deepLink );
                    } else
                    {
                        throw new Error( "Không hỗ trợ deeplink này" );
                    }
                } )
                .then( () =>
                {
                    setLoading( false );
                } )
                .catch( () =>
                {
                    setLoading( false );
                    setError( true );
                    Alert.alert(
                        "Không thể mở ứng dụng ngân hàng",
                        "Vui lòng cài đặt ứng dụng ngân hàng trước khi thực hiện giao dịch.",
                        [
                            {
                                text: "Quay lại",
                                onPress: () => router.back()
                            },
                            {
                                text: "Thử lại",
                                onPress: () => Linking.openURL( deepLink ).catch( () => setError( true ) )
                            }
                        ]
                    );
                } );
        }, 1500 );

        return () => clearTimeout( timer );
    }, [ url ] );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <View className="flex-1 justify-center items-center px-6">
                { loading ? (
                    <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite">
                        <View className="items-center">
                            <View className="w-24 h-24 bg-blue-50 rounded-full items-center justify-center mb-6">
                                { bankInfo?.logo ? (
                                    <Image
                                        source={ { uri: bankInfo.logo } }
                                        className="w-16 h-16"
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <Ionicons name="phone-portrait-outline" size={ 40 } color="#1c40f2" />
                                ) }
                            </View>

                            <Text className="text-xl font-bold mb-2">
                                Đang mở ứng dụng { bankInfo?.name || "ngân hàng" }
                            </Text>

                            <ActivityIndicator size="large" color="#1c40f2" />

                            <Text className="text-gray-500 text-center mt-4">
                                Vui lòng đợi trong giây lát hoặc kiểm tra thông báo trên thiết bị của bạn
                            </Text>
                        </View>
                    </Animatable.View>
                ) : error ? (
                    <View className="items-center">
                        <View className="w-24 h-24 bg-red-50 rounded-full items-center justify-center mb-6">
                            <Ionicons name="alert-circle-outline" size={ 50 } color="#ef4444" />
                        </View>

                        <Text className="text-xl font-bold mb-2 text-center">
                            Không thể mở ứng dụng ngân hàng
                        </Text>

                        <Text className="text-gray-500 text-center mb-8">
                            Vui lòng cài đặt ứng dụng { bankInfo?.name || "ngân hàng" } trước khi thực hiện giao dịch
                        </Text>

                        <View className="flex-row space-x-4">
                            <TouchableOpacity
                                className="bg-gray-200 py-3 px-6 rounded-xl"
                                onPress={ () => router.back() }
                            >
                                <Text className="font-semibold">Quay lại</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="bg-[#1c40f2] py-3 px-6 rounded-xl"
                                onPress={ () =>
                                {
                                    setLoading( true );
                                    setError( false );
                                    Linking.openURL( `${ url }` ).catch( () =>
                                    {
                                        setLoading( false );
                                        setError( true );
                                    } );
                                } }
                            >
                                <Text className="font-semibold text-white">Thử lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View className="items-center">
                        <View className="w-24 h-24 bg-green-50 rounded-full items-center justify-center mb-6">
                            <Ionicons name="checkmark-circle-outline" size={ 50 } color="#22c55e" />
                        </View>

                        <Text className="text-xl font-bold mb-2">
                            Đã mở ứng dụng { bankInfo?.name || "ngân hàng" }
                        </Text>

                        <Text className="text-gray-500 text-center mb-8">
                            Vui lòng hoàn tất giao dịch trong ứng dụng ngân hàng
                        </Text>

                        <TouchableOpacity
                            className="bg-[#1c40f2] py-4 px-8 rounded-xl"
                            onPress={ () => router.replace( "/(tabs)" ) }
                        >
                            <Text className="font-semibold text-white">Về trang chủ</Text>
                        </TouchableOpacity>
                    </View>
                ) }
            </View>

            <View className="items-center pb-8">
                <Text className="text-xl text-black font-bold">⛛ AutoPAY</Text>
                <Text className="text-gray-500 text-xs">Thanh toán an toàn, tiện lợi</Text>
            </View>
        </SafeAreaView>
    );
}