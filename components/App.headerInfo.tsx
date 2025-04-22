
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from '@expo/vector-icons/Ionicons';


export default function AppHeaderInfo ( { title, onPress }: { title: string, onPress?: () => void } )
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView className="bg-blue-500 pt-6">
                <View className="flex-row items-center justify-between bg-blue-500 p-4">
                    <TouchableOpacity onPress={ onPress }>
                        <Ionicons name="arrow-back-circle-outline" size={ 30 } color="white" />
                    </TouchableOpacity>
                    <View className="flex-1 items-center">
                        <Text className="text-white font-bold text-lg">{ title }</Text>
                    </View>

                    {/* <Image
                        source={ require( "../assets/images/500.jpg" ) }
                        resizeMode="cover"
                        className="w-12 h-12 rounded-full"
                    /> */}
                </View>
            </SafeAreaView>

        </>
    );
}
