import React, { useMemo, useState } from 'react';
import { CurveType, LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions } from 'react-native';
import dataBankingCard from "../../assets/banking-card.json";
import { formatDate } from '@/utils/formatDate';


const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];

export default function LineCharts ( { id }: { id: string } )
{
    const [ data, setData ] = useState( dataBankingCard );
    const indexData = data.find( ( item ) => item.id === id );
    const screenWidth = Dimensions.get( 'window' ).width;
    const dataLength = 7; // vì bạn có 7 ngày trong tuần
    const spacing = 45; // spacing hiện tại bạn dùng
    const initialSpacing = 20;
    const chartWidth = initialSpacing + spacing * ( dataLength - 1 );

    // Ngày hiện tại (reset về 00:00:00)
    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );

    // Lấy ngày đầu tuần (Thứ 2)
    const startOfWeek = new Date( currentDate );
    console.log( "startOfweek: ", formatDate( startOfWeek ) )
    const currentDay = ( currentDate.getDay() + 6 ) % 7; // Thứ 2 là 0, CN là 6
    console.log( "currentDay: ", currentDay )
    startOfWeek.setDate( currentDate.getDate() - currentDay );
    console.log( "startOfweek sau khi chuyen: ", formatDate( startOfWeek ) )

    const { incomeData, expenseData, maxValue } = useMemo( () =>
    {
        const incomeByDay = Array( 7 ).fill( 0 );
        const expenseByDay = Array( 7 ).fill( 0 );

        if ( !indexData || !indexData.transactionHistory )
        {
            return { incomeData: [], expenseData: [], maxValue: 0 };
        }

        indexData.transactionHistory.forEach( item =>
        {
            const date = new Date( item.date );
            date.setHours( 0, 0, 0, 0 );

            // Chỉ tính các giao dịch trong tuần hiện tại
            const diff = date.getTime() - startOfWeek.getTime();
            const dayIndex = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
            if ( dayIndex >= 0 && dayIndex < 7 )
            {
                if ( item.amount > 0 )
                {
                    incomeByDay[ dayIndex ] += item.amount;
                } else
                {
                    expenseByDay[ dayIndex ] += item.amount;
                }
            }
        } );

        const incomeData = incomeByDay.map( ( value, i ) =>
        {
            const formattedValue = parseFloat( ( value / 1_000_000 ).toFixed( 1 ) );
            return {
                value: formattedValue,
                label: daysOfWeek[ i ],
                dataPointText: formattedValue.toString(),

            };
        } );

        const expenseData = expenseByDay.map( ( value, i ) =>
        {
            const formattedValue = parseFloat( ( -value / 1_000_000 ).toFixed( 1 ) );
            return {
                value: formattedValue,
                label: daysOfWeek[ i ],
                dataPointText: formattedValue.toString(),

            };
        } );

        const maxVal = Math.max(
            ...incomeData.map( d => d.value ),
            ...expenseData.map( d => d.value )
        );

        return {
            incomeData,
            expenseData,
            maxValue: Math.ceil( maxVal + 5 )
        };
    }, [ indexData ] );

    console.log( "income", incomeData )
    console.log( "expen", expenseData )

    return (
        <View>
            <View className='bg-blue-200 rounded-xl p-4 mx-2 border border-gray-500'>
                <LineChart
                    data={ expenseData }
                    data2={ incomeData }
                    height={ 250 }
                    width={ chartWidth }
                    spacing={ spacing }//Khoảng cách giữa các cột
                    initialSpacing={ initialSpacing }// Vị trí bắt đầu cách trục Y
                    color1="#e74c3c" // chi tiêu
                    color2="#2ecc71" // thu nhập
                    dataPointsColor1="#e74c3c"
                    dataPointsColor2="#2ecc71"
                    textColor1="#000"
                    textColor2="#000"
                    thickness1={ 4 }
                    thickness2={ 3.0 }
                    dataPointsWidth={ 5 }
                    dataPointsHeight={ 5 }
                    textFontSize={ 13 }
                    showVerticalLines={ false }//Đường kẻ dọc
                    maxValue={ maxValue }
                    noOfSections={ 5 }//Số lượng phần tử thể hiện trên trục Y
                    yAxisColor="#999"
                    xAxisColor="#999"
                    showValuesAsDataPointsText
                    hideRules//Đường kẻ ngang
                    curved
                    curveType={ CurveType.QUADRATIC }
                />
            </View>

            <View className='items-center flex-row justify-center gap-4 mt-4'>
                <View className='flex-row items-center'>
                    <View className='h-4 w-4 bg-green-500 rounded-full mr-2'></View>
                    <Text>Thu</Text>
                </View>

                <View className='flex-row items-center'>
                    <View className='h-4 w-4 bg-red-500 rounded-full mr-2'></View>
                    <Text>Chi</Text>
                </View>

            </View>
        </View>

    );
}

