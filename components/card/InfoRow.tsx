import { Text, TouchableOpacity, View } from "react-native";

interface IInfoRowProps
{
    label: string;
    value?: string | number;
    onPress?: () => void;
    isCopyable?: boolean;
    multiline?: boolean;
    valueClassName?: string;
    isLast?: boolean;
}

export default function InfoRow ( { label, value, onPress, isCopyable = false, multiline = false, valueClassName = "", isLast = false, }: IInfoRowProps ) 
{
    return (
        <View
            className={ `flex-row justify-between items-center mb-2 bg-white ${ isLast ? "mt-2 pt-2 border-t border-gray-200" : "" }` }
            style={ multiline ? { alignItems: "flex-start" } : undefined }
        >
            <Text className="text-gray-500">{ label }</Text>
            { isCopyable && onPress ? (
                <TouchableOpacity onPress={ onPress } className="flex-row items-center">
                    <Text className={ `font-bold ${ valueClassName }` }>{ value }</Text>
                </TouchableOpacity>
            ) : (
                <Text className={ `font-bold ${ valueClassName } ${ multiline ? "max-w-[60%] text-right" : "" }` }>
                    { value }
                </Text>
            ) }
        </View>
    );
};