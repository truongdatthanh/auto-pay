// screens/TransactionStatsScreen.tsx

import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import { LineChart, BarChart, StackedBarChart } from "react-native-chart-kit";

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

const data = {
    labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
    datasets: [
        {
            data: [ 1200000, 900000, 1800000, 1400000, 2200000, 300000, 1000000 ],
            color: ( opacity = 1 ) => `rgba(0, 255, 132, ${ opacity })`, // ✅ Line 1 (Chi tiêu)
            strokeWidth: 2,
        },
        {
            data: [ 500000, 700000, 1100000, 800000, 1500000, 600000, 900000 ],
            color: ( opacity = 1 ) => `rgba(255, 99, 132, ${ opacity })`, // ✅ Line 2 (Thu nhập)
            strokeWidth: 2,
        },
    ],
    legend: [ "Chi tiêu", "Thu nhập" ],
};

const stackedBarData = {
    labels: [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
    legend: [ "Chi tiêu", "Thu nhập" ],
    data: [
        [ 500000, 700000 ],   // Monday
        [ 300000, 600000 ],   // Tuesday
        [ 900000, 900000 ],   // Wednesday
        [ 800000, 600000 ],   // Thursday
        [ 1300000, 900000 ],  // Friday
        [ 200000, 100000 ],   // Saturday
        [ 500000, 500000 ],   // Sunday
    ],
    barColors: [ "#ff4d4f", "#52c41a" ], // Red for expense, Green for income
};

export default function TransactionStatsScreen ()
{
    return (
        <ScrollView style={ { flex: 1, backgroundColor: "#000" } }>
            <View style={ { padding: 20 } }>
                <Text style={ { color: "white", fontSize: 22, fontWeight: "bold", marginBottom: 10 } }>
                    Thống kê giao dịch trong tuần
                </Text>

                <LineChart
                    data={ data }
                    width={ screenWidth - 40 }
                    height={ 260 }
                    chartConfig={ chartConfig }
                    bezier
                    style={ {
                        borderRadius: 16,
                    } }
                />

                <Text style={ { color: "white", fontSize: 18, marginTop: 30, marginBottom: 10 } }>
                    Tổng chi tiêu hàng ngày (BarChart)
                </Text>

                <StackedBarChart
                    data={ stackedBarData }
                    width={ screenWidth - 40 }
                    height={ 220 }
                    yAxisLabel="₫"
                    chartConfig={ chartConfig }
                    verticalLabelsHeightPercentage={ 0.5 }
                    withVerticalLabels={ true }
                    hideLegend={ false }
                    style={ {
                        borderRadius: 16,
                    } }
                />
            </View>
        </ScrollView>
    );
}
