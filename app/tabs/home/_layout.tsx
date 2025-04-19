import AppHeader from "@/components/App.header";
import AppHeaderInfo from "@/components/App.headerInfo";
import { Stack } from "expo-router";
import '../../../global.css';

export default function HomeLayout ()
{
    return (
        <Stack initialRouteName='index'>
            <Stack.Screen
                name='index'
                options={ {
                    header: () => <AppHeader />,
                } }
            />
        </Stack>
    )
    ;
}