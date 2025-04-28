import { generateQR } from "@/utils/generateQR";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";


export default function MyQR ()
{
    const { data } = useLocalSearchParams();

    return (
        <View className="flex-1 justify-center items-center bg-white">
            {generateQR( JSON.parse( data as string ) )}
        </View>
    );
}