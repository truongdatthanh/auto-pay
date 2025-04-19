import { Text, View } from "react-native";

interface IBankingCard {
    id: number,
    STK: number,
    name: string,
    date: string,
    logoBanking: string,
}
export default function BankingCard ()
{
    return (
        <View className="flex-1 bg-white px-6 py-8">
            <Text className="text-lg font-semibold">Banking Card</Text>
            <Text className="text-sm text-gray-500">Welcome to the banking card screen!</Text>
        </View>
    );
}