import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";

interface ICardInfoProps
{
    id: number;
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
    const { id, STK, name, date, amount, content, logoBanking, transactionId } = props;
    const card = { id, STK, name, date, amount, content, logoBanking, transactionId };
    const handlePressCard = () =>
    {
        console.log( "Card pressed", id );
        router.push( { pathname: "/(tabs)/history/details/[id]", params: { id } } );
    }

    return (
        <TouchableOpacity onPress={ handlePressCard } className="p-4 flex-row items-center justify-between bg-white border-b border-gray-200">
            <AntDesign name="creditcard" size={ 24 } color="black" />
            <View className="flex-1 ml-4">
                <Text className="text-green-500">{ formatCurrencyVND( card.amount ) }</Text>
                <Text className="text-sm text-gray-500">{ card.transactionId }</Text>
            </View>
            <View>
                <Text className="text-sm text-gray-500">{ card.date }</Text>
                <Text className="text-sm text-gray-500">{ card.date }</Text>
            </View>
        </TouchableOpacity>
    );
}
