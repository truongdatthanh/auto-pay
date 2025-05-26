
import AppHeaderInfo from "@/components/header/App.headerInfo";
import { router, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankAccountLayout ()
{
    return (
        <SafeAreaView className="flex-1 bg-black">
            <Stack initialRouteName="index" >
                <Stack.Screen
                    name="index"
                    options={ {
                        header: () => <AppHeaderInfo title="Chi tiết" onPress={ () => router.replace( "/(tabs)/home" ) } />,
                    } }
                />

                <Stack.Screen
                    name="list"
                    options={ {
                        header: () => <AppHeaderInfo title="Thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)/home" ) } />,
                    } }
                />

                <Stack.Screen
                    name="add"
                    options={ {
                        header: () => <AppHeaderInfo title="Thêm thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)/home" ) } />,
                    } }
                />

            </Stack>
        </SafeAreaView>
    );
}