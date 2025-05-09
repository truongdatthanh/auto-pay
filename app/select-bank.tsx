import { View, Text, TouchableOpacity, Image, SafeAreaView, StatusBar, ScrollView, TextInput } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { bankDeepLinks } from "@/utils/deeplink";
import { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

export default function SelectBank ()
{
    const params = useLocalSearchParams();
    const data = params.data as string;
    const [ searchQuery, setSearchQuery ] = useState( "" );

    // Lọc danh sách ngân hàng theo từ khóa tìm kiếm
    const filteredBanks = bankDeepLinks.filter( bank =>
        bank.name.toLowerCase().includes( searchQuery.toLowerCase() )
    );

    const handleSelectBank = ( bank: typeof bankDeepLinks[ 0 ] ) =>
    {
        router.push( {
            pathname: "/open-bank",
            params: { url: bank.url, data },
        } );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            {/* Header */ }
            <View className="px-4 py-4 border-b border-gray-100">
                <View className="flex-row items-center">
                    <TouchableOpacity
                        onPress={ () => router.back() }
                        className="p-2 mr-2"
                    >
                        <Ionicons name="arrow-back" size={ 24 } color="#1c40f2" />
                    </TouchableOpacity>
                    <Text className="text-xl font-bold">Chọn ngân hàng</Text>
                </View>

                {/* Search Bar */ }
                <View className="mt-4 flex-row items-center bg-gray-100 rounded-xl px-3 py-2">
                    <Ionicons name="search" size={ 20 } color="#666" />
                    <TextInput
                        className="flex-1 ml-2 text-base"
                        placeholder="Tìm kiếm ngân hàng..."
                        value={ searchQuery }
                        onChangeText={ setSearchQuery }
                    />
                    { searchQuery.length > 0 && (
                        <TouchableOpacity onPress={ () => setSearchQuery( "" ) }>
                            <Ionicons name="close-circle" size={ 20 } color="#666" />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>

            {/* Bank List */ }
            <ScrollView className="flex-1 px-4 py-2">
                <Text className="text-gray-500 mb-2 ml-1">Ngân hàng phổ biến</Text>

                { filteredBanks.length === 0 ? (
                    <View className="items-center justify-center py-10">
                        <Ionicons name="search-outline" size={ 50 } color="#ddd" />
                        <Text className="text-gray-400 mt-2">Không tìm thấy ngân hàng</Text>
                    </View>
                ) : (
                    filteredBanks.map( ( bank ) => (
                        <TouchableOpacity
                            key={ bank.code }
                            className="flex-row items-center bg-white p-4 mb-3 rounded-xl border border-gray-100"
                            style={ {
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.05,
                                shadowRadius: 2,
                                elevation: 1
                            } }
                            onPress={ () => handleSelectBank( bank ) }
                        >
                            <Image
                                source={ { uri: bank.logo } }
                                className="w-12 h-12 rounded-lg"
                                resizeMode="contain"
                            />
                            <View className="ml-4 flex-1">
                                <Text className="text-base font-medium">{ bank.name }</Text>
                                <Text className="text-gray-500 text-sm mt-1">
                                    Mã ngân hàng: { bank.code.toUpperCase() }
                                </Text>
                            </View>
                            <Ionicons name="chevron-forward" size={ 20 } color="#1c40f2" />
                        </TouchableOpacity>
                    ) )
                ) }
            </ScrollView>

            {/* Footer */ }
            <View className="items-center py-4 border-t border-gray-100">
                <Text className="text-xl text-black font-bold">⛛ AutoPAY</Text>
                <Text className="text-gray-500 text-xs">Thanh toán an toàn, tiện lợi</Text>
            </View>
        </SafeAreaView>
    );
}