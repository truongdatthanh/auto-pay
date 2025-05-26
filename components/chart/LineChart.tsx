
import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import dataBankingCard from "@/assets/banking-card.json";
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { formatCurrencyVND } from '@/utils/format';

const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];
const screenWidth = Dimensions.get( "window" ).width;

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientTo: "#08130D",
    color: ( opacity = 1 ) => `rgba(255, 255, 255, ${ opacity })`,
    labelColor: () => "#ffffff",
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForDots: {
        r: "4",
        strokeWidth: "2",
        stroke: "#ffa726",
    },
};

// 👉 Utility function to process transactions
function processTransactionData ( transactionHistory: any[] )
{
    const incomeByDay = Array( 7 ).fill( 0 );
    const expenseByDay = Array( 7 ).fill( 0 );
    let totalIncome = 0;
    let totalExpense = 0;

    const today = new Date();
    today.setHours( 0, 0, 0, 0 );
    const startOfWeek = new Date( today );

    transactionHistory.forEach( item =>
    {
        const date = new Date( item.date );
        date.setHours( 0, 0, 0, 0 );
        const dayIndex = Math.floor( ( date.getTime() - startOfWeek.getTime() ) / ( 1000 * 60 * 60 * 24 ) );

        if ( dayIndex >= 0 && dayIndex < 7 )
        {
            if ( item.amount > 0 )
            {
                incomeByDay[ dayIndex ] += item.amount;
                totalIncome += item.amount;
            } else
            {
                expenseByDay[ dayIndex ] += Math.abs( item.amount );
                totalExpense += Math.abs( item.amount );
            }
        }
    } );

    const formatChartData = ( values: number[] ) =>
        values.map( val => parseFloat( ( val / 1_000_000 ).toFixed( 1 ) ) );

    return {
        incomeData: formatChartData( incomeByDay ),
        expenseData: formatChartData( expenseByDay ),
        totalIncome,
        totalExpense,
        maxValue: Math.ceil(
            Math.max( ...incomeByDay, ...expenseByDay ) / 1_000_000
        ) + 1,
    };
}


export default function LineCharts ( { id }: { id: string } )
{
    const selectedCard = dataBankingCard.find( item => item.id === id );

    const {
        incomeData,
        expenseData,
        maxValue,
        totalIncome,
        totalExpense
    } = useMemo( () =>
    {
        if ( !selectedCard?.transactionHistory )
        {
            return {
                incomeData: [],
                expenseData: [],
                maxValue: 0,
                totalIncome: 0,
                totalExpense: 0
            };
        }
        return processTransactionData( selectedCard.transactionHistory );
    }, [ selectedCard ] );

    return (
        <Animated.View entering={ FadeIn.duration( 500 ) } className="bg-white rounded-2xl p-4 m-2 shadow-sm">
            <Text className="text-lg font-bold text-gray-800 mb-4">Biểu đồ thu chi theo tuần</Text>

            <View className="flex-row justify-between mb-5">
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-green-500 justify-center items-center mr-3">
                        <Ionicons name="arrow-down" size={ 16 } color="#fff" />
                    </View>
                    <View>
                        <Text className="text-base font-bold text-gray-800">{ formatCurrencyVND( totalIncome ) }</Text>
                        <Text className="text-xs text-gray-500">Thu nhập</Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    <View className="w-8 h-8 rounded-full bg-red-500 justify-center items-center mr-3">
                        <Ionicons name="arrow-up" size={ 16 } color="#fff" />
                    </View>
                    <View>
                        <Text className="text-base font-bold text-gray-800">{ formatCurrencyVND( totalExpense ) }</Text>
                        <Text className="text-xs text-gray-500">Chi tiêu</Text>
                    </View>
                </View>
            </View>

            <View className="items-center my-2 relative">
                <Text className="text-xs text-gray-500 absolute -left-3 -top-6 z-10">(Đơn vị: Triệu VNĐ)</Text>
                <LineChart
                    data={ {
                        labels: daysOfWeek,
                        datasets: [
                            {
                                data: expenseData,
                                color: ( opacity = 1 ) => `rgba(255, 99, 132, ${ opacity })`,
                                strokeWidth: 2,
                            },
                            {
                                data: incomeData,
                                color: ( opacity = 1 ) => `rgba(0, 200, 132, ${ opacity })`,
                                strokeWidth: 2,
                            },
                        ],
                        legend: [ 'Chi tiêu', 'Thu nhập' ],
                    } }
                    width={ screenWidth - 40 }
                    height={ 260 }
                    chartConfig={ chartConfig }
                    bezier
                    style={ { borderRadius: 16 } }
                    withDots
                    withVerticalLabels={ false }  // Ẩn trục Y
                    renderDotContent={ ( { x, y, index, indexData } ) =>
                    {
                        return (
                            <Text
                                key={ index }
                                style={ {
                                    position: 'absolute',
                                    top: y - 20,
                                    left: x - 10,
                                    color: indexData ? "red" : 'black',
                                    fontSize: 12,
                                    fontWeight: '700',
                                } }
                            >
                                { indexData ? formatCurrencyVND( indexData * 1_000_000 ) : ''}
                            </Text>
                        );
                    } }
                />
            </View>
        </Animated.View>
    );
}
