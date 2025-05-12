import { convertEMVCode } from "@/utils/encodeEMVCode";
import { generateQR } from "@/utils/generateQR";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect, useCallback, useMemo } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, StatusBar, ActivityIndicator, Alert, SafeAreaView, Platform } from "react-native";
import { Ionicons, FontAwesome, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as Clipboard from 'expo-clipboard';
import ViewShot from "react-native-view-shot";
import { useRef } from "react";
import * as Sharing from 'expo-sharing';
import Loading from "@/components/Loading";


export default function DisplayQR ()
{
    const params = useLocalSearchParams();
    const [ loading, setLoading ] = useState( true );
    const [ bankInfo, setBankInfo ] = useState<any>( null );
    const [ permissionGranted, setPermissionGranted ] = useState( false );
    const [ saving, setSaving ] = useState( false );
    const viewShotRef = useRef<ViewShot>( null );

    // Ép kiểu chắc chắn và parse lại từ JSON - sử dụng useMemo để tránh parse lại mỗi lần render
    const data = useMemo( () =>
    {
        if ( typeof params.data === 'string' )
        {
            try
            {
                return JSON.parse( params.data );
            } catch ( e )
            {
                console.error( "Lỗi parse JSON:", e );
                return null;
            }
        }
        return null;
    }, [ params.data ] );

    // Tạo QR code một lần duy nhất khi data thay đổi
    const qrCode = useMemo( () =>
    {
        if ( !data ) return "";
        console.log( "data", data );
        return convertEMVCode( {
            accountNumber: data.STK,
            bankBin: data.bin,
            amount: data.amount,
            addInfo: data.content,
        } );
    }, [ data ] );

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

        // Chỉ tải thông tin ngân hàng khi data thay đổi và có giá trị
        if ( data )
        {
            // Sử dụng timeout để giả lập tải dữ liệu
            const timer = setTimeout( () =>
            {
                setBankInfo( {
                    bankName: "Nam A Bank",
                    bankLogo: "https://payoo.vn/img/content/2023/03/logo_namabank.png",
                    accountName: "TRUONG THANH DAT",
                    accountNumber: data.STK,
                    amount: parseInt( data.amount ),
                    content: data.content,
                    time: new Date().toLocaleString( 'vi-VN' )
                } );
                setLoading( false );
            }, 1000 );

            // Cleanup function để tránh memory leak
            return () => clearTimeout( timer );
        }
    }, [ data ] ); // Chỉ chạy lại khi data thay đổi

    // Nếu không có data, return sớm để tránh render không cần thiết
    if ( !data ) return null;

    // Format số tiền - hàm thuần túy, không gây re-render
    const formatAmount = ( amount: number ) =>
    {
        return new Intl.NumberFormat( 'vi-VN', { style: 'currency', currency: 'VND' } ).format( amount );
    };

    // Sử dụng useCallback để tránh tạo lại hàm mỗi lần render
    const saveQRCode = useCallback( async () =>
    {
        if ( !permissionGranted )
        {
            Alert.alert(
                "Cần quyền truy cập",
                "Ứng dụng cần quyền truy cập vào thư viện ảnh để lưu QR code",
                [ { text: "OK" } ]
            );
            return;
        }

        try
        {
            setSaving( true );
            const uri = await viewShotRef.current?.capture?.();

            if ( uri )
            {
                const asset = await MediaLibrary.createAssetAsync( uri );
                await MediaLibrary.createAlbumAsync( "AutoPay QR", asset, false );

                Alert.alert(
                    "Thành công",
                    "Đã lưu mã QR vào thư viện ảnh",
                    [ { text: "OK" } ]
                );
            }
        } catch ( error )
        {
            Alert.alert(
                "Lỗi",
                "Không thể lưu mã QR. Vui lòng thử lại sau.",
                [ { text: "OK" } ]
            );
            console.error( "Lỗi khi lưu QR:", error );
        } finally
        {
            setSaving( false );
        }
    }, [ permissionGranted ] ); // Chỉ phụ thuộc vào permissionGranted

    //Sử dụng useCallback cho shareQRCode
    // const shareQRCode = useCallback( async () =>
    // {
    //     try
    //     {
    //         setSaving( true );
    //         const uri = await viewShotRef.current?.capture?.();
    //         console.log( "uri", uri );

    //         if ( uri )
    //         {
    //             await Share.share( {
    //                 url: uri,
    //                 message: uri
    //             } );
    //         }
    //     } catch ( error )
    //     {
    //         Alert.alert(
    //             "Lỗi",
    //             "Không thể chia sẻ mã QR. Vui lòng thử lại sau.",
    //             [ { text: "OK" } ]
    //         );
    //         console.error( "Lỗi khi chia sẻ QR:", error );
    //     } finally
    //     {
    //         setSaving( false );
    //     }
    // }, [ bankInfo ] ); // Chỉ phụ thuộc vào bankInfo

    const shareQRCode = async () =>
    {
        try
        {
            const uri = await viewShotRef.current?.capture?.();
            if ( !uri )
            {
                Alert.alert( 'Lỗi', 'Không thể chụp mã QR' );
                return;
            }

            const canShare = await Sharing.isAvailableAsync();
            if ( !canShare )
            {
                Alert.alert( 'Thiết bị không hỗ trợ chia sẻ' );
                return;
            }

            await Sharing.shareAsync( uri );
        } catch ( error )
        {
            console.error( error );
            Alert.alert( 'Lỗi', 'Không thể chia sẻ mã QR' );
        }
    };




    // Sử dụng useCallback cho copyAccountNumber
    const copyAccountNumber = useCallback( async () =>
    {
        if ( bankInfo?.accountNumber )
        {
            await Clipboard.setStringAsync( bankInfo.accountNumber );
        }
    }, [ bankInfo?.accountNumber ] ); // Chỉ phụ thuộc vào accountNumber

    // Tách QR component để tránh re-render không cần thiết
    const QRCodeComponent = useMemo( () =>
    {
        if ( !qrCode ) return null;
        return (
            <>
                { generateQR( qrCode ) }
                <View className="flex-row justify-center items-center space-x-8">
                    <Image source={ require( "../../../assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
                    <Image source={ { uri: 'https://payoo.vn/img/content/2023/03/logo_namabank.png' } } className="w-[100px] h-[50px]" resizeMode="contain" />
                </View>
            </>

        );
    }, [ qrCode ] );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1c40f2" translucent />
            <SafeAreaView className="flex-1" style={ { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 } }>
                { loading ? (
                    <>
                        <Loading message="Đang tạo QR..." />
                    </>
                ) :
                    (

                        <ScrollView
                            className="flex-1 "
                            contentContainerStyle={ { paddingBottom: 40 } }
                            showsVerticalScrollIndicator={ false }
                        >
                            {/* QR Container */ }
                            <View className="mx-5 mt-8 bg-white rounded-3xl overflow-hidden shadow-md">
                                <ViewShot ref={ viewShotRef } options={ { format: "jpg", quality: 0.9 } }>
                                    <View className="p-4 items-center bg-white">
                                        <View className="mt-2 pt-2">
                                            { QRCodeComponent }
                                            <View>
                                                <View className="flex-row justify-between items-center mb-2">
                                                    <Text className="text-gray-500">Ngân hàng:</Text>
                                                    <View className="flex-row items-center">
                                                        <Text className="font-bold">{ bankInfo?.bankName }</Text>
                                                    </View>
                                                </View>

                                                <View className="flex-row justify-between items-center mb-2 bg-white">
                                                    <Text className="text-gray-500">Số tài khoản:</Text>
                                                    <TouchableOpacity
                                                        onPress={ copyAccountNumber }
                                                        className="flex-row items-center"
                                                    >
                                                        <Text className="font-bold">{ bankInfo?.accountNumber }</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <View className="flex-row justify-between items-center mb-2 bg-white">
                                                    <Text className="text-gray-500">Chủ tài khoản:</Text>
                                                    <Text className="font-bold">{ bankInfo?.accountName }</Text>
                                                </View>

                                                <View className="flex-row justify-between items-center mb-2 bg-white">
                                                    <Text className="text-gray-500">Số tiền:</Text>
                                                    <Text className="font-bold text-[#1c40f2]">
                                                        { bankInfo?.amount ? formatAmount( bankInfo.amount ) : '0 VNĐ' }
                                                    </Text>
                                                </View>

                                                <View className="flex-row justify-between items-start mb-2 bg-white">
                                                    <Text className="text-gray-500">Nội dung:</Text>
                                                    <Text className="font-bold text-right max-w-[60%]">{ bankInfo?.content }</Text>
                                                </View>

                                                <View className="flex-row justify-between items-center mt-2 pt-2 border-t border-gray-200 bg-white">
                                                    <Text className="text-gray-500">Thời gian tạo:</Text>
                                                    <Text className="text-gray-500">{ bankInfo?.time }</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </ViewShot>

                                <View className="flex-row justify-between bg-gray-50 p-4 border-t border-gray-200">
                                    <TouchableOpacity
                                        className="flex-1 mr-2 bg-white py-3 rounded-xl flex-row justify-center items-center border border-gray-200"
                                        onPress={ saveQRCode }
                                        disabled={ saving }
                                    >
                                        { saving ? (
                                            <ActivityIndicator size="small" color="#1c40f2" />
                                        ) : (
                                            <>
                                                <Entypo name="download" size={ 18 } color="#1c40f2" />
                                                <Text className="ml-2 font-semibold text-[#1c40f2]">Lưu QR</Text>
                                            </>
                                        ) }
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        className="flex-1 ml-2 bg-[#1c40f2] py-3 rounded-xl flex-row justify-center items-center"
                                        onPress={ shareQRCode }
                                        disabled={ saving }
                                    >
                                        { saving ? (
                                            <ActivityIndicator size="small" color="white" />
                                        ) : (
                                            <>
                                                <FontAwesome name="share-square-o" size={ 18 } color="white" />
                                                <Text className="ml-2 font-semibold text-white">Chia sẻ</Text>
                                            </>
                                        ) }
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */}

                            {/* Hướng dẫn thanh toán */ }
                            <View className="mx-5 mt-6 bg-white rounded-3xl overflow-hidden shadow-md p-5">
                                <Text className="text-lg font-bold mb-3">Hướng dẫn thanh toán</Text>

                                <View className="flex-row items-start mb-3">
                                    <View className="w-8 h-8 rounded-full bg-[#1c40f2] items-center justify-center mr-3 mt-1">
                                        <Text className="text-white font-bold">1</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-semibold">Mở ứng dụng ngân hàng</Text>
                                        <Text className="text-gray-500">Mở ứng dụng ngân hàng của bạn và chọn chức năng quét mã QR</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-start mb-3">
                                    <View className="w-8 h-8 rounded-full bg-[#1c40f2] items-center justify-center mr-3 mt-1">
                                        <Text className="text-white font-bold">2</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-semibold">Quét mã QR</Text>
                                        <Text className="text-gray-500">Quét mã QR được hiển thị ở trên</Text>
                                    </View>
                                </View>

                                <View className="flex-row items-start">
                                    <View className="w-8 h-8 rounded-full bg-[#1c40f2] items-center justify-center mr-3 mt-1">
                                        <Text className="text-white font-bold">3</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="font-semibold">Xác nhận giao dịch</Text>
                                        <Text className="text-gray-500">Kiểm tra thông tin và xác nhận để hoàn tất giao dịch</Text>
                                    </View>
                                </View>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */}

                            {/* Button tạo QR */ }
                            <TouchableOpacity
                                className="mx-5 mt-6 bg-white rounded-3xl overflow-hidden shadow-md p-5 flex-row items-center justify-center"
                                onPress={ () => router.push( "/(tabs)/qr/create" ) }
                            >
                                <MaterialCommunityIcons name="qrcode-plus" size={ 24 } color="#1c40f2" />
                                <Text className="ml-2 font-bold text-[#1c40f2]">Tạo mã QR mới</Text>
                            </TouchableOpacity>
                            {/* -----------------------------------------End----------------------------------------- */ }
                            
                        </ScrollView>
                    )
                }
            </SafeAreaView >
        </>
    );
}