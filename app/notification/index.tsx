import { Text, View, FlatList } from "react-native";
import mockNotificate from "@/assets/notificate.json";
import { useState } from "react";
import TabbarTop from "@/components/tabbar/TabbarTop";
import { FontAwesome5 } from "@expo/vector-icons";
import { INotification } from "@/interface/INotification";
import { formatCurrencyWithCode, formatDayMonthYear } from "@/utils/format";

const tabMapping = {
    "Tất cả": "all",
    "Chưa đọc": "unread",
    "Khuyến mãi": "promotion",
    "Biến động": "fluctuation",
    "Tin được chia sẻ": "shared",
    "Cảnh báo": "warning"
} as const;

const listTabs = [ "Tất cả", "Chưa đọc", "Khuyến mãi", "Biến động", "Tin được chia sẻ", "Cảnh báo" ] as const;

export default function Notification ()
{
    const notificate = mockNotificate;
    const [ tabbar, setTabbar ] = useState( "all" );

    const handleTabChange = ( tabLabel: string ) =>
    {
        console.log( "tab label: ", tabLabel )
        const tabId = tabMapping[ tabLabel as keyof typeof tabMapping ];
        console.log( "tabId: ", tabId )
        setTabbar( tabId );
    };

    // Lọc dữ liệu dựa theo tab được chọn
    const getFilteredData = () =>
    {
        switch ( tabbar )
        {
            case "all":
                return notificate;
            case "unread":
                return notificate.filter( item => item.status === false );
            case "promotion":
                return notificate.filter( item => item.type === "promotion" );
            case "fluctuation":
                return notificate.filter( item => item.type === "fluctuation" );
            case "shared":
                return notificate.filter( item => item.type === "shared" );
            case "warning":
                return notificate.filter( item => item.type === "warning" );
            default:
                return notificate;
        }
    };

    // Template cho khuyến mãi
    // const renderPromotionItem = ( item: INotification ) => (
    //     <View className="bg-gradient-to-r from-orange-50 to-red-50 p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 border-orange-400">
    //         <View className="w-12 h-12 rounded-full bg-orange-100 justify-center items-center">
    //             <FontAwesome5 name="gift" size={ 20 } color="#F97316" />
    //         </View>

    //         <View className="ml-4 flex-1">
    //             <Text className="text-orange-600 font-bold text-sm mb-1">
    //                 🎉 KHUYẾN MÃI
    //             </Text>
    //             <Text className="text-sm text-gray-400 mt-1">{ item.content }</Text>
    //             <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
    //         </View>
    //     </View>
    // );

    const renderPromotionItem = ( item: INotification ) => (
        <View className="bg-black p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center">
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <Text className="text-sm text-white mt-1">{ item.content }</Text>
            </View>
        </View>
    );

    // Template cho biến động (mặc định)
    const renderFluctuationItem = ( item: INotification ) => (
        <View className="bg-black p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center">
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <View className="gap-2">
                    <View className="flex-row items-center">
                        <Text className="text-sm text-white mt-1">Thời gian GD: { " " }</Text>
                        <Text className="text-sm text-white mt-1">{ item.time } { item.date ? formatDayMonthYear( item.date ) : "" }</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-sm text-white mt-1">Mã GD: { " " }</Text>
                        <Text className="text-sm text-white mt-1">{ item.transactionId }</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-sm text-white mt-1">Tài khoản nhận: { " " }</Text>
                        <Text className="text-sm text-white mt-1 font-semibold">{ item.recieveCard }</Text>
                    </View>
                    <View className="flex-row items-center">
                        <Text className="text-sm text-white mt-1">Số tiền: { " " }</Text>
                        <Text className="text-sm text-white mt-1 font-semibold">{ formatCurrencyWithCode( item.amount ) }</Text>
                    </View>
                    <View className="flex-row">
                        <Text className="text-sm text-white mt-1 flex-1">Nội dung GD:  { item.content } hjagsdhaj hjasgdhjsa jkhdkajs ajsdhjk sadkj ads aks askdjkl á sadk</Text>
                    </View>
                </View>
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
            </View>
        </View>
    );

    // Template cho cảnh báo
    const renderWarningItem = ( item: INotification ) => (
        <View className=" p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center bg-black">
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <Text className="text-sm text-white mt-1">{ item.content }</Text>
            </View>
        </View>
    );

    // Template cho tin được chia sẻ
    const renderSharedItem = ( item: INotification ) => (
        <View className="bg-green-50 p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 border-green-400">
            <View className="w-12 h-12 rounded-full bg-green-100 justify-center items-center">
                <FontAwesome5 name="share-alt" size={ 20 } color="#10B981" />
            </View>

            <View className="ml-4 flex-1">
                <Text className="text-green-600 font-bold text-sm mb-1">
                    📤 CHIA SẺ
                </Text>
                <Text className="text-sm text-gray-400 mt-1">{ item.content }</Text>
                <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
            </View>
        </View>
    );

    // Hàm render theo type - nhận item trực tiếp
    const renderByType = ( item: INotification ) =>
    {
        switch ( item.type )
        {
            case "promotion":
                return renderPromotionItem( item );
            case "warning":
                return renderWarningItem( item );
            case "shared":
                return renderSharedItem( item );
            case "fluctuation":
            default:
                return renderFluctuationItem( item );
        }
    };

    // Hàm renderItem cho FlatList - nhận object { item, index }
    const renderItem = ( { item }: { item: INotification } ) =>
    {
        return renderByType( item );
    };

    const dataToShow = getFilteredData();

    return (
        <View className="flex-1 bg-slate-50 border border-white">
            <TabbarTop
                tabs={ listTabs }
                onTabChange={ handleTabChange }
            />
            <FlatList
                data={ dataToShow }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ renderItem }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    );
}

// import { Text, View, FlatList } from "react-native";
// import mockNotificate from "@/assets/notificate.json";
// import { useState } from "react";
// import TabbarTop from "@/components/tabbar/TabbarTop";
// import { FontAwesome5 } from "@expo/vector-icons";

// const listTabs = [ "Tất cả", "Chưa đọc", "Khuyến mãi", "Biến động", "Tin được chia sẻ", "Cảnh báo" ] as const;
// export default function Notification ()
// {
//     const notificate = mockNotificate;
//     const [ tabbar, setTabbar ] = useState( "Tất cả" );

//     const handleTabChange = ( tab: string ) =>
//     {
//         setTabbar( tab );
//     };

//     const unReadList = notificate.filter( ( item ) => item.status === false );
//     const dataToShow = tabbar === "Tất cả" ? notificate : unReadList;

//     const renderItem = ( { item }: any ) => (
//         <View className="bg-white p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center ">
//             <View className="w-12 h-12 rounded-full bg-blue-100 justify-center items-center">
//                 <FontAwesome5 name="money-bill-wave" size={ 20 } color="#3B82F6" />
//             </View>

//             <View className="ml-4 flex-1">
//                 <Text className="text-gray-800 font-medium">
//                     Bạn nhận được tiền từ{ " " }
//                     <Text className="font-bold text-blue-500">{ item.name }</Text>
//                 </Text>
//                 <Text className="text-lg font-bold text-green-600 mt-1">
//                     +{ item.amount }₫
//                 </Text>
//                 <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View className="flex-1 bg-slate-50 border border-white" >
//             <TabbarTop tabs={ listTabs } onTabChange={ handleTabChange } />
//             <FlatList
//                 data={ dataToShow }
//                 keyExtractor={ ( item ) => item.id.toString() }
//                 renderItem={ renderItem }
//                 showsVerticalScrollIndicator={ false }
//             />
//         </View>
//     );
// }

// import { Text, View, FlatList } from "react-native";
// import mockNotificate from "@/assets/notificate.json";
// import { useState } from "react";
// import TabbarTop from "@/components/tabbar/TabbarTop";
// import { FontAwesome5 } from "@expo/vector-icons";

// export default function Notification ()
// {
//     const notificate = mockNotificate;
//     const [ tabbar, setTabbar ] = useState( "Tất cả" );

//     const handleTabChange = ( tab: string ) =>
//     {
//         setTabbar( tab );
//     };

//     const unReadList = notificate.filter( ( item ) => item.status === false );
//     const dataToShow = tabbar === "Tất cả" ? notificate : unReadList;

//     const renderItem = ( { item }: any ) => (
//         <View className="bg-white p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center">
//             <View className="w-12 h-12 rounded-full bg-blue-100 justify-center items-center">
//                 <FontAwesome5 name="money-bill-wave" size={ 20 } color="#3B82F6" />
//             </View>

//             <View className="ml-4 flex-1">
//                 <Text className="text-gray-800 font-medium">
//                     Bạn nhận được tiền từ{ " " }
//                     <Text className="font-bold text-blue-500">{ item.name }</Text>
//                 </Text>
//                 <Text className="text-lg font-bold text-green-600 mt-1">
//                     +{ item.amount }₫
//                 </Text>
//                 <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
//             </View>
//         </View>
//     );

//     return (
//         <View className="flex-1 bg-slate-50 border border-white">
//             {/* Sử dụng scrollable cho 5 tabs */ }
//             <TabbarTop
//                 tabs={ [ "Tất cả", "Chưa đọc", "Tiền", "Thông báo", "Khuyến mãi" ] }
//                 onTabChange={ handleTabChange }
//                 scrollable={ true }
//                 tabMinWidth={ 100 }
//             />
//             <FlatList
//                 data={ dataToShow }
//                 keyExtractor={ ( item ) => item.id.toString() }
//                 renderItem={ renderItem }
//                 showsVerticalScrollIndicator={ false }
//             />
//         </View>
//     );
// }