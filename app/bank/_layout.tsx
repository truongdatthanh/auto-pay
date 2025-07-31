
import AppHeaderInfo from "@/components/header/App.headerInfo";
import { router, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BankAccountLayout ()
{
    return (
        <>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <SafeAreaView className="flex-1 bg-[#041838]">
                <Stack initialRouteName="index" screenOptions={ { animation: "none" } }>
                    <Stack.Screen
                        name="index"
                        options={ {
                            header: () => <AppHeaderInfo title="Thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)/home" ) } />
                        } }
                    />
                    <Stack.Screen
                        name="add"
                        options={ {
                            header: () => <AppHeaderInfo title="Thêm thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)/home" ) } />,
                        } }
                    />
                    <Stack.Screen
                        name="[id]"
                        options={ {
                            headerShown: false
                        } }
                    />
                </Stack>
            </SafeAreaView>
        </>

    );
}