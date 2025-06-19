import { useState } from 'react';
import { View, FlatList, Alert } from 'react-native';
import mockNotificate from '@/assets/notificate.json';
import TabbarTop from '@/components/tabbar/TabbarTop';
import { INotification } from '@/interface/INotification';
import { useNotificationSelection } from '@/hooks/useNotificationSelection';
import NotificationItem from '@/components/notification/NotificationItem';
import MarkAsRead from '@/components/notification/MarkAsRead';
import NotificationSelected from '@/components/notification/NotificationSelected';

const tabMapping = {
    "Tất cả": "all",
    "Chưa đọc": "unread",
    "Khuyến mãi": "promotion",
    "Biến động": "fluctuation",
    "Tin được chia sẻ": "shared",
    "Cảnh báo": "warning"
} as const;

const listTabs = [ "Biến động", "Tất cả", "Chưa đọc", "Khuyến mãi", "Tin được chia sẻ", "Cảnh báo" ] as const;

export default function Notification ()
{
    const [ notifications, setNotifications ] = useState<INotification[]>( mockNotificate );
    const [ tabbar, setTabbar ] = useState( "fluctuation" );
    const { isSelectionMode, selectedItems, toggleSelection, selectAll, exitSelectionMode, enterSelectionMode } = useNotificationSelection();

    //Hàm thay đổi tabbar header
    const handleTabChange = ( tabLabel: string ) =>
    {
        const tabId = tabMapping[ tabLabel as keyof typeof tabMapping ];
        setTabbar( tabId );
        if ( isSelectionMode )
        {
            exitSelectionMode();
        }
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm sử lý sự kiện nhấn để set là đã đọc
    const handleNotificationPress = ( notificationId: string ) =>
    {
        if ( isSelectionMode )
        {
            toggleSelection( notificationId );
        } else
        {
            setNotifications( prevNotifications =>
                prevNotifications.map( notification => notification.id === notificationId
                    ? { ...notification, unread: false }
                    : notification
                )
            );
        }
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm xử lý sự kiện ấn giữ để xóa thông báo
    const handleLongPress = ( notificationId: string ) =>
    {
        if ( !isSelectionMode )
        {
            enterSelectionMode( notificationId );
        }
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm chọn tất cả để xóa
    const handleSelectAll = () =>
    {
        const currentData = getFilteredData();
        const allIds = currentData.map( item => item.id || '' ).filter( id => id !== '' );
        selectAll( allIds );
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm xử lý sự kiện xác nhận xóa các thông báo đã chọn
    const deleteSelectedItems = () =>
    {
        Alert.alert(
            "Xóa thông báo",
            `Bạn có chắc chắn muốn xóa ${ selectedItems.size } thông báo đã chọn không?`,
            [
                { text: "Hủy", style: "cancel" },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: () =>
                    {
                        setNotifications( prevNotifications =>
                            prevNotifications.filter( notification =>
                                !selectedItems.has( notification.id || '' )
                            )
                        );
                        exitSelectionMode();
                    }
                }
            ]
        );
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm xử lý sự kiện đánh dấu đã đọc
    const markAllAsRead = () =>
    {
        setNotifications( prevNotifications =>
            prevNotifications.map( notification => ( {
                ...notification,
                unread: false
            } ) )
        );
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm xử lý dữ liệu
    const getFilteredData = () =>
    {
        switch ( tabbar )
        {
            case "all": return notifications;
            case "unread": return notifications.filter( item => item.unread === true );
            case "promotion": return notifications.filter( item => item.type === "promotion" );
            case "fluctuation": return notifications.filter( item => item.type === "fluctuation" );
            case "shared": return notifications.filter( item => item.type === "shared" );
            case "warning": return notifications.filter( item => item.type === "warning" );
            default: return notifications;
        }
    };
    // ---------------------------------------- END ---------------------------------------- //

    //Hàm hiển thị dữ liệu
    const renderItem = ( { item }: { item: INotification } ) => (
        <NotificationItem
            item={ item }
            isSelectionMode={ isSelectionMode }
            isSelected={ selectedItems.has( item.id || '' ) }
            onPress={ handleNotificationPress }
            onLongPress={ handleLongPress }
            onToggleSelection={ toggleSelection }
        />
    );
    // ---------------------------------------- END ---------------------------------------- //

    //gán dữ liệu tương ứng khi thay đổi tabbar header
    const dataToShow = getFilteredData();

    //Đếm số lượng tổng thông báo chưa đọc
    const unreadCount = notifications.filter( item => item.unread === true ).length;

    //Kiểm tra các phần tử có đang được chọn để xóa hay không
    const allItemsSelected = dataToShow.length > 0 && dataToShow.every( item => selectedItems.has( item.id || '' ) );

    return (
        <View className="flex-1 bg-slate-50">
            <TabbarTop tabs={ listTabs } onTabChange={ handleTabChange } />

            { isSelectionMode ? (
                <NotificationSelected
                    selectedCount={ selectedItems.size }
                    allItemsSelected={ allItemsSelected }
                    onExitSelection={ exitSelectionMode }
                    onSelectAll={ handleSelectAll }
                    onDeleteSelected={ deleteSelectedItems }
                />
            ) : (
                <MarkAsRead
                    unreadCount={ unreadCount }
                    onMarkAllRead={ markAllAsRead }
                />
            ) }

            <FlatList
                data={ dataToShow }
                keyExtractor={ ( item ) => ( item.id || '' ).toString() }
                renderItem={ renderItem }
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={ { marginTop: 10, paddingBottom: 40 } }
            />
        </View>
    );
}


//#region base
// import { Text, View, FlatList, TouchableOpacity, Image, Alert } from "react-native";
// import mockNotificate from "@/assets/notificate.json";
// import { useState } from "react";
// import TabbarTop from "@/components/tabbar/TabbarTop";
// import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
// import { INotification } from "@/interface/INotification";
// import { formatCurrencyWithCode, formatDayMonthYear } from "@/utils/format";
// import FluctuationList from "@/components/notification/fluctuationList";

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
//     const [ isSelectionMode, setIsSelectionMode ] = useState( false );
//     const [ selectedItems, setSelectedItems ] = useState<Set<string>>( new Set() );// set thì chỉ lưu trữ các giá trị độc lập, còn array thì có thể lưu giá trị trùng nhau

//     //Hàm thay đổi tab
//     const handleTabChange = ( tabLabel: string ) =>
//     {
//         const tabId = tabMapping[ tabLabel as keyof typeof tabMapping ];
//         setTabbar( tabId );

//         if ( isSelectionMode )
//         {
//             exitSelectionMode();
//         }
//     };
//     // ----------------------------------------- END ----------------------------------------- //

//     // Hàm xử lý khi tap vào notification
//     const handleNotificationPress = ( notificationId: string ) =>
//     {
//         if ( isSelectionMode )
//         {
//             // Trong selection mode, toggle selection
//             setSelectedItems( prev =>
//             {
//                 const newSet = new Set( prev );
//                 if ( newSet.has( notificationId ) )
//                 {
//                     newSet.delete( notificationId );
//                 } else
//                 {
//                     newSet.add( notificationId );
//                 }
//                 return newSet;
//             } );
//         } else
//         {
//             // Mode bình thường, đánh dấu đã đọc
//             setNotifications( prevNotifications =>
//                 prevNotifications.map( notification =>
//                     notification.id === notificationId
//                         ? { ...notification, status: false } // Đánh dấu đã đọc
//                         : notification
//                 )
//             );
//         }
//     };

//     // Hàm xử lý khi long press để vào selection mode
//     const handleLongPress = ( notificationId: string ) =>
//     {
//         if ( !isSelectionMode )
//         {
//             setIsSelectionMode( true );
//             setSelectedItems( new Set( [ notificationId ] ) );
//         }
//     };

//     // Hàm thoát selection mode
//     const exitSelectionMode = () =>
//     {
//         setIsSelectionMode( false );
//         setSelectedItems( new Set() );
//     };

//     // Hàm chọn tất cả
//     const selectAll = () =>
//     {
//         const currentData = getFilteredData();
//         const allIds = currentData.map( item => item.id || '' ).filter( id => id !== '' );
//         setSelectedItems( new Set( allIds ) );
//     };

//     // Hàm xóa các item được chọn
//     const deleteSelectedItems = () =>
//     {
//         Alert.alert(
//             "Xóa thông báo",
//             `Bạn có chắc chắn muốn xóa ${ selectedItems.size } thông báo đã chọn không?`,
//             [
//                 {
//                     text: "Hủy",
//                     style: "cancel"
//                 },
//                 {
//                     text: "Xóa",
//                     style: "destructive",
//                     onPress: () =>
//                     {
//                         setNotifications( prevNotifications =>
//                             prevNotifications.filter( notification => !selectedItems.has( notification.id || '' ) )
//                         );
//                         exitSelectionMode();
//                     }
//                 }
//             ]
//         );
//     };

//     // Hàm đánh dấu tất cả đã đọc
//     const markAllAsRead = () =>
//     {
//         setNotifications( prevNotifications =>
//             prevNotifications.map( notification => ( {
//                 ...notification,
//                 status: false
//             } ) )
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

//     // Component checkbox
//     const renderCheckbox = ( itemId: string ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( itemId ) }
//             className="w-6 h-6 mr-3 rounded border-2 border-gray-400 flex items-center justify-center"
//             style={ {
//                 backgroundColor: selectedItems.has( itemId ) ? '#3B82F6' : 'transparent',
//                 borderColor: selectedItems.has( itemId ) ? '#3B82F6' : '#9CA3AF'
//             } }
//         >
//             { selectedItems.has( itemId ) && (
//                 <MaterialIcons name="check" size={ 16 } color="white" />
//             ) }
//         </TouchableOpacity>
//     );

//     const renderPromotionItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id || '' ) }
//             onLongPress={ () => handleLongPress( item.id || '' ) }
//             delayLongPress={ 500 }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
//                 }` }
//         >
//             { isSelectionMode && renderCheckbox( item.id || '' ) }
//             <View className="flex-1">
//                 <Text className="text-sm text-white mt-1">{ item.time }</Text>
//                 <Text className="text-sm text-white mt-1">{ item.content }</Text>
//             </View>
//             { !item.status && !isSelectionMode && (
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

//     // Template cho biến động (đã cập nhật với selection mode)
//     const renderFluctuationItem = ( item: INotification ) => (
//         <View className="flex-row items-center mx-4">
//             { isSelectionMode && renderCheckbox( item.id || '' ) }
//             <TouchableOpacity
//                 onPress={ () => handleNotificationPress( item.id || '' ) }
//                 onLongPress={ () => handleLongPress( item.id || '' ) }
//                 delayLongPress={ 200 }
//                 className={ `flex-1 px-4 py-2 my-1.5 flex-row items-center relative bg-slate-100 border border-gray-200 rounded-lg ${ item.status ? "bg-white shadow-lg" : "" }` }
//             >

//                 <View className="flex-1">
//                     <View>
//                         <View className="flex-row items-center justify-between">
//                             <View className="flex-row items-center">
//                                 <Image source={ { uri: item.bankLogo } } className="w-8 h-8 bg-blue-300/20 rounded-full" resizeMode="contain" />
//                                 <Text className="text-sm text-black mt-1 font-semibold"> { item.recieveCard }</Text>
//                             </View>
//                             <View className="flex-row items-center gap-1">
//                                 <Text className="text-[10px] text-gray-500 mt-1">{ item.time }</Text>
//                                 <Text className="text-[12px] text-gray-500 mt-1">|</Text>
//                                 <Text className="text-[10px] text-gray-500 mt-1">{ item.date ? formatDayMonthYear( item.date ) : "" }</Text>
//                             </View>
//                         </View>
//                         <View className="flex-row items-center">
//                             <View className="flex-row items-center">
//                                 {/* <Text className="text-sm text-black mt-1">Số tiền: { " " }</Text> */ }
//                                 <Text className="text-sm text-green-600 font-semibold">+{ formatCurrencyWithCode( item.amount ) }</Text>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//                 {/* Hiển thị dot đỏ nếu chưa đọc và không trong selection mode */ }
//                 { item.status && !isSelectionMode && (
//                     <View className="absolute top-[-2] right-[-2]">
//                         <View className="relative">
//                             <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center">
//                                 <View className="h-4 w-4 bg-red-500 rounded-full" />
//                             </View>
//                         </View>
//                     </View>
//                 ) }
//             </TouchableOpacity >
//         </View>
//     );

//     // Template cho cảnh báo
//     const renderWarningItem = ( item: INotification ) => (
//         <TouchableOpacity
//             onPress={ () => handleNotificationPress( item.id || '' ) }
//             onLongPress={ () => handleLongPress( item.id || '' ) }
//             delayLongPress={ 500 }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.status ? 'bg-gray-800' : 'bg-black'
//                 }` }
//         >
//             { isSelectionMode && renderCheckbox( item.id || '' ) }
//             <View className="flex-1">
//                 <Text className="text-sm text-white mt-1">{ item.time }</Text>
//                 <Text className="text-sm text-white mt-1">{ item.content }</Text>
//             </View>
//             { !item.status && !isSelectionMode && (
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
//             onPress={ () => handleNotificationPress( item.id || '' ) }
//             onLongPress={ () => handleLongPress( item.id || '' ) }
//             delayLongPress={ 500 }
//             className={ `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 relative ${ item.status
//                 ? 'bg-green-100 border-green-300'
//                 : 'bg-green-50 border-green-400'
//                 }` }
//         >
//             { isSelectionMode && renderCheckbox( item.id || '' ) }
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
//             { !item.status && !isSelectionMode && (
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
//             // return <FluctuationList item={item} />;
//         }
//     };

//     // Hàm renderItem cho FlatList - nhận object { item, index }
//     const renderItem = ( { item }: { item: INotification } ) =>
//     {
//         return renderByType( item );
//     };

//     const dataToShow = getFilteredData();
//     const unreadCount = notifications.filter( item => !item.status ).length;
//     const allItemsSelected = dataToShow.length > 0 && dataToShow.every( item => selectedItems.has( item.id || '' ) );

//     return (
//         <View className="flex-1 bg-slate-50 border border-white">
//             <TabbarTop
//                 tabs={ listTabs }
//                 onTabChange={ handleTabChange }
//             />

//             {/* Header với các nút điều khiển */ }
//             { isSelectionMode ? (
//                 <View className="px-4 py-2 bg-white border-b border-gray-200">
//                     <View className="flex-row items-center justify-between py-2">
//                         <View className="flex-row items-center">
//                             <TouchableOpacity
//                                 onPress={ exitSelectionMode }
//                                 className="mr-4"
//                             >
//                                 <MaterialIcons name="close" size={ 24 } color="#6B7280" />
//                             </TouchableOpacity>
//                             <Text className="text-sm text-gray-600">
//                                 { selectedItems.size } đã chọn
//                             </Text>
//                         </View>
//                         <View className="flex-row items-center gap-4">
//                             <TouchableOpacity
//                                 onPress={ selectAll }
//                                 className="flex-row items-center"
//                             >
//                                 <MaterialIcons
//                                     name={ allItemsSelected ? "check-box" : "check-box-outline-blank" }
//                                     size={ 20 }
//                                     color="#3B82F6"
//                                 />
//                                 <Text className="text-sm text-blue-500 ml-1 font-medium">
//                                     Chọn tất cả
//                                 </Text>
//                             </TouchableOpacity>
//                             { selectedItems.size > 0 && (
//                                 <TouchableOpacity
//                                     onPress={ deleteSelectedItems }
//                                     className="flex-row items-center"
//                                 >
//                                     <MaterialIcons name="delete" size={ 20 } color="#EF4444" />
//                                     <Text className="text-sm text-red-500 ml-1 font-medium">
//                                         Xóa
//                                     </Text>
//                                 </TouchableOpacity>
//                             ) }
//                         </View>
//                     </View>
//                 </View>
//             ) : (
//                 unreadCount > 0 && (
//                     <View className="px-4 py-2 bg-white border-b border-gray-200">
//                         <TouchableOpacity
//                             onPress={ markAllAsRead }
//                             className="flex-row items-center justify-between py-2"
//                         >
//                             <Text className="text-sm text-gray-600">
//                                 { unreadCount } thông báo chưa đọc
//                             </Text>
//                             <View className="flex-row items-center">
//                                 <FontAwesome5 name="check-double" size={ 14 } color="#3B82F6" />
//                                 <Text className="text-sm text-blue-500 ml-2 font-medium">
//                                     Đánh dấu đã đọc
//                                 </Text>
//                             </View>
//                         </TouchableOpacity>
//                     </View>
//                 )
//             ) }

//             <FlatList
//                 data={ dataToShow }
//                 keyExtractor={ ( item ) => ( item.id || '' ).toString() }
//                 renderItem={ renderItem }
//                 showsVerticalScrollIndicator={ false }
//                 contentContainerStyle={ { marginTop: 10 } }
//             />
//         </View>
//     );
// }
//#endregion