import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatCurrencyWithCode } from "@/utils/format";
import WaveButton from "../button/WaveButton";

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
    // const handlePressCard = () =>
    // {
    //     const id = card.transactionId
    //     console.log( "id cardInfo", id )
    //     router.push( { pathname: "/transaction/[id]", params: { id } } );
    // }

    return (
        // <TouchableOpacity onPress={ handlePressCard } className="min-h-[50px] flex-row items-center justify-between bg-white px-4 py-2">
        //     { card.amount > 0 ?
        //         <Image source={ require( "@/assets/images/imcome-green.png" ) } className="w-8 h-8" resizeMode="contain" /> :
        //         <Image source={ require( "@/assets/images/outcome-red.png" ) } className="w-8 h-8" resizeMode="contain" />
        //     }
        //     <View className="flex-1 ml-4">
        //         <Text className="text-[10px] text-gray-500">{ card.transactionId }</Text>
        //         <Text className={ `font-semibold ${ card.amount < 0 ? 'text-red-500' : 'text-green-500' }` }>
        //             { card.amount > 0 && "+" }{ formatCurrencyWithCode( card.amount ) }
        //         </Text>
        //     </View>
        //     <View className="self-end">
        //         <Text className="text-[10px] text-gray-500">{ card.date }</Text>
        //     </View>
        // </TouchableOpacity>
        <WaveButton to={ { pathname: "/transaction/[id]", params: { id: card.transactionId } } } className="min-h-[50px] flex-row items-center justify-between px-4 py-2">
            { card.amount > 0 ?
                <Image source={ require( "@/assets/images/imcome-green.png" ) } className="w-8 h-8" resizeMode="contain" /> :
                <Image source={ require( "@/assets/images/outcome-red.png" ) } className="w-8 h-8" resizeMode="contain" />
            }
            <View className="flex-1 ml-4">
                <Text className="text-[10px] text-gray-500">{ card.transactionId }</Text>
                <Text className={ `font-semibold ${ card.amount < 0 ? 'text-red-500' : 'text-green-500' }` }>
                    { card.amount > 0 && "+" }{ formatCurrencyWithCode( card.amount ) }
                </Text>
            </View>
            <View className="self-end">
                <Text className="text-[10px] text-gray-500">{ card.date }</Text>
            </View>
        </WaveButton>
    );

}