import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack } from "expo-router";

export default function NotificationLayout ()
{
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen
                name='index'
                options={ {
                    header: () => <AppHeaderInfo title="Notification" onPress={ () => router.replace( "/(tabs)" ) }/>,
                } }
            />
        </Stack>
    );
}