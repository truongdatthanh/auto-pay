import { router, Stack } from 'expo-router';
import '@/global.css';
import AppHeaderInfo from '@/components/header/App.headerInfo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useTabBarStore } from '@/store/useTabbarStore';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useFabStore } from '@/store/useFABStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';


export default function InfomationLayout ()
{
    const setTabBarVisible = useTabBarStore( state => state.setTabBarVisible );
    const setVisible = useFabStore( state => state.setVisible );
    useFocusEffect(
        useCallback( () =>
        {
            // ẩn khi vào màn hình
            setVisible( false );
            setTabBarVisible( false );
            return () =>
            {
                setTabBarVisible( true );
                setVisible( true );
            }// hiện lại khi rời màn hình
        }, [ setTabBarVisible, setVisible ] )
    );

    return (
        <GestureHandlerRootView className="flex-1">
            <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
            <SafeAreaView className='flex-1 bg-black'>
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
            </SafeAreaView>

        </GestureHandlerRootView>

    )
}