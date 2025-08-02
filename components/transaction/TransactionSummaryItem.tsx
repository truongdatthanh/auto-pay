import { useCardStore } from "@/store/useCardStore";
import { formatCurrencyWithoutCode } from "@/utils/format";
import { useMemo } from "react";
import { Text, View } from "react-native";

export default function TransactionSummaryCard ()
{
    const selectedCard = useCardStore( ( state ) => state.selectedCard );

    const { income, expense, incomeCount, expenseCount } = useMemo( () =>
    {
        if ( !selectedCard?.transactionHistory ) return {
            income: 0,
            expense: 0,
            incomeCount: 0,
            expenseCount: 0,
        };

        const today = new Date();
        const isSameDay = ( date1: Date, date2: Date ) =>
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();

        let income = 0;
        let expense = 0;
        let incomeCount = 0;
        let expenseCount = 0;

        selectedCard.transactionHistory.forEach( ( tx ) =>
        {
            const txDate = new Date( tx.date );
            if ( isSameDay( today, txDate ) )
            {
                const amount = Number( tx.amount || 0 );
                if ( amount >= 0 )
                {
                    income += amount;
                    incomeCount += 1;
                } else
                {
                    expense += Math.abs( amount );
                    expenseCount += 1;
                }
            }
        } );

        return { income, expense, incomeCount, expenseCount };
    }, [ selectedCard?.transactionHistory ] );

    return (
        <View className="flex-row h-[150px] gap-4 mb-4 px-4">
            <View className="w-[48%] border border-white rounded-2xl px-4 py-3 justify-between">
                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-sm font-medium">Tiền ra</Text>
                    <View className="w-6 h-6 bg-red-500 rounded-full items-center justify-center">
                        <Text className="text-white text-xs">↓</Text>
                    </View>
                </View>
                <View className="flex-1 justify-end">
                    <Text className="text-white text-lg font-bold" numberOfLines={ 1 } adjustsFontSizeToFit>

                        { formatCurrencyWithoutCode( expense ) } ₫
                    </Text>
                    <Text className="text-gray-300 text-xs mt-1">
                        { expenseCount } giao dịch
                    </Text>
                </View>
            </View>

            <View className="w-[48%] border border-white rounded-2xl px-4 py-3 justify-between">
                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-sm font-medium">Tiền vào</Text>
                    <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center">
                        <Text className="text-white text-xs">↑</Text>
                    </View>
                </View>
                <View className="flex-1 justify-end">
                    <Text className="text-white text-lg font-bold" numberOfLines={ 1 } adjustsFontSizeToFit>
                        { formatCurrencyWithoutCode( income ) } ₫
                    </Text>
                    <Text className="text-gray-300 text-xs mt-1">
                        { incomeCount } giao dịch
                    </Text>
                </View>
            </View>
        </View>
    );
};
