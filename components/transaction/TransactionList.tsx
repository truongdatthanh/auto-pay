import { Text, TouchableOpacity, View, FlatList, ActivityIndicator } from "react-native";
import { useState, useCallback, useMemo } from "react";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCardStore } from "@/store/useCardStore";
import TransactionCard from "./TransactionCard";


export default function TransactionList ()
{
    const [ visibleCount, setVisibleCount ] = useState( 5 ); // Hiển thị 4 giao dịch ban đầu
    const [ isLoadingMore, setIsLoadingMore ] = useState( false ); // Trạng thái tải thêm
    const selectedCard = useCardStore( ( state ) => state.selectedCard );

    // Lấy tất cả giao dịch và sắp xếp theo thời gian giảm dần
    const allTransactions =
        selectedCard?.transactionHistory?.sort( ( a, b ) => new Date( b.date ).getTime() - new Date( a.date ).getTime() ) || [];

    // Danh sách giao dịch hiển thị dựa trên visibleCount
    const visibleTransactions = allTransactions.slice( 0, visibleCount );

    // Hàm tải thêm giao dịch khi cuộn đến cuối
    const handleLoadMore = useCallback( async () =>
    {
        if ( isLoadingMore || visibleCount >= allTransactions.length ) return;

        setIsLoadingMore( true );
        try
        {
            // Giả lập thời gian tải (nếu từ API, gọi API ở đây)
            await new Promise( ( resolve ) => setTimeout( resolve, 500 ) );
            setVisibleCount( ( prev ) => Math.min( prev + 4, allTransactions.length ) ); // Tải thêm 4 giao dịch
        } catch ( error )
        {
            console.error( "Lỗi khi tải thêm giao dịch:", error );
        } finally
        {
            setIsLoadingMore( false );
        }
    }, [ isLoadingMore, visibleCount, allTransactions.length ] );

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
        <View className="px-4">
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                    <Text className="text-lg font-bold text-white leading-none">Giao dịch gần đây</Text>
                </View>
                <TouchableOpacity
                    accessibilityLabel="Xem tất cả giao dịch"
                    onPress={ () => router.push( "/(tabs)/history" ) }
                    className="flex-row items-center"
                >
                    <Text className="text-[#1077fd] text-[10px] mr-1 italic">Xem tất cả</Text>
                    <FontAwesome5 name="arrow-circle-right" size={ 10 } color="#1077fd" />
                </TouchableOpacity>
            </View>
            {/* Danh sách giao dịch với FlatList */ }
            <View className="py-2 flex-1 mt-2 min-h-[200px]">
                <FlatList
                    className="gap-3"
                    data={ visibleTransactions }
                    renderItem={ ( { item } ) => (
                        <TransactionCard
                            id={ item.transactionId }
                            amount={ item.amount }
                            time={ item.time }
                            content={ item.description }
                            date={ item.date }
                        />
                    ) }
                    keyExtractor={ ( item ) => item.transactionId }
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center min-h-[180px]">
                            <Text className="text-black text-center text-md italic">
                                Chưa có giao dịch nào
                            </Text>
                        </View>
                    }
                    initialNumToRender={ 5 } // Render 4 mục đầu tiên
                    maxToRenderPerBatch={ 4 } // Render tối đa 4 mục mỗi lần
                    windowSize={ 5 } // Giới hạn số mục trong bộ nhớ
                    onEndReached={ handleLoadMore } // Gọi khi cuộn đến gần cuối
                    onEndReachedThreshold={ 0.5 } // Kích hoạt handleLoadMore khi còn 50% danh sách
                    ListFooterComponent={
                        isLoadingMore ? (
                            <View className="py-4">
                                <ActivityIndicator size="small" color="#0000ff" />
                            </View>
                        ) : visibleCount >= allTransactions.length ? (
                            <View className="pt-2 flex-row items-center justify-center">
                                <Feather name="info" size={ 14 } color="#9ca3af" />
                                <Text className="ml-1 text-center text-sm text-gray-400">Đã xem hết giao dịch</Text>
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
