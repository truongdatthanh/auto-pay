
import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack } from "expo-router";



export default function BankAccountLayout ()
{
    return (
        <Stack initialRouteName="index" >
            <Stack.Screen
                name="index"
                options={ {
                    header: () => <AppHeaderInfo title="Chi tiết" onPress={ () => router.replace( "/(tabs)" ) } />,
                } }
            />

            <Stack.Screen
                name="listCard"
                options={ {
                    header: () => <AppHeaderInfo title="Thẻ ngân hàng" onPress={ () => router.replace( "/(tabs)" ) } />,
                } }
            />

        </Stack>
    );
}
