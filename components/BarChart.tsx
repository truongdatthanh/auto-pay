import { BarChart } from 'react-native-gifted-charts';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import dataBankingCard from "../assets/banking-card.json"
import { formatCurrencyVND } from '@/utils/formatCurrencyVND';
import { router } from 'expo-router';
import { formatDate } from '@/utils/formatDate';

export default function BarCharts ( { id }: { id: String } )
{
    const [ data, setData ] = useState( dataBankingCard );
    const [ currentDate, setCurrentDate ] = useState( new Date() );

    const indexData = data.find( ( item ) => item.id === id );
    const todayTransactions = indexData?.transactionHistory.filter( ( item ) =>
    {
        return new Date( item.date ).setHours( 0, 0, 0, 0 ) === currentDate.setHours( 0, 0, 0, 0 );
    } ) || [];

    const { totalIncome, totalExpense, barData, maxValue } = useMemo( () =>
    {
        let income = 0;
        let expense = 0;

        if ( todayTransactions.length === 0 )
        {
            return {
                totalIncome: 0,
                totalExpense: 0,
                barData: [],
                maxValue: 0,
            };
        }

        todayTransactions.forEach( item =>
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
    }, [ todayTransactions ] );

    return (
        <View className='p-4'>
            <View className='flex-row justify-between mb-2'>
                <Text className='text-sm font-bold'>
                    {formatDate(currentDate)}
                </Text>
                <TouchableOpacity onPress={ () => router.replace( "/(tabs)/history/statistics" ) }>
                    <Text className='text-sm font-bold text-blue-500'>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>


            <View style={ { height: 200 } } className="justify-center items-center">
                { todayTransactions.length === 0 ? (
                    <Text className='text-gray-500'>
                        Không có giao dịch nào cho ngày hôm nay
                    </Text>
                ) : (
                    <View className='flex-row'>
                        {/* BarChart */ }
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
                                yAxisLabelWidth={ 0 }
                                noOfSections={ 5 }
                                spacing={ 10 }
                                maxValue={ maxValue }
                                stepHeight={ 30 }
                                isAnimated={ false }
                                animationDuration={ 800 }
                                hideRules={ true }
                                hideAxesAndRules={ true }
                            />
                        </View>

                        {/* Tổng kết thu/chi */ }
                        <View className='justify-end mb-2'>
                            <View className='mb-2'>
                                <Text className='text-[#2ecc71] font-bold'>
                                    { formatCurrencyVND( totalIncome * 1_000_000 ) }
                                </Text>
                                <Text>{ todayTransactions.filter( t => t.amount > 0 ).length } Giao dịch đến</Text>
                            </View>
                            <View>
                                <Text className='text-[#e74c3c] font-bold'>
                                    { formatCurrencyVND( totalExpense * 1_000_000 ) }
                                </Text>
                                <Text>{ todayTransactions.filter( t => t.amount < 0 ).length } Giao dịch đi</Text>
                            </View>
                        </View>
                    </View>
                ) }
            </View>
        </View>
    );
}







// import { BarChart } from 'react-native-gifted-charts';
// import { View, Text } from 'react-native';
// import mockData from '../../assets/data.json';
// import { useState, useMemo } from 'react';

// export default function Chart ()
// {
//     const [ data, setData ] = useState( mockData );

//     const { totalIncome, totalExpense, barData, maxValue } = useMemo( () =>
//     {
//         let income = 0;
//         let expense = 0;

//         data.forEach( item =>
//         {
//             if ( item.amount > 0 )
//             {
//                 income += item.amount;
//             } else
//             {
//                 expense += item.amount;
//             }
//         } );

//         const incomeInMillions = income / 1_000_000;
//         const expenseInMillions = -expense / 1_000_000;

//         const maxVal = Math.ceil( Math.max( incomeInMillions, expenseInMillions ) );

//         return {
//             totalIncome: incomeInMillions,
//             totalExpense: expenseInMillions,
//             maxValue: maxVal,
//             barData: [
//                 { value: expenseInMillions, label: 'Chi', frontColor: '#e74c3c' },
//                 { value: incomeInMillions, label: 'Thu', frontColor: '#2ecc71' },
//             ],
//         };
//     }, [ data ] );

//     return (
//         <View className='flex-1 bg-white p-4'>
//             <Text className='text-sm font-bold mb-4'>
//                 Tổng giao dịch (đơn vị: triệu)
//             </Text>

//             <View className='items-start'>
//                 <BarChart
//                     dashGap={ 0 }
//                     data={ barData }
//                     barWidth={ 90 }
//                     barBorderRadius={ 4 }
//                     yAxisThickness={ 0 }
//                     xAxisThickness={ 0 }
//                     xAxisColor="#ccc"
//                     yAxisTextStyle={ { color: 'transparent', width: 0 } }
//                     yAxisLabelWidth={0}
//                     noOfSections={ 5 }
//                     spacing={ 10 }
//                     maxValue={ maxValue }
//                     stepHeight={ 30 }
//                     isAnimated
//                     animationDuration={ 800 } //Thời gian animation
//                     hideRules={ true }//Xóa các đường kẻ ngang
//                     hideAxesAndRules={ true } //Xóa các đường kẻ dọc
//                 />
//             </View>

//         </View>
//     );
// }



