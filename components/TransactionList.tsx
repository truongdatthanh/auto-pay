import { Image, Text, Touchable, TouchableOpacity, View } from "react-native";
import mockBankingCard from "@/assets/banking-card.json"
import { useState } from "react";
import { formatDate } from "@/utils/formatDate";
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";


export default function TransactionList ( { id }: { id: string } )
{
    const data = mockBankingCard;
    const [ currentDate, setCurrentDate ] = useState( new Date() );
    const indexData = data.find( ( item ) => item.id === id );
    const todayTransactions = indexData?.transactionHistory.filter( ( item ) =>
    {
        return new Date( item.date ).setHours( 0, 0, 0, 0 ) === currentDate.setHours( 0, 0, 0, 0 );
    } ) || [];


    return (
        <View className="bg-black rounded-xl h-[300px]">
            <View className="flex-row justify-between items-center px-4 py-2" >
                <Text className="text-md font-bold text-white">Giao dịch gần đây</Text>
                <TouchableOpacity className="flex-row items-center" onPress={ () => router.push( '/(tabs)/history' ) }>
                    <Text className="text-white font-semibold  text-sm">Xem thêm</Text>
                    <AntDesign name="arrowright" size={ 12 } color="white" />
                </TouchableOpacity>
            </View>

            <View className="p-4 gap-4">
                { todayTransactions.map( ( item ) => (
                    < View key={ item.transactionId } className="gap-4" >
                        <TouchableOpacity onPress={ () => router.push( { pathname: "/(tabs)/history/transaction/[id]", params: { id: item.transactionId } } ) }>
                            <View className="flex-row justify-between items-center">
                                <Text className={ `text-md font-semibold ${ item.amount < 0 ? 'text-red-500' : 'text-green-500' }` }>{ formatCurrencyVND( item.amount ) }</Text>
                                <Text className="text-sm text-gray-400">{ formatDate( item.date ) }</Text>
                            </View>
                        </TouchableOpacity>
                        <View className="border-b border-gray-200" />
                    </ View >
                ) ) }
            </View>
        </View>
    );

}
