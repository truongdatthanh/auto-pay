import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatCurrencyVND } from "@/utils/format";

interface ICardInfoProps
{
    id: string;
    STK: string;
    name: string;
    date: string;
    amount: number;
    content: string;
    logoBanking: string;
    transactionId: string;
}

export default function CardInfo ( props: ICardInfoProps )
{
    const card = props;
    const handlePressCard = () =>
    {
        const id = card.transactionId
        router.push( { pathname: "/(tabs)/history/transaction/[id]", params: { id } } );
    }

    return (
        <TouchableOpacity onPress={ handlePressCard } className="min-h-[50px] flex-row items-center justify-between bg-white px-4 py-2">
            <AntDesign name="creditcard" size={ 24 } color="black" />
            <View className="flex-1 ml-4">
                <Text className={ `font-semibold ${ card.amount < 0 ? 'text-red-500' : 'text-green-500' }` }>
                    { formatCurrencyVND( card.amount ) }
                </Text>
                <Text className="text-sm text-gray-500">{ card.transactionId }</Text>
            </View>
            <View className="items-end">
                <Text className="text-sm text-gray-500">{ card.date }</Text>
                <Text className="text-sm text-gray-500">{ card.name }</Text>
            </View>
        </TouchableOpacity>
    );

}