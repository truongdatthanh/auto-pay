import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StatusBar, TouchableOpacity, Modal, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
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
    const setSelectedCard = useCardStore( state => state.setSelectedCard )
    const [ refreshing, setRefreshing ] = useState( false );
    const bankCard = data;
    const [ openModal, setOpenModal ] = useState( false );

    // Tính tổng số dư và số giao dịch
    const totalBalance = selectedCard?.balance || 0;
    const totalTransactions = selectedCard?.transactionHistory?.length || 0;
    const incomeTransactions = selectedCard?.transactionHistory?.filter( t => t.amount > 0 ).length || 0;
    const expenseTransactions = selectedCard?.transactionHistory?.filter( t => t.amount < 0 ).length || 0;

    // Tính tổng thu nhập và chi tiêu
    const totalIncome = selectedCard?.transactionHistory?.reduce( ( sum, t ) => t.amount > 0 ? sum + t.amount : sum, 0 ) || 0;
    const totalExpense = selectedCard?.transactionHistory?.reduce( ( sum, t ) => t.amount < 0 ? sum + Math.abs( t.amount ) : sum, 0 ) || 0;


    const onRefresh = useCallback( () =>
    {
        setRefreshing( true );
        // Giả lập tải dữ liệu
        setTimeout( () =>
        {
            setRefreshing( false );
        }, 1000 );
    }, [] );

    const handleSelectBank = ( bank: IBankingTransaction ) =>
    {
        console.log( bank )
        setSelectedCard( bank );
        setOpenModal( false );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-black">
                <AppHeaderInfo title="Thống kê giao dịch" onPress={ () => router.replace( "/(tabs)/home" ) }
                    rightComponent={
                        <>
                            <TouchableOpacity className='p-2 bg-white/20 rounded-full h-10 w-10 items-center justify-center' onPress={ () => setOpenModal( true ) }>
                                <View className=''>
                                    <AntDesign name="creditcard" size={ 18 } color="white" />
                                </View>
                            </TouchableOpacity>
                        </>
                    } />
                <ScrollView
                    className="flex-1 bg-gray-50"
                    showsVerticalScrollIndicator={ false }
                    refreshControl={
                        <RefreshControl refreshing={ refreshing } onRefresh={ onRefresh } />
                    }
                    contentContainerStyle={ { paddingBottom: 50 } }
                >

                    {/* LineChart */ }
                    <View>
                        <BarCharts />
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Tổng quan tài khoản */ }
                    <View
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
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                </ScrollView>

                <Modal
                    visible={ openModal }
                    transparent={ true }
                    animationType="slide"
                    onRequestClose={ () => setOpenModal( false ) }
                >
                    <View className="flex-1 bg-black/70 justify-end">
                        <View className="bg-white rounded-t-3xl p-4 max-h-[70%]">
                            <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-bold">Chọn tài khoản</Text>
                                <TouchableOpacity onPress={ () => setOpenModal( false ) }>
                                    <Ionicons name="close-circle" size={ 28 } color="#666" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView className="max-h-[500px]">
                                { bankCard.map( ( bank ) => (
                                    <TouchableOpacity
                                        key={ bank.STK }
                                        className={ `border-b border-gray-200 p-4 ${ selectedCard?.STK === bank.STK ? "bg-blue-50" : "" }` }
                                        onPress={ () => handleSelectBank( bank ) }
                                    >
                                        <View className="flex-row justify-between items-center">
                                            <View>
                                                <Text className="font-medium">{ bank.STK ?? "" }</Text>
                                                <Text className="text-gray-500">{ bank.bankName ?? "" }</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <Image
                                                    source={ { uri: bank.logoBanking ?? "" } }
                                                    className="w-16 h-10"
                                                    resizeMode="contain"
                                                />
                                                { selectedCard?.STK === bank.STK && (
                                                    <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
                                                ) }
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ) ) }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </>
    );
}

