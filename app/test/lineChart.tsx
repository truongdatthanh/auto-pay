import React, { useMemo, useState } from 'react';
import { LineChart } from "react-native-gifted-charts";
import { View, Text } from 'react-native';
import dataBankingCard from "../../assets/banking-card.json";

const daysOfWeek = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

export default function LineCharts ( { id }: { id: string } )
{
    
    const [data, setData] = useState(dataBankingCard);//set đữ liệu
    const indexData = data.find((item) => item.id === id);//tìm ra data theo id

    const { incomeData, expenseData, maxValue } = useMemo(() => {
        const incomeByDay = Array(7).fill(0);// /tạo mảng 7 ngày trong tuần
        const expenseByDay = Array(7).fill(0);

        if (!indexData || !indexData.transactionHistory) {
            return { incomeData: [], expenseData: [], maxValue: 0 };
        }

        indexData.transactionHistory.forEach(item => {
            const date = new Date(item.date);
            const day = (date.getDay() + 6) % 7; // convert Sunday=0 to 6, Monday=1 to 0, etc.
            if (item.amount > 0) {
                incomeByDay[day] += item.amount;
            } else {
                expenseByDay[day] += Math.abs(item.amount);
            }
        });

        const incomeData = incomeByDay.map((value, i) => ({
            value: Math.round(value / 1_000_000),
            label: daysOfWeek[i],
            dataPointText: `${Math.round(value / 1_000_000)}`
        }));

        const expenseData = expenseByDay.map((value, i) => ({
            value: Math.round(value / 1_000_000),
            label: daysOfWeek[i],
            dataPointText: `${Math.round(value / 1_000_000)}`
        }));

        const maxVal = Math.max(
            ...incomeData.map(d => d.value),
            ...expenseData.map(d => d.value)
        );

        return {
            incomeData,
            expenseData,
            maxValue: Math.ceil(maxVal + 5)
        };
    }, [indexData]);

    return (
        <View>
            <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
                Thống kê thu & chi theo ngày trong tuần (triệu VND)
            </Text>
            <LineChart
                data={expenseData}
                data2={incomeData}
                height={250}
                spacing={50}
                initialSpacing={20}
                color1="#e74c3c" // chi tiêu
                color2="#2ecc71" // thu nhập
                dataPointsColor1="#e74c3c"
                dataPointsColor2="#2ecc71"
                textColor1="#000"
                textColor2="#000"
                textFontSize={13}
                showVerticalLines={false}
                maxValue={maxValue}
                noOfSections={5}
                yAxisColor="#999"
                xAxisColor="#999"
                
            />
        </View>
    );
}
