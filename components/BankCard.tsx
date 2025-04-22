import { Image, Text, View } from "react-native";

interface IBankCard
{
    id: string,
    STK: string,
    name: string,
    logoBanking: string,
    bankName: string,
}
export default function BankingCard ( props : IBankCard )
{
    const bankCard: IBankCard = props;

    return (
        <View className="h-[150] w-[300] bg-white px-6 py-8 border border-gray-300 rounded-3xl gap-4 ">
            <View className="flex-row items-center gap-4">
                <Image
                    source={ { uri: bankCard.logoBanking } }
                    className="w-12 h-12"
                    resizeMode="contain"
                />
                <Text className="text-xl font-semibold">{ bankCard.bankName }</Text>
            </View>
            <View>
                <Text className="text-md font-bold text-gray-500">{ bankCard.STK }</Text>
                <Text className="text-sm text-gray-500">{ bankCard.name } </Text>
            </View>

        </View>
    );
}