import { usePathname } from "expo-router";
import { Text } from "react-native";

export default function Details ()
{
    const pathname = usePathname();
    return (
        <>
            <Text>Details { pathname }</Text>
            <Text>Hello Autopay</Text>
        </>
    );
}