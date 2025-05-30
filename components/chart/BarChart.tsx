// import { BarChart } from 'react-native-gifted-charts';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useState, useMemo } from 'react';
// import dataBankingCard from '@/assets/banking-card.json';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import { formatDate, formatDayMonth } from '@/utils/format';

// const COLORS = {
//     income: '#2ecc71',
//     expense: '#e74c3c',
// };


// export default function BarCharts ( { id }: { id: string } )
// {
//     const [ weekOffset, setWeekOffset ] = useState( 0 );
//     const indexData = dataBankingCard.find( ( item ) => item.id === id );

//     // Tính ngày bắt đầu tuần (Thứ 2)
//     const currentDate = new Date();
//     currentDate.setHours( 0, 0, 0, 0 );
//     const currentDay = ( currentDate.getDay() + 6 ) % 7;
//     const startOfWeek = new Date( currentDate );
//     startOfWeek.setDate( currentDate.getDate() - currentDay + weekOffset * 7 );

//     const endOfWeek = new Date( startOfWeek );
//     endOfWeek.setDate( startOfWeek.getDate() + 6 );
//     endOfWeek.setHours( 23, 59, 59, 999 );

//     const daysLabels = useMemo( () =>
//     {
//         const labels: string[] = [];
//         const date = new Date( startOfWeek );
//         for ( let i = 0; i < 7; i++ )
//         {
//             labels.push( formatDayMonth( date ) );
//             date.setDate( date.getDate() + 1 );
//         }
//         return labels;
//     }, [ startOfWeek ] );

//     const chartData = useMemo( () =>
//     {
//         const incomeByDay = Array( 7 ).fill( 0 );
//         const expenseByDay = Array( 7 ).fill( 0 );

//         if ( !indexData?.transactionHistory ) return [];

//         const start = new Date( startOfWeek );
//         const end = new Date( endOfWeek );
//         end.setHours( 23, 59, 59, 999 );

//         indexData.transactionHistory.forEach( ( item ) =>
//         {
//             const date = new Date( item.date );
//             if ( date >= start && date <= end )
//             {
//                 const day = ( date.getDay() + 6 ) % 7;
//                 const amount = Math.abs( item.amount );
//                 if ( item.amount > 0 ) incomeByDay[ day ] += amount;
//                 else expenseByDay[ day ] += amount;
//             }
//         } );

//         const data: any[] = [];

//         for ( let i = 0; i < 7; i++ )
//         {
//             const income = +( incomeByDay[ i ] / 1_000_000 ).toFixed( 1 );
//             const expense = +( expenseByDay[ i ] / 1_000_000 ).toFixed( 1 );

//             data.push( {
//                 value: income,
//                 label: daysLabels[ i ],
//                 frontColor: COLORS.income,
//                 spacing: 2,
//             } );
//             data.push( {
//                 value: expense,
//                 frontColor: COLORS.expense,
//             } );
//         }

//         return data;
//     }, [ indexData, startOfWeek, endOfWeek, id, daysLabels ] );

//     return (
//         <View className="p-4 bg-blue-50">
//             {/* filter */}
//             <View className='flex-row justify-end items-center'>
//                 <Text>Tuần</Text>
//                 <AntDesign name="down" size={ 16 } color="black" />
//             </View>
//             {/* Chọn tuần */ }
//             <View className="flex-row justify-between items-center mb-3">
//                 <TouchableOpacity onPress={ () => setWeekOffset( ( prev ) => prev - 1 ) }>
//                     <Ionicons name="chevron-back" size={ 20 } color="#666" />
//                 </TouchableOpacity>
//                 <Text className="text-sm text-gray-600">
//                     { formatDate( startOfWeek ) } - { formatDate( endOfWeek ) }
//                 </Text>
//                 <TouchableOpacity
//                     onPress={ () => setWeekOffset( ( prev ) => prev + 1 ) }
//                     disabled={ weekOffset >= 0 }
//                 >
//                     <Ionicons
//                         name="chevron-forward"
//                         size={ 20 }
//                         color={ weekOffset >= 0 ? '#ccc' : '#666' }
//                     />
//                 </TouchableOpacity>
//             </View>

//             {/* Chú thích */ }
//             <View className="justify-center items-center mb-2 gap-1">
//                 <View className='flex-row justify-center gap-6'>
//                     <View className="flex-row items-center gap-1">
//                         <View className='w-3 h-3 bg-[#2ecc71] rounded-full' />
//                         <Text className="text-xs text-gray-600">Nhận tiền</Text>
//                     </View>
//                     <View className="flex-row items-center gap-1">
//                         <View className='w-3 h-3 bg-[#e74c3c] rounded-full' />
//                         <Text className="text-xs text-gray-600">Chuyển tiền</Text>
//                     </View>
//                 </View>
//                 <Text className='text-xs text-gray-600'>Đơn vị (Triệu VNĐ)</Text>
//             </View>

//             {/* Biểu đồ cột */ }
//             <BarChart
//                 data={ chartData }
//                 height={ 250 }
//                 barWidth={ 20 }
//                 spacing={ 16 }
//                 barBorderTopLeftRadius={ 4 }
//                 barBorderTopRightRadius={ 4 }
//                 noOfSections={ 10 }
//                 maxValue={ Math.ceil( Math.max( ...chartData.map( ( d ) => d.value ) ) + 5 ) }
//                 isAnimated
//                 xAxisLabelTextStyle={ {
//                     color: '#000',
//                     marginLeft: 4,
//                     width: 30,
//                     textAlign: 'center',
//                     fontSize: 10,
//                     fontWeight: "bold"
//                 } }
//                 width={ 330 }
//                 showValuesAsTopLabel
//                 topLabelTextStyle={ { fontSize: 9, fontWeight: 'bold' } }
//             />
//         </View>
//     );
// }

// import { BarChart } from 'react-native-gifted-charts';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { useState, useMemo } from 'react';
// import dataBankingCard from '@/assets/banking-card.json';
// import { Ionicons } from '@expo/vector-icons';
// import { formatDate, formatDayMonth } from '@/utils/format';

// const COLORS = {
//     income: '#2ecc71',
//     expense: '#e74c3c',
// };

// const FILTERS = [ 'week', 'month', 'quarter' ] as const;

// export default function BarCharts ( { id }: { id: string } )
// {
//     const [ timeFilter, setTimeFilter ] = useState<'week' | 'month' | 'quarter'>( 'week' );
//     const [ offset, setOffset ] = useState( 0 );

//     const indexData = dataBankingCard.find( item => item.id === id );

//     const currentDate = new Date();
//     currentDate.setHours( 0, 0, 0, 0 );

//     const { startDate, endDate, labels } = useMemo( () =>
//     {
//         let start = new Date( currentDate );
//         let end = new Date( currentDate );
//         const labels: string[] = [];

//         if ( timeFilter === 'week' )
//         {
//             const currentDay = ( currentDate.getDay() + 6 ) % 7;
//             start.setDate( currentDate.getDate() - currentDay + offset * 7 );
//             end = new Date( start );
//             end.setDate( start.getDate() + 6 );
//             for ( let i = 0; i < 7; i++ )
//             {
//                 const date = new Date( start );
//                 date.setDate( start.getDate() + i );
//                 labels.push( formatDayMonth( date ) );
//             }
//         } else if ( timeFilter === 'month' )
//         {
//             const month = currentDate.getMonth() + offset;
//             const year = currentDate.getFullYear();
//             start = new Date( year, month, 1 );
//             end = new Date( year, month + 1, 0 );
//             const daysInMonth = end.getDate();
//             for ( let i = 1; i <= daysInMonth; i++ )
//             {
//                 labels.push( i.toString() );
//             }
//         } else if ( timeFilter === 'quarter' )
//         {
//             const currentMonth = currentDate.getMonth() + offset * 3;
//             const quarterStartMonth = Math.floor( currentMonth / 3 ) * 3;
//             const year = currentDate.getFullYear();
//             start = new Date( year, quarterStartMonth, 1 );
//             end = new Date( year, quarterStartMonth + 3, 0 );
//             const monthLabels = [ 'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];
//             for ( let i = 0; i < 3; i++ )
//             {
//                 labels.push( monthLabels[ quarterStartMonth + i ] );
//             }
//         }

//         end.setHours( 23, 59, 59, 999 );
//         return { startDate: start, endDate: end, labels, groupByDay: timeFilter === 'week' };
//     }, [ timeFilter, offset ] );

//     const chartData = useMemo( () =>
//     {
//         if ( !indexData?.transactionHistory ) return [];

//         const incomeValues = Array( labels.length ).fill( 0 );
//         const expenseValues = Array( labels.length ).fill( 0 );

//         indexData.transactionHistory.forEach( item =>
//         {
//             const date = new Date( item.date );
//             if ( date >= startDate && date <= endDate )
//             {
//                 let index = 0;
//                 if ( timeFilter === 'week' )
//                 {
//                     index = ( date.getDay() + 6 ) % 7;
//                     console.log( "index: ", index )
//                 } else if ( timeFilter === 'month' )
//                 {
//                     index = date.getDate() - 1;
//                     console.log( "month: ", index )
//                 } else if ( timeFilter === 'quarter' )
//                 {
//                     index = date.getMonth() - startDate.getMonth();
//                     console.log( "Quarter: ", index )
//                 }

//                 const amount = Math.abs( item.amount );
//                 if ( item.amount > 0 )
//                 {
//                     incomeValues[ index ] += amount;
//                 }
//                 else
//                 {
//                     expenseValues[ index ] += amount;
//                 }
//             }
//         } );

//         const data: any[] = [];
//         for ( let i = 0; i < labels.length; i++ )
//         {
//             const income = +( incomeValues[ i ] / 1_000_000 ).toFixed( 1 );
//             const expense = +( expenseValues[ i ] / 1_000_000 ).toFixed( 1 );

//             data.push( {
//                 value: income,
//                 label: labels[ i ],
//                 frontColor: COLORS.income,
//                 spacing: 2,
//             } );
//             data.push( {
//                 value: expense,
//                 frontColor: COLORS.expense,
//             } );
//         }

//         return data;
//     }, [ indexData, startDate, endDate, timeFilter, labels ] );

//     return (
//         <View className="p-4 bg-blue-50">
//             {/* Bộ lọc thời gian */ }
//             <View className='flex-row justify-center gap-4 mb-3'>
//                 { FILTERS.map( ( type ) => (
//                     <TouchableOpacity key={ type } onPress={ () =>
//                     {
//                         setTimeFilter( type );
//                         setOffset( 0 ); // reset offset
//                     } }>
//                         <Text className={ `text-sm font-bold ${ timeFilter === type ? 'text-blue-600' : 'text-gray-500' }` }>
//                             { type === 'week' ? 'Tuần' : type === 'month' ? 'Tháng' : 'Quý' }
//                         </Text>
//                     </TouchableOpacity>
//                 ) ) }
//             </View>

//             {/* Tuần/Tháng/Quý trước/sau */ }
//             <View className="flex-row justify-between items-center mb-3">
//                 <TouchableOpacity onPress={ () => setOffset( prev => prev - 1 ) }>
//                     <Ionicons name="chevron-back" size={ 20 } color="#666" />
//                 </TouchableOpacity>
//                 <Text className="text-sm text-gray-600">
//                     { formatDate( startDate ) } - { formatDate( endDate ) }
//                 </Text>
//                 <TouchableOpacity
//                     onPress={ () => setOffset( prev => prev + 1 ) }
//                     disabled={ offset >= 0 }
//                 >
//                     <Ionicons name="chevron-forward" size={ 20 } color={ offset >= 0 ? '#ccc' : '#666' }/>
//                 </TouchableOpacity>
//             </View>

//             {/* Chú thích */ }
//             <View className="justify-center items-center mb-2 gap-1">
//                 <View className='flex-row justify-center gap-6'>
//                     <View className="flex-row items-center gap-1">
//                         <View className='w-3 h-3 bg-[#2ecc71] rounded-full' />
//                         <Text className="text-xs text-gray-600">Nhận tiền</Text>
//                     </View>
//                     <View className="flex-row items-center gap-1">
//                         <View className='w-3 h-3 bg-[#e74c3c] rounded-full' />
//                         <Text className="text-xs text-gray-600">Chuyển tiền</Text>
//                     </View>
//                 </View>
//                 <Text className='text-xs text-gray-600'>Đơn vị (Triệu VNĐ)</Text>
//             </View>

//             {/* Biểu đồ cột */ }
//             <BarChart
//                 data={ chartData }
//                 height={ 250 }
//                 barWidth={ 20 }
//                 spacing={ 16 }
//                 barBorderTopLeftRadius={ 4 }
//                 barBorderTopRightRadius={ 4 }
//                 noOfSections={ 10 }
//                 maxValue={ Math.ceil( Math.max( ...chartData.map( d => d.value ) ) + 5 ) }
//                 isAnimated
//                 xAxisLabelTextStyle={ {
//                     color: '#000',
//                     marginLeft: 4,
//                     width: 30,
//                     textAlign: 'center',
//                     fontSize: 10,
//                     fontWeight: "bold"
//                 } }
//                 width={ 330 }
//                 showValuesAsTopLabel
//                 topLabelTextStyle={ { fontSize: 9, fontWeight: 'bold' } }
//             />
//         </View>
//     );
// }
import { BarChart } from 'react-native-gifted-charts';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import dataBankingCard from '@/assets/banking-card.json';
import { Ionicons } from '@expo/vector-icons';
import { formatDate, formatDayMonth } from '@/utils/format';
import { useCardStore } from '@/store/useCardStore';

const COLORS = {
    income: '#2ecc71',
    expense: '#e74c3c',
};

const FILTERS = [ 'week', 'month', 'quarter' ] as const;

export default function BarCharts ()
{
    const selectedCard = useCardStore( state => state.selectedCard )
    const [ timeFilter, setTimeFilter ] = useState<'week' | 'month' | 'quarter'>( 'week' );
    const [ offset, setOffset ] = useState( 0 ); // only used for week
    const [ selectedQuarter, setSelectedQuarter ] = useState( 0 ); // 0 = Q1
    const [ yearOffset, setYearOffset ] = useState( 0 ); // used for month & quarter

    const indexData = selectedCard;

    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );

    const { startDate, endDate, labels } = useMemo( () =>
    {
        let start = new Date( currentDate );
        let end = new Date( currentDate );
        const labels: string[] = [];

        if ( timeFilter === 'week' )
        {
            const currentDay = ( currentDate.getDay() + 6 ) % 7;
            start.setDate( currentDate.getDate() - currentDay + offset * 7 );
            end = new Date( start );
            end.setDate( start.getDate() + 6 );
            for ( let i = 0; i < 7; i++ )
            {
                const date = new Date( start );
                date.setDate( start.getDate() + i );
                labels.push( formatDayMonth( date ) );
            }
        } else if ( timeFilter === 'month' )
        {
            const year = currentDate.getFullYear() + yearOffset;
            const monthLabels = [ 'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];
            labels.push( ...monthLabels );
            start = new Date( year, 0, 1 );
            end = new Date( year, 11, 31 );
        } else if ( timeFilter === 'quarter' )
        {
            const year = currentDate.getFullYear() + yearOffset;
            const quarterStartMonth = selectedQuarter * 3;
            const monthLabels = [ 'Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12' ];
            for ( let i = 0; i < 3; i++ )
            {
                labels.push( monthLabels[ quarterStartMonth + i ] );
            }
            start = new Date( year, quarterStartMonth, 1 );
            end = new Date( year, quarterStartMonth + 3, 0 );
        }

        end.setHours( 23, 59, 59, 999 );
        return { startDate: start, endDate: end, labels };
    }, [ timeFilter, offset, yearOffset, selectedQuarter ] );

    const chartData = useMemo( () =>
    {
        if ( !indexData?.transactionHistory ) return [];

        const incomeValues = Array( labels.length ).fill( 0 );
        const expenseValues = Array( labels.length ).fill( 0 );

        indexData.transactionHistory.forEach( item =>
        {
            const date = new Date( item.date );
            if ( date >= startDate && date <= endDate )
            {
                let index = 0;
                if ( timeFilter === 'week' )
                {
                    index = ( date.getDay() + 6 ) % 7;
                } else if ( timeFilter === 'month' )
                {
                    index = date.getMonth();
                } else if ( timeFilter === 'quarter' )
                {
                    index = date.getMonth() - selectedQuarter * 3;
                }

                const amount = Math.abs( item.amount );
                if ( item.amount > 0 ) incomeValues[ index ] += amount;
                else expenseValues[ index ] += amount;
            }
        } );

        const data: any[] = [];
        for ( let i = 0; i < labels.length; i++ )
        {
            const income = +( incomeValues[ i ] / 1_000_000 ).toFixed( 1 );
            const expense = +( expenseValues[ i ] / 1_000_000 ).toFixed( 1 );

            data.push( {
                value: income,
                label: labels[ i ],
                frontColor: COLORS.income,
                spacing: 2,
            } );
            data.push( {
                value: expense,
                frontColor: COLORS.expense,
            } );
        }

        return data;
    }, [ indexData, startDate, endDate, timeFilter, labels, selectedQuarter ] );

    return (
        <View className="p-4 bg-blue-50">
            {/* Time filter */ }
            <View className='flex-row justify-center gap-4 mb-3'>
                { FILTERS.map( type => (
                    <TouchableOpacity
                        key={ type }
                        onPress={ () =>
                        {
                            setTimeFilter( type );
                            setOffset( 0 );
                            setYearOffset( 0 );

                            if ( type === 'quarter' )
                            {
                                const currentMonth = currentDate.getMonth(); // 0-based
                                const currentQuarter = Math.floor( currentMonth / 3 );
                                setSelectedQuarter( currentQuarter );
                            }
                        } }
                    >
                        <Text className={ `text-sm font-bold ${ timeFilter === type ? 'text-blue-600' : 'text-gray-500' }` }>
                            { type === 'week' ? 'Tuần' : type === 'month' ? 'Tháng' : 'Quý' }
                        </Text>
                    </TouchableOpacity>
                ) ) }
            </View>

            {/* Quý và năm selector */ }
            { timeFilter === 'quarter' && (
                <View className='items-center mb-3'>
                    <View className='flex-row justify-center gap-3 mb-2'>
                        { [ 0, 1, 2, 3 ].map( q => (
                            <TouchableOpacity key={ q } onPress={ () => setSelectedQuarter( q ) }>
                                <Text className={ `text-sm font-semibold ${ selectedQuarter === q ? 'text-blue-600' : 'text-gray-500' }` }>
                                    Quý { q + 1 }
                                </Text>
                            </TouchableOpacity>
                        ) ) }
                    </View>
                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity onPress={ () => setYearOffset( prev => prev - 1 ) }>
                            <Ionicons name="chevron-back" size={ 20 } color="#666" />
                        </TouchableOpacity>
                        <Text className="text-sm text-gray-700 font-semibold">
                            Năm { currentDate.getFullYear() + yearOffset }
                        </Text>
                        <TouchableOpacity onPress={ () => setYearOffset( prev => prev + 1 ) }>
                            <Ionicons name="chevron-forward" size={ 20 } color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>
            ) }

            {/* Năm selector cho tháng */ }
            { timeFilter === 'month' && (
                <View className="flex-row justify-center items-center gap-2 mb-3">
                    <TouchableOpacity onPress={ () => setYearOffset( prev => prev - 1 ) }>
                        <Ionicons name="chevron-back" size={ 20 } color="#666" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-700 font-semibold">
                        Năm { currentDate.getFullYear() + yearOffset }
                    </Text>
                    <TouchableOpacity onPress={ () => setYearOffset( prev => prev + 1 ) }>
                        <Ionicons name="chevron-forward" size={ 20 } color="#666" />
                    </TouchableOpacity>
                </View>
            ) }

            {/* Tuần offset controls */ }
            { timeFilter === 'week' && (
                <View className="flex-row justify-between items-center mb-3">
                    <TouchableOpacity onPress={ () => setOffset( prev => prev - 1 ) }>
                        <Ionicons name="chevron-back" size={ 20 } color="#666" />
                    </TouchableOpacity>
                    <Text className="text-sm text-gray-600">
                        { formatDate( startDate ) } - { formatDate( endDate ) }
                    </Text>
                    <TouchableOpacity onPress={ () => setOffset( prev => prev + 1 ) } disabled={ offset >= 0 }>
                        <Ionicons name="chevron-forward" size={ 20 } color={ offset >= 0 ? '#ccc' : '#666' } />
                    </TouchableOpacity>
                </View>
            ) }

            {/* Legend */ }
            <View className="justify-center items-center mb-2 gap-1">
                <View className='flex-row justify-center gap-6'>
                    <View className="flex-row items-center gap-1">
                        <View className='w-3 h-3 bg-[#2ecc71] rounded-full' />
                        <Text className="text-xs text-gray-600">Nhận tiền</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <View className='w-3 h-3 bg-[#e74c3c] rounded-full' />
                        <Text className="text-xs text-gray-600">Chuyển tiền</Text>
                    </View>
                </View>
                <Text className='text-xs text-gray-600'>Đơn vị (Triệu VNĐ)</Text>
            </View>

            {/* Bar chart */ }
            <BarChart
                data={ chartData }
                height={ 250 }
                barWidth={ 20 }
                spacing={ 16 }
                barBorderTopLeftRadius={ 4 }
                barBorderTopRightRadius={ 4 }
                noOfSections={ 10 }
                maxValue={ Math.ceil( Math.max( ...chartData.map( d => d.value ) ) + 5 ) }
                isAnimated
                xAxisLabelTextStyle={ {
                    color: '#000',
                    marginLeft: 4,
                    width: 30,
                    textAlign: 'center',
                    fontSize: 10,
                    fontWeight: 'bold',
                } }
                width={ 330 }
                showValuesAsTopLabel
                topLabelTextStyle={ { fontSize: 9, fontWeight: 'bold' } }
            />
        </View>
    );
}
