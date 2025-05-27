import AppHeaderInfo from "@/components/header/App.headerInfo";
import { router, Stack } from "expo-router";
import { StatusBar } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationLayout ()
{
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-black">
                <Stack initialRouteName='index'>
                    <Stack.Screen
                        name='index'
                        options={ {
                            header: () => <AppHeaderInfo title="Notification" onPress={ () => router.replace( "/(tabs)/home" ) } />,
                        } }
                    />
                </Stack>
            </SafeAreaView>
        </>


    );
}