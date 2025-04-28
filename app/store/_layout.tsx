import { Stack } from "expo-router";

export default function StoreLayout ()
{
    return (
        <Stack initialRouteName="index">
            <Stack.Screen
                name="index"
                options={ {
                    headerShown: false
                }}
            />
        </Stack>
    );
}