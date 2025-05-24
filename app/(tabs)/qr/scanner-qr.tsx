// import React, { useEffect, useState, useRef, useCallback } from "react";
// import { View, Text, Alert, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Animated } from "react-native";
// import { CameraView, Camera } from "expo-camera";
// import { router } from "expo-router";
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import * as Haptics from 'expo-haptics';
// import * as ImagePicker from 'expo-image-picker';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useFocusEffect } from "@react-navigation/native";


// export default function QRScanner ()
// {
//     const [ hasPermission, setHasPermission ] = useState<boolean | null>( false );//Quyền
//     const [ flashEnabled, setFlashEnabled ] = useState( false );
//     const [ scanning, setScanning ] = useState( true );
//     const [ processingImage, setProcessingImage ] = useState( false );

//     // Animation for scanning line
//     const scanLineAnimation = useRef( new Animated.Value( 0 ) ).current;

//     useFocusEffect(
//         useCallback( () =>
//         {
//             let isActive = true;
//             setScanning( true ); // Reset trạng thái mỗi khi quay lại tab

//             ( async () =>
//             {
//                 const { status } = await Camera.requestCameraPermissionsAsync();
//                 if ( isActive )
//                 {
//                     setHasPermission( status === "granted" );
//                 }
//             } )();

//             return () =>
//             {
//                 isActive = false;
//             };
//         }, [] )
//     );
//     // Start scanning line animation
//     useEffect( () =>
//     {
//         if ( scanning )
//         {
//             // Create animation sequence
//             const startAnimation = () =>
//             {
//                 Animated.sequence( [
//                     // Move down
//                     Animated.timing( scanLineAnimation, {
//                         toValue: 1,
//                         duration: 1500,
//                         useNativeDriver: true
//                     } ),
//                     // Move up
//                     Animated.timing( scanLineAnimation, {
//                         toValue: 0,
//                         duration: 1500,
//                         useNativeDriver: true
//                     } )
//                 ] ).start( () =>
//                 {
//                     // Repeat animation if still scanning
//                     if ( scanning )
//                     {
//                         startAnimation();
//                     }
//                 } );
//             };

//             startAnimation();
//         }
//     }, [ scanning ] );

//     // Xử lý quét mã QR
//     const handleBarcodeScanned = ( result: any ) =>
//     {
//         if ( !scanning ) return;
//         try
//         {
//             // Rung điện thoại khi quét thành công
//             Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
//             setScanning( false );
//             const jsonData = result?.data || "";
//             console.log( "jsonData", jsonData );
//             setTimeout( () =>
//             {
//                 router.push( {
//                     pathname: "/confirm-payment",
//                     params: {
//                         data: jsonData,
//                     },
//                 } );
//             }, 500 );
//         } catch ( error )
//         {
//             // Vibrate on error
//             Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
//             Alert.alert(
//                 "QR không hợp lệ",
//                 "Mã QR không đúng định dạng hoặc không chứa thông tin thanh toán hợp lệ",
//                 [ { text: "Thử lại", onPress: () => setScanning( true ) } ]
//             );
//             console.log( "data", result?.data );
//         }
//     };

//     // Toggle flashlight
//     const toggleFlash = () =>
//     {
//         setFlashEnabled( !flashEnabled );
//     };

//     // Chọn ảnh từ thư viện
//     const pickImageAndScanQR = async () =>
//     {
//         try
//         {
//             const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();//Xin quyền truy cập thư viện ảnh
//             if ( status !== 'granted' )
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
//                 mediaTypes: 'images',
//                 allowsEditing: false,
//                 quality: 1,
//             } );

//             if ( !result.canceled && result.assets && result.assets.length > 0 )
//             {
//                 const selectedImage = result.assets[ 0 ];
//                 // Scan hình ảnh QR bằng Camera.scanFromURLAsync bằng cách lấy ra uri path của ảnh
//                 try
//                 {
//                     const scannedResults = await Camera.scanFromURLAsync( selectedImage.uri, [ 'qr' ] );

//                     if ( scannedResults && scannedResults.length > 0 )
//                     {
//                         // Nếu tìm thấy được QR
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
//             Alert.alert(
//                 "Lỗi",
//                 "Không thể chọn ảnh. Vui lòng thử lại.",
//                 [ { text: "OK" } ]
//             );
//         } finally
//         {
//             setProcessingImage( false );
//         }
//     };

//     // Handle permission states
//     if ( hasPermission === null )
//     {
//         return (
//             <View className="flex-1 bg-white justify-center items-center">
//                 <MaterialCommunityIcons name="camera" size={ 60 } color="#ccc" />
//                 <Text className="mt-4 text-lg">Đang yêu cầu quyền camera...</Text>
//             </View>
//         );
//     }

//     if ( hasPermission === false )
//     {
//         return (
//             <View className="flex-1 bg-white justify-center items-center px-6">
//                 <MaterialCommunityIcons name="camera-off" size={ 60 } color="#ef4444" />
//                 <Text className="mt-4 text-lg font-medium text-center">
//                     Không có quyền truy cập camera
//                 </Text>
//                 <Text className="mt-2 text-gray-500 text-center mb-6">
//                     Vui lòng cấp quyền truy cập camera trong cài đặt để sử dụng tính năng quét mã QR
//                 </Text>
//                 <TouchableOpacity
//                     className="bg-[#1c40f2] py-3 px-6 rounded-xl"
//                     onPress={ () => router.replace( "/(tabs)" ) }
//                 >
//                     <Text className="text-white font-medium">Quay lại trang chủ</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }

//     return (
//         <>
//             <SafeAreaView className="flex-1 bg-black">
//                 {/* Camera View */ }
//                 <CameraView
//                     enableTorch={ flashEnabled }
//                     style={ { flex: 1 } }
//                     barcodeScannerSettings={ {
//                         barcodeTypes: [ "qr" ],
//                     } }
//                     onBarcodeScanned={ scanning ? handleBarcodeScanned : undefined }
//                     onCameraReady={ () => console.log( "Camera is ready" ) }
//                     autofocus="on"
//                 >
//                     {/* Scanner Frame */ }
//                     <View className="flex-1 items-center justify-center">
//                         {/* QR Frame */ }
//                         <View className="w-72 h-72 relative">
//                             {/* Corner borders */ }
//                             <View style={ styles.cornerTopLeft } />
//                             <View style={ styles.cornerTopRight } />
//                             <View style={ styles.cornerBottomLeft } />
//                             <View style={ styles.cornerBottomRight } />
//                         </View>

//                         <Text className="mt-6 text-white text-base text-center px-10">
//                             Đặt mã QR vào khung để quét tự động
//                         </Text>
//                     </View>

//                     {/* Bottom Actions */ }
//                     <View className="w-full mb-8">
//                         <View className="flex-row justify-center items-center space-x-4 gap-10">
//                             {/* Gallery Button */ }
//                             <TouchableOpacity
//                                 className="bg-black/20 rounded-full p-4"
//                                 onPress={ pickImageAndScanQR }
//                                 disabled={ processingImage }
//                             >
//                                 { processingImage ? (
//                                     <ActivityIndicator size="small" color="white" />
//                                 ) : (
//                                     <Ionicons name="images-outline" size={ 24 } color="white" />
//                                 ) }
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 className="bg-black/20 rounded-full p-4"
//                                 onPress={ toggleFlash }
//                             >
//                                 <Ionicons
//                                     name={ flashEnabled ? "flash" : "flash-outline" }
//                                     size={ 24 }
//                                     color="white"
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </CameraView>
//             </SafeAreaView>

//         </>
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
import { View, Text, Alert, StyleSheet, TouchableOpacity, ActivityIndicator, Animated } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { router } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as ImagePicker from "expo-image-picker";

export default function QRScanner ()
{
    const [ hasPermission, setHasPermission ] = useState<boolean | null>( null );
    const [ flashEnabled, setFlashEnabled ] = useState( false );
    const [ scanning, setScanning ] = useState( true );
    const [ processingImage, setProcessingImage ] = useState( false );

    const scanLineAnimation = useRef( new Animated.Value( 0 ) ).current;

    // Request camera permission once on mount
    useEffect( () =>
    {
        ( async () =>
        {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission( status === "granted" );
            setScanning( true ); // reset scanning when mount
        } )();
    }, [] );

    // Animate scan line
    useEffect( () =>
    {
        if ( !scanning ) return;

        const startAnimation = () =>
        {
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
            ] ).start( () =>
            {
                if ( scanning ) startAnimation();
            } );
        };

        startAnimation();

        return () =>
        {
            scanLineAnimation.stopAnimation();
        };
    }, [ scanning ] );

    const handleBarcodeScanned = ( result: any ) =>
    {
        if ( !scanning ) return;

        try
        {
            Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
            setScanning( false );
            const jsonData = result?.data || "";

            setTimeout( () =>
            {
                router.push( {
                    pathname: "/payment/confirm-payment",
                    params: { data: jsonData },
                } );
            }, 500 );
        } catch ( error )
        {
            Haptics.notificationAsync( Haptics.NotificationFeedbackType.Error );
            Alert.alert(
                "QR không hợp lệ",
                "Mã QR không đúng định dạng hoặc không chứa thông tin thanh toán hợp lệ",
                [ { text: "Thử lại", onPress: () => setScanning( true ) } ]
            );
            console.log( "data", result?.data );
        }
    };

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
                <Text style={ { marginTop: 16, fontSize: 18 } }>Đang yêu cầu quyền camera...</Text>
            </View>
        );
    }

    if ( hasPermission === false )
    {
        return (
            <View className="flex-1 bg-white justify-center items-center px-6">
                <MaterialCommunityIcons name="camera-off" size={ 60 } color="#ef4444" />
                <Text style={ { marginTop: 16, fontSize: 18, fontWeight: "500", textAlign: "center" } }>
                    Không có quyền truy cập camera
                </Text>
                <Text style={ { marginTop: 8, color: "#6b7280", textAlign: "center", marginBottom: 24 } }>
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
                <View className="w-full mb-8">
                    <View className="flex-row justify-center items-center space-x-4 gap-10">
                        {/* Gallery Button */ }
                        <TouchableOpacity
                            className="bg-black/20 rounded-full p-4"
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
                            className="bg-black/20 rounded-full p-4"
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
    },
} );


