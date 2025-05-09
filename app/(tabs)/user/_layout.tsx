
import { router, Stack } from 'expo-router';
import '../../../global.css';
import AppHeaderInfo from '@/components/App.headerInfo';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function InfomationLayout ()
{
    return (
        <GestureHandlerRootView className="flex-1">
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
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
                    name='profile'
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
                        header: () => <AppHeaderInfo title='Sinh trắc học' onPress={ () => router.back() } />,
                    } }
                />
            </Stack>
        </GestureHandlerRootView>

    )
}