import { router } from "expo-router";

export const Actions = [
    {
        id: 1,
        name: "Chuyển tiền",
        icon: require( "@/assets/images/dollar.png" ),
        navigate: () => router.push( "/transfer" ),
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
        navigate: () => router.push( "/share-balance-fluctuation" ),
    },
    {
        id: 7,
        name: "Thống kê",
        icon: require( "@/assets/images/spreadsheet-app.png" ),
        navigate: () => router.push( "/statistics" ),
    },
];
