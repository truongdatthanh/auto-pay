
import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack, usePathname } from "expo-router";

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
    );
}
