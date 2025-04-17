
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppHeaderInfo ({title}: {title: string})
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView className="bg-blue-500">
                <View className="flex items-center justify-between bg-blue-500 p-4 ">
                    <Text className="text-white font-bold pt-2 text-lg">{ title }</Text>
                </View>
            </SafeAreaView>
        </>
    );
}
