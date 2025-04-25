import { Stack } from "expo-router";

export default function QRLayout ()
{
    return (
        <Stack initialRouteName='QR-scanner'>
            <Stack.Screen
                name='QR-scanner'
                options={ {
                    headerShown: false,
                } }
            />
            <Stack.Screen
                name='CreateMyQR'
                options={ {
                    headerShown: false,
                } }
            />
            <Stack.Screen
                name='DisplayQR'
                options={ {
                    headerShown: false,
                } }
            />
        </Stack>
    );
}