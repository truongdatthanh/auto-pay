import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { Alert, BackHandler, Image, Modal, ScrollView, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import mockDataBanking from "../../../../assets/data.json";
import AppHeaderInfo from "@/components/App.headerInfo";
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";
import { formatDate } from "@/utils/formatDate";
import { Ionicons } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from "react";


export default function Details ()
{
    const { id } = useLocalSearchParams();
    const currentDate = new Date();
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ note, setNote ] = useState( "" );

    const data = mockDataBanking.find( ( item ) => item.id === Number( id ) );

    const handleBackTo = () =>
    {
        router.replace( "/(tabs)/history" );
    }

    const handleAddNote = () =>
    {
        setModalVisible( true );
    };

    const handleUpdateNote = () =>
    {
        console.log( "Note updated:", note );
        Alert.alert( "Thông báo", "Cập nhật ghi chú thành công!", [
            {
                text: "Đồng ý",
                onPress: () => setModalVisible( false ),
            } ] );
        setModalVisible( false );
    };

    useEffect(() => {
        const backAction = () => {
          router.push('/(tabs)/history'); // Quay lại trang trước đó
          return true;   // Ngăn hành vi back mặc định
        };
      
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
      
        return () => backHandler.remove();
      }, []);

    if ( !data )
    {
        return (
            <View className="flex-1 bg-white px-6 py-8">
                <Text className="text-lg font-semibold">Details</Text>
                <Text className="text-sm text-gray-500">No data found!</Text>
            </View>
        );
    }
    return (
        <>
            <ScrollView className="flex-1 px-6 py-6 bg-blue-100" contentContainerStyle={ { paddingBottom: 150 } } showsVerticalScrollIndicator={ false } >
                <View className="flex-1 px-6 py-8 bg-white rounded-lg">
                    {/* Header */ }
                    <View className="items-center mb-4 border-b border-gray-300 pb-4">
                        <Ionicons
                            name="checkmark-circle-outline"
                            size={ 80 }
                            color="green"
                        />
                        <Text className="text-2xl font-bold">⛛ AUTOPAY</Text>
                        <View className="items-center justify-between w-full mt-4 mb-4">
                            <Text className="text-3xl text-green-500">+{ formatCurrencyVND( data.amount ) }</Text>
                            <Text className="text-sm ">Thanh toán thành công</Text>
                        </View>
                        <View className="flex-row items-center justify-between w-full mt-4"> 
                            <Text className="text-sm">Mã giao dịch</Text>
                            <Text className="text-sm">{ data.transactionId }</Text>
                        </View>
                    </View>

                    {/* Thời gian tạo và thanh toán giao dịch */ }
                    <View className="mb-4 border-b border-gray-300 pb-4 gap-4">
                        <View className="flex-row items-center justify-between w-full">
                            <Text className="text-sm">Thời gian tạo mã giao dịch: </Text>
                            <Text className="text-sm">{ formatDate( currentDate ) }</Text>
                        </View>
                        <View className="flex-row items-center justify-between w-full">
                            <Text className="text-sm">Thời gian thanh toán giao dịch: </Text>
                            <Text className="text-sm">{ data.date }</Text>
                        </View>
                    </View>

                    {/* Tài khoản thụ hưởng */ }
                    <View className="border-b border-gray-300 pb-4 gap-4 mb-4">
                        <View className="flex-row itrder-b borderems-center justify-between w-full">
                            <Text className="text-sm">Tài khoản thụ hưởng</Text>
                            <View className="flex-row items-center">
                                <Image source={ { uri: data.logoBanking } } className="h-6 w-8 mr-2" resizeMode="contain" />
                                <Text className="text-sm text-blue-700">123456789</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between w-full">
                            <Text className="text-sm">Tên chủ tài khoản</Text>
                            <Text className="text-sm">Trương Thành Đạt</Text>
                        </View>
                    </View>

                    {/* Tài khoản giao dịch */ }
                    <View className="mb-4 border-b border-gray-300 pb-4 gap-4">
                        <View className="flex-row items-center justify-between w-full">
                            <Text className="text-sm">Tài khoản giao dịch</Text>
                            <View className="flex-row items-center">
                                <Image source={ { uri: data.logoBanking } } className="h-6 w-8 mr-2" resizeMode="contain" />
                                <Text className="text-sm text-blue-700">{ data.STK }</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center justify-between w-full">
                            <Text className="text-sm">Tên chủ tài khoản</Text>
                            <Text className="text-sm">{ data.name }</Text>
                        </View>
                        <View className="flex-row justify-between w-full">
                            <Text className="text-sm w-[40%]">Nội dung chuyển khoản</Text>
                            <Text className="text-sm w-[58%] text-right flex-wrap">{ data.content }</Text>
                        </View>
                    </View>

                    {/* Thông tin giao dịch */ }
                    <View className="items-center gap-4">
                        <View className="flex-row justify-between w-full">
                            <Text className="text-sm">Loại giao dịch</Text>
                            <Text className="text-sm">Giao dịch khác</Text>
                        </View>
                        <View className="flex-row justify-between w-full">
                            <Text className="text-sm">Mã đơn</Text>
                            <Text className="text-sm">-</Text>
                        </View>
                        <View className="flex-row justify-between w-full">
                            <Text className="text-sm">Điểm bán</Text>
                            <Text className="text-sm">-</Text>
                        </View>
                        <View className="flex-row justify-between w-full">
                            <Text className="text-sm">Sản phẩm</Text>
                            <Text className="text-sm">-</Text>
                        </View>
                    </View>
                </View>

                {/* Ghi chú cho giao dịch */ }
                <View className="mt-4 px-6 py-8 bg-white rounded-lg">
                    <View className="flex-row items-center justify-between border-b border-gray-300 mb-4 pb-4">
                        <Text className="text-sm">Ghi chú cho giao dịch</Text>
                        <TouchableOpacity className="flex-row items-center bg-blue-500 px-4 py-2 rounded-full" onPress={ handleAddNote }>
                            <FontAwesome6 name="file-pen" size={ 16 } color="white" style={ { marginRight: 3 } } />
                            <Text className="text-sm text-white">Cập nhật ghi chú</Text>
                        </TouchableOpacity>
                    </View>
                    { note ? (
                        <Text className="text-sm text-gray-500">{ note }</Text>
                    ) : (
                        <Text className="text-sm text-gray-500">Hiện chưa có ghi chú cho giao dịch này</Text>
                    ) }
                </View>

                {/* Modals add note */ }
                <Modal
                    transparent={ true }
                    visible={ modalVisible }
                    onRequestClose={ () => setModalVisible( false ) }
                    statusBarTranslucent={ true }
                    animationType="fade"
                >
                    <View className="flex-1 justify-end shadow-t-2xl bg-black/30">
                        <View className="bg-white p-6 rounded-t-2xl w-full h-1/2">
                            <View className="flex-row border-b border-gray-300 items-center justify-between mb-2 pb-4">
                                <Text className="text-lg font-semibold">Cập nhật ghi chú</Text>
                                <TouchableOpacity onPress={ () => setModalVisible( false ) }>
                                    <Ionicons name="close" size={ 24 } color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className="flex-1 mb-4">
                                <TextInput
                                    className="text-base flex-wrap"
                                    placeholder="Nhập ghi chú..."
                                    value={ note }
                                    onChangeText={ setNote }
                                    multiline
                                />
                            </View>
                            <TouchableOpacity className="absolute bottom-4 mx-6 bg-blue-500 rounded-full p-4 w-full" onPress={ handleUpdateNote }>
                                <Text className="text-center text-sm text-white font-semibold">Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </>
    );
}