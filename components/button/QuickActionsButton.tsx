import { LinkProps, router } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";

interface QuickActionsButtonProps
{
    title: string,
    imgIcon: ImageSourcePropType,
    url: LinkProps[ "href" ];
}

export default function QuickActionsButton ( { title, imgIcon, url }: QuickActionsButtonProps )
{
    const handlePress = () =>
    {
        router.push( url );
    };

    return (
        <TouchableOpacity className="items-center w-1/4" onPress={ handlePress }>
            <View className="bg-white/20 rounded-2xl p-2">
                <Image source={ imgIcon } className="w-8 h-8" resizeMode='contain' />
            </View>
            <Text className="text-white font-medium text-[10px] text-center pt-2 leading-none">{ title }</Text>
        </TouchableOpacity>
    );
}