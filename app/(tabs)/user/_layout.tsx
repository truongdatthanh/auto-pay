
import { router, Stack } from 'expo-router';
import '../../../global.css';
import AppHeaderInfo from '@/components/App.headerInfo';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function InfomationLayout ()
{
    return (
        <GestureHandlerRootView className="flex-1">
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
                        header: () => <AppHeaderInfo title='Thay Đổi Mật Khẩu' onPress={ () => router.back() } />,
                    } }
                />
                <Stack.Screen
                    name='profile'
                    options={ {
                        headerShown: false,
                    } }
                />

                <Stack.Screen
                    name="contact"
                    options={ {
                        headerShown: false,
                    } }
                />

                <Stack.Screen
                    name="report-problem"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Vấn Đề Của Bạn?' onPress={ () => router.back() } />,
                    } }
                />

                <Stack.Screen
                    name="biometric"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Sinh Trắc Học' onPress={ () => router.back() } />,
                    } }
                />
                <Stack.Screen
                    name="system-setting"
                    options={ {
                        headerShown: true,
                        header: () => <AppHeaderInfo title='Cài Đặt Hệ Thống' onPress={ () => router.back() } />,
                    } }
                />
            </Stack>
        </GestureHandlerRootView>

    )
}