import { router } from "expo-router";

export const Actions = [
    {
        id: 1,
        name: "Chuyển tiền",
        icon: require( "@/assets/images/dollar.png" ),
        navigate: () => router.push( "/transfer" ),
        color: "#1D4ED8",         // blue-700
        backgroundColor: "#DBEAFE", // blue-100
        borderColor: "#93C5FD",   // blue-300
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
        color: "#15803D",         // green-700
        backgroundColor: "#D1FAE5", // green-100
        borderColor: "#86EFAC",   // green-300
    },
    {
        id: 3,
        name: "Nhận tiền",
        icon: require( "@/assets/images/money.png" ),
        navigate: () => router.push( "/(tabs)/qr/create" ),
        color: "#B91C1C",         // red-700
        backgroundColor: "#FEE2E2", // red-100
        borderColor: "#FCA5A5",   // red-300
    },
    {
        id: 5,
        name: "Lịch sử giao dịch",
        icon: require( "@/assets/images/history.png" ),
        navigate: () => router.push( "/(tabs)/history" ),
        color: "#DB2777",         // pink-500
        backgroundColor: "#FCE7F3", // pink-100
        borderColor: "#F9A8D4",   // pink-300
    },
    {
        id: 4,
        name: "Chi tiết tài khoản",
        icon: require( "@/assets/images/info.png" ),
        navigate: () => router.push( "/bank-account" ),
        color: "#CA8A04",         // yellow-600
        backgroundColor: "#FFFBEB", // yellow-50
        borderColor: "#FACC15",   // yellow-400
    },
    {
        id: 6,
        name: "Biến động số dư",
        icon: require( "@/assets/images/share.png" ),
        navigate: () => router.push( "/share-balance-fluctuation" ),
        color: "#F97316",         // orange-500
        backgroundColor: "#FFEDD5", // orange-100
        borderColor: "#FDBA74",   // orange-400
    },
    {
        id: 7,
        name: "Thống kê",
        icon: require( "@/assets/images/spreadsheet-app.png" ),
        navigate: () => router.push( "/statistics" ),
        color: "#7C3AED",         // violet-600
        backgroundColor: "#EDE9FE", // violet-100
        borderColor: "#C4B5FD",   // violet-400
    },
];
