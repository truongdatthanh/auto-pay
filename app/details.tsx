import { View } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Details ()
{
    // const { card } = useLocalSearchParams();
    // console.log( "Card details", card );
    return (
        <>
            <View className="flex-1 bg-white p-4">
                <Text className="text-lg font-semibold">Chi tiết giao dịch</Text>
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Thông tin giao dịch</Text>
                    <Text className="mt-2"></Text>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Thông tin tài khoản</Text>
                    <Text className="mt-2"></Text>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Thông tin ngân hàng</Text>
                    <Text className="mt-2"></Text>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Thông tin khác</Text>
                    <Text className="mt-2"></Text>
                </View>
                <View className="mt-4">
                    <Text className="text-lg font-semibold">Thông tin khác</Text>
                    <Text className="mt-2"></Text>
                </View>
            </View>
        </>
    );
}
