import { FlatList, Text, TouchableOpacity, View } from "react-native";
import dataBankingCard from "@/assets/banking-card.json";
import BankingCard from "@/components/card/BankCard";
import { router } from "expo-router";
export default function ListCard ()
{
    const data = dataBankingCard;

    const handleAddCard = () => 
    {
        router.push( "/bank-account/add" );

    }

    return (
        <>
            <View className="flex-1">
                <FlatList
                    className="bg-white"
                    data={ data }
                    showsVerticalScrollIndicator={ false }
                    keyExtractor={ ( item ) => item.id }
                    renderItem={ ( { item } ) => (
                        <View className="py-2">
                            <BankingCard
                                key={ item.id }
                                id={ item.id }
                                STK={ item.STK }
                                name={ item.name }
                                logoBanking={ item.logoBanking }
                                bankName={ item.bankName }
                            />
                        </View>
                    ) }
                    ListFooterComponent={ () => (
                        <TouchableOpacity className="p-4 mt-6 items-center" onPress={ handleAddCard } style={ { width: 320, borderStyle: "dashed", borderColor: "black", borderWidth: 1, borderRadius: 8 } }>
                            <Text className="text-[#1c40f2] font-semibold text-lg">+ Thêm thẻ ngân hàng</Text>
                        </TouchableOpacity>
                    ) }
                    contentContainerStyle={ { paddingBottom: 100, alignItems: "center" } }
                />
            </View>
        </>
    );
}