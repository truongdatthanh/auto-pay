import { BarChart } from 'react-native-gifted-charts';
import { View, Text, TouchableOpacity } from 'react-native';
import { useState, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { formatDate, formatDayMonth } from '@/utils/format';
import { useCardStore } from '@/store/useCardStore';

const COLORS = {
    income: '#2ecc71',
    expense: '#e74c3c',
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
                spacing: 2,
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
                                    <Ionicons name="chevron-back" size={ 20 } color="#666" />
                                </TouchableOpacity>
                                <Text className="text-sm text-gray-700 font-semibold">
                                    Năm { currentDate.getFullYear() + yearOffset }
                                </Text>
                                <TouchableOpacity onPress={ () => setYearOffset( prev => prev + 1 ) }>
                                    <Ionicons name="chevron-forward" size={ 20 } color="#666" />
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row justify-center mb-2 mt-2'>
                                { [ 0, 1, 2, 3 ].map( q => (
                                    <TouchableOpacity className={ `px-2 py-1 border ${ selectedQuarter === q ? 'bg-black' : 'text-gray-500' }` } key={ q } onPress={ () => setSelectedQuarter( q ) }>
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
                        <View className="flex-row justify-center items-center gap-2">
                            <TouchableOpacity onPress={ () => setOffset( prev => prev - 1 ) }>
                                <Ionicons name="chevron-back" size={ 20 } color="#666" />
                            </TouchableOpacity>
                            <Text className="text-sm text-gray-700 font-semibold">
                                { formatDate( startDate ) } - { formatDate( endDate ) }
                            </Text>
                            <TouchableOpacity onPress={ () => setOffset( prev => prev + 1 ) } disabled={ offset >= 0 }>
                                <Ionicons name="chevron-forward" size={ 20 } color={ offset >= 0 ? '#ccc' : '#666' } />
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
            <View>
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
                    topLabelTextStyle={ {
                        fontSize: 11,
                        fontWeight: 'bold',
                        color: '#333',
                        textAlign: 'center',
                        width: 40
                    } }
                />
            </View>
        </View>
    );
}

