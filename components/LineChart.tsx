// import React, { useMemo, useState } from 'react';
// import { CurveType, LineChart } from "react-native-gifted-charts";
// import { View, Text, Dimensions } from 'react-native';
// import dataBankingCard from "../assets/banking-card.json";
// import { formatDate } from '@/utils/formatDate';


// const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];

// export default function LineCharts ( { id }: { id: string } )
// {
//     const [ data, setData ] = useState( dataBankingCard );
//     const indexData = data.find( ( item ) => item.id === id );
//     const screenWidth = Dimensions.get( 'window' ).width;
//     const dataLength = 7; // vì bạn có 7 ngày trong tuần
//     const spacing = 45; // spacing hiện tại bạn dùng
//     const initialSpacing = 20;
//     const chartWidth = initialSpacing + spacing * ( dataLength - 1 );

//     // Ngày hiện tại (reset về 00:00:00)
//     const currentDate = new Date();
//     currentDate.setHours( 0, 0, 0, 0 );

//     // Lấy ngày đầu tuần (Thứ 2)
//     const startOfWeek = new Date( currentDate );
//     console.log( "startOfweek: ", formatDate( startOfWeek ) )
//     const currentDay = ( currentDate.getDay() + 6 ) % 7; // Thứ 2 là 0, CN là 6
//     console.log( "currentDay: ", currentDay )
//     startOfWeek.setDate( currentDate.getDate() - currentDay );
//     console.log( "startOfweek sau khi chuyen: ", formatDate( startOfWeek ) )

//     const { incomeData, expenseData, maxValue } = useMemo( () =>
//     {
//         const incomeByDay = Array( 7 ).fill( 0 );
//         const expenseByDay = Array( 7 ).fill( 0 );

//         if ( !indexData || !indexData.transactionHistory )
//         {
//             return { incomeData: [], expenseData: [], maxValue: 0 };
//         }

//         indexData.transactionHistory.forEach( item =>
//         {
//             const date = new Date( item.date );
//             date.setHours( 0, 0, 0, 0 );

//             // Chỉ tính các giao dịch trong tuần hiện tại
//             const diff = date.getTime() - startOfWeek.getTime();
//             const dayIndex = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
//             if ( dayIndex >= 0 && dayIndex < 7 )
//             {
//                 if ( item.amount > 0 )
//                 {
//                     incomeByDay[ dayIndex ] += item.amount;
//                 } else
//                 {
//                     expenseByDay[ dayIndex ] += item.amount;
//                 }
//             }
//         } );

//         const incomeData = incomeByDay.map( ( value, i ) =>
//         {
//             const formattedValue = parseFloat( ( value / 1_000_000 ).toFixed( 1 ) );
//             return {
//                 value: formattedValue,
//                 label: daysOfWeek[ i ],
//                 dataPointText: formattedValue.toString(),

//             };
//         } );

//         const expenseData = expenseByDay.map( ( value, i ) =>
//         {
//             const formattedValue = parseFloat( ( -value / 1_000_000 ).toFixed( 1 ) );
//             return {
//                 value: formattedValue,
//                 label: daysOfWeek[ i ],
//                 dataPointText: formattedValue.toString(),

//             };
//         } );

//         const maxVal = Math.max(
//             ...incomeData.map( d => d.value ),
//             ...expenseData.map( d => d.value )
//         );

//         return {
//             incomeData,
//             expenseData,
//             maxValue: Math.ceil( maxVal + 5 )
//         };
//     }, [ indexData ] );

//     console.log( "income", incomeData )
//     console.log( "expen", expenseData )

//     return (
//         <View>
//             <View className='bg-blue-200 rounded-xl p-4 mx-2 border border-gray-500'>
//                 <LineChart
//                     data={ expenseData }
//                     data2={ incomeData }
//                     height={ 250 }
//                     width={ chartWidth }
//                     spacing={ spacing }//Khoảng cách giữa các cột
//                     initialSpacing={ initialSpacing }// Vị trí bắt đầu cách trục Y
//                     color1="#e74c3c" // chi tiêu
//                     color2="#2ecc71" // thu nhập
//                     dataPointsColor1="#e74c3c"
//                     dataPointsColor2="#2ecc71"
//                     textColor1="#000"
//                     textColor2="#000"
//                     thickness1={ 4 }
//                     thickness2={ 3.0 }
//                     dataPointsWidth={ 5 }
//                     dataPointsHeight={ 5 }
//                     textFontSize={ 13 }
//                     showVerticalLines={ false }//Đường kẻ dọc
//                     maxValue={ maxValue }
//                     noOfSections={ 5 }//Số lượng phần tử thể hiện trên trục Y
//                     yAxisColor="#999"
//                     xAxisColor="#999"
//                     showValuesAsDataPointsText
//                     hideRules//Đường kẻ ngang
//                     curved
//                     curveType={ CurveType.QUADRATIC }
//                 />
//             </View>

//             <View className='items-center flex-row justify-center gap-4 mt-4'>
//                 <View className='flex-row items-center'>
//                     <View className='h-4 w-4 bg-green-500 rounded-full mr-2'></View>
//                     <Text>Thu</Text>
//                 </View>

//                 <View className='flex-row items-center'>
//                     <View className='h-4 w-4 bg-red-500 rounded-full mr-2'></View>
//                     <Text>Chi</Text>
//                 </View>

//             </View>
//         </View>

//     );
// }

import React, { useMemo, useState } from 'react';
import { CurveType, LineChart } from "react-native-gifted-charts";
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
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
    const indexData = data.find( ( item ) => item.id === id );
    const screenWidth = Dimensions.get( 'window' ).width;
    const dataLength = 7; // 7 ngày trong tuần
    const spacing = 45;
    const initialSpacing = 20;
    const chartWidth = initialSpacing + spacing * ( dataLength - 1 );

    // Ngày hiện tại (reset về 00:00:00)
    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );

    // Lấy ngày đầu tuần (Thứ 2)
    const startOfWeek = new Date( currentDate );
    const currentDay = ( currentDate.getDay() + 6 ) % 7; // Thứ 2 là 0, CN là 6
    startOfWeek.setDate( currentDate.getDate() - currentDay );

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

            // Chỉ tính các giao dịch trong tuần hiện tại
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
                    <Text style={ styles.dataLabel }>{ formattedValue.toFixed( 1 ) }M</Text>
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
                    <Text style={ styles.dataLabel }>{ formattedValue.toFixed( 1 ) }M</Text>
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
    }, [ indexData ] );

    // Xác định dữ liệu hiển thị dựa trên tab đang active
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
        <Animated.View entering={ FadeIn.duration( 500 ) } style={ styles.container }>
            <View style={ styles.header }>
                <Text style={ styles.title }>Biểu đồ thu chi tuần này</Text>
                <Text style={ styles.subtitle }>
                    { formatDate( startOfWeek ) } - { formatDate( new Date( startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000 ) ) }
                </Text>
            </View>

            <View style={ styles.tabContainer }>
                <TouchableOpacity
                    style={ [ styles.tab, activeTab === 'both' && styles.activeTab ] }
                    onPress={ () => setActiveTab( 'both' ) }
                >
                    <Text style={ [ styles.tabText, activeTab === 'both' && styles.activeTabText ] }>Tất cả</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ [ styles.tab, activeTab === 'income' && styles.activeTab ] }
                    onPress={ () => setActiveTab( 'income' ) }
                >
                    <Text style={ [ styles.tabText, activeTab === 'income' && styles.activeTabText ] }>Thu nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={ [ styles.tab, activeTab === 'expense' && styles.activeTab ] }
                    onPress={ () => setActiveTab( 'expense' ) }
                >
                    <Text style={ [ styles.tabText, activeTab === 'expense' && styles.activeTabText ] }>Chi tiêu</Text>
                </TouchableOpacity>
            </View>

            <View style={ styles.summaryContainer }>
                <View style={ styles.summaryItem }>
                    <View style={ styles.summaryIconContainer }>
                        <Ionicons name="arrow-down" size={ 16 } color="#fff" />
                    </View>
                    <View>
                        <Text style={ styles.summaryAmount }>{ formatCurrencyVND( totalIncome ) }</Text>
                        <Text style={ styles.summaryLabel }>Thu nhập</Text>
                    </View>
                </View>
                <View style={ styles.summaryItem }>
                    <View style={ [ styles.summaryIconContainer, styles.expenseIcon ] }>
                        <Ionicons name="arrow-up" size={ 16 } color="#fff" />
                    </View>
                    <View>
                        <Text style={ styles.summaryAmount }>{ formatCurrencyVND( totalExpense ) }</Text>
                        <Text style={ styles.summaryLabel }>Chi tiêu</Text>
                    </View>
                </View>
            </View>

            <View style={ styles.chartContainer }>
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
                    yAxisTextStyle={ styles.yAxisText }
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

            <View style={ styles.legendContainer }>
                { ( activeTab === 'both' || activeTab === 'income' ) && (
                    <View style={ styles.legendItem }>
                        <View style={ [ styles.legendDot, styles.incomeDot ] } />
                        <Text style={ styles.legendText }>Thu nhập</Text>
                    </View>
                ) }
                { ( activeTab === 'both' || activeTab === 'expense' ) && (
                    <View style={ styles.legendItem }>
                        <View style={ [ styles.legendDot, styles.expenseDot ] } />
                        <Text style={ styles.legendText }>Chi tiêu</Text>
                    </View>
                ) }
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create( {
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        margin: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    header: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 4,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    activeTab: {
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        color: '#666',
    },
    activeTabText: {
        color: '#1c40f2',
        fontWeight: '600',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    summaryItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    summaryIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#2ecc71',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    expenseIcon: {
        backgroundColor: '#e74c3c',
    },
    summaryAmount: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    summaryLabel: {
        fontSize: 12,
        color: '#666',
    },
    chartContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 8,
    },
    incomeDot: {
        backgroundColor: '#2ecc71',
    },
    expenseDot: {
        backgroundColor: '#e74c3c',
    },
    legendText: {
        fontSize: 14,
        color: '#666',
    },
    dataLabel: {
        fontSize: 10,
        color: '#666',
        marginBottom: 4,
    },
    yAxisText: {
        color: '#999',
        fontSize: 10,
    },
} );