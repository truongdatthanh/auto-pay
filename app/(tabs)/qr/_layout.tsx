import AppHeaderInfo from "@/components/App.headerInfo";
import { router, Stack, useLocalSearchParams } from "expo-router";


export default function QRLayout ()
{
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen
                name="index"
                options={ {
                    header: () => <AppHeaderInfo title="Thanh toán với QR" onPress={ () => router.replace( "/(tabs)" ) } />
                } }
            />
            <Stack.Screen
                name='QR-scanner'
                options={ {
                    headerShown: false
                } }
            />
            <Stack.Screen
                name='CreateMyQR'
                options={ {
                    headerShown: false
                } }
            />
            <Stack.Screen
                name='DisplayQR'
                options={ {
                    header: () => <AppHeaderInfo title="QR của tao" onPress={ () => router.push('/(tabs)/qr') } />
                } }
            />
        </Stack>
    );
}