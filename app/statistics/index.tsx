import { useState, useCallback } from 'react';
import { View, Text, ScrollView, RefreshControl, StatusBar, TouchableOpacity, Modal, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import data from "@/assets/banking-card.json";
import AppHeaderInfo from '@/components/header/App.headerInfo';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { formatCurrencyWithCode, formatCurrencyWithoutCode } from '@/utils/format';
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
            <SafeAreaView className="flex-1  bg-[#041838]">
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
                    className="flex-1 bg-[#041838]"
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

                    <View>
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
                </ScrollView>

                {/* <Modal
                    visible={ openModal }
                    transparent={ true }
                    animationType="slide"
                    onRequestClose={ () => setOpenModal( false ) }
                >
                    <View className="flex-1 bg-black/30 justify-end">
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
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                ) ) }
                            </ScrollView>
                        </View>
                    </View>
                </Modal> */}
            </SafeAreaView>

            <Modal
                visible={ openModal }
                transparent={ true }
                animationType="slide"
                onRequestClose={ () => setOpenModal( false ) }
                statusBarTranslucent={ true }
            >
                <TouchableOpacity
                    className="flex-1 bg-black/30 justify-end"
                    activeOpacity={ 1 }
                    onPress={ () => setOpenModal( false ) }
                >
                    <View
                        className="bg-white rounded-t-3xl p-4 max-h-[70%]"
                    // activeOpacity={ 1 }
                    // onPress={ ( e ) => e.stopPropagation() }
                    >
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
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ) ) }


                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    );
}


