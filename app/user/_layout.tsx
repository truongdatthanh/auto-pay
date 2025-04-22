
import { router, Stack } from 'expo-router';
import '../../global.css';
import AppHeaderInfo from '@/components/App.headerInfo';
import { StatusBar } from 'react-native';


export default function InfomationLayout ()
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Stack initialRouteName='index'>
                <Stack.Screen
                    name='index'
                    options={ {
                        headerShown: false,
                    } }
                />
                <Stack.Screen
                    name='change-password'
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Thay đổi mật khẩu' onPress={ () => router.back() } />,
                    } }
                />
                <Stack.Screen
                    name='information-user'
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Thông tin cá nhân' onPress={ () => router.back() } />,
                    } }
                />

                <Stack.Screen
                    name="contact"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Thông tin liên hệ' onPress={ () => router.back() } />,
                    } }
                />

                <Stack.Screen
                    name="report-problem"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Vấn đề của bạn?' onPress={ () => router.back() } />,
                    } }
                />

                <Stack.Screen
                    name="biometric"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='sinh trac hoc' onPress={ () => router.back() } />,
                    } }
                />
            </Stack>
        </>

    )
}