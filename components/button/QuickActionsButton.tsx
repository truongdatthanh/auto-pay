import { LinkProps, router } from "expo-router";
import { Image, ImageSourcePropType, Text, TouchableOpacity } from "react-native";

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
            <Image source={ imgIcon } className="w-8 h-8" resizeMode='contain' />
            <Text className="text-white font-medium text-[10px] text-center pt-2">{ title }</Text>
        </TouchableOpacity>
    );
}