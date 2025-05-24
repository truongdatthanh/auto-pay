import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { Text, TouchableOpacity, View } from "react-native";


export default function AppHeaderInfo ( { title, onPress, rightComponent, }: { title: string; onPress?: () => void; rightComponent?: ReactNode; } )
{
    return (
        <>
            <StatusBar style="light" />
            <View className="flex-row bg-black items-center justify-between p-4">
                <View className="w-[25%]">
                    <TouchableOpacity onPress={ onPress } className="p-2 bg-white/20 rounded-full h-10 w-10 items-center justify-center">
                        <Ionicons name="arrow-back-outline" size={ 18 } color="white" />
                    </TouchableOpacity>
                </View>
                <View className="flex-1 items-center ">
                    <Text className="text-white font-bold text-lg">{ title }</Text>
                </View>
                <View className="w-[25%] items-end">
                    { rightComponent ?? <View style={ { width: "25%" } } /> }
                </View>
            </View>
        </>
    );
}