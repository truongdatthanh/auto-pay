import { BarChart } from 'react-native-gifted-charts';
import { View, Text } from 'react-native';
import mockData from '../../assets/data.json';
import { useState, useMemo } from 'react';

export default function Chart ()
{
    const [ data, setData ] = useState( mockData );

    const { totalIncome, totalExpense, barData, maxValue } = useMemo( () =>
    {
        let income = 0;
        let expense = 0;

        data.forEach( item =>
        {
            if ( item.amount > 0 )
            {
                income += item.amount;
            } else
            {
                expense += item.amount;
            }
        } );

        const incomeInMillions = income / 1_000_000;
        const expenseInMillions = -expense / 1_000_000;

        const maxVal = Math.ceil( Math.max( incomeInMillions, expenseInMillions ) );

        return {
            totalIncome: incomeInMillions,
            totalExpense: expenseInMillions,
            maxValue: maxVal,
            barData: [
                { value: expenseInMillions, label: 'Chi', frontColor: '#e74c3c' },
                { value: incomeInMillions, label: 'Thu', frontColor: '#2ecc71' },
            ],
        };
    }, [ data ] );

    return (
        <View className='flex-1 bg-white p-4'>
            <Text className='text-sm font-bold mb-4'>
                Tổng giao dịch (đơn vị: triệu)
            </Text>

            <View className='items-start'>
                <BarChart
                    dashGap={ 0 }
                    data={ barData }
                    barWidth={ 90 }
                    barBorderRadius={ 4 }
                    yAxisThickness={ 0 }
                    xAxisThickness={ 0 }
                    xAxisColor="#ccc"
                    yAxisTextStyle={ { color: 'transparent', width: 0 } }
                    yAxisLabelWidth={0}
                    noOfSections={ 5 }
                    spacing={ 10 }
                    maxValue={ maxValue }
                    stepHeight={ 30 }
                    isAnimated
                    animationDuration={ 800 } //Thời gian animation
                    hideRules={ true }//Xóa các đường kẻ ngang
                    hideAxesAndRules={ true } //Xóa các đường kẻ dọc
                />
            </View>

        </View>
    );
}
