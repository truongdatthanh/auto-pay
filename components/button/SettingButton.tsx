import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface SettingButtonProps
{
    icon: React.JSX.Element,
    iconBg: string,
    label: string,
    desc: string,
    onPress: () => void,
}

export default function SettingButton ( { icon, iconBg, label, desc, onPress }: SettingButtonProps )
{
    return (
        <TouchableOpacity className="flex-row items-center p-4 active:bg-gray-50" onPress={ onPress }>
            <View className={ `w-10 h-10 rounded-full ${ iconBg } items-center justify-center mr-3` }>
                { icon }
            </View>
            <View className="flex-1">
                <Text className="text-base font-medium text-gray-800">{ label }</Text>
                <Text className="text-xs text-gray-500 mt-1">{ desc }</Text>
            </View>
            <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
        </TouchableOpacity>
    );


}