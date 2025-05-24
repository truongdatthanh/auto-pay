import { Image, Text, View } from "react-native";


export default function NotFound ( { contentErr }: { contentErr: string } )
{
    const img404 = "@/assets/images/404.png";
    return (
        <View className="flex-1 items-center justify-center bg-white p-4 mb-24">
            <Image source={ require( img404 ) } className="w-48 h-48 rounded-lg" resizeMode="contain" />
            <Text className="text-xl">{ contentErr }</Text>
        </View>
    );
}