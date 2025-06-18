import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, StatusBar, Alert, } from "react-native";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { FontAwesome, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as Clipboard from "expo-clipboard";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import Loading from "@/components/loading/Loading";
import ActionButton from "@/components/button/ActionButton";
import InfoRow from "@/components/card/InfoRow";
import { convertEMVCode } from "@/utils/encodeEMVCode";
import { generateQR } from "@/utils/generateQR";
import { BankInfo } from "@/interface/IBanking";
import { formatCurrencyWithCode } from "@/utils/format";
import { useFabStore } from "@/store/useFABStore";
import { useTabBarStore } from "@/store/useTabbarStore";

const napasLogo = require( "@/assets/images/Napas247.png" );

export default function DisplayQR ()
{
    const params = useLocalSearchParams();
    const viewShotRef = useRef<ViewShot>( null );
    const [ loading, setLoading ] = useState( true );
    const [ bankInfo, setBankInfo ] = useState<BankInfo | null>( null );
    const [ permissionGranted, setPermissionGranted ] = useState( false );
    const [ savingQR, setSavingQR ] = useState( false );
    const [ sharing, setSharing ] = useState( false );
    const setVisible = useFabStore( ( state ) => state.setVisible );
    const setTabBarVisible = useTabBarStore( state => state.setTabBarVisible );
    
    useFocusEffect(
        useCallback( () =>
        {
            // ẩn khi vào màn hình
            setVisible( false );
            setTabBarVisible( false );
            return () =>
            {
                setTabBarVisible( true );
                setVisible( true );
            }// hiện lại khi rời màn hình
        }, [ setTabBarVisible, setVisible ] )
    );

    // Chuyển đổi dữ liệu JSON từ params.data thành obj BankData
    const parsedData = useMemo<BankInfo | null>( () =>
    {
        if ( typeof params.data === "string" )
        {
            try
            {
                return JSON.parse( params.data );
            } catch
            {
                console.error( "Invalid JSON in params.data" );
            }
        }
        return null;
    }, [ params.data ] );
    // --------------------------------- END ------------------------------------- //

    // Generate QR code string from parsed data
    const qrCode = useMemo( () =>
    {
        if ( !parsedData ) return "";
        const value = {
            accountNumber: String( parsedData.accountNumber ),
            bankBin: String( parsedData.bin ),
            amount: Number( parsedData.amount ),
            addInfo: String( parsedData.content ),
        }
        return convertEMVCode( value );
    }, [ parsedData ] );
    // --------------------------------- END ------------------------------------- //

    // Yêu cầu quyền truy cập vào thư viện ảnh và tạo QR code
    useEffect( () =>
    {
        ( async () =>
        {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            setPermissionGranted( status === "granted" );
        } )();

        if ( !parsedData ) return;

        // Loại bỏ timeout không cần thiết
        const value = {
            bankName: parsedData.bankName,
            bankLogo: parsedData.bankLogo,
            accountName: parsedData.accountName,
            accountNumber: parsedData.accountNumber,
            amount: Number( parsedData.amount ),
            content: parsedData.content,
            time: new Date().toLocaleString( "vi-VN" ),
        }
        setBankInfo( value );
        setLoading( false );
    }, [ parsedData ] );
    // --------------------------------- END ------------------------------------- //


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
        if ( bankInfo?.accountNumber )
        {
            await Clipboard.setStringAsync( bankInfo.accountNumber );
            Alert.alert( "Đã sao chép", "Số tài khoản đã được sao chép" );
        }
    }, [ bankInfo?.accountNumber ] );
    // --------------------------------- END ------------------------------------- //


    // Section hiển thị QR code và logo ngân hàng
    const QRCodeSection = () => (
        <>
            { generateQR( qrCode ) }
            <View className="flex-row justify-center items-center space-x-8 mt-4">
                <Image source={ napasLogo } className="w-[100px] h-[50px]" resizeMode="contain" />
                { bankInfo?.bankLogo && (
                    <Image source={ { uri: bankInfo.bankLogo } } className="w-[100px] h-[50px]" resizeMode="contain" />
                ) }
            </View>
        </>
    );
    // --------------------------------- END ------------------------------------- //

    if ( !parsedData ) return null;

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            { loading ? (
                <Loading message="Đang tạo QR..." />
            ) : (
                <ScrollView className="flex-1 bg-slate-50" contentContainerStyle={ { paddingBottom: 40 } }>
                    <View className="mx-4 mt-8 bg-white rounded-lg overflow-hidden shadow-md border border-gray-200">
                        <ViewShot ref={ viewShotRef } options={ { format: "jpg", quality: 0.9 } }>
                            <View className="p-4 items-center bg-white">
                                <QRCodeSection />
                                <View className="w-full">
                                    <InfoRow label="Ngân hàng:" value={ bankInfo?.bankName } />
                                    <InfoRow label="Số tài khoản:" value={ bankInfo?.accountNumber } isCopyable onPress={ copyAccountNumber } />
                                    <InfoRow label="Chủ tài khoản:" value={ bankInfo?.accountName } />
                                    <InfoRow label="Số tiền:" value={ bankInfo?.amount ? formatCurrencyWithCode( bankInfo.amount ) : "0 VNĐ" } valueClassName="text-[#1c40f2] font-bold" />
                                    <InfoRow label="Nội dung:" value={ bankInfo?.content || "-" } multiline valueClassName="text-right max-w-[60%]" />
                                    <InfoRow label="Thời gian tạo:" value={ bankInfo?.time } isLast />
                                </View>
                            </View>
                        </ViewShot>

                        <View className="flex-row justify-between bg-gray-50 p-4 border-t border-gray-200">
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

                    {/* Hướng dẫn thanh toán */ }
                    <View className="mx-4 mt-6 bg-white rounded-lg overflow-hidden shadow-md p-5 border border-gray-200">
                        <Text className="text-lg font-bold mb-3">Hướng dẫn thanh toán</Text>
                        { [ "Mở ứng dụng ngân hàng", "Quét mã QR", "Xác nhận giao dịch" ].map( ( title, index ) => (
                            <View className="flex-row items-start mb-3" key={ index }>
                                <View className="w-8 h-8 rounded-full bg-[#1c40f2] items-center justify-center mr-3 mt-1">
                                    <Text className="text-white font-bold">{ index + 1 }</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="font-semibold">{ title }</Text>
                                    <Text className="text-gray-500">
                                        {
                                            [
                                                "Mở ứng dụng ngân hàng của bạn và chọn chức năng quét mã QR",
                                                "Quét mã QR được hiển thị ở trên",
                                                "Kiểm tra thông tin và xác nhận để hoàn tất giao dịch",
                                            ][ index ]
                                        }
                                    </Text>
                                </View>
                            </View>
                        ) ) }
                    </View>

                    {/* Tạo QR mới */ }
                    <TouchableOpacity
                        className="mx-4 mt-6 bg-white rounded-lg shadow-md p-5 flex-row items-center justify-center border border-gray-200"
                        onPress={ () => router.push( "/(tabs)/qr/create" ) }
                    >
                        <MaterialCommunityIcons name="qrcode-plus" size={ 24 } color="#1c40f2" />
                        <Text className="ml-2 font-bold text-[#1c40f2]">Tạo mã QR mới</Text>
                    </TouchableOpacity>
                </ScrollView>
            ) }
        </>
    );
}

