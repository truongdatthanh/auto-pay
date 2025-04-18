import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import { Line } from "react-native-svg";

interface ICardInfoProps
{
    id: number;
    STK: string;
    name: string;
    date: string;
    amount: number;
    content: string;
    logoBanking: string;
}

export default function CardInfo ( props: ICardInfoProps )
{
    console.log( props );
    const { id, STK, name, date, amount, content, logoBanking } = props;
    const card = { id, STK, name, date, amount, content, logoBanking };
    const handlePressCard = () =>
    {
        console.log( "Card pressed", id );
        router.push( `/details?id=${ id }` );
        //AsyncStorage.setItem( "info_banking", JSON.stringify( props ) );
    }

    return (
        <TouchableOpacity onPress={ handlePressCard } className="p-4 flex-row items-center bg-white rounded-md shadow-xl mb-1">
            <Image source={ { uri: logoBanking } } className="w-20 h-16" resizeMode="contain" />
            <View className="flex-1 ml-4">
                <View className="mb-2">
                    <View className="flex-row items-center justify-between">
                        <Text className="text-lg font-semibold text-blue-500">{ STK }</Text>
                        <Text className="text-lg font-semibold text-green-500">{ amount }</Text>
                    </View>
                    <Text className="text-lg font-semibold">{ name }</Text>
                </View>
                <View>
                    <Text>{ date }</Text>
                    <Text>{ content }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
