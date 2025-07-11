import { Image, ScrollView, Text, TouchableOpacity, View, Modal, Alert } from "react-native";
import { useEffect, useState, useCallback, useRef } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/loading/Loading";
import { generateQR } from "@/utils/generateQR";
import { convertEMVCode } from "@/utils/encodeEMVCode";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import InfoText from "@/components/card/InfoText";
import ActionButton from "@/components/button/ActionButton";
import data from "@/assets/banking-card.json"
import { IBankingTransaction } from "@/interface/IBanking";
import * as Clipboard from "expo-clipboard";
import AppHeaderInfo from "@/components/header/App.headerInfo";


export default function BankAccountDetail ()
{
    const { id } = useLocalSearchParams();
    console.log( id )
    const indexCard = data.find( ( item ) => item.STK === id );
    const [ currentCard, setCurrentCard ] = useState<IBankingTransaction>();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ qrData, setQrData ] = useState( "" );
    const [ isModalVisible, setIsModalVisible ] = useState( false );
    const [ permissionGranted, setPermissionGranted ] = useState( false );
    const [ savingQR, setSavingQR ] = useState( false );
    const [ sharing, setSharing ] = useState( false );
    const viewShotRef = useRef<ViewShot>( null );

    useFocusEffect(
        useCallback( () =>
        {
            const getCard = async () =>
            {
                setIsLoading( true );
                try
                {
                    if ( indexCard )
                    {
                        const parsedCard = indexCard;
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
                    console.error( "Error:", error );
                    Alert.alert( "Lỗi", "Không thể tải thông tin tài khoản" );
                } finally
                {
                    setTimeout( () =>
                    {
                        setIsLoading( false );
                    }, 500 );
                }
            };
            getCard();
        }, [ id ] )
    );

    // Yêu cầu quyền và tải thông tin ngân hàng
    useEffect( () =>
    {
        // Yêu cầu quyền lưu ảnh
        const getPermissions = async () =>
        {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setPermissionGranted( status === 'granted' );
        };
        getPermissions();
    }, [ currentCard ] ); // Chỉ chạy lại khi data thay đổi


    const handleCreateQR = () =>
    {
        router.push( {
            pathname: '/qr/create',
            params: { cardSTK: currentCard?.STK }
        } );
    };

    // Hàm saveQR vào thư viện ảnh
    const saveQRCode = useCallback( async () =>
    {
        if ( !permissionGranted )
        {
            Alert.alert( "Cần quyền truy cập", "Cho phép lưu QR vào thư viện ảnh", [ { text: "OK" } ] );
            return;
        }

        try
        {
            setSavingQR( true );
            const uri = await viewShotRef.current?.capture?.();
            if ( uri )
            {
                const asset = await MediaLibrary.createAssetAsync( uri );
                await MediaLibrary.createAlbumAsync( "AutoPay QR", asset, false );
                Alert.alert( "Thành công", "QR đã lưu vào thư viện" );
            }
        } catch ( err )
        {
            console.error( err );
            Alert.alert( "Lỗi", "Không thể lưu QR. Thử lại sau." );
        } finally
        {
            setSavingQR( false );
        }
    }, [ permissionGranted ] );
    // --------------------------------- END ------------------------------------- //

    // Hàm chia sẻ QR code
    const shareQRCode = useCallback( async () =>
    {
        setSharing( true );
        try
        {
            const uri = await viewShotRef.current?.capture?.();
            if ( !uri ) return Alert.alert( "Lỗi", "Không thể chụp mã QR" );

            const canShare = await Sharing.isAvailableAsync();
            if ( !canShare ) return Alert.alert( "Thiết bị không hỗ trợ chia sẻ" );

            await Sharing.shareAsync( uri );

        } catch ( err )
        {
            console.error( err );
            Alert.alert( "Lỗi", "Không thể chia sẻ QR" );
        } finally
        {
            setSharing( false );
        }
    }, [] );
    // ---------------------------------- END ------------------------------------- //

    // Hàm sao chép số tài khoản vào clipboard
    const copyAccountNumber = useCallback( async () =>
    {
        if ( currentCard?.STK )
        {
            await Clipboard.setStringAsync( currentCard?.STK );
            Alert.alert( "Đã sao chép", "Số tài khoản đã được sao chép" );
        }
    }, [ currentCard?.STK ] );
    // --------------------------------- END ------------------------------------- //

    const handleDeleteBankingAccount = () =>
    {
        setIsModalVisible( true );
    };

    if ( isLoading )
    {
        return (
            <Loading message="Đang tải thông tin tài khoản..." />
            // <LoadingSkeleton />
        );
    }

    return (
        <>
            <View className="flex-1  bg-[#041838]">
                <AppHeaderInfo title="Chi tiết" onPress={ () => router.replace( "/(tabs)/home" ) } />
                <ScrollView className="flex-1" showsVerticalScrollIndicator={ false } contentContainerStyle={ { paddingBottom: 50 } }>
                    {/* QR Code */ }
                    <View className="bg-white m-4 p-4 rounded-lg shadow-md border border-gray-200">
                        <View className="justify-center items-center">
                            <ViewShot ref={ viewShotRef } options={ { format: "jpg", quality: 0.9 } }>
                                <View className="items-center bg-white">
                                    <View className="flex-row justify-between items-center bg-white">
                                        <Text className="font-semibold text-lg">{ currentCard?.name?.toUpperCase() }</Text>
                                    </View>
                                    <View className="flex-row justify-between items-center bg-white">
                                        <Text className="font-semibold text-md">{ currentCard?.STK }</Text>
                                        <TouchableOpacity className="p-1" onPress={ copyAccountNumber }>
                                            <Ionicons name="copy-outline" size={ 16 } color="#3b82f6" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View className="bg-white">
                                    { generateQR( qrData ) }
                                </View>
                            </ViewShot>
                            <View className="flex-row justify-center items-center space-x-8">
                                <Image source={ require( "@/assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
                                <Image source={ { uri: currentCard?.logoBanking } } className="w-[100px] h-[50px]" resizeMode="contain" />
                            </View>
                            <View className="border-t border-dashed border-gray-400 my-2 w-full" />
                            <View className="flex-row justify-between items-center w-full mt-2">
                                <ActionButton
                                    onPress={ saveQRCode }
                                    disabled={ savingQR }
                                    loading={ savingQR }
                                    icon={ <Entypo name="download" size={ 18 } color="#1c40f2" /> }
                                    text="Lưu QR"
                                    style="mr-2 bg-white border border-gray-200 text-[#1c40f2]"
                                />
                                <ActionButton
                                    onPress={ shareQRCode }
                                    disabled={ sharing }
                                    loading={ sharing }
                                    icon={ <FontAwesome name="share-square-o" size={ 18 } color="white" /> }
                                    text="Chia sẻ"
                                    style="ml-2 bg-[#1c40f2] text-white"
                                />
                            </View>
                        </View>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Thông tin tài khoản ngân hàng */ }
                    <View className="bg-white mx-4 mb-2 p-4 rounded-lg shadow-md border border-gray-200 gap-4">
                        <Text className="text-lg font-bold">Thông tin tài khoản ngân hàng</Text>
                        <View className="border-t border-dashed border-gray-400 w-full" />
                        <InfoText
                            label="Ngân hàng"
                            value={ currentCard?.bankName }
                            labelClassName="text-gray-500 w-[40%]"
                            valueClassName="font-semibold flex-1 text-right"
                            containerClassName="flex-row justify-between"
                        />
                        <InfoText
                            label="Số tài khoản"
                            value={ currentCard?.STK }
                            labelClassName="text-gray-500"
                            valueClassName="font-semibold"
                            containerClassName="flex-row justify-between items-center"
                        />
                        <InfoText
                            label="Tên chủ tài khoản"
                            value={ currentCard?.name?.toUpperCase() }
                            labelClassName="text-gray-500"
                            valueClassName="font-semibold"
                            containerClassName="flex-row justify-between items-center"
                        />
                        <InfoText
                            label="Căn cước công dân"
                            value="123456789"
                            labelClassName="text-gray-500"
                            valueClassName="font-semibold"
                            containerClassName="flex-row justify-between items-center"
                        />
                        <InfoText
                            label="Số điện thoại"
                            value="0123456789"
                            labelClassName="text-gray-500"
                            valueClassName="font-semibold"
                            containerClassName="flex-row justify-between items-center"
                        />
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Tùy chọn */ }
                    <View className="bg-white mx-4 mt-2 p-4 rounded-lg shadow-md border border-gray-200 gap-4">
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
                    {/* -----------------------------------------End----------------------------------------- */ }
                </ScrollView>

            </View>

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

