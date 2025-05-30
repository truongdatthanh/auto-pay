import React, {  useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import data from "@/assets/banking-card.json";
import AppHeaderInfo from '@/components/header/App.headerInfo';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatCurrencyVND } from '@/utils/format';
import BarCharts from '@/components/chart/BarChart';
import { useCardStore } from '@/store/useCardStore';
import { IBankingTransaction } from '@/interface/IBanking';

export default function BankAccountStatistics ()
{
    const selectedCard = useCardStore( state => state.selectedCard );
    const [ currentCard, setcurrentCard ] = useState<IBankingTransaction | null>( selectedCard );
    const [ refreshing, setRefreshing ] = useState( false );
    const bankCard = data;

    // Tính tổng số dư và số giao dịch
    const totalBalance = currentCard?.balance || 0;
    const totalTransactions = currentCard?.transactionHistory?.length || 0;
    const incomeTransactions = currentCard?.transactionHistory?.filter( t => t.amount > 0 ).length || 0;
    const expenseTransactions = currentCard?.transactionHistory?.filter( t => t.amount < 0 ).length || 0;

    // Tính tổng thu nhập và chi tiêu
    const totalIncome = currentCard?.transactionHistory?.reduce( ( sum, t ) => t.amount > 0 ? sum + t.amount : sum, 0 ) || 0;
    const totalExpense = currentCard?.transactionHistory?.reduce( ( sum, t ) => t.amount < 0 ? sum + Math.abs( t.amount ) : sum, 0 ) || 0;


    const onRefresh = useCallback( () =>
    {
        setRefreshing( true );
        // Giả lập tải dữ liệu
        setTimeout( () =>
        {
            setRefreshing( false );
        }, 1000 );
    }, [] );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-black">
                <AppHeaderInfo title="Thống Kê Giao Dịch" onPress={ () => router.replace( "/(tabs)/home" ) } />
                <ScrollView
                    className="flex-1 bg-gray-50"
                    showsVerticalScrollIndicator={ false }
                    refreshControl={
                        <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                    }
                    contentContainerStyle={ { paddingBottom: 50 } }
                >
                
                    {/* LineChart */ }
                    <Animated.View entering={ FadeIn.duration( 500 ).delay( 300 ) }>
                        <BarCharts  />
                    </Animated.View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Tổng quan tài khoản */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 500 ).delay( 200 ) }
                        className="mx-4 m-4 bg-white rounded-xl shadow-md overflow-hidden"
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

                        <View className="flex-row">
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
                    {/* -----------------------------------------End----------------------------------------- */ }
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

