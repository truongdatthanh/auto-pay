import { Image, Text, View } from "react-native";


export default function NotFound ( { contentErr }: { contentErr: string } )
{
    const img404 = "../../assets/images/404.png";
    return (
        <View className="flex-1 items-center justify-center bg-red-500 p-4 bg-white pb-[200px]">
            <Image source={ require( img404 ) } className="w-1/2 h-1/2 rounded-lg" resizeMode="contain" />
            <Text className="text-xl">{ contentErr }</Text>
        </View>
    );
}