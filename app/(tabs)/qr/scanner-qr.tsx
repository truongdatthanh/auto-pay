// import React, { useEffect, useState } from "react";
// import { View, Text, Alert } from "react-native";
// import { CameraView, Camera } from "expo-camera";

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
//                     Alert.alert( "QR:", res?.data );
//                 } }
//                 onCameraReady={ () =>
//                 {
//                     console.log( "Camera is ready" );
//                 } }
//                 autofocus="on"
//             >
//                 {/* Overlay khung quét QR */ }
//                 <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
//                     <View className="w-64 h-64 border-4 border-white rounded-xl bg-transparent" />
//                     <Text className="mt-4 text-white text-base">Đưa mã QR vào khung để quét</Text>
//                 </View>
//             </CameraView>
//         </View>
//     );
// }


import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function QRScanner ()
{
    const [ hasPermission, setHasPermission ] = useState<boolean | null>( false );

    useEffect( () =>
    {
        ( async () =>
        {
            const { status } = await Camera.requestCameraPermissionsAsync();
            console.log( "status", status );
            setHasPermission( status === "granted" );
        } )();
    }, [] );

    if ( hasPermission === null )
    {
        return <Text>Đang xin quyền...</Text>;
    }
    if ( hasPermission === false )
    {
        return <Text>Không có quyền camera</Text>;
    }

    return (
        <View className="flex-1 bg-white">
            <CameraView
                style={ { flex: 1 } }
                barcodeScannerSettings={ { barcodeTypes: [ "qr" ] } }
                onBarcodeScanned={ ( res ) =>
                {
                    Alert.alert( "QR:", res?.data );
                } }
                onCameraReady={ () =>
                {
                    console.log( "Camera is ready" );
                } }
                autofocus="on"
            >
                {/* Overlay khung quét QR với 4 góc */ }
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <View className="w-64 h-64 relative">
                        {/* Góc trên bên trái */ }
                        <View style={ styles.cornerTopLeft } />

                        {/* Góc trên bên phải */ }
                        <View style={ styles.cornerTopRight } />

                        {/* Góc dưới bên trái */ }
                        <View style={ styles.cornerBottomLeft } />

                        {/* Góc dưới bên phải */ }
                        <View style={ styles.cornerBottomRight } />
                    </View>
                    <Text className="mt-4 text-white text-base">Đưa mã QR vào khung để quét</Text>
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
        width: 20,
        height: 20,
        borderTopWidth: 3,
        borderLeftWidth: 3,
        borderColor: 'white',
        borderTopLeftRadius: 10
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 20,
        height: 20,
        borderTopWidth: 3,
        borderRightWidth: 3,
        borderColor: 'white',
        borderTopRightRadius: 10
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 3,
        borderLeftWidth: 3,
        borderColor: 'white',
        borderBottomLeftRadius: 10
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        borderColor: 'white',
        borderBottomRightRadius: 10
    }
} );

