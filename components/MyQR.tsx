import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MyQRPopup ( props: any )
{
    const [ visible, setVisible ] = useState( false );

    const userData = props.userData;

    const jsonData = JSON.stringify( userData );

    return (
        <View className="items-center">
            <TouchableOpacity
                onPress={ () => setVisible( true ) }
                className="bg-blue-500 w-12 h-12 items-center justify-center rounded-full "
            >
                <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color="white" />
            </TouchableOpacity>

            <Modal
                visible={ visible }
                animationType="fade"
                transparent
                onRequestClose={ () => setVisible( false ) }
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white p-6 rounded-2xl items-center">
                        <Text className="text-lg font-bold mb-4">Mã QR của bạn</Text>
                        <QRCode value={ jsonData } size={ 200 } />
                        <TouchableOpacity
                            onPress={ () => setVisible( false ) }
                            className="bg-gray-500 px-6 py-2 mt-5 rounded-lg"
                        >
                            <Text className="text-white">Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
