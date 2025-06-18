import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import mockNotificate from "@/assets/notificate.json";
import { useState } from "react";
import TabbarTop from "@/components/tabbar/TabbarTop";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";
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
    // Sử dụng state để quản lý danh sách notifications
    const [ notifications, setNotifications ] = useState<INotification[]>( mockNotificate );
    const [ tabbar, setTabbar ] = useState( "all" );

    const handleTabChange = ( tabLabel: string ) =>
    {
        console.log( "tab label: ", tabLabel )
        const tabId = tabMapping[ tabLabel as keyof typeof tabMapping ];
        console.log( "tabId: ", tabId )
        setTabbar( tabId );
    };

    // Hàm xử lý khi tap vào notification
    const handleNotificationPress = ( notificationId: string ) =>
    {
        setNotifications( prevNotifications =>
            prevNotifications.map( notification =>
                notification.id === notificationId
                    ? { ...notification, status: false } // Đánh dấu đã đọc
                    : notification
            )
        );
    };

    // Hàm đánh dấu tất cả đã đọc
    const markAllAsRead = () =>
    {
        setNotifications( prevNotifications =>
            prevNotifications.map( notification => ( {
                ...notification,
                status: true
            } ) )
        );
    };

    // Lọc dữ liệu dựa theo tab được chọn
    const getFilteredData = () =>
    {
        switch ( tabbar )
        {
            case "all":
                return notifications;
            case "unread":
                return notifications.filter( item => item.status === false );
            case "promotion":
                return notifications.filter( item => item.type === "promotion" );
            case "fluctuation":
                return notifications.filter( item => item.type === "fluctuation" );
            case "shared":
                return notifications.filter( item => item.type === "shared" );
            case "warning":
                return notifications.filter( item => item.type === "warning" );
            default:
                return notifications;
        }
    };

    const renderPromotionItem = ( item: INotification ) => (
        <TouchableOpacity
            onPress={ () => handleNotificationPress( item.id ) }
            className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
                }` }
        >
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <Text className="text-sm text-white mt-1">{ item.content }</Text>
            </View>
            { !item.status && (
                <View className="absolute top-[-2] right-[-2]">
                    <View className="relative">
                        <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
                            <View className="h-4 w-4 bg-red-500 rounded-full" />
                        </View>
                    </View>
                </View>
            ) }
        </TouchableOpacity>
    );

    // Template cho biến động (mặc định)
    const renderFluctuationItem = ( item: INotification ) => (
        <TouchableOpacity
            onPress={ () => handleNotificationPress( item.id ) }
            className={ `px-4 py-2 mx-4 my-1.5 flex-row items-center relative bg-white rounded-lg ${ item.status ? "shadow-lg" : "" }` }
        >
            <View className="flex-1">
                <View>
                    <View className="flex-row items-center">
                        <Image source={ { uri: item.bankLogo } } className="w-8 h-8 bg-blue-300/20 rounded-full shadow-md" resizeMode="contain" />
                        <Text className="text-sm text-black mt-1 font-semibold"> { item.recieveCard }</Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Text className="text-sm text-black mt-1">Số tiền: { " " }</Text>
                            <Text className="text-sm text-green-600 mt-1 font-semibold">+{ formatCurrencyWithCode( item.amount ) }</Text>
                        </View>
                        <View className="flex-row items-center gap-1">
                            <Text className="text-[10px] text-gray-500 mt-1">{ item.time }</Text>
                            <Text className="text-[12px] text-gray-500 mt-1">|</Text>
                            <Text className="text-[10px] text-gray-500 mt-1">{ item.date ? formatDayMonthYear( item.date ) : "" }</Text>
                        </View>

                    </View>
                </View>
            </View>
            {/* {
                item.status && (
                    <View className="absolute top-[-2] right-[-2]">
                        <View className="relative">
                            <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
                                <View className="h-4 w-4 bg-red-500 rounded-full" />
                            </View>
                        </View>
                    </View>
                )
            } */}
        </TouchableOpacity >
    );

    // Template cho cảnh báo
    const renderWarningItem = ( item: INotification ) => (
        <TouchableOpacity
            onPress={ () => handleNotificationPress( item.id ) }
            className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
                }` }
        >
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <Text className="text-sm text-white mt-1">{ item.content }</Text>
            </View>
            { !item.status && (
                <View className="absolute top-[-2] right-[-2]">
                    <View className="relative">
                        <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
                            <View className="h-4 w-4 bg-red-500 rounded-full" />
                        </View>
                    </View>
                </View>
            ) }
        </TouchableOpacity>
    );

    // Template cho tin được chia sẻ
    const renderSharedItem = ( item: INotification ) => (
        <TouchableOpacity
            onPress={ () => handleNotificationPress( item.id ) }
            className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 relative ${ item.status
                ? 'bg-green-100 border-green-300'
                : 'bg-green-50 border-green-400'
                }` }
        >
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
            { !item.status && (
                <View className="absolute top-[-2] right-[-2]">
                    <View className="relative">
                        <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
                            <View className="h-4 w-4 bg-red-500 rounded-full" />
                        </View>
                    </View>
                </View>
            ) }
        </TouchableOpacity>
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

    const unreadCount = notifications.filter( item => !item.status ).length;

    return (
        <View className="flex-1 bg-slate-50 border border-white">
            <TabbarTop
                tabs={ listTabs }
                onTabChange={ handleTabChange }
            />

            {/* Nút đánh dấu tất cả đã đọc */ }
            { unreadCount > 0 && (
                <View className="px-4 py-2 bg-white border-b border-gray-200">
                    <TouchableOpacity
                        onPress={ markAllAsRead }
                        className="flex-row items-center justify-between py-2"
                    >
                        <Text className="text-sm text-gray-600">
                            { unreadCount } thông báo chưa đọc
                        </Text>
                        <View className="flex-row items-center">
                            <FontAwesome5 name="check-double" size={ 14 } color="#3B82F6" />
                            <Text className="text-sm text-blue-500 ml-2 font-medium">
                                Đánh dấu đã đọc
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) }

            <FlatList
                data={ dataToShow }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ renderItem }
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={ { marginTop: 10 } }
            />
        </View>
    );
}


// import { Text, View, FlatList, TouchableOpacity } from "react-native";
// import mockNotificate from "@/assets/notificate.json";
// import { useState } from "react";
// import TabbarTop from "@/components/tabbar/TabbarTop";
// import { Entypo, FontAwesome5 } from "@expo/vector-icons";
// import { INotification } from "@/interface/INotification";
// import { formatCurrencyWithCode, formatDayMonthYear } from "@/utils/format";

// const tabMapping = {
//     "Tất cả": "all",
//     "Chưa đọc": "unread",
//     "Khuyến mãi": "promotion",
//     "Biến động": "fluctuation",
//     "Tin được chia sẻ": "shared",
//     "Cảnh báo": "warning"
// } as const;

// const listTabs = [ "Tất cả", "Chưa đọc", "Khuyến mãi", "Biến động", "Tin được chia sẻ", "Cảnh báo" ] as const;

// export default function Notification ()
// {
//     // Sử dụng state để quản lý danh sách notifications
//     const [ notifications, setNotifications ] = useState<INotification[]>( mockNotificate );
//     const [ tabbar, setTabbar ] = useState( "all" );

//     const handleTabChange = ( tabLabel: string ) =>
//     {
//         console.log( "tab label: ", tabLabel )
//         const tabId = tabMapping[ tabLabel as keyof typeof tabMapping ];
//         console.log( "tabId: ", tabId )
//         setTabbar( tabId );
//     };

//     // Hàm xử lý khi tap vào notification
//     const handleNotificationPress = ( notificationId: string ) =>
//     {
//         setNotifications( prevNotifications =>
//             prevNotifications.map( notification =>
//                 notification.id === notificationId
//                     ? { ...notification, status: false }
//                     : notification
//             )
//         );
//     };

//     // Lọc dữ liệu dựa theo tab được chọn
//     const getFilteredData = () =>
//     {
//         switch ( tabbar )
//         {
//             case "all":
//                 return notifications;
//             case "unread":
//                 return notifications.filter( item => item.status === false );
//             case "promotion":
//                 return notifications.filter( item => item.type === "promotion" );
//             case "fluctuation":
//                 return notifications.filter( item => item.type === "fluctuation" );
//             case "shared":
//                 return notifications.filter( item => item.type === "shared" );
//             case "warning":
//                 return notifications.filter( item => item.type === "warning" );
//             default:
//                 return notifications;
//         }
//     };

//     const renderPromotionItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id ) }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
//                 }` }
//         >
//             <View className="flex-1">
//                 <Text className="text-sm text-white mt-1">{ item.time }</Text>
//                 <Text className="text-sm text-white mt-1">{ item.content }</Text>
//             </View>
//             { !item.status && (
//                 <View className="absolute top-[-2] right-[-2]">
//                     <View className="relative">
//                         <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
//                             <View className="h-4 w-4 bg-red-500 rounded-full" />
//                         </View>
//                     </View>
//                 </View>
//             ) }
//         </TouchableOpacity>
//     );

//     // Template cho biến động (mặc định)
//     const renderFluctuationItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id ) }
//             className="px-4 py-2 mx-4 my-1.5 rounded-lg shadow-md flex-row items-center relative bg-white"
//         >
//             <View className="flex-1">
//                 <View>
//                     <View className="flex-row items-center">
//                         <Text className="text-sm text-black mt-1">Tải khoản nhận: { " " }</Text>
//                         <Text className="text-sm text-black mt-1 font-semibold">{ item.recieveCard }</Text>
//                     </View>

//                     <View className="flex-row items-center justify-between">
//                         <View className="flex-row items-center">
//                             <Text className="text-sm text-black mt-1">Số tiền: { " " }</Text>
//                             <Text className="text-sm text-green-600 mt-1 font-semibold">+{ formatCurrencyWithCode( item.amount ) }</Text>
//                         </View>
//                         <View className="flex-row items-center gap-1">
//                             <Text className="text-sm text-gray-500 mt-1">{ item.time }</Text>
//                             <Text className="text-sm text-gray-500 mt-1">|</Text>
//                             <Text className="text-sm text-gray-500 mt-1">{ item.date ? formatDayMonthYear( item.date ) : "" }</Text>
//                         </View>

//                     </View>
//                 </View>
//             </View>
//             {
//                 item.status && (
//                     <View className="absolute top-[-2] right-[-2]">
//                         <View className="relative">
//                             <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
//                                 <View className="h-4 w-4 bg-red-500 rounded-full" />
//                             </View>
//                         </View>
//                     </View>
//                 )
//             }
//         </TouchableOpacity >
//     );

//     // Template cho cảnh báo
//     const renderWarningItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id ) }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
//                 }` }
//         >
//             <View className="flex-1">
//                 <Text className="text-sm text-white mt-1">{ item.time }</Text>
//                 <Text className="text-sm text-white mt-1">{ item.content }</Text>
//             </View>
//             { !item.status && (
//                 <View className="absolute top-[-2] right-[-2]">
//                     <View className="relative">
//                         <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
//                             <View className="h-4 w-4 bg-red-500 rounded-full" />
//                         </View>
//                     </View>
//                 </View>
//             ) }
//         </TouchableOpacity>
//     );

//     // Template cho tin được chia sẻ
//     const renderSharedItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id ) }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 relative ${ item.status
//                 ? 'bg-green-100 border-green-300'
//                 : 'bg-green-50 border-green-400'
//                 }` }
//         >
//             <View className="w-12 h-12 rounded-full bg-green-100 justify-center items-center">
//                 <FontAwesome5 name="share-alt" size={ 20 } color="#10B981" />
//             </View>

//             <View className="ml-4 flex-1">
//                 <Text className="text-green-600 font-bold text-sm mb-1">
//                     📤 CHIA SẺ
//                 </Text>
//                 <Text className="text-sm text-gray-400 mt-1">{ item.content }</Text>
//                 <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
//             </View>
//             { !item.status && (
//                 <View className="absolute top-[-2] right-[-2]">
//                     <View className="relative">
//                         <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
//                             <View className="h-4 w-4 bg-red-500 rounded-full" />
//                         </View>
//                     </View>
//                 </View>
//             ) }
//         </TouchableOpacity>
//     );

//     // Hàm render theo type - nhận item trực tiếp
//     const renderByType = ( item: INotification ) =>
//     {
//         switch ( item.type )
//         {
//             case "promotion":
//                 return renderPromotionItem( item );
//             case "warning":
//                 return renderWarningItem( item );
//             case "shared":
//                 return renderSharedItem( item );
//             case "fluctuation":
//             default:
//                 return renderFluctuationItem( item );
//         }
//     };

//     // Hàm renderItem cho FlatList - nhận object { item, index }
//     const renderItem = ( { item }: { item: INotification } ) =>
//     {
//         return renderByType( item );
//     };

//     const dataToShow = getFilteredData();

//     return (
//         <View className="flex-1 bg-slate-50 border border-white">
//             <TabbarTop
//                 tabs={ listTabs }
//                 onTabChange={ handleTabChange }
//             />
//             <FlatList
//                 data={ dataToShow }
//                 keyExtractor={ ( item ) => item.id.toString() }
//                 renderItem={ renderItem }
//                 showsVerticalScrollIndicator={ false }
//                 contentContainerStyle={ { marginTop: 10 } }
//             />
//         </View>
//     );
// }

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