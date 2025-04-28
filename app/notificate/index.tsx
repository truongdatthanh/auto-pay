import { Text, View } from "react-native";
import mockNotificate from "../../assets/notificate.json"
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import TabbarTop from "@/components/TabbarTop";

export default function Notification ()
{
    const [ notificate, setNotificate ] = useState( mockNotificate );
    const [ tabbar, setTabbar ] = useState( "All" );

    const handleTabChange = ( tab: string ) =>
    {
        setTabbar( tab );
    };
    
    const unReadList = notificate.filter( ( item ) => item.status === "unread" );
    
    const dataToShow = tabbar === "All" ? notificate : unReadList;

    return (
        <>
            <TabbarTop tabs={ [ "All", "Unread" ] } onTabChange={ handleTabChange } />
            <FlatList
                data={ dataToShow }
                keyExtractor={ ( item ) => item.id.toString() }
                renderItem={ ( { item } ) => (
                    <View className="bg-white p-4 m-2 rounded-lg shadow-md flex-row items-center">
                        <View className="w-16 h-16 rounded-full bg-red-500"></View>
                        <View className="ml-4 flex-1">
                            <View className="flex-row">
                                <Text>Bạn nhận được tiền từ <Text className="font-bold">{ item.name } { item.amount }</Text></Text>
                            </View>
                            <Text className="text-sm text-gray-400 pt-2">{ item.time }</Text>
                        </View>
                    </View>
                ) }
                showsVerticalScrollIndicator={ false }
            />
        </>
    );
}