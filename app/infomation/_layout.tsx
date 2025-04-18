
import { Stack } from 'expo-router';
import '../../global.css';
import AppHeaderInfo from '@/components/App.headerInfo';


export default function InfomationLayout ()
{
    return (
        <Stack initialRouteName='info'>
            <Stack.Screen
                name='info'
                options={ {
                    headerShown: false,
                } }
            />
            <Stack.Screen
                name='change-password'
                options={ {
                    headerShown: true,
                    header: () => <AppHeaderInfo title='Thay đổi mật khẩu' />,
                } }
            />
        </Stack>
    )
}