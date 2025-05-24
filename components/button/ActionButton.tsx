import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

export default function ActionButton ( { onPress, disabled, loading, icon, text, style, }: {
    onPress: () => void; disabled?: boolean; loading?: boolean; icon: React.ReactNode; text: string; style?: string;
} )
{
    return (
        <TouchableOpacity
            onPress={ onPress }
            disabled={ disabled }
            className={ `flex-1 py-3 rounded-xl flex-row justify-center items-center ${ style }` }
        >
            { loading ? (
                <ActivityIndicator size="small" color={ style?.includes( "text-white" ) ? "white" : "#1c40f2" } />
            ) : (
                <>
                    { icon }
                    <Text className={ `ml-2 font-semibold ${ style?.includes( "text-white" ) ? "text-white" : "text-[#1c40f2]" }` }>
                        { text }
                    </Text>
                </>
            ) }
        </TouchableOpacity>
    );
};