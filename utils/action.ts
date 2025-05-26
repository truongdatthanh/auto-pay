import { router } from "expo-router";
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';
import * as Clipboard from 'expo-clipboard';

export const Actions = [
    {
        id: 1,
        name: "Chuyển tiền",
        icon: require( "@/assets/images/dollar.png" ),
        navigate: () => router.push( "/payment/transfer" ),
    },
    {
        id: 2,
        name: "QR của tôi",
        icon: require( "@/assets/images/qr-code.png" ),
        navigate: () =>
            router.replace( {
                pathname: "/(tabs)/qr",
                params: { tabIndex: 1 },
            } ),
    },
    {
        id: 3,
        name: "Nhận tiền",
        icon: require( "@/assets/images/money.png" ),
        navigate: () => router.push( "/(tabs)/qr/create" ),
    },
    {
        id: 5,
        name: "Lịch sử giao dịch",
        icon: require( "@/assets/images/history.png" ),
        navigate: () => router.push( "/(tabs)/history" ),
    },
    {
        id: 4,
        name: "Chi tiết tài khoản",
        icon: require( "@/assets/images/info.png" ),
        navigate: () => router.push( "/bank-account" ),
    },
    {
        id: 6,
        name: "Biến động số dư",
        icon: require( "@/assets/images/share.png" ),
        navigate: () => router.push( "/balance/fluctuation" ),
    },
    {
        id: 7,
        name: "Thống kê",
        icon: require( "@/assets/images/spreadsheet-app.png" ),
        navigate: () => router.push( "/statistics" ),
    },
];

export async function shareQR(uri: string) {
  await Sharing.shareAsync(uri);
}

export async function saveQR(uri: string) {
  const asset = await MediaLibrary.createAssetAsync(uri);
  await MediaLibrary.createAlbumAsync("QR Codes", asset, false);
}

export function copyNumber(text: string) {
  Clipboard.setStringAsync(text);
}