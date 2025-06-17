
import { Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native";
import { useState, useCallback, useEffect } from "react";
import { Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { formatDayMonthYear } from "@/utils/format";
import { useCardStore } from "@/store/useCardStore";
import TransactionItem from "./TransactionItem";

export default function TransactionList ()
{
    const [ currentDate ] = useState( new Date() );
    const [ visibleCount, setVisibleCount ] = useState( 4 ); // Hiển thị 4 giao dịch ban đầu
    const [ isLoadingMore, setIsLoadingMore ] = useState( false ); // Trạng thái tải thêm
    const selectedCard = useCardStore( ( state ) => state.selectedCard );

    // Lọc các giao dịch theo ngày hiện tại và sắp xếp theo thời gian giảm dần
    const todayTransactions =
        selectedCard?.transactionHistory?.filter( ( item ) =>
        {
            const transactionDate = new Date( item.date );
            const compareDate = new Date( currentDate );
            return (
                transactionDate.setHours( 0, 0, 0, 0 ) === compareDate.setHours( 0, 0, 0, 0 )
            );
        } ).sort( ( a, b ) => new Date( b.date ).getTime() - new Date( a.date ).getTime() ) || [];

    // Danh sách giao dịch hiển thị dựa trên visibleCount
    const visibleTransactions = todayTransactions.slice( 0, visibleCount );

    // Hàm tải thêm giao dịch khi cuộn đến cuối
    const handleLoadMore = useCallback( async () =>
    {
        if ( isLoadingMore || visibleCount >= todayTransactions.length ) return;

        setIsLoadingMore( true );
        try
        {
            // Giả lập thời gian tải (nếu từ API, gọi API ở đây)
            await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
            setVisibleCount( ( prev ) => Math.min( prev + 4, todayTransactions.length ) ); // Tải thêm 4 giao dịch
        } catch ( error )
        {
            console.error( "Lỗi khi tải thêm giao dịch:", error );
        } finally
        {
            setIsLoadingMore( false );
        }
    }, [ isLoadingMore, visibleCount, todayTransactions.length ] );

    // Xử lý trường hợp không có dữ liệu
    if ( !selectedCard || !selectedCard.transactionHistory )
    {
        return (
            <View className="flex-1 justify-center items-center min-h-[200px]">
                <Text className="text-black text-center text-md italic">
                    Không có dữ liệu giao dịch
                </Text>
            </View>
        );
    }

    return (
        <View>
            {/* Header của danh sách giao dịch */ }
            <View className="flex-row justify-between items-center px-4 pt-2">
                <View className="flex-row items-center gap-1">
                    <Text className="text-md font-bold text-black">Các giao dịch hôm nay</Text>
                    <Text className="text-md font-bold text-black">({ todayTransactions.length })</Text>
                </View>
                <TouchableOpacity
                    accessibilityLabel="Xem tất cả giao dịch"
                    onPress={ () => router.push( "/(tabs)/history" ) }
                    className="flex-row items-center"
                >
                    <Text className="text-gray-400 text-sm mr-1 italic">Xem tất cả</Text>
                    <Octicons name="stack" size={ 14 } color="gray" />
                </TouchableOpacity>
            </View>

            {/* Ngày hiện tại */ }
            <View className="px-4">
                <Text className="text-sm text-gray-400">{ formatDayMonthYear( currentDate ) }</Text>
            </View>

            {/* Danh sách giao dịch với FlatList */ }
            <View className="py-2 flex-1 bg-white mx-4 rounded-lg mt-2 shadow-md min-h-[200px]">
                <FlatList
                    data={ visibleTransactions }
                    renderItem={ ( { item } ) => (
                        <TransactionItem
                            id={ item.transactionId }
                            amount={ item.amount }
                            time={ item.time }
                        />
                    ) }
                    keyExtractor={ ( item ) => item.transactionId }
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center min-h-[180px]">
                            <Text className="text-black text-center text-md italic">
                                Hôm nay chưa có giao dịch
                            </Text>
                        </View>
                    }
                    contentContainerStyle={ { padding: 8 } }
                    initialNumToRender={ 4 } // Render 4 mục đầu tiên
                    maxToRenderPerBatch={ 4 } // Render tối đa 4 mục mỗi lần
                    windowSize={ 5 } // Giới hạn số mục trong bộ nhớ
                    onEndReached={ handleLoadMore } // Gọi khi cuộn đến gần cuối
                    onEndReachedThreshold={ 0.5 } // Kích hoạt handleLoadMore khi còn 50% danh sách
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View className="py-4">
                                <ActivityIndicator size="small" color="#0000ff" />
                            </View>
                        ) : visibleCount < todayTransactions.length ? (
                            <View className="py-4">
                                <Text className="text-center text-gray-500">Đang tải thêm...</Text>
                            </View>
                        ) : null
                    }
                    getItemLayout={ ( data, index ) => ( {
                        length: 60, // Chiều cao ước lượng của TransactionItem
                        offset: 60 * index,
                        index,
                    } ) }
                />
            </View>
        </View>
    );
}







// import { Text, TouchableOpacity, View } from "react-native";
// import { useState } from "react";
// import { AntDesign, Octicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { formatDate } from "@/utils/format";
// import { useCardStore } from "@/store/useCardStore";
// import TransactionItem from "./TransactionItem";

// export default function TransactionList ()
// {
//     const [ currentDate ] = useState( new Date() );
//     const [ visibleCount, setVisibleCount ] = useState( 5 );
//     const selectedCard = useCardStore( state => state.selectedCard );
//     const todayTransactions = selectedCard?.transactionHistory?.filter( ( item ) =>
//     {
//         const transactionDate = new Date( item.date );
//         return (
//             transactionDate.setHours( 0, 0, 0, 0 ) === new Date( currentDate ).setHours( 0, 0, 0, 0 )
//         );
//     } ).sort(
//         ( a, b ) => new Date( b.date ).getTime() - new Date( a.date ).getTime()
//     ) || [];

//     // Transactions to display based on visibleCount
//     const visibleTransactions = todayTransactions.slice( 0, visibleCount );

//     // Handler for "Xem thêm" button to load 5 more transactions
//     const handleLoadMore = () =>
//     {
//         setVisibleCount( ( prev ) => prev + 5 );
//     };

//     // Handler for "Ẩn bớt" button to reset visibleCount
//     const handleHideLess = () =>
//     {
//         setVisibleCount( 5 );
//     };

//     return (
//         <View>
//             <View className="flex-row justify-between items-center px-4 pt-2">
//                 <View className="flex-row items-center gap-1">
//                     <Text className="text-md font-bold text-black">Các giao dịch hôm nay</Text>
//                     <Text className="text-md font-bold text-black">({ todayTransactions.length })</Text>
//                 </View>

//                 <TouchableOpacity
//                     onPress={ () => router.push( "/(tabs)/history" ) }
//                     className="flex-row items-center"
//                 >
//                     <Text className="text-gray-400 text-sm mr-1 italic">Xem tất cả</Text>
//                     <Octicons name="stack" size={ 14 } color="gray" />
//                 </TouchableOpacity>
//             </View>

//             <View className="px-4">
//                 <Text className="text-sm text-gray-400">{ formatDate( currentDate ) }</Text>
//             </View>

//             <View className="py-2 gap-1 flex-1 bg-white mx-4 rounded-lg mt-2 shadow-md min-h-[200px]">
//                 { visibleTransactions.length === 0 ? (
//                     <View className="flex-1 justify-center items-center">
//                         <Text className="text-black text-center text-md italic">
//                             Hôm nay chưa có giao dịch
//                         </Text>
//                     </View>
//                 ) : (
//                     visibleTransactions.map( ( item ) => (
//                         <View key={ item.transactionId } >
//                             <TransactionItem
//                                 id={ item.transactionId }
//                                 amount={ item.amount }
//                                 time={ item.time }
//                             />
//                         </View>
//                     ) )
//                 ) }
//                 <View className="flex-row items-center gap-4 px-4">
//                     { visibleCount < todayTransactions.length && (
//                         <TouchableOpacity
//                             className="flex-row items-center"
//                             onPress={ handleLoadMore }
//                         >
//                             <Text className="text-black font-semibold text-sm">Xem thêm</Text>
//                             <AntDesign name="arrowright" size={ 12 } color="black" />
//                         </TouchableOpacity>
//                     ) }

//                     { visibleCount > 5 && (
//                         <TouchableOpacity
//                             className="flex-row items-center"
//                             onPress={ handleHideLess }
//                         >
//                             <Text className="text-black font-semibold text-sm">Ẩn bớt</Text>
//                             <AntDesign name="arrowleft" size={ 12 } color="black" />
//                         </TouchableOpacity>
//                     ) }
//                 </View>
//             </View>
//         </View>
//     );
// }



// import { Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native";
// import { useState, useCallback, useEffect, useMemo } from "react";
// import { Octicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { formatDate } from "@/utils/format"; // Giả định thêm formatTime
// import { useCardStore } from "@/store/useCardStore";
// import TransactionItem from "./TransactionItem";

// export default function TransactionList ()
// {
//     const [ currentDate ] = useState( new Date() ); // 11:58 AM +07, 16/06/2025
//     const [ visibleCount, setVisibleCount ] = useState( 4 ); // Hiển thị 4 giao dịch ban đầu
//     const [ isLoadingMore, setIsLoadingMore ] = useState( false ); // Trạng thái tải thêm
//     const selectedCard = useCardStore( ( state ) => state.selectedCard );

//     // Lọc các giao dịch theo ngày hiện tại và sắp xếp theo thời gian giảm dần
//    const todayTransactions = useMemo(() => {
//     if (!selectedCard?.transactionHistory) return [];
    
//     return selectedCard.transactionHistory
//         .filter(item => {
//             const transactionDate = new Date(item.date);
//             const compareDate = new Date(currentDate);
//             return transactionDate.setHours(0, 0, 0, 0) === compareDate.setHours(0, 0, 0, 0);
//         })
//         .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// }, [selectedCard?.transactionHistory, currentDate]);

//     // Danh sách giao dịch hiển thị dựa trên visibleCount
//     const visibleTransactions = todayTransactions.slice( 0, visibleCount );

//     // Hàm tải thêm giao dịch khi cuộn đến cuối
//     const handleLoadMore = useCallback( async () =>
//     {
//         if ( isLoadingMore || visibleCount >= todayTransactions.length ) return;

//         setIsLoadingMore( true );
//         try
//         {
//             await new Promise( ( resolve ) => setTimeout( resolve, 500 ) ); // Giả lập thời gian tải
//             setVisibleCount( ( prev ) => Math.min( prev + 4, todayTransactions.length ) );
//         } catch ( error )
//         {
//             console.error( "Lỗi khi tải thêm giao dịch:", error );
//         } finally
//         {
//             setIsLoadingMore( false );
//         }
//     }, [ isLoadingMore, visibleCount, todayTransactions.length ] );

//     // Hàm refresh để quay về trạng thái ban đầu
//     const handleRefresh = useCallback( () =>
//     {
//         setVisibleCount( 4 ); // Reset về 4 giao dịch ban đầu
//         // Nếu cần làm mới dữ liệu từ API, gọi lại fetchInitialTransactions ở đây
//     }, [] );

//     // Xử lý trường hợp không có dữ liệu
//     if ( !selectedCard || !selectedCard.transactionHistory )
//     {
//         return (
//             <View className="flex-1 justify-center items-center min-h-[200px]">
//                 <Text className="text-black text-center text-md italic">
//                     Không có dữ liệu giao dịch
//                 </Text>
//             </View>
//         );
//     }

//     return (
//         <View>
//             {/* Header của danh sách giao dịch */ }
//             <View className="flex-row justify-between items-center px-4 pt-2">
//                 <View className="flex-row items-center gap-1">
//                     <Text className="text-md font-bold text-black">Các giao dịch hôm nay</Text>
//                     <Text className="text-md font-bold text-black">({ todayTransactions.length })</Text>
//                 </View>
//                 <View className="flex-row items-center gap-2">
//                     <TouchableOpacity
//                         accessibilityLabel="Xem tất cả giao dịch"
//                         onPress={ () => router.push( "/(tabs)/history" ) }
//                         className="flex-row items-center"
//                     >
//                         <Text className="text-gray-400 text-sm mr-1 italic">Xem tất cả</Text>
//                         <Octicons name="stack" size={ 14 } color="gray" />
//                     </TouchableOpacity>
//                     <TouchableOpacity
//                         accessibilityLabel="Làm mới danh sách"
//                         onPress={ handleRefresh }
//                         className="flex-row items-center"
//                     >
//                         <Text className="text-gray-400 text-sm italic">↻</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>

//             {/* Ngày và giờ hiện tại */ }
//             <View className="px-4">
//                 <Text className="text-sm text-gray-400">
//                     { formatDate( currentDate ) }
//                 </Text>
//             </View>

//             {/* Danh sách giao dịch với FlatList */ }
//             <View className="py-2 flex-1 bg-white mx-4 rounded-lg mt-2 shadow-md min-h-[200px]">
//                 <FlatList
//                     data={ visibleTransactions }
//                     renderItem={ ( { item } ) => (
//                         <TransactionItem
//                             id={ item.transactionId }
//                             amount={ item.amount }
//                             time={ item.time }
//                         />
//                     ) }
//                     keyExtractor={ ( item ) => item.transactionId }
//                     ListEmptyComponent={
//                         <View className="flex-1 justify-center items-center">
//                             <Text className="text-black text-center text-md italic">
//                                 Hôm nay chưa có giao dịch
//                             </Text>
//                         </View>
//                     }
//                     contentContainerStyle={ { padding: 8 } }
//                     initialNumToRender={ 4 } // Render 4 mục đầu tiên
//                     maxToRenderPerBatch={ 4 } // Render tối đa 4 mục mỗi lần
//                     windowSize={ 5 } // Giới hạn số mục trong bộ nhớ
//                     onEndReached={ handleLoadMore } // Gọi khi cuộn đến gần cuối
//                     onEndReachedThreshold={ 0.5 } // Kích hoạt handleLoadMore khi còn 50% danh sách
//                     ListFooterComponent={
//                         isLoadingMore ? (
//                             <View className="py-4">
//                                 <ActivityIndicator size="small" color="#0000ff" />
//                             </View>
//                         ) : visibleCount < todayTransactions.length ? (
//                             <View className="py-4">
//                                 <Text className="text-center text-gray-500">Đang tải thêm...</Text>
//                             </View>
//                         ) : null
//                     }
//                     getItemLayout={ ( data, index ) => ( {
//                         length: 60, // Chiều cao ước lượng của TransactionItem
//                         offset: 60 * index,
//                         index,
//                     } ) }
//                 />
//             </View>
//         </View>
//     );
// }
