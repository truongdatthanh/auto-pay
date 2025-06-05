// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import { router } from "expo-router";
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import * as Haptics from "expo-haptics";
// import * as ImagePicker from "expo-image-picker";
// import { useIsFocused } from "@react-navigation/native";

// export default function QRScanner ()
// {
//     const [ hasPermission, setHasPermission ] = useState<boolean | null>( null );
//     const [ flashEnabled, setFlashEnabled ] = useState( false );
//     const [ scanning, setScanning ] = useState( true );
//     const [ processingImage, setProcessingImage ] = useState( false );

//     const scanLineAnimation = useRef( new Animated.Value( 0 ) ).current;

//     const isFocused = useIsFocused();
//     useEffect( () =>
//     {
//         setScanning( isFocused );
//     }, [ isFocused ] );

//     // Request camera permission once on mount
//     useEffect( () =>
//     {
//         ( async () =>
//         {
//             const { status } = await Camera.requestCameraPermissionsAsync();
//             setHasPermission( status === "granted" );
//             setScanning( true ); // reset scanning when mount
//         } )();
//     }, [] );

//     // Animate scan line
//     useEffect( () =>
//     {
//         if ( !scanning ) return;
//         const animation = Animated.loop(
//             Animated.sequence( [
//                 Animated.timing( scanLineAnimation, {
//                     toValue: 1,
//                     duration: 1500,
//                     useNativeDriver: true,
//                 } ),
//                 Animated.timing( scanLineAnimation, {
//                     toValue: 0,
//                     duration: 1500,
//                     useNativeDriver: true,
//                 } ),
//             ] )
//         );
//         animation.start();
//         return () => animation.stop();
//     }, [ scanning ] );

//     const handleBarcodeScanned = useCallback( ( result: any ) =>
//     {
//         if ( !scanning ) return;
//         try
//         {
//             Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
//             setScanning( false );
//             const jsonData = result?.data || "";
//             router.push( {
//                 pathname: "/payment/confirm-payment",
//                 params: { data: jsonData },
//             } );
//         } catch ( error )
//         {
//             Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
//             Alert.alert(
//                 "QR không hợp lệ",
//                 "Mã QR không đúng định dạng hoặc không chứa thông tin thanh toán hợp lệ",
//                 [ { text: "Thử lại", onPress: () => setScanning( true ) } ]
//             );
//             console.log( "data", result?.data );
//         }
//     }, [ scanning ] );

//     const toggleFlash = () => setFlashEnabled( ( f ) => !f );

//     const pickImageAndScanQR = async () =>
//     {
//         try
//         {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//             if ( status !== "granted" )
//             {
//                 Alert.alert(
//                     "Cần quyền truy cập",
//                     "Ứng dụng cần quyền truy cập thư viện ảnh để chọn ảnh QR",
//                     [ { text: "OK" } ]
//                 );
//                 return;
//             }

//             setProcessingImage( true );

//             const result = await ImagePicker.launchImageLibraryAsync( {
//                 mediaTypes: "images",
//                 allowsEditing: false,
//                 quality: 1,
//             } );

//             if ( !result.canceled && result.assets.length > 0 )
//             {
//                 const selectedImage = result.assets[ 0 ];

//                 try
//                 {
//                     const scannedResults = await Camera.scanFromURLAsync( selectedImage.uri, [ "qr" ] );

//                     if ( scannedResults && scannedResults.length > 0 )
//                     {
//                         handleBarcodeScanned( { data: scannedResults[ 0 ].data } );
//                     } else
//                     {
//                         Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
//                         Alert.alert(
//                             "Không tìm thấy mã QR",
//                             "Không tìm thấy mã QR trong ảnh đã chọn. Vui lòng thử lại với ảnh khác.",
//                             [ { text: "OK" } ]
//                         );
//                     }
//                 } catch ( error )
//                 {
//                     console.error( "Error scanning image:", error );
//                     Alert.alert(
//                         "Lỗi quét ảnh",
//                         "Không thể quét mã QR từ ảnh đã chọn. Vui lòng thử lại.",
//                         [ { text: "OK" } ]
//                     );
//                 }
//             }
//         } catch ( error )
//         {
//             console.error( "Error picking image:", error );
//             Alert.alert( "Lỗi", "Không thể chọn ảnh. Vui lòng thử lại.", [ { text: "OK" } ] );
//         } finally
//         {
//             setProcessingImage( false );
//         }
//     };

//     if ( hasPermission === null )
//     {
//         return (
//             <View className="flex-1 bg-white justify-center items-center">
//                 <MaterialCommunityIcons name="camera" size={ 60 } color="#ccc" />
//                 <Text style={ { marginTop: 16, fontSize: 18 } }>Đang yêu cầu quyền camera...</Text>
//             </View>
//         );
//     }

//     if ( hasPermission === false )
//     {
//         return (
//             <View className="flex-1 bg-white justify-center items-center px-6">
//                 <MaterialCommunityIcons name="camera-off" size={ 60 } color="#ef4444" />
//                 <Text style={ { marginTop: 16, fontSize: 18, fontWeight: "500", textAlign: "center" } }>
//                     Không có quyền truy cập camera
//                 </Text>
//                 <Text style={ { marginTop: 8, color: "#6b7280", textAlign: "center", marginBottom: 24 } }>
//                     Vui lòng cấp quyền truy cập camera trong cài đặt để sử dụng tính năng quét mã QR
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View className="flex-1 bg-black">
//             <CameraView
//                 enableTorch={ flashEnabled }
//                 style={ { flex: 1 } }
//                 barcodeScannerSettings={ { barcodeTypes: [ "qr" ] } }
//                 onBarcodeScanned={ scanning ? handleBarcodeScanned : undefined }
//                 onCameraReady={ () => console.log( "Camera ready" ) }
//             >
//                 <View className="flex-1 items-center justify-center">
//                     {/* QR Frame */ }
//                     <View className="w-72 h-72 relative overflow-hidden">
//                         {/* Corner borders */ }
//                         <View style={ styles.cornerTopLeft } />
//                         <View style={ styles.cornerTopRight } />
//                         <View style={ styles.cornerBottomLeft } />
//                         <View style={ styles.cornerBottomRight } />
//                         <Animated.View
//                             style={ {
//                                 position: "absolute",
//                                 top: 0,
//                                 left: 0,
//                                 right: 0,
//                                 height: 2,
//                                 backgroundColor: "lime",
//                                 opacity: 0.8,
//                                 transform: [
//                                     {
//                                         translateY: scanLineAnimation.interpolate( {
//                                             inputRange: [ 0, 1 ],
//                                             outputRange: [ 0, 288 ], // Chiều cao khung 72 * 4 = 288
//                                         } ),
//                                     },
//                                 ],
//                             } }
//                         />
//                     </View>

//                     <Text className="mt-6 text-white text-base text-center px-10">
//                         Đặt mã QR vào khung để quét tự động
//                     </Text>
//                 </View>
//                 <View className="w-full mb-8">
//                     <View className="flex-row justify-center items-center space-x-4 gap-10">
//                         {/* Gallery Button */ }
//                         <TouchableOpacity
//                             className="bg-black/20 rounded-full p-4"
//                             onPress={ pickImageAndScanQR }
//                             disabled={ processingImage }
//                         >
//                             { processingImage ? (
//                                 <ActivityIndicator size="small" color="white" />
//                             ) : (
//                                 <Ionicons name="images-outline" size={ 24 } color="white" />
//                             ) }
//                         </TouchableOpacity>

//                         <TouchableOpacity
//                             className="bg-black/20 rounded-full p-4"
//                             onPress={ toggleFlash }
//                         >
//                             <Ionicons
//                                 name={ flashEnabled ? "flash" : "flash-outline" }
//                                 size={ 24 }
//                                 color="white"
//                             />
//                         </TouchableOpacity>
//                     </View>
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
//         width: 40,
//         height: 40,
//         borderTopWidth: 5,
//         borderLeftWidth: 5,
//         borderColor: '#ffffff',
//         borderTopLeftRadius: 12,
//     },
//     cornerTopRight: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         width: 40,
//         height: 40,
//         borderTopWidth: 5,
//         borderRightWidth: 5,
//         borderColor: '#ffffff',
//         borderTopRightRadius: 12,
//     },
//     cornerBottomLeft: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         width: 40,
//         height: 40,
//         borderBottomWidth: 5,
//         borderLeftWidth: 5,
//         borderColor: '#ffffff',
//         borderBottomLeftRadius: 12,
//     },
//     cornerBottomRight: {
//         position: 'absolute',
//         bottom: 0,
//         right: 0,
//         width: 40,
//         height: 40,
//         borderBottomWidth: 5,
//         borderRightWidth: 5,
//         borderColor: '#ffffff',
//         borderBottomRightRadius: 12,
//     },
// } );


import React, { useEffect, useState, useRef, useCallback } from "react";
import { View, Text, Alert, TouchableOpacity, ActivityIndicator, Animated, Dimensions, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";
import { useIsFocused } from "@react-navigation/native";

export default function QRScanner ()
{
    const [ hasPermission, setHasPermission ] = useState<boolean | null>( null );
    const [ flashEnabled, setFlashEnabled ] = useState( false );
    const [ scanning, setScanning ] = useState( true );
    const [ processingImage, setProcessingImage ] = useState( false );

    const scanLineAnimation = useRef( new Animated.Value( 0 ) ).current;
    const isFocused = useIsFocused();

    // Tính toán kích thước khung QR dựa trên chiều rộng màn hình
    const { width } = Dimensions.get( "window" );
    const qrFrameSize = Math.min( width * 0.7, 288 ); // 70% chiều rộng, tối đa 288px

    useEffect( () =>
    {
        setScanning( isFocused );
    }, [ isFocused ] );

    // Yêu cầu quyền camera
    useEffect( () =>
    {
        ( async () =>
        {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission( status === "granted" );
            setScanning( status === "granted" && isFocused );
        } )();
    }, [ isFocused ] );

    // Hiệu ứng đường quét
    useEffect( () =>
    {
        if ( !scanning || hasPermission !== true ) return;
        const animation = Animated.loop(
            Animated.sequence( [
                Animated.timing( scanLineAnimation, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                } ),
                Animated.timing( scanLineAnimation, {
                    toValue: 0,
                    duration: 1500,
                    useNativeDriver: true,
                } ),
            ] )
        );
        animation.start();
        return () => animation.stop();
    }, [ scanning, hasPermission ] );

    const handleBarcodeScanned = useCallback(
        ( result: any ) =>
        {
            if ( !scanning ) return;
            try
            {
                Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
                setScanning( false );
                const jsonData = result?.data || "";
                if ( !jsonData || typeof jsonData !== "string" )
                {
                    throw new Error( "Dữ liệu QR không hợp lệ" );
                }
                router.push( {
                    pathname: "/payment/confirm-payment",
                    params: { data: jsonData },
                } );
            } catch ( error )
            {
                Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
                Alert.alert(
                    "QR không hợp lệ",
                    "Mã QR không đúng định dạng hoặc không chứa thông tin thanh toán hợp lệ",
                    [ { text: "Thử lại", onPress: () => setScanning( true ) } ]
                );
                console.error( "Error scanning QR:", error );
            }
        },
        [ scanning ]
    );

    const toggleFlash = () => setFlashEnabled( ( f ) => !f );

    const pickImageAndScanQR = async () =>
    {
        try
        {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if ( status !== "granted" )
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
                mediaTypes: "images",
                allowsEditing: false,
                quality: 1,
            } );

            if ( !result.canceled && result.assets.length > 0 )
            {
                const selectedImage = result.assets[ 0 ];
                try
                {
                    const scannedResults = await Camera.scanFromURLAsync( selectedImage.uri, [ "qr" ] );
                    if ( scannedResults && scannedResults.length > 0 )
                    {
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
            Alert.alert( "Lỗi", "Không thể chọn ảnh. Vui lòng thử lại.", [ { text: "OK" } ] );
        } finally
        {
            setProcessingImage( false );
        }
    };

    if ( hasPermission === null )
    {
        return (
            <View className="flex-1 bg-white justify-center items-center">
                <MaterialCommunityIcons name="camera" size={ 60 } color="#ccc" />
                <Text className="mt-4 text-lg text-gray-800">Đang yêu cầu quyền camera...</Text>
            </View>
        );
    }

    if ( hasPermission === false )
    {
        return (
            <View className="flex-1 bg-white justify-center items-center px-6">
                <MaterialCommunityIcons name="camera-off" size={ 60 } color="#ef4444" />
                <Text className="mt-4 text-lg font-semibold text-gray-800 text-center">
                    Không có quyền truy cập camera
                </Text>
                <Text className="mt-2 text-sm text-gray-500 text-center">
                    Vui lòng cấp quyền truy cập camera trong cài đặt để sử dụng tính năng quét mã QR
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-black">
            <CameraView
                enableTorch={ flashEnabled }
                style={ { flex: 1 } }
                barcodeScannerSettings={ { barcodeTypes: [ "qr" ] } }
                onBarcodeScanned={ scanning ? handleBarcodeScanned : undefined }
                onCameraReady={ () => console.log( "Camera ready" ) }
            >
                <View className="flex-1 justify-center items-center">
                    {/* QR Frame */ }
                    <View
                        className="relative overflow-hidden"
                        style={ { width: qrFrameSize, height: qrFrameSize } }
                    >
                        {/* Corner borders */ }
                        <View style={ styles.cornerTopLeft } />
                        <View style={ styles.cornerTopRight } />
                        <View style={ styles.cornerBottomLeft } />
                        <View style={ styles.cornerBottomRight } />
                        {/* Scan Line */ }
                        <Animated.View
                            className="absolute left-0 right-0 h-[2px] bg-lime-500 opacity-80 align-center"
                            style={ {
                                transform: [
                                    {
                                        translateY: scanLineAnimation.interpolate( {
                                            inputRange: [ 0, 1 ],
                                            outputRange: [ 0, qrFrameSize - 2 ], // Không tràn khung
                                        } ),
                                    },
                                ],
                            } }
                        />
                    </View>

                    <Text className="mt-4 text-white text-base font-medium text-center px-5">
                        Đặt mã QR vào khung để quét tự động
                    </Text>
                </View>
                <View className="w-full pb-8">
                    <View className="flex-row justify-center items-center gap-6">
                        {/* Gallery Button */ }
                        <TouchableOpacity
                            className="bg-black/30 rounded-full p-4"
                            onPress={ pickImageAndScanQR }
                            disabled={ processingImage }
                        >
                            { processingImage ? (
                                <ActivityIndicator size="small" color="white" />
                            ) : (
                                <Ionicons name="images-outline" size={ 24 } color="white" />
                            ) }
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="bg-black/30 rounded-full p-4"
                            onPress={ toggleFlash }
                        >
                            <Ionicons
                                name={ flashEnabled ? "flash" : "flash-outline" }
                                size={ 24 }
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create( {
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#ffffff',
        borderTopLeftRadius: 12,
        zIndex: 10
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 5,
        borderRightWidth: 5,
        borderColor: '#ffffff',
        borderTopRightRadius: 12,
        zIndex: 10
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderLeftWidth: 5,
        borderColor: '#ffffff',
        borderBottomLeftRadius: 12,
        zIndex: 10
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 5,
        borderRightWidth: 5,
        borderColor: '#ffffff',
        borderBottomRightRadius: 12,
        zIndex: 10
    },
} );