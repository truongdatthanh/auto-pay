// import React, { useMemo, useState } from 'react';
// import { LineChart } from "react-native-gifted-charts";
// import { View, Text, TouchableOpacity } from 'react-native';
// import dataBankingCard from "@/assets/banking-card.json";
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import { formatDate } from '@/utils/format';

// const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];

// export default function LineCharts ( { id }: { id: string } )
// {

//     const data = dataBankingCard;//set đữ liệu
//     const indexData = data.find( ( item ) => item.id === id );//tìm ra data theo id

//     const [ weekOffset, setWeekOffset ] = useState( 0 );
//     // Ngày hiện tại reset về 00:00
//     const currentDate = new Date();
//     currentDate.setHours( 0, 0, 0, 0 );
//     // Lấy ngày bắt đầu tuần cần hiển thị
//     const currentDay = ( currentDate.getDay() + 6 ) % 7;
//     const startOfWeek = new Date( currentDate );
//     startOfWeek.setDate( currentDate.getDate() - currentDay + weekOffset * 7 );


//     const { incomeData, expenseData, maxValue } = useMemo( () =>
//     {
//         const incomeByDay = Array( 7 ).fill( 0 );// /tạo mảng 7 ngày trong tuần
//         const expenseByDay = Array( 7 ).fill( 0 );

//         if ( !indexData || !indexData.transactionHistory )
//         {
//             return { incomeData: [], expenseData: [], maxValue: 0 };
//         }

//         indexData.transactionHistory.forEach( item =>
//         {
//             const date = new Date( item.date );
//             const day = ( date.getDay() + 6 ) % 7; // convert Sunday=0 to 6, Monday=1 to 0, etc.
//             if ( item.amount > 0 )
//             {
//                 incomeByDay[ day ] += item.amount;
//             } else
//             {
//                 expenseByDay[ day ] += Math.abs( item.amount );
//             }
//         } );

//         const incomeData = incomeByDay.map( ( value, i ) => ( {
//             value: Math.round( value / 1_000_000 ),
//             label: daysOfWeek[ i ],
//             dataPointText: `${ Math.round( value / 1_000_000 ) }`
//         } ) );

//         const expenseData = expenseByDay.map( ( value, i ) => ( {
//             value: Math.round( value / 1_000_000 ),
//             label: daysOfWeek[ i ],
//             dataPointText: `${ Math.round( value / 1_000_000 ) }`
//         } ) );

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

//     return (
//         <View>
//             <Text style={ { textAlign: 'center', fontSize: 16, marginBottom: 10 } }>
//                 Thống kê thu & chi theo ngày trong tuần (triệu VND)
//             </Text>
//             {/* Nút chuyển tuần */ }
//             <View className="flex-row justify-between items-center mt-2">
//                 <TouchableOpacity onPress={ () => setWeekOffset( prev => prev - 1 ) }>
//                     <Ionicons name="chevron-back" size={ 20 } color="#666" />
//                 </TouchableOpacity>
//                 <Text className="text-sm text-gray-500">
//                     { formatDate( startOfWeek ) } - { formatDate( new Date( startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000 ) ) }
//                 </Text>
//                 <TouchableOpacity
//                     onPress={ () => setWeekOffset( prev => prev + 1 ) }
//                     disabled={ weekOffset >= 0 }
//                 >
//                     <Ionicons
//                         name="chevron-forward"
//                         size={ 20 }
//                         color={ `${ weekOffset >= 0 ? '#ccc' : '' }` }
//                     />
//                 </TouchableOpacity>
//             </View>
//             <LinearGradient colors={ [ '#1E2923', '#08130D' ] } start={ { x: 0, y: 0 } } end={ { x: 1, y: 1 } } className='p-2'>
//                 <LineChart
//                     data={ expenseData }
//                     data2={ incomeData }
//                     height={ 250 }
//                     width={ 300 }
//                     spacing={ 50 }
//                     initialSpacing={ 20 }
//                     color1="#e74c3c" // chi tiêu
//                     color2="#2ecc71" // thu nhập
//                     thickness1={ 2 }// độ dày đường vẽ
//                     thickness2={ 2 }// độ dày đường vẽ
//                     hideDataPoints={ false }// ẩn dot và data
//                     //showXAxisIndices // hiển thị số liệu trên cột
//                     //showVerticalLines // hiển thị đường kẻ dọc
//                     xAxisIndicesHeight={ 2 } // độ dày đường kẻ dọc
//                     xAxisIndicesWidth={ 2 } // độ dày đường kẻ ngang
//                     xAxisIndicesColor="#eee"// màu đường kẻ dọc
//                     yAxisColor="#eee" // màu trục y
//                     xAxisColor="#eee"// màu trục x
//                     dataPointsColor1="#e74c3c"
//                     dataPointsColor2="#2ecc71"
//                     yAxisTextStyle={ { color: '#fff' } } // màu label trục y
//                     xAxisLabelTextStyle={ { color: '#fff' } } // màu label trục x
//                     textColor1="#e74c3c" // màu các số trên dot
//                     textColor2="#2ecc71"
//                     textFontSize={ 15 }
//                     maxValue={ maxValue }// giá trị lớn nhất trên trục y
//                     noOfSections={ 10 }// số lượng đường kẻ ngang
//                     //yAxisLabelWidth={ 32 }// độ rộng label trục y
//                     //yAxisLabelSuffix="M"// thêm ký hiệu sau label trục y
//                     isAnimated// animation
//                     curved// đường cong

//                     //stepValue={ 1 }// hiển thị các giá trị theo bước
//                     showValuesAsDataPointsText={ false } // ✅ hiển thị số liệu trên cột
//                 //hideRules// ẩn các đường kể ngang
//                 />
//             </LinearGradient>

//         </View>
//     );
// }

import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import dataBankingCard from '@/assets/banking-card.json';
import { formatDate } from '@/utils/format';

const daysOfWeek = [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ];

export default function LineCharts ( { id }: { id: string } )
{
    const [ weekOffset, setWeekOffset ] = useState( 0 );

    const indexData = dataBankingCard.find( item => item.id === id );

    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );
    const currentDay = ( currentDate.getDay() + 6 ) % 7;//Lấy ra ngày hôm nay
    const startOfWeek = new Date( currentDate );//Lấy ra ngày bắt đầu trong tuần
    startOfWeek.setDate( currentDate.getDate() - currentDay + weekOffset * 7 );// convert t2 = 0,..., cn = 6
    
    const { incomeData, expenseData, maxValue } = useMemo( () =>
    {
        const incomeByDay = Array( 7 ).fill( 0 );
        const expenseByDay = Array( 7 ).fill( 0 );

        if ( !indexData?.transactionHistory )
        {
            return { incomeData: [], expenseData: [], maxValue: 0 };
        }

        const start = new Date( startOfWeek );//Ngày bắt đầu trong tuần
        const end = new Date( start );//Ngày kết thúc trong tuần
        end.setDate( start.getDate() + 6 );
        end.setHours( 23, 59, 59, 999 );

        indexData.transactionHistory
            .filter( item =>
            {
                const date = new Date( item.date );
                return date >= start && date <= end;
            } )
            .forEach( item =>
            {
                const date = new Date( item.date );
                const day = ( date.getDay() + 6 ) % 7;
                if ( item.amount > 0 )
                {
                    incomeByDay[ day ] += item.amount;
                } else
                {
                    expenseByDay[ day ] += Math.abs( item.amount );
                }
            } );

        const incomeData = incomeByDay.map( ( value, i ) =>
        {
            const millions = value / 1_000_000;
            const formatted = parseFloat( millions.toFixed( 1 ) ); // luôn giữ 1 chữ số thập phân
            return {
                value: formatted,
                label: daysOfWeek[ i ],
                dataPointText: `${ formatted }`,
            };
        } );

        const expenseData = expenseByDay.map( ( value, i ) =>
        {
            const millions = value / 1_000_000;
            const formatted = parseFloat( millions.toFixed( 1 ) );
            return {
                value: formatted,
                label: daysOfWeek[ i ],
                dataPointText: `${ formatted }`
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
    }, [ indexData, startOfWeek ] );

    const endOfWeek = new Date( startOfWeek );
    endOfWeek.setDate( startOfWeek.getDate() + 6 );

    return (
        <View>
            <Text style={ { textAlign: 'center', fontSize: 16, marginBottom: 10 } }>
                Thống kê thu & chi theo ngày trong tuần (triệu VND)
            </Text>

            <View className="flex-row justify-between items-center mt-2">
                <TouchableOpacity onPress={ () => setWeekOffset( prev => prev - 1 ) }>
                    <Ionicons name="chevron-back" size={ 20 } color="#666" />
                </TouchableOpacity>
                <Text className="text-sm text-gray-500">
                    { formatDate( startOfWeek ) } - { formatDate( endOfWeek ) }
                </Text>
                <TouchableOpacity
                    onPress={ () => setWeekOffset( prev => prev + 1 ) }
                    disabled={ weekOffset >= 0 }
                >
                    <Ionicons
                        name="chevron-forward"
                        size={ 20 }
                        color={ weekOffset >= 0 ? '#ccc' : '#666' }
                    />
                </TouchableOpacity>
            </View>

            <LinearGradient
                colors={ [ '#1E2923', '#08130D' ] }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
                className="p-2"
            >
                <LineChart
                    key={ weekOffset }
                    data={ expenseData }
                    data2={ incomeData }
                    height={ 250 }
                    width={ 300 }
                    spacing={ 50 }
                    initialSpacing={ 20 }
                    color1="#e74c3c"
                    color2="#2ecc71"
                    thickness1={ 2 }
                    thickness2={ 2 }
                    hideDataPoints={ false }
                    xAxisIndicesHeight={ 2 }
                    xAxisIndicesWidth={ 2 }
                    xAxisIndicesColor="#eee"
                    yAxisColor="#eee"
                    xAxisColor="#eee"
                    dataPointsColor1="#e74c3c"
                    dataPointsColor2="#2ecc71"
                    yAxisTextStyle={ { color: '#fff' } }
                    xAxisLabelTextStyle={ { color: '#fff' } }
                    textColor1="#e74c3c"
                    textColor2="#2ecc71"
                    textFontSize={ 15 }
                    maxValue={ maxValue }
                    noOfSections={ 10 }
                    isAnimated
                    //hideRules// ẩn các đường kẻ ngang
                    curved
                />
            </LinearGradient>
        </View>
    );
}

