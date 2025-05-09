import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack, useLocalSearchParams } from "expo-router";


export default function QRLayout ()
{
    return (
        <Stack initialRouteName='scanner-qr'>
            <Stack.Screen
                name="index"
                options={ {
                    header: () => <AppHeaderInfo title="Thanh toán với QR" onPress={ () => router.replace( "/(tabs)" ) } />
                } }
            />
            <Stack.Screen
                name='scanner-qr'
                options={ {
                    headerShown: false
                } }
            />
            <Stack.Screen
                name='create'
                options={ {
                    header: () => <AppHeaderInfo title="Tạo QR Giao Dịch" onPress={ () => router.back() } />
                } }
            />
            <Stack.Screen
                name='display'
                options={ {
                    headerShown: false
                } }
            />
        </Stack>
    );
}