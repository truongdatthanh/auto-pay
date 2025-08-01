import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface SubmitButtonProps
{
    onPress: () => void,
    title: string,
    classNameButton?: string,
    classNameText?: string
}

export default function SubmitButton ( { title, classNameButton, classNameText, onPress }: SubmitButtonProps )
{
    return (
        <TouchableOpacity
            onPress={ onPress }
            className="bg-blue-500 rounded-xl flex-1 justify-center items-center"
            activeOpacity={ 0.8 }
        >
            <Text className="text-white font-semibold">{ title }</Text>
        </TouchableOpacity>
    )
}