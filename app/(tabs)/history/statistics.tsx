// import React, { useRef, useState } from 'react';

// import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, ViewToken } from 'react-native';
// import data from "../../../assets/banking-card.json"
// import BankingCard from '@/components/BankCard';
// import LineCharts from '@/components/LineChart';
// export default function BankAccountDetail ()
// {
//     const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
//     const bankCard = data;

//     const viewabilityConfig = useRef( {
//         viewAreaCoveragePercentThreshold: 50,
//     } );

//     const onViewRef = useRef( ( { viewableItems }: { viewableItems: ViewToken[] } ) =>
//     {
//         if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
//         {
//             setCurrentCardIndex( viewableItems[ 0 ].index ?? 0 );
//         }
//     } );

//     return (
//         <View className='bg-white pb-44'>
//             <FlatList
//                 data={ bankCard }
//                 horizontal
//                 pagingEnabled
//                 showsHorizontalScrollIndicator={ false }
//                 keyExtractor={ ( item ) => item.id }
//                 snapToInterval={ 330 } // khoảng cách giữa các item
//                 snapToAlignment='center' // căn giữa item
//                 renderItem={ ( { item } ) => (
//                     <View className="items-center justify-center" style={ { marginRight: 10 } }>
//                         <BankingCard
//                             key={ item.id }
//                             id={ item.id }
//                             STK={ item.STK }
//                             name={ item.name }
//                             logoBanking={ item.logoBanking }
//                             bankName={ item.bankName }
//                         />
//                     </View>
//                 ) }
//                 onViewableItemsChanged={ onViewRef.current }
//                 viewabilityConfig={ viewabilityConfig.current }
//                 contentContainerStyle={ { paddingHorizontal: 20 } }
//                 className='my-2'
//             />

//             <View>
//                 <LineCharts id={ bankCard[ currentCardIndex ].id } />
//             </View>
//         </View>
//     );
// };


import React, { useRef, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, ViewToken, Dimensions, RefreshControl } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import data from "../../../assets/banking-card.json";
import BankingCard from '@/components/BankCard';
import LineCharts from '@/components/LineChart';
import TabbarTop from '@/components/TabbarTop';
import { formatCurrencyVND } from '@/utils/formatCurrencyVND';

const { width } = Dimensions.get( 'window' );

export default function BankAccountStatistics ()
{
    const [ currentCardIndex, setCurrentCardIndex ] = useState( 0 );
    const [ activeTab, setActiveTab ] = useState( 'Tuần' );
    const [ refreshing, setRefreshing ] = useState( false );
    const bankCard = data;
    const currentCard = bankCard[ currentCardIndex ];

    // Tính tổng số dư và số giao dịch
    const totalBalance = currentCard?.balance || 0;
    const totalTransactions = currentCard?.transactionHistory?.length || 0;
    const incomeTransactions = currentCard?.transactionHistory?.filter( t => t.amount > 0 ).length || 0;
    const expenseTransactions = currentCard?.transactionHistory?.filter( t => t.amount < 0 ).length || 0;

    // Tính tổng thu nhập và chi tiêu
    const totalIncome = currentCard?.transactionHistory?.reduce( ( sum, t ) => t.amount > 0 ? sum + t.amount : sum, 0 ) || 0;
    const totalExpense = currentCard?.transactionHistory?.reduce( ( sum, t ) => t.amount < 0 ? sum + Math.abs( t.amount ) : sum, 0 ) || 0;

    const viewabilityConfig = useRef( {
        viewAreaCoveragePercentThreshold: 50,
    } );

    const onViewRef = useRef( ( { viewableItems }: { viewableItems: ViewToken[] } ) =>
    {
        if ( viewableItems.length > 0 && viewableItems[ 0 ].index !== null )
        {
            setCurrentCardIndex( viewableItems[ 0 ].index ?? 0 );
        }
    } );

    const handleTabChange = useCallback( ( tab: string ) =>
    {
        setActiveTab( tab );
    }, [] );

    const onRefresh = useCallback( () =>
    {
        setRefreshing( true );
        // Giả lập tải dữ liệu
        setTimeout( () =>
        {
            setRefreshing( false );
        }, 1500 );
    }, [] );

    return (
        <ScrollView
            className="flex-1 bg-gray-50"
            showsVerticalScrollIndicator={ false }
            refreshControl={
                <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
            }
        >
            {/* Header Card Section */ }
            <View className="bg-white pt-2 pb-4 shadow-sm">
                <FlatList
                    data={ bankCard }
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={ false }
                    keyExtractor={ ( item ) => item.id }
                    snapToInterval={ 330 }
                    snapToAlignment="center"
                    renderItem={ ( { item } ) => (
                        <View className="items-center justify-center mx-1">
                            <BankingCard
                                key={ item.id }
                                id={ item.id }
                                STK={ item.STK }
                                name={ item.name }
                                logoBanking={ item.logoBanking }
                                bankName={ item.bankName }
                            />
                        </View>
                    ) }
                    onViewableItemsChanged={ onViewRef.current }
                    viewabilityConfig={ viewabilityConfig.current }
                    contentContainerStyle={ { paddingHorizontal: 20 } }
                    className="my-2"
                />

                {/* Card Indicator */ }
                <View className="flex-row justify-center mt-2">
                    { bankCard.map( ( _, index ) => (
                        <View
                            key={ index }
                            className={ `mx-1 rounded-full ${ currentCardIndex === index
                                    ? 'bg-blue-500 w-6 h-2'
                                    : 'bg-gray-300 w-2 h-2'
                                }` }
                        />
                    ) ) }
                </View>
            </View>

            {/* Account Summary */ }
            <Animated.View
                entering={ FadeInDown.duration( 500 ).delay( 200 ) }
                className="mx-4 mt-4 bg-white rounded-xl shadow-sm overflow-hidden"
            >
                <View className="p-4 border-b border-gray-100">
                    <Text className="text-lg font-bold text-gray-800">Tổng quan tài khoản</Text>
                </View>

                <View className="flex-row">
                    <View className="flex-1 p-4 border-r border-gray-100">
                        <Text className="text-gray-500 text-sm">Số dư hiện tại</Text>
                        <Text className="text-xl font-bold text-blue-600 mt-1">
                            { formatCurrencyVND( totalBalance ) }
                        </Text>
                    </View>
                    <View className="flex-1 p-4">
                        <Text className="text-gray-500 text-sm">Tổng giao dịch</Text>
                        <Text className="text-xl font-bold text-gray-800 mt-1">{ totalTransactions }</Text>
                    </View>
                </View>

                <View className="flex-row bg-gray-50">
                    <View className="flex-1 p-4 border-r border-gray-100 border-t">
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 rounded-full bg-green-500 items-center justify-center mr-2">
                                <Ionicons name="arrow-down" size={ 14 } color="#fff" />
                            </View>
                            <Text className="text-gray-500 text-sm">Thu nhập</Text>
                        </View>
                        <Text className="text-base font-semibold text-green-600 mt-1">
                            { formatCurrencyVND( totalIncome ) }
                        </Text>
                        <Text className="text-xs text-gray-500 mt-1">{ incomeTransactions } giao dịch</Text>
                    </View>
                    <View className="flex-1 p-4 border-t">
                        <View className="flex-row items-center">
                            <View className="w-6 h-6 rounded-full bg-red-500 items-center justify-center mr-2">
                                <Ionicons name="arrow-up" size={ 14 } color="#fff" />
                            </View>
                            <Text className="text-gray-500 text-sm">Chi tiêu</Text>
                        </View>
                        <Text className="text-base font-semibold text-red-600 mt-1">
                            { formatCurrencyVND( totalExpense ) }
                        </Text>
                        <Text className="text-xs text-gray-500 mt-1">{ expenseTransactions } giao dịch</Text>
                    </View>
                </View>
            </Animated.View>

            {/* Time Period Tabs */ }
            <TabbarTop
                tabs={ [ 'Tuần', 'Tháng', 'Quý', 'Năm' ] }
                onTabChange={ handleTabChange }
            />

            {/* Chart Section */ }
            <Animated.View entering={ FadeIn.duration( 500 ).delay( 300 ) }>
                <LineCharts id={ bankCard[ currentCardIndex ].id } />
            </Animated.View>

            {/* Transaction Categories */ }
            <Animated.View
                entering={ FadeInDown.duration( 500 ).delay( 400 ) }
                className="mx-4 mt-4 mb-6 bg-white rounded-xl shadow-sm"
            >
                <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
                    <Text className="text-lg font-bold text-gray-800">Phân loại chi tiêu</Text>
                    <TouchableOpacity className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 text-xs font-medium">Xem tất cả</Text>
                    </TouchableOpacity>
                </View>

                {/* Category Items */ }
                <View className="p-2">
                    { renderCategoryItem( 'Ăn uống', 35, 2500000, 'food-outline' ) }
                    { renderCategoryItem( 'Di chuyển', 20, 1500000, 'car-outline' ) }
                    { renderCategoryItem( 'Mua sắm', 15, 1000000, 'cart-outline' ) }
                    { renderCategoryItem( 'Giải trí', 10, 700000, 'film-outline' ) }
                    { renderCategoryItem( 'Khác', 20, 1300000, 'apps-outline' ) }
                </View>
            </Animated.View>

            {/* Thêm khoảng trống ở dưới để đảm bảo có thể cuộn lên */ }
            <View className="h-20" />
        </ScrollView>
    );
}

function renderCategoryItem ( name: string, percent: number, amount: number, iconName: string )
{
    return (
        <View className="p-3 flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                <Ionicons name={ iconName as any } size={ 20 } color="#3b82f6" />
            </View>
            <View className="flex-1">
                <View className="flex-row justify-between">
                    <Text className="text-gray-800 font-medium">{ name }</Text>
                    <Text className="text-gray-800 font-semibold">{ formatCurrencyVND( amount ) }</Text>
                </View>
                <View className="mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
                    <View
                        className="h-full bg-blue-500 rounded-full"
                        style={ { width: `${ percent }%` } }
                    />
                </View>
                <Text className="text-xs text-gray-500 mt-1">{ percent }% tổng chi tiêu</Text>
            </View>
        </View>
    );
}