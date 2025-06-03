import { Text, View, FlatList, Image } from "react-native";
import mockNotificate from "@/assets/notificate.json";
import { useState } from "react";
import TabbarTop from "@/components/tabbar/TabbarTop";
import { FontAwesome5 } from "@expo/vector-icons";

export default function Notification ()
{
    const  notificate =  mockNotificate ;
    const [ tabbar, setTabbar ] = useState( "Tất cả" );

    const handleTabChange = ( tab: string ) =>
    {
        setTabbar( tab );
    };

    const unReadList = notificate.filter( ( item ) => item.status === "Chưa đọc" );
    const dataToShow = tabbar === "Tất cả" ? notificate : unReadList;

    const renderItem = ( { item }: any ) => (
        <View
            className="bg-white p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center "
        >
            <View className="w-12 h-12 rounded-full bg-blue-100 justify-center items-center">
                <FontAwesome5 name="money-bill-wave" size={ 20 } color="#3B82F6" />
            </View>

            <View className="ml-4 flex-1">
                <Text className="text-gray-800 font-medium">
                    Bạn nhận được tiền từ{ " " }
                    <Text className="font-bold text-blue-500">{ item.name }</Text>
                </Text>
                <Text className="text-lg font-bold text-green-600 mt-1">
                    +{ item.amount }₫
                </Text>
                <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-gray-50">
            <TabbarTop tabs={ [ "Tất cả", "Chưa đọc" ] } onTabChange={ handleTabChange } />
            <FlatList
                data={ dataToShow }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ renderItem }
                showsVerticalScrollIndicator={ false }
            />
        </View>
    );
}