import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function AppHeaderInfo ( { title, onPress, rightComponent, }: { title: string; onPress?: () => void; rightComponent?: ReactNode; } )
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView className="bg-[#1c40f2] pt-6" style={ Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight } : {} }>
                <View className="flex-row items-center justify-between p-4">
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
            </SafeAreaView>
        </>
    );
}