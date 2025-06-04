import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { formatDate } from "@/utils/format";
import { useCardStore } from "@/store/useCardStore";
import TransactionItem from "./TransactionItem";

export default function TransactionList () 
{
    const [ currentDate ] = useState( new Date() );
    const [ visibleCount, setVisibleCount ] = useState( 5 );
    const selectedCard = useCardStore( state => state.selectedCard );
    const todayTransactions = selectedCard?.transactionHistory?.filter( ( item ) =>
    {
        const transactionDate = new Date( item.date );
        return (
            transactionDate.setHours( 0, 0, 0, 0 ) === new Date( currentDate ).setHours( 0, 0, 0, 0 )
        );
    } ).sort(
        ( a, b ) => new Date( b.date ).getTime() - new Date( a.date ).getTime()
    ) || [];

    // Transactions to display based on visibleCount
    const visibleTransactions = todayTransactions.slice( 0, visibleCount );

    // Handler for "Xem thêm" button to load 5 more transactions
    const handleLoadMore = () =>
    {
        setVisibleCount( ( prev ) => prev + 5 );
    };

    // Handler for "Ẩn bớt" button to reset visibleCount
    const handleHideLess = () =>
    {
        setVisibleCount( 5 );
    };

    return (
        <View>
            <View className="flex-row justify-between items-center px-4 pt-2">
                <View className="flex-row items-center gap-1">
                    <Text className="text-md font-bold text-black">Các giao dịch hôm nay</Text>
                    <Text className="text-md font-bold text-black">({ todayTransactions.length })</Text>
                </View>

                <TouchableOpacity
                    onPress={ () => router.push( "/(tabs)/history" ) }
                    className="flex-row items-center"
                >
                    <Text className="text-gray-400 text-sm mr-1 italic">Xem tất cả</Text>
                    <Octicons name="stack" size={ 14 } color="gray" />
                </TouchableOpacity>
            </View>

            <View className="px-4">
                <Text className="text-sm text-gray-400">{ formatDate( currentDate ) }</Text>
            </View>

            <View className="py-2 gap-1 flex-1 bg-white mx-4 rounded-lg mt-2 shadow-md min-h-[200px]">
                { visibleTransactions.length === 0 ? (
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-black text-center text-md italic">
                            Hôm nay chưa có giao dịch
                        </Text>
                    </View>
                ) : (
                    visibleTransactions.map( ( item ) => (
                        <View key={ item.transactionId } >
                            <TransactionItem
                                id={ item.transactionId }
                                amount={ item.amount }
                                time={ item.time }
                            />
                        </View>
                    ) )
                ) }
                <View className="flex-row items-center gap-4 px-4">
                    { visibleCount < todayTransactions.length && (
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={ handleLoadMore }
                        >
                            <Text className="text-black font-semibold text-sm">Xem thêm</Text>
                            <AntDesign name="arrowright" size={ 12 } color="black" />
                        </TouchableOpacity>
                    ) }

                    { visibleCount > 5 && (
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={ handleHideLess }
                        >
                            <Text className="text-black font-semibold text-sm">Ẩn bớt</Text>
                            <AntDesign name="arrowleft" size={ 12 } color="black" />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>
        </View>
    );
}


