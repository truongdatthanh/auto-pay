// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import { CameraView, Camera } from "expo-camera";

// export default function QRScreen ()
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

//     if ( hasPermission === null ) return <Text>Đang xin quyền...</Text>;
//     if ( hasPermission === false ) return <Text>Không có quyền camera</Text>;

//     return (
//         <View className="flex-1 bg-white px-6 py-8">
//             <Text className="text-lg font-semibold">QR Scanner</Text>
//             <CameraView
//                 className="flex-1  bg-red-500 rounded-lg"
//                 style={ { flex: 1 } }
//                 barcodeScannerSettings={ {
//                     barcodeTypes: [ "qr" ],
//                 } }
//                 onBarcodeScanned={ ( res ) =>
//                 {
//                     console.log( "QR:", res?.data );
//                 } }
//                 onCameraReady={ () =>
//                 {
//                     console.log( "Camera is ready" );
//                 } }
//                 autofocus="on"
//             />
//         </View>
//     );
// }


import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { CameraView, Camera } from "expo-camera";

export default function QRScreen ()
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

    if ( hasPermission === null ) return <Text>Đang xin quyền...</Text>;
    if ( hasPermission === false ) return <Text>Không có quyền camera</Text>;

    return (
        <View className="flex-1 bg-white">
            <Text className="text-xl font-bold text-center mt-6">Quét mã QR</Text>

            <CameraView
                className="flex-1 mt-4"
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
                {/* Overlay khung quét QR */ }
                <View className="absolute top-0 left-0 right-0 bottom-0 items-center justify-center">
                    <View className="w-64 h-64 border-4 border-white rounded-xl bg-transparent" />
                    <Text className="mt-4 text-white text-base">Đưa mã QR vào khung để quét</Text>
                </View>
            </CameraView>
        </View>
    );
}


