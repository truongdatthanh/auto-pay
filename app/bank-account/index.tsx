
import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar, SafeAreaView, Platform, Modal } from "react-native";
import { useEffect, useState, useCallback } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import mockDataTransation from "../../assets/data.json";
import CardInfo from "@/components/CardInfo";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";
import { generateQR } from "@/utils/generateQR";
import { convertEMVCode } from "@/utils/encodeEMVCode";

interface ITransactionHistory
{
    id: string | undefined;
    STK: string | undefined;
    name: string | undefined;
    logoBanking: string | undefined;
    bankName: string | undefined;
    transactionHistory: {
        date: string;
        amount: number;
        description: string;
    }[];
}

export default function BankAccount ()
{
    const [ currentCard, setCurrentCard ] = useState<ITransactionHistory>();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ qrData, setQrData ] = useState( "" );
    const [ isModalVisible, setIsModalVisible ] = useState( false );

    useFocusEffect(
        useCallback( () =>
        {
            let timeout: NodeJS.Timeout;
            const fetchCardData = async () =>
            {
                setIsLoading( true );
                try
                {
                    const getCard = await AsyncStorage.getItem( "selectedCard" );
                    if ( getCard !== null )
                    {
                        const parsedCard = JSON.parse( getCard );
                        setCurrentCard( parsedCard );
                        setQrData(
                            convertEMVCode( {
                                accountNumber: parsedCard.STK,
                                bankBin: parsedCard.bankbin,
                                amount: 0,
                                addInfo: "",
                            } )
                        );
                    }
                } catch ( error )
                {
                    console.error( "Error fetching card data:", error );
                } finally
                {
                    timeout = setTimeout( () =>
                    {
                        setIsLoading( false );
                    }, 1500 );
                }
            };

            fetchCardData();

            return () =>
            {
                clearTimeout( timeout ); // ✅ cleanup timeout
            };
        }, [] )
    );


    const handleCreateQR = () =>
    {
        router.push( {
            pathname: '/(tabs)/qr/create',
            params: { cardSTK: currentCard?.STK }
        } );
    };

    const handleSaveQR = () =>
    {
        console.log( "Saving QR code..." );
    };

    const handleShareQR = () =>
    {

        console.log( "Sharing QR code..." );
    };

    const handleDeleteBankingAccount = () =>
    {
        setIsModalVisible( true );
    };

    if ( isLoading )
    {
        return (
            <Loading message="Đang tải thông tin tài khoản..." />
        );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ScrollView className="flex-1 bg-slate-50" showsVerticalScrollIndicator={ false } contentContainerStyle={ { paddingBottom: 50 } }>
                {/* QR Code */ }
                <View className="bg-white m-4 mt-8 p-4 rounded-3xl shadow-md border border-gray-200">
                    <View className="justify-center items-center">
                        <View className="items-center">
                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold text-lg">{ currentCard?.name?.toUpperCase() }</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold text-md">{ currentCard?.STK }</Text>
                                <TouchableOpacity className="p-1">
                                    <Ionicons name="copy-outline" size={ 16 } color="#3b82f6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            { generateQR( qrData ) }
                        </View>
                        <View className="flex-row justify-center items-center space-x-8">
                            <Image source={ require( "../../assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
                            <Image source={ { uri: currentCard?.logoBanking } } className="w-[100px] h-[50px]" resizeMode="contain" />
                        </View>
                        <View className="border-t border-dashed border-gray-400 my-2 w-full" />
                        <View className="flex-row justify-between items-center w-full mt-2">
                            <TouchableOpacity
                                className="border border-slate-300 bg-slate-50 px-4 py-2.5 rounded-xl flex-row items-center"
                                onPress={ handleSaveQR }
                            >
                                <Entypo name="download" size={ 16 } color="#475569" />
                                <Text className="text-slate-600 ml-2 font-medium">Lưu mã QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="px-4 py-2.5 rounded-xl flex-row items-center bg-[#1c40f2]"
                                onPress={ handleShareQR }
                            >
                                <FontAwesome name="share-square-o" size={ 16 } color="white" />
                                <Text className="text-white ml-2 font-medium">Chia sẻ QR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* -----------------------------------------End----------------------------------------- */ }

                <View className="bg-white mx-4 mb-2 p-4 rounded-3xl shadow-md border border-gray-200 gap-4">
                    <Text className="text-lg font-bold">Thông tin tài khoản ngân hàng</Text>
                    <View className="border-t border-dashed border-gray-400 w-full" />
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500">Tên ngân hàng</Text>
                        <Text className="font-semibold">{ currentCard?.bankName }</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500">Số tài khoản</Text>
                        <Text className="font-semibold">{ currentCard?.STK }</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500">Chủ tài khoản</Text>
                        <Text className="font-semibold">{ currentCard?.name?.toUpperCase() }</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500">Căn cước công dân</Text>
                        <Text className="font-semibold">123456789</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-500">Số điện thoại xác thực</Text>
                        <Text className="font-semibold">0123456789</Text>
                    </View>
                </View>

                <View className="bg-white mx-4 mt-2 p-4 rounded-3xl shadow-md border border-gray-200 gap-4">
                    <Text className="text-lg font-bold">Tùy chọn</Text>
                    <View className="border-t border-dashed border-gray-400 w-full" />
                    <TouchableOpacity className="flex-row items-center justify-between" onPress={ handleCreateQR }>
                        <View className="flex-row items-center gap-2">
                            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                                <MaterialCommunityIcons name="qrcode-edit" size={ 18 } color="#1c40f2" />
                            </View>
                            <Text>Tạo mã QR</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>
                    <View className="border-t border-dashed border-gray-400 w-full" />
                    <TouchableOpacity className="flex-row items-center justify-between" onPress={ handleDeleteBankingAccount }>
                        <View className="flex-row items-center gap-2">
                            <View className="w-10 h-10 bg-red-100 rounded-full items-center justify-center">
                                <FontAwesome6 name="trash-can" size={ 18 } color="red" />
                            </View>
                            <Text>Xóa tài khoản ngân hàng</Text>
                        </View>
                        <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                    </TouchableOpacity>

                </View>
            </ScrollView>

            <Modal visible={ isModalVisible } transparent={ true } animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-3xl h-[300px] w-[90%] items-center justify-center p-4 gap-4">
                        <View className="items-center justify-center h-[50px] bg-red-200 w-[50px] rounded-full">
                            <FontAwesome6 name="trash-can" size={ 28 } color="red" />
                        </View>
                        <View>
                            <Text className="text-lg font-bold">Hủy liên kết tài khoản Ngân hàng</Text>
                        </View>
                        <View>
                            <Text className="text-md text-gray-500 text-center">Bạn có chắc muốn xóa tài khoản ngân hàng này không?</Text>
                        </View>
                        <View className="flex-row justify-between w-full gap-2">
                            <TouchableOpacity
                                className="bg-gray-500 rounded-xl p-4 flex-1"
                                onPress={ () => setIsModalVisible( false ) }
                            >
                                <Text className="text-white text-center font-semibold">Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="bg-red-500 rounded-xl p-4 flex-1"
                                onPress={ () => setIsModalVisible( false ) }
                            >
                                <Text className="text-white text-center font-semibold">Xác nhận</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}




