import { FlatList, Text, TouchableOpacity, View } from "react-native";
import dataBankingCard from "../../assets/banking-card.json";
import { useState } from "react";
import BankingCard from "@/components/BankCard";
export default function ListCard ()
{
    const [ data, setData ] = useState( dataBankingCard );

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
                        <TouchableOpacity className="p-4 mt-6 items-center" onPress={ () => { } } style={ { width: 320, borderStyle: "dashed", borderColor: "black", borderWidth: 1, borderRadius: 8 } }>
                            <Text className="text-[#1c40f2] font-semibold text-lg">+ Thêm thẻ ngân hàng</Text>
                        </TouchableOpacity>
                    ) }
                    contentContainerStyle={ { paddingBottom: 100, alignItems: "center" } }
                />
                {/* <TouchableOpacity className='p-4' onPress={ () => { } }>
                    <Text className='text-blue-500 font-semibold text-sm'>Thêm thẻ ngân hàng</Text>
                </TouchableOpacity> */}
            </View>

        </>
    );
}