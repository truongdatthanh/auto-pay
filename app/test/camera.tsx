import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraExample ()
{
    const [ facing, setFacing ] = useState<CameraType>( 'back' );
    const [ permission, requestPermission ] = useCameraPermissions();
    const [ scanned, setScanned ] = useState( false );

    if ( !permission )
    {
        // Camera permissions are still loading.
        return <View />;
    }

    if ( !permission.granted )
    {
        // Camera permissions are not granted yet.
        return (
            <View style={ styles.container }>
                <Text style={ styles.message }>We need your permission to show the camera</Text>
                <Button onPress={ requestPermission } title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing ()
    {
        setFacing( current => ( current === 'back' ? 'front' : 'back' ) );
    }

    function handleBarcodeScanned ( { data }: { data: string } )
    {
        if ( scanned ) return; // tránh quét liên tục
        setScanned( true );
        Alert.alert( 'Quét thành công', data, [
            {
                text: 'OK',
                onPress: () => setScanned( false ),
            },
        ] );
    }

    return (
        <View style={ styles.container }>
            <CameraView
                style={ styles.camera }
                facing={ facing }
                onBarcodeScanned={ handleBarcodeScanned }
                barcodeScannerSettings={ { barcodeTypes: [ 'qr' ] } }
            >
                <View style={ styles.buttonContainer }>
                    <TouchableOpacity style={ styles.button } onPress={ toggleCameraFacing }>
                        <Text style={ styles.text }>Flip Camera</Text>
                    </TouchableOpacity>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
} );
