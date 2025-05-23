
import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack, usePathname } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankAccountLayout ()
{
    return (
        <SafeAreaView className="flex-1 bg-black">
            <Stack initialRouteName="index" >
                <Stack.Screen
                    name="index"
                    options={ {
                        header: () => <AppHeaderInfo title="Chi tiết" onPress={ () => router.replace( "/(tabs)" ) } />,
                    } }
                />

                <Stack.Screen
                    name="list-card"
                    options={ {
                        header: () => <AppHeaderInfo title="Thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)" ) } />,
                    } }
                />

                <Stack.Screen
                    name="addCard"
                    options={ {
                        header: () => <AppHeaderInfo title="Thêm thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)" ) } />,
                    } }
                />

            </Stack>
        </SafeAreaView>
    );
}