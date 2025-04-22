import { Text, TouchableOpacity } from "react-native";
import { IconProps } from '@expo/vector-icons/build/createIconSet';

interface OptionProps
{
    title: string;
    onPress?: () => void;
    IconComponent: React.ComponentType<IconProps<any>>;
    iconName: string;
    iconColor: string;
    iconSize: number;
}
export default function Option ( { title, onPress, IconComponent, iconName, iconSize, iconColor }: OptionProps )
{
    return (
        <>
            <TouchableOpacity className='flex-row items-center justify-between border-b border-gray-300 p-2' onPress={ onPress }>
                <Text className='text-md font-semibold'>{ title }</Text>
                <IconComponent name={ iconName } size={ iconSize } color={ iconColor } />
            </TouchableOpacity>
        </>
    );
}   
