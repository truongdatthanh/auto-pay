import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function QRScanner ()
{
    const [ hasPermission, setHasPermission ] = useState<boolean | null>( false );//Quyền
    const [ flashEnabled, setFlashEnabled ] = useState( false );
    const [ scanning, setScanning ] = useState( true );
    const [ processingImage, setProcessingImage ] = useState( false );

    useEffect( () =>
    {
        ( async () =>
        {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log( "status", status );
            setHasPermission( status === "granted" );
        } )();
    }, [] );

    // Xử lý quét mã QR
    const handleBarcodeScanned = ( result: any ) =>
    {
        if ( !scanning ) return;

        try
        {
            // Rung điện thoại khi quét thành công
            Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
            setScanning( false );
            const jsonData = result?.data || "";
            console.log( "jsonData", jsonData );
            setTimeout( () =>
            {
                router.push( {
                    pathname: "/confirm-payment",
                    params: {
                        data: jsonData,
                    },
                } );
            }, 500 );
        } catch ( error )
        {
            // Vibrate on error
            Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );

            Alert.alert(
                "QR không hợp lệ",
                "Mã QR không đúng định dạng hoặc không chứa thông tin thanh toán hợp lệ",
                [ { text: "Thử lại", onPress: () => setScanning( true ) } ]
            );
            console.log( "data", result?.data );
        }
    };

    // Toggle flashlight
    const toggleFlash = () =>
    {
        setFlashEnabled( !flashEnabled );
    };

    // Chọn ảnh từ thư viện
    const pickImageAndScanQR = async () =>
    {
        try
        {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();//Xin quyền truy cập thư viện ảnh
            if ( status !== 'granted' )
            {
                Alert.alert(
                    "Cần quyền truy cập",
                    "Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh QR",
                    [ { text: "OK" } ]
                );
                return;
            }

            setProcessingImage( true );
            const result = await ImagePicker.launchImageLibraryAsync( {
                mediaTypes: 'images',
                allowsEditing: false,
                quality: 1,
            } );

            if ( !result.canceled && result.assets && result.assets.length > 0 )
            {
                const selectedImage = result.assets[ 0 ];
                // Scan hình ảnh QR bằng Camera.scanFromURLAsync bằng cách lấy ra uri path của ảnh
                try
                {
                    const scannedResults = await Camera.scanFromURLAsync( selectedImage.uri, [ 'qr' ] );

                    if ( scannedResults && scannedResults.length > 0 )
                    {
                        // Nếu tìm thấy được QR
                        handleBarcodeScanned( { data: scannedResults[ 0 ].data } );
                    } else
                    {
                        Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
                        Alert.alert(
                            "Không tìm thấy mã QR",
                            "Không tìm thấy mã QR trong ảnh đã chọn. Vui lòng thử lại với ảnh khác.",
                            [ { text: "OK" } ]
                        );
                    }
                } catch ( error )
                {
                    console.error( "Error scanning image:", error );
                    Alert.alert(
                        "Lỗi quét ảnh",
                        "Không thể quét mã QR từ ảnh đã chọn. Vui lòng thử lại.",
                        [ { text: "OK" } ]
                    );
                }
            }
        } catch ( error )
        {
            console.error( "Error picking image:", error );
            Alert.alert(
                "Lỗi",
                "Không thể chọn ảnh. Vui lòng thử lại.",
                [ { text: "OK" } ]
            );
        } finally
        {
            setProcessingImage( false );
        }
    };

    // Handle permission states
    if ( hasPermission === null )
    {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <MaterialCommunityIcons name="camera" size={ 60 } color="#ccc" />
                <Text className="mt-4 text-lg">Đang yêu cầu quyền camera...</Text>
            </View>
        );
    }

    if ( hasPermission === false )
    {
        return (
            <View className="flex-1 bg-white justify-center items-center px-6">
                <MaterialCommunityIcons name="camera-off" size={ 60 } color="#ef4444" />
                <Text className="mt-4 text-lg font-medium text-center">
                    Không có quyền truy cập camera
                </Text>
                <Text className="mt-2 text-gray-500 text-center mb-6">
                    Vui lòng cấp quyền truy cập camera trong cài đặt để sử dụng tính năng quét mã QR
                </Text>
                <TouchableOpacity
                    className="bg-[#1c40f2] py-3 px-6 rounded-xl"
                    onPress={ () => router.replace( "/(tabs)" ) }
                >
                    <Text className="text-white font-medium">Quay lại trang chủ</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Camera View */ }
            <CameraView
                style={ { flex: 1 } }
                barcodeScannerSettings={ { barcodeTypes: [ "qr" ] } }
                onBarcodeScanned={ scanning ? handleBarcodeScanned : undefined }
                onCameraReady={ () => console.log( "Camera is ready" ) }
                autofocus="on"
            >
                {/* Header */ }
                <SafeAreaView className="w-full">
                    <View className="flex-row justify-between items-center px-4 pt-10 pb-4">
                        <TouchableOpacity
                            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                            onPress={ () => router.replace( "/(tabs)" ) }
                        >
                            <Ionicons name="arrow-back" size={ 22 } color="white" />
                        </TouchableOpacity>

                        <Text className="text-white text-lg font-medium">Quét mã QR</Text>

                        <TouchableOpacity
                            className="w-10 h-10 bg-black/30 rounded-full items-center justify-center"
                            onPress={ toggleFlash }
                        >
                            <Ionicons
                                name={ flashEnabled ? "flash" : "flash-outline" }
                                size={ 22 }
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                {/* Scanner Frame */ }
                <View className="flex-1 items-center justify-center">
                    {/* QR Frame */ }
                    <View className="w-72 h-72 relative">
                        {/* Corner borders */ }
                        <View style={ styles.cornerTopLeft } />
                        <View style={ styles.cornerTopRight } />
                        <View style={ styles.cornerBottomLeft } />
                        <View style={ styles.cornerBottomRight } />
                    </View>

                    <Text className="mt-6 text-white text-base text-center px-10">
                        Đặt mã QR vào khung để quét tự động
                    </Text>
                </View>

                {/* Bottom Actions */ }
                <SafeAreaView className="w-full mb-8">
                    <View className="flex-row justify-center items-center space-x-4">
                        {/* Gallery Button */ }
                        <TouchableOpacity
                            className="bg-white/20 rounded-full p-4"
                            onPress={ pickImageAndScanQR }
                            disabled={ processingImage }
                        >
                            { processingImage ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Ionicons name="images-outline" size={ 24 } color="white" />
                            ) }
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create( {
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: 'white',
        borderTopLeftRadius: 12
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: 'white',
        borderTopRightRadius: 12
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: 'white',
        borderBottomLeftRadius: 12
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: 'white',
        borderBottomRightRadius: 12
    },
} );


// import React, { useEffect, useState } from "react";
// import { View, Text, Alert, StyleSheet } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import { router } from "expo-router";

// export default function QRScanner ()
// {
//     const [ hasPermission, setHasPermission ] = useState<boolean | null>( false );

//     useEffect( () =>
//     {
//         ( async () =>
//         {
//             const { status } = await Camera.requestCameraPermissionsAsync();
//             console.log( "status", status );
//             setHasPermission( status === "granted" );
//         } )();
//     }, [] );

//     if ( hasPermission === null )
//     {
//         return <Text>Đang xin quyền...</Text>;
//     }
//     if ( hasPermission === false )
//     {
//         return <Text>Không có quyền camera</Text>;
//     }

//     return (
//         <View className="flex-1 bg-white">
//             <CameraView
//                 style={ { flex: 1 } }
//                 barcodeScannerSettings={ { barcodeTypes: [ "qr" ] } }
//                 onBarcodeScanned={ ( res ) =>
//                 {
//                     try
//                     {
//                         const jsonData = res?.data || ""; // Chuyển chuỗi JSON thành object


//                         router.push( {
//                             pathname: "/confirm-payment",
//                             params: {
//                                 data: jsonData, // encode lại để truyền
//                             },
//                         } );
//                     } catch ( error )
//                     {
//                         Alert.alert( "QR không hợp lệ", "Dữ liệu không phải JSON" );
//                         console.log( "data", res?.data );
//                     }
//                 } }

//                 onCameraReady={ () =>
//                 {
//                     console.log( "Camera is ready" );
//                 } }
//                 autofocus="on"
//             >
//                 {/* Overlay khung quét QR với 4 góc */ }
//                 <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
//                     <View className="w-64 h-64 relative">
//                         {/* Góc trên bên trái */ }
//                         <View style={ styles.cornerTopLeft } />

//                         {/* Góc trên bên phải */ }
//                         <View style={ styles.cornerTopRight } />

//                         {/* Góc dưới bên trái */ }
//                         <View style={ styles.cornerBottomLeft } />

//                         {/* Góc dưới bên phải */ }
//                         <View style={ styles.cornerBottomRight } />
//                     </View>
//                     <Text className="mt-4 text-white text-base">Đưa mã QR vào khung để quét</Text>
//                 </View>
//             </CameraView>
//         </View>
//     );
// }

// const styles = StyleSheet.create( {
//     cornerTopLeft: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: 20,
//         height: 20,
//         borderTopWidth: 3,
//         borderLeftWidth: 3,
//         borderColor: 'white',
//         borderTopLeftRadius: 10
//     },
//     cornerTopRight: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         width: 20,
//         height: 20,
//         borderTopWidth: 3,
//         borderRightWidth: 3,
//         borderColor: 'white',
//         borderTopRightRadius: 10
//     },
//     cornerBottomLeft: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         width: 20,
//         height: 20,
//         borderBottomWidth: 3,
//         borderLeftWidth: 3,
//         borderColor: 'white',
//         borderBottomLeftRadius: 10
//     },
//     cornerBottomRight: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         width: 20,
//         height: 20,
//         borderBottomWidth: 3,
//         borderRightWidth: 3,
//         borderColor: 'white',
//         borderBottomRightRadius: 10
//     }
// } );

