import { Image, Text, View } from "react-native";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";

interface AccountInfoProps
{
    title?: string,
    logo?: string,
    bankName?: string,
    accountNumber?: string,
    accountHolder?: string,
}

export default function AccountInfo ( { title, logo, bankName, accountNumber, accountHolder }: AccountInfoProps )  
{
    return (
        <View>
            <Text className="text-base font-semibold text-slate-700 mb-3">{ title }</Text>
            <View className="flex-row items-center">
                <Image source={ { uri: logo } } className="w-10 h-10 rounded-lg bg-slate-50" resizeMode="contain" />
                <Text className="font-semibold ml-2 flex-1">{ bankName }</Text>
            </View>
            <View className="h-[1px] bg-slate-100 my-3" />
            <View className="flex-row item-center justify-between">
                <Text className="text-sm text-gray-500">Số tài khoản</Text>
                <Text className="text-sm text-black font-semibold">{ accountNumber }</Text>
            </View>
            <View className="h-[1px] bg-slate-100 my-3" />
            <View className="flex-row item-center justify-between">
                <Text className="text-sm text-gray-500">Tên chủ tài khoản</Text>
                <Text className="text-sm text-black font-semibold">{ accountHolder }</Text>
            </View>
        </View>
    );

}


