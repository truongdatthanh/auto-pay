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
                    { formatDate( currentDate ) }
                </Text>
                <TouchableOpacity onPress={ () => router.replace( "/statistics" ) }>
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
// import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
// import { useState, useMemo, useEffect } from 'react';
// import dataBankingCard from "../assets/banking-card.json";
// import { formatCurrencyVND } from '@/utils/formatCurrencyVND';
// import { router } from 'expo-router';
// import { formatDate } from '@/utils/formatDate';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withTiming, FadeIn } from 'react-native-reanimated';

// export default function BarCharts ( { id }: { id: String } )
// {
//     const [ data, setData ] = useState( dataBankingCard );
//     const [ currentDate, setCurrentDate ] = useState( new Date() );
//     const [ isLoading, setIsLoading ] = useState( true );

//     const opacityValue = useSharedValue( 0 );
//     const translateYValue = useSharedValue( 20 );
//     const screenWidth = Dimensions.get( 'window' ).width;

//     useEffect( () =>
//     {
//         const timer = setTimeout( () =>
//         {
//             setIsLoading( false );
//             opacityValue.value = withTiming( 1, { duration: 600 } );
//             translateYValue.value = withTiming( 0, { duration: 800 } );
//         }, 500 );
//         return () => clearTimeout( timer );
//     }, [ currentDate ] );

//     const animatedStyle = useAnimatedStyle( () =>
//     {
//         return {
//             opacity: opacityValue.value,
//             transform: [ { translateY: translateYValue.value } ],
//         };
//     } );

//     const indexData = data.find( item => item.id === id );
//     const todayTransactions = indexData?.transactionHistory.filter( item =>
//     {
//         return new Date( item.date ).setHours( 0, 0, 0, 0 ) === currentDate.setHours( 0, 0, 0, 0 );
//     } ) || [];

//     const goToPreviousDay = () =>
//     {
//         const prevDay = new Date( currentDate );
//         prevDay.setDate( prevDay.getDate() - 1 );
//         setCurrentDate( prevDay );
//         opacityValue.value = 0;
//         translateYValue.value = 20;
//         setIsLoading( true );
//     };

//     const goToNextDay = () =>
//     {
//         const nextDay = new Date( currentDate );
//         nextDay.setDate( nextDay.getDate() + 1 );
//         if ( nextDay <= new Date() )
//         {
//             setCurrentDate( nextDay );
//             opacityValue.value = 0;
//             translateYValue.value = 20;
//             setIsLoading( true );
//         }
//     };

//     const isToday = ( date: Date ) =>
//     {
//         const today = new Date();
//         return date.getDate() === today.getDate() &&
//             date.getMonth() === today.getMonth() &&
//             date.getFullYear() === today.getFullYear();
//     };

//     const { totalIncome, totalExpense, barData, maxValue } = useMemo( () =>
//     {
//         let income = 0;
//         let expense = 0;

//         if ( todayTransactions.length === 0 )
//         {
//             return {
//                 totalIncome: 0,
//                 totalExpense: 0,
//                 barData: [],
//                 maxValue: 0,
//             };
//         }

//         todayTransactions.forEach( item =>
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
//             maxValue: maxVal + 0.5, // Thêm khoảng trống ở trên cùng
//             barData: [
//                 {
//                     value: expenseInMillions,
//                     label: 'Chi',
//                     frontColor: '#e74c3c',
//                     topLabelComponent: () => (
//                         <Text className="text-xs font-semibold text-neutral-800 mb-1">
//                             { expenseInMillions.toFixed( 1 ) }M
//                         </Text>
//                     ),
//                     gradientColor: '#c0392b',
//                 },
//                 {
//                     value: incomeInMillions,
//                     label: 'Thu',
//                     frontColor: '#2ecc71',
//                     topLabelComponent: () => (
//                         <Text className="text-xs font-semibold text-neutral-800 mb-1">
//                             { incomeInMillions.toFixed( 1 ) }M
//                         </Text>
//                     ),
//                     gradientColor: '#27ae60',
//                 },
//             ],
//         };
//     }, [ todayTransactions ] );

//     return (
//         <View className="p-4 rounded-2xl bg-white shadow-sm">

//             {/* Header */ }
//             <View className="flex-row justify-between items-center mb-4">
//                 <View className="flex-row items-center">
//                     <TouchableOpacity
//                         onPress={ goToPreviousDay }
//                         className="p-2 rounded-md bg-gray-100"
//                     >
//                         <Ionicons name="chevron-back" size={ 20 } color="#666" />
//                     </TouchableOpacity>
//                     <View className="flex-row items-center mx-2">
//                         <Text className="text-sm font-semibold text-neutral-800">
//                             { formatDate( currentDate ) }
//                         </Text>
//                         { isToday( currentDate ) && (
//                             <View className="ml-2 px-2 py-0.5 bg-blue-600 rounded">
//                                 <Text className="text-white text-[10px] font-medium">Hôm nay</Text>
//                             </View>
//                         ) }
//                     </View>
//                     <TouchableOpacity
//                         onPress={ goToNextDay }
//                         className="p-2 rounded-md bg-gray-100"
//                         disabled={ isToday( currentDate ) }
//                     >
//                         <Ionicons
//                             name="chevron-forward"
//                             size={ 20 }
//                             color={ isToday( currentDate ) ? "#ccc" : "#666" }
//                         />
//                     </TouchableOpacity>
//                 </View>

//                 <TouchableOpacity
//                     onPress={ () => router.replace( "/(tabs)/history/statistics" ) }
//                     className="flex-row items-center p-2"
//                 >
//                     <Text className="text-sm font-semibold text-blue-700 mr-1">Xem chi tiết</Text>
//                     <Ionicons name="arrow-forward" size={ 14 } color="#1c40f2" />
//                 </TouchableOpacity>
//             </View>
//             {/* -----------------------------------------End----------------------------------------- */ }

//             {/* Body */ }
//             <Animated.View
//                 style={ animatedStyle }
//                 className="h-[220px] justify-center items-center bg-blue-500"
//             >
//                 { isLoading ? (
//                     <View className="flex-1 justify-center items-center">
//                         <MaterialCommunityIcons name="chart-bar" size={ 40 } color="#ccc" />
//                         <Text className="mt-2 text-gray-600">Đang tải dữ liệu...</Text>
//                     </View>
//                 ) : todayTransactions.length === 0 ? (
//                     <View className="flex-1 justify-center items-center">
//                         <MaterialCommunityIcons name="chart-bar" size={ 40 } color="#ccc" />
//                         <Text className="mt-2 text-center text-gray-600">
//                             Không có giao dịch nào cho ngày này
//                         </Text>
//                     </View>
//                 ) : (
//                     <View className="flex-row items-center justify-between">
//                         <View className="flex-1 bg-red-500 ">
//                             <BarChart
//                                 data={ barData }
//                                 barWidth={ 90 }
//                                 spacing={ 10 }
//                                 barBorderRadius={ 8 }
//                                 yAxisThickness={ 0 }
//                                 xAxisThickness={ 1 }
//                                 xAxisColor="#e0e0e0"
//                                 yAxisTextStyle={ { color: 'transparent', width: 0 } }
//                                 yAxisLabelWidth={ 0 }
//                                 noOfSections={ 5 }
//                                 maxValue={ maxValue }
//                                 stepHeight={ 30 }
//                                 isAnimated={ true }
//                                 animationDuration={ 800 }
//                                 hideRules={ true }
//                                 hideAxesAndRules={ true }
//                                 showGradient={ true }
//                                 disablePress={ true }
//                             />
//                         </View>
//                         <View className="w-[120px] bg-gray-100 rounded-xl p-3 ml-4 bg-red-200">
//                             <View className="mb-2">
//                                 <View className="flex-row items-center mb-1">
//                                     <View className="w-2.5 h-2.5 rounded-full bg-green-500 mr-1.5" />
//                                     <Text className="text-xs text-gray-600">Thu nhập</Text>
//                                 </View>
//                                 <Text className="text-sm font-bold text-green-500 mb-0.5">
//                                     { formatCurrencyVND( totalIncome * 1_000_000 ) }
//                                 </Text>
//                                 <View className="flex-row items-center">
//                                     <MaterialCommunityIcons name="arrow-down-bold-circle" size={ 16 } color="#2ecc71" />
//                                     <Text className="text-[11px] text-gray-600 ml-1">
//                                         { todayTransactions.filter( t => t.amount > 0 ).length } giao dịch
//                                     </Text>
//                                 </View>
//                             </View>
//                             <View className="h-px bg-gray-300 my-2" />
//                             <View>
//                                 <View className="flex-row items-center mb-1">
//                                     <View className="w-2.5 h-2.5 rounded-full bg-red-500 mr-1.5" />
//                                     <Text className="text-xs text-gray-600">Chi tiêu</Text>
//                                 </View>
//                                 <Text className="text-sm font-bold text-red-500 mb-0.5">
//                                     { formatCurrencyVND( totalExpense * 1_000_000 ) }
//                                 </Text>
//                                 <View className="flex-row items-center">
//                                     <MaterialCommunityIcons name="arrow-up-bold-circle" size={ 16 } color="#e74c3c" />
//                                     <Text className="text-[11px] text-gray-600 ml-1">
//                                         { todayTransactions.filter( t => t.amount < 0 ).length } giao dịch
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>
//                 ) }
//             </Animated.View>
//             {/* -----------------------------------------End----------------------------------------- */ }
//         </View>
//     );
// }


