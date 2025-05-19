import React, { useMemo, useState } from 'react';
import { CurveType, LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import dataBankingCard from "../assets/banking-card.json";
import { formatDate } from '@/utils/formatDate';
import { formatCurrencyVND } from '@/utils/formatCurrencyVND';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];

export default function LineCharts ( { id }: { id: string } )
{
    const [ data, setData ] = useState( dataBankingCard );
    const [ activeTab, setActiveTab ] = useState<'income' | 'expense' | 'both'>( 'both' );
    const [ weekOffset, setWeekOffset ] = useState( 0 ); // ← Tuần trước/sau

    const indexData = data.find( ( item ) => item.id === id );
    const dataLength = 7;
    const spacing = 45;
    const initialSpacing = 20;
    const chartWidth = initialSpacing + spacing * ( dataLength - 1 );

    // Ngày hiện tại reset về 00:00
    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );

    // Lấy ngày bắt đầu tuần cần hiển thị
    const currentDay = ( currentDate.getDay() + 6 ) % 7;
    const startOfWeek = new Date( currentDate );
    startOfWeek.setDate( currentDate.getDate() - currentDay + weekOffset * 7 );

    const { incomeData, expenseData, maxValue, totalIncome, totalExpense } = useMemo( () =>
    {
        const incomeByDay = Array( 7 ).fill( 0 );
        const expenseByDay = Array( 7 ).fill( 0 );
        let totalInc = 0;
        let totalExp = 0;

        if ( !indexData || !indexData.transactionHistory )
        {
            return { incomeData: [], expenseData: [], maxValue: 0, totalIncome: 0, totalExpense: 0 };
        }

        indexData.transactionHistory.forEach( item =>
        {
            const date = new Date( item.date );
            date.setHours( 0, 0, 0, 0 );

            const diff = date.getTime() - startOfWeek.getTime();
            const dayIndex = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );

            if ( dayIndex >= 0 && dayIndex < 7 )
            {
                if ( item.amount > 0 )
                {
                    incomeByDay[ dayIndex ] += item.amount;
                    totalInc += item.amount;
                } else
                {
                    expenseByDay[ dayIndex ] += item.amount;
                    totalExp += Math.abs( item.amount );
                }
            }
        } );

        const incomeData = incomeByDay.map( ( value, i ) =>
        {
            const formattedValue = parseFloat( ( value / 1_000_000 ).toFixed( 1 ) );
            return {
                value: formattedValue,
                label: daysOfWeek[ i ],
                dataPointText: formattedValue > 0 ? formattedValue.toString() : '',
                topLabelComponent: () => formattedValue > 0 ? (
                    <Text className="text-xs text-gray-600 mb-1">{ formattedValue.toFixed( 1 ) }M</Text>
                ) : null
            };
        } );

        const expenseData = expenseByDay.map( ( value, i ) =>
        {
            const formattedValue = parseFloat( ( -value / 1_000_000 ).toFixed( 1 ) );
            return {
                value: formattedValue,
                label: daysOfWeek[ i ],
                dataPointText: formattedValue > 0 ? formattedValue.toString() : '',
                topLabelComponent: () => formattedValue > 0 ? (
                    <Text className="text-xs text-gray-600 mb-1">{ formattedValue.toFixed( 1 ) }M</Text>
                ) : null
            };
        } );

        const maxVal = Math.max(
            ...incomeData.map( d => d.value ),
            ...expenseData.map( d => d.value )
        );


        return {
            incomeData,
            expenseData,
            maxValue: Math.ceil( maxVal + 1 ),
            totalIncome: totalInc,
            totalExpense: totalExp
        };
    }, [ indexData, startOfWeek ] );

    const getChartData = () =>
    {
        switch ( activeTab )
        {
            case 'income':
                return { data1: incomeData, data2: [] };
            case 'expense':
                return { data1: expenseData, data2: [] };
            case 'both':
            default:
                return { data1: expenseData, data2: incomeData };
        }
    };

    const { data1, data2 } = getChartData();

    return (
        <Animated.View entering={ FadeIn.duration( 500 ) } className="bg-white rounded-2xl p-4 m-2 shadow-sm">
            <View className="mb-4">
                <Text className="text-lg font-bold text-gray-800">Biểu đồ thu chi theo tuần</Text>

                {/* Nút chuyển tuần */ }
                <View className="flex-row justify-between items-center mt-2">
                    <TouchableOpacity onPress={ () => setWeekOffset( prev => prev - 1 ) }>
                        <Ionicons name="chevron-back" size={ 20 } color="#666" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-500">
                        { formatDate( startOfWeek ) } - { formatDate( new Date( startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000 ) ) }
                    </Text>
                    <TouchableOpacity
                        onPress={ () => setWeekOffset( prev => prev + 1 ) }
                        disabled={ weekOffset >= 0 }
                    >
                        <Ionicons
                            name="chevron-forward"
                            size={ 20 }
                            color={ `${ weekOffset >= 0 ? '#ccc' : '' }` }
                        />
                    </TouchableOpacity>
                </View>
            </View>

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
                <Text className="text-xs text-gray-500 absolute -left-3 -top-6 z-10">{ `(Đơn vị: Triệu VNĐ)` }</Text>
                <LineChart
                    data={ data1 }
                    data2={ data2 }
                    height={ 220 }
                    width={ chartWidth }
                    spacing={ spacing }
                    initialSpacing={ initialSpacing }
                    color1="#e74c3c"
                    color2="#2ecc71"
                    dataPointsColor1="#e74c3c"
                    dataPointsColor2="#2ecc71"
                    startFillColor1="rgba(231, 76, 60, 0.2)"
                    startFillColor2="rgba(46, 204, 113, 0.2)"
                    endFillColor1="rgba(231, 76, 60, 0.0)"
                    endFillColor2="rgba(46, 204, 113, 0.0)"
                    textColor1="#333"
                    textColor2="#333"
                    thickness={ 3 }
                    dataPointsWidth={ 6 }
                    dataPointsHeight={ 6 }
                    textFontSize={ 12 }
                    showVerticalLines={ false }
                    maxValue={ maxValue }
                    noOfSections={ 5 }
                    yAxisColor="#ddd"
                    xAxisColor="#ddd"
                    yAxisTextStyle={ { color: '#999', fontSize: 10 } }
                    showValuesAsDataPointsText={ false }
                    hideRules
                    curved
                    curvature={ 0.3 }
                    curveType={ CurveType.QUADRATIC }
                    hideDataPoints1={ activeTab === 'income' }
                    hideDataPoints2={ activeTab === 'expense' }
                    areaChart
                />
            </View>

            <View className="flex-row justify-center mt-4">
                { ( activeTab === 'both' || activeTab === 'income' ) && (
                    <View className="flex-row items-center mx-3">
                        <View className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                        <Text className="text-sm text-gray-600">Thu nhập</Text>
                    </View>
                ) }
                { ( activeTab === 'both' || activeTab === 'expense' ) && (
                    <View className="flex-row items-center mx-3">
                        <View className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                        <Text className="text-sm text-gray-600">Chi tiêu</Text>
                    </View>
                ) }
            </View>
        </Animated.View>
    );
}










