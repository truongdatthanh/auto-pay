import React, { useRef } from 'react';
import { Button, View, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library'; // Để lưu vào thư viện ảnh
import QRCode from 'react-native-qrcode-svg';
import { captureRef } from 'react-native-view-shot'; // Để chụp màn hình QR

const saveQRCodeToGallery = async (qrRef: any) => {
  try {
    // Kiểm tra quyền truy cập thư viện ảnh
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (permission.status !== 'granted') {
      Alert.alert('Permission required', 'You need to grant permission to access your photo library');
      return;
    }

    // Capture mã QR dưới dạng hình ảnh
    const uri = await captureRef(qrRef, {
      format: 'png',
      quality: 0.8,
    });

    // Lưu ảnh vào thư viện ảnh
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('Expo QR Codes', asset, false); // Tạo album và lưu

    Alert.alert('Success', 'QR code saved to your photo library');
  } catch (error) {
    console.error('Error saving QR code to gallery:', error);
    Alert.alert('Error', 'Failed to save QR code');
  }
};

const QRCodeSaver = () => {
  const qrRef = useRef();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <QRCode
        value="https://example.com"
        size={200}
        getRef={(ref) => (qrRef.current = ref)} // Reference to QR code component
      />
      <Button title="Save QR Code to Gallery" onPress={() => saveQRCodeToGallery(qrRef)} />
    </View>
  );
};

export default QRCodeSaver;
