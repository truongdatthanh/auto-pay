import { Image, Text, TouchableOpacity, View } from "react-native";
import mockBankingCard from "@/assets/banking-card.json";
import { useState } from "react";
import { AntDesign, Octicons } from "@expo/vector-icons";
import PaymentCard from "../card/PaymentCard";
import { router } from "expo-router";
import { formatDate } from "@/utils/format";

export default function TransactionList ( { id }: { id: string } )
{
    const data = mockBankingCard;
    const [ currentDate ] = useState( new Date() );
   
    const [ visibleCount, setVisibleCount ] = useState( 5 );
    const indexData = data.find( ( item ) => item.id === id );
    const todayTransactions =
        indexData?.transactionHistory
            .filter( ( item ) =>
            {
                const transactionDate = new Date( item.date );
                return (
                    transactionDate.setHours( 0, 0, 0, 0 ) ===
                    new Date( currentDate ).setHours( 0, 0, 0, 0 )
                );
            } )
            .sort(
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
        <View className="bg-white rounded-xl flex-1 shadow-md border border-gray-200">
            <View className="flex-row justify-between items-center px-4 pt-2">
                <Text className="text-md font-bold text-black">Giao dịch gần đây</Text>
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

            <View className="px-4 py-2 gap-1 flex-1">
                { visibleTransactions.length === 0 ? (
                    <View className="flex-1 h-[200px] justify-center items-center">
                        <Text className="text-black text-center text-md italic">
                            Hôm nay chưa có giao dịch
                        </Text>
                    </View>
                ) : (
                    visibleTransactions.map( ( item ) => (
                        <View key={ item.transactionId }>
                            <PaymentCard
                                id={ item.transactionId }
                                amount={ item.amount }
                                time={ item.date }
                            />
                        </View>
                    ) )
                ) }
                <View className="flex-row items-center gap-4">
                    { visibleCount < todayTransactions.length && (
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={ handleLoadMore }
                        >
                            <Text className="text-white font-semibold text-sm">Xem thêm</Text>
                            <AntDesign name="arrowright" size={ 12 } color="white" />
                        </TouchableOpacity>
                    ) }

                    { visibleCount > 5 && (
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={ handleHideLess }
                        >
                            <Text className="text-white font-semibold text-sm">Ẩn bớt</Text>
                            <AntDesign name="arrowleft" size={ 12 } color="white" />
                        </TouchableOpacity>
                    ) }
                </View>
            </View>
        </View>
    );
}


