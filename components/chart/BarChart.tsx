import { BarChart } from 'react-native-gifted-charts';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { formatCurrencyWithoutCode, formatDayMonth, formatDayMonthYear } from '@/utils/format';
import { useCardStore } from '@/store/useCardStore';

const COLORS = {
    income: 'white',
    expense: '#1072ff',
};

const FILTERS = [
    { key: 'week', label: 'Tuần' },
    { key: 'month', label: 'Tháng' },
    { key: 'quarter', label: 'Quý' }
] as const;

export default function BarCharts ()
{
    const selectedCard = useCardStore( state => state.selectedCard )
    const [ timeFilter, setTimeFilter ] = useState<'week' | 'month' | 'quarter'>( 'week' );
    const [ showDropdown, setShowDropdown ] = useState( false );
    const [ offset, setOffset ] = useState( 0 ); // only used for week
    const [ selectedQuarter, setSelectedQuarter ] = useState( 0 ); // 0 = Q1
    const [ yearOffset, setYearOffset ] = useState( 0 ); // used for month & quarter

    const indexData = selectedCard;

    const currentDate = new Date();
    currentDate.setHours( 0, 0, 0, 0 );

    const { startDate, endDate, labels } = useMemo( () =>
    {
        //init
        let start = new Date( currentDate );
        let end = new Date( currentDate );
        const labels: string[] = [];
    

        //Set dữ liệu cho label
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

    // Tính tổng thu nhập và chi tiêu trong khoảng thời gian được chọn
    const { totalIncome, totalExpense } = useMemo( () =>
    {
        if ( !selectedCard?.transactionHistory ) return { totalIncome: 0, totalExpense: 0 };

        let income = 0;
        let expense = 0;

        selectedCard.transactionHistory.forEach( transaction =>
        {
            const transactionDate = new Date( transaction.date );
            if ( transactionDate >= startDate && transactionDate <= endDate )
            {
                if ( transaction.amount > 0 )
                {
                    income += transaction.amount;
                } else
                {
                    expense += Math.abs( transaction.amount );
                }
            }
        } );

        return { totalIncome: income, totalExpense: expense };
    }, [ selectedCard, startDate, endDate ] );

    // Hàm kiểm tra xem label có phải là ngày hôm nay không
    const isToday = ( labelIndex: number ) =>
    {
        const today = new Date();
        today.setHours( 0, 0, 0, 0 );

        if ( timeFilter === 'week' )
        {
            const labelDate = new Date( startDate );
            labelDate.setDate( startDate.getDate() + labelIndex );
            return labelDate.getTime() === today.getTime();
        } else if ( timeFilter === 'month' )
        {
            const currentYear = currentDate.getFullYear() + yearOffset;
            return labelIndex === today.getMonth() && currentYear === today.getFullYear();
        } else if ( timeFilter === 'quarter' )
        {
            const currentYear = currentDate.getFullYear() + yearOffset;
            const currentQuarterStartMonth = selectedQuarter * 3;
            return labelIndex + currentQuarterStartMonth === today.getMonth() && currentYear === today.getFullYear();
        }
        return false;
    };

    //Set data cho barchart
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
                spacing: 4,
                // Thêm styling cho label của ngày hôm nay
                labelTextStyle: isToday( i ) ? {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                    backgroundColor: '#1072ff', // màu background highlight
                    paddingHorizontal: 3,
                    paddingVertical: 1,
                    borderRadius: 3,
                    textAlign: 'center',
                    minWidth: 40,
                    marginTop: 2
                } : {
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    minWidth: 35
                }
            } );
            data.push( {
                value: expense,
                frontColor: COLORS.expense,
            } );
        }

        return data;
    }, [ indexData, startDate, endDate, timeFilter, labels, selectedQuarter ] );

    const handleFilterSelect = ( filterKey: 'week' | 'month' | 'quarter' ) =>
    {
        setTimeFilter( filterKey );
        setOffset( 0 );
        setYearOffset( 0 );
        setShowDropdown( false );

        if ( filterKey === 'quarter' )
        {
            const currentMonth = currentDate.getMonth(); // 0-based
            const currentQuarter = Math.floor( currentMonth / 3 );
            setSelectedQuarter( currentQuarter );
        }
    };

    const getCurrentFilterLabel = () =>
    {
        return FILTERS.find( filter => filter.key === timeFilter )?.label || 'Tuần';
    };

    return (
        <View className="py-4">
            {/* Toggle Menu */ }
            <View className='flex-row items-center justify-around'>
                {/* Fixed height and width container for controls */ }
                <View className='p-2 h-20 w-60 justify-center items-center'>
                    {/* Quý và năm selector */ }
                    { timeFilter === 'quarter' && (
                        <View className='items-center'>
                            <View className="flex-row items-center gap-2">
                                <TouchableOpacity onPress={ () => setYearOffset( prev => prev - 1 ) }>
                                    <Ionicons name="chevron-back" size={ 20 } color="white" />
                                </TouchableOpacity>
                                <Text className="text-sm text-white font-semibold">
                                    Năm { currentDate.getFullYear() + yearOffset }
                                </Text>
                                <TouchableOpacity onPress={ () => setYearOffset( prev => prev + 1 ) }>
                                    <Ionicons name="chevron-forward" size={ 20 } color="white" />
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row justify-center mb-2 mt-2'>
                                { [ 0, 1, 2, 3 ].map( q => (
                                    <TouchableOpacity className={ `px-2 py-1 border ${ selectedQuarter === q ? 'bg-[#1072ff]' : 'text-gray-500' }` } key={ q } onPress={ () => setSelectedQuarter( q ) }>
                                        <Text className={ `text-sm font-semibold  ${ selectedQuarter === q ? 'text-white' : 'text-gray-500' }` }>
                                            Quý { q + 1 }
                                        </Text>
                                    </TouchableOpacity>
                                ) ) }
                            </View>
                        </View>
                    ) }

                    {/* Năm selector cho tháng */ }
                    { timeFilter === 'month' && (
                        <View className="flex-row justify-center items-center gap-2">
                            <TouchableOpacity onPress={ () => setYearOffset( prev => prev - 1 ) }>
                                <Ionicons name="chevron-back" size={ 20 } color="white" />
                            </TouchableOpacity>
                            <Text className="text-sm text-white font-semibold">
                                Năm { currentDate.getFullYear() + yearOffset }
                            </Text>
                            <TouchableOpacity onPress={ () => setYearOffset( prev => prev + 1 ) }>
                                <Ionicons name="chevron-forward" size={ 20 } color="white" />
                            </TouchableOpacity>
                        </View>
                    ) }

                    {/* Tuần offset controls */ }
                    { timeFilter === 'week' && (
                        <View className="flex-row justify-center items-center gap-2">
                            <TouchableOpacity onPress={ () => setOffset( prev => prev - 1 ) }>
                                <Ionicons name="chevron-back" size={ 20 } color="white" />
                            </TouchableOpacity>
                            <Text className="text-sm text-white font-semibold">
                                { formatDayMonthYear( startDate ) } - { formatDayMonthYear( endDate ) }
                            </Text>
                            <TouchableOpacity onPress={ () => setOffset( prev => prev + 1 ) } disabled={ offset >= 0 }>
                                <Ionicons name="chevron-forward" size={ 20 } color={ offset >= 0 ? '#666' : 'white' } />
                            </TouchableOpacity>
                        </View>
                    ) }
                </View>

                <View className='relative'>
                    <TouchableOpacity
                        onPress={ () => setShowDropdown( !showDropdown ) }
                        className='flex-row items-center justify-center bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-md min-w-[100px]'
                    >
                        <Text className='text-sm font-semibold text-gray-700 mr-2'>
                            { getCurrentFilterLabel() }
                        </Text>
                        <Ionicons
                            name={ showDropdown ? "chevron-up" : "chevron-down" }
                            size={ 16 }
                            color="#666"
                        />
                    </TouchableOpacity>

                    {/* Dropdown Menu */ }
                    { showDropdown && (
                        <View className='absolute top-9 left-0 right-0 mt-1 bg-white rounded-lg border border-gray-200 shadow-lg z-10'>
                            { FILTERS.map( ( filter, index ) => (
                                <TouchableOpacity
                                    key={ filter.key }
                                    onPress={ () => handleFilterSelect( filter.key ) }
                                    className={ `px-4 py-3 ${ index !== FILTERS.length - 1 ? 'border-b border-gray-100' : '' } ${ timeFilter === filter.key ? 'bg-blue-50' : ''
                                        }` }
                                >
                                    <Text className={ `text-sm text-center ${ timeFilter === filter.key ? 'text-blue-600 font-semibold' : 'text-gray-700'
                                        }` }>
                                        { filter.label }
                                    </Text>
                                </TouchableOpacity>
                            ) ) }
                        </View>
                    ) }
                </View>
            </View>

            {/* Legend */ }
            <View className="justify-center items-center mb-2 gap-1">
                <View className='flex-row justify-center gap-6'>
                    <View className="flex-row items-center gap-1">
                        <View className='w-3 h-3 bg-white rounded-full' />
                        <Text className="text-xs text-white">Nhận tiền</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <View className='w-3 h-3 bg-[#1072ff] rounded-full' />
                        <Text className="text-xs text-white">Chuyển tiền</Text>
                    </View>
                </View>
                <Text className='text-xs text-white'>Đơn vị (Triệu VNĐ)</Text>
            </View>


            {/* Bar chart */ }
            <View>
                <BarChart
                    data={ chartData }
                    height={ 250 }
                    barWidth={ 15 }
                    spacing={ 18 }
                    hideRules
                    barBorderRadius={ 4 }
                    noOfSections={ 8 }
                    maxValue={ Math.ceil( Math.max( ...chartData.map( d => d.value ) ) + 5 ) }
                    //isAnimated

                    // Chỉ ẩn đường trục, KHÔNG dùng hideAxesAndRules
                    xAxisThickness={ 0 }        // Ẩn đường trục X
                    yAxisThickness={ 0 }        // Ẩn đường trục Y
                    // KHÔNG dùng hideYAxisText={true} - để giữ số liệu Y
                    // Styling cho text trục Y (nếu cần)
                    yAxisTextStyle={ {
                        color: 'white',
                        fontSize: 11,
                    } }
                    yAxisOffset={ 0 }           // Điều chỉnh offset để căn chỉnh số 0
                    //yAxisLabelWidth={ 30 }      // Đặt width cho label trục Y

                    xAxisLabelTextStyle={ {
                        color: 'white',
                        marginLeft: 5,
                        width: 30,
                        textAlign: 'center',
                        fontSize: 10,
                        fontWeight: 'bold',
                    } }
                    width={ 330 }
                //showValuesAsTopLabel//Hiện/ ẩn số trên cột
                // topLabelTextStyle={ {
                //     fontSize: 11,
                //     //fontWeight: 'bold',
                //     color: 'white',//CSS cho số trên cột
                //     textAlign: 'center',
                //     width: 40,
                // } }
                />
            </View>


            <View className='mt-4'>
                <View className="flex-row justify-between px-4 gap-3">
                    <View className="flex-1 p-4 bg-[#1072ff] flex-row items-center rounded-lg">
                        <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2">
                            <Ionicons name="arrow-up" size={ 20 } color="#1072ff" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm">Chi tiêu (VND)</Text>
                            <Text className="text-base font-semibold text-white">
                                { formatCurrencyWithoutCode( totalExpense ) }
                            </Text>
                        </View>
                    </View>

                    <View className="flex-1 p-4 flex-row items-center bg-[#1e2e4b] rounded-lg">
                        <View className="w-10 h-10 rounded-full bg-white items-center justify-center mr-2">
                            <Ionicons name="arrow-down" size={ 20 } color="#1e2e4b" />
                        </View>
                        <View className="flex-1">
                            <Text className="text-white text-sm">Thu nhập (VND)</Text>
                            <Text className="text-base font-semibold text-white">
                                { formatCurrencyWithoutCode( totalIncome ) }
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}