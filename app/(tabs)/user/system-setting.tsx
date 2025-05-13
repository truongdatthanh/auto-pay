import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Ionicons, MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { useThemeManager, ThemeType } from '@/components/rn/useColorScheme';
import { Text as ThemedText, View as ThemedView, Card } from '@/components/rn/Themed';

export default function SystemSettings ()
{
    // Theme settings
    const { themePreference, setTheme } = useThemeManager();
    const [ darkMode, setDarkMode ] = useState( false );
    const [ systemTheme, setSystemTheme ] = useState( true );

    // Notification settings
    const [ pushNotifications, setPushNotifications ] = useState( true );
    const [ emailNotifications, setEmailNotifications ] = useState( true );
    const [ transactionAlerts, setTransactionAlerts ] = useState( true );

    // Privacy settings
    const [ locationServices, setLocationServices ] = useState( true );
    const [ analytics, setAnalytics ] = useState( true );

    // App settings
    const [ hapticFeedback, setHapticFeedback ] = useState( true );
    const [ autoLock, setAutoLock ] = useState( true );
    const [ autoLockTime, setAutoLockTime ] = useState( '1 phút' );

    useEffect( () =>
    {
        // Sync state with theme preference
        setDarkMode( themePreference === 'dark' );
        setSystemTheme( themePreference === 'system' );

        // Load other settings from AsyncStorage
        const loadSettings = async () =>
        {
            try
            {
                const pushNotificationsValue = await AsyncStorage.getItem( 'push_notifications' );
                const emailNotificationsValue = await AsyncStorage.getItem( 'email_notifications' );
                const transactionAlertsValue = await AsyncStorage.getItem( 'transaction_alerts' );
                const locationServicesValue = await AsyncStorage.getItem( 'location_services' );
                const analyticsValue = await AsyncStorage.getItem( 'analytics' );
                const hapticFeedbackValue = await AsyncStorage.getItem( 'haptic_feedback' );
                const autoLockValue = await AsyncStorage.getItem( 'auto_lock' );
                const autoLockTimeValue = await AsyncStorage.getItem( 'auto_lock_time' );

                if ( pushNotificationsValue !== null ) setPushNotifications( pushNotificationsValue === 'true' );
                if ( emailNotificationsValue !== null ) setEmailNotifications( emailNotificationsValue === 'true' );
                if ( transactionAlertsValue !== null ) setTransactionAlerts( transactionAlertsValue === 'true' );
                if ( locationServicesValue !== null ) setLocationServices( locationServicesValue === 'true' );
                if ( analyticsValue !== null ) setAnalytics( analyticsValue === 'true' );
                if ( hapticFeedbackValue !== null ) setHapticFeedback( hapticFeedbackValue === 'true' );
                if ( autoLockValue !== null ) setAutoLock( autoLockValue === 'true' );
                if ( autoLockTimeValue !== null ) setAutoLockTime( autoLockTimeValue );
            } catch ( error )
            {
                console.log( 'Error loading settings:', error );
            }
        };

        loadSettings();
    }, [ themePreference ] );

    const toggleSetting = async ( setting: any, value: any, key: any ) =>
    {
        if ( hapticFeedback )
        {
            Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
        }

        setting( !value );
        try
        {
            await AsyncStorage.setItem( key, ( !value ).toString() );
        } catch ( error )
        {
            console.log( 'Error saving setting:', error );
        }
    };

    const handleThemeChange = async ( newTheme: ThemeType ) =>
    {
        if ( hapticFeedback )
        {
            Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
        }

        if ( newTheme === 'system' )
        {
            setSystemTheme( true );
            setDarkMode( false );
            await setTheme( 'system' );
        } else if ( newTheme === 'dark' )
        {
            setSystemTheme( false );
            setDarkMode( true );
            await setTheme( 'dark' );
        } else
        {
            setSystemTheme( false );
            setDarkMode( false );
            await setTheme( 'light' );
        }
    };

    const handleAutoLockTimeChange = async ( time: any ) =>
    {
        if ( hapticFeedback )
        {
            Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Light );
        }

        setAutoLockTime( time );
        try
        {
            await AsyncStorage.setItem( 'auto_lock_time', time );
        } catch ( error )
        {
            console.log( 'Error saving auto lock time:', error );
        }
    };

    return (
        <ThemedView className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1">
                {/* Header */ }
                <ScrollView className="flex-1" showsVerticalScrollIndicator={ false }>
                    {/* Theme Settings */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 400 ) }
                        className="mx-4 mt-4"
                    >
                        <Card className="overflow-hidden">
                            <View className="p-4 border-b border-gray-100">
                                <ThemedText className="text-lg font-bold">Giao diện</ThemedText>
                            </View>

                            <View className="p-4">
                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="moon" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Chế độ tối</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Giao diện tối cho ứng dụng</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ darkMode }
                                        onValueChange={ () => handleThemeChange( darkMode ? 'light' : 'dark' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ darkMode ? "#ffffff" : "#ffffff" }
                                    />
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
                                            <Ionicons name="phone-portrait" size={ 18 } color="#1c40f2" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Theo hệ thống</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Tự động theo chế độ của thiết bị</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ systemTheme }
                                        onValueChange={ () => handleThemeChange( systemTheme ? 'light' : 'system' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ systemTheme ? "#ffffff" : "#ffffff" }
                                    />
                                </View>
                            </View>
                        </Card>
                    </Animated.View>

                    {/* Notification Settings */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 400 ).delay( 100 ) }
                        className="mx-4 mt-4"
                    >
                        <Card className="overflow-hidden">
                            <View className="p-4 border-b border-gray-100">
                                <ThemedText className="text-lg font-bold">Thông báo</ThemedText>
                            </View>

                            <View className="p-4">
                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="notifications" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Thông báo đẩy</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Nhận thông báo từ ứng dụng</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ pushNotifications }
                                        onValueChange={ () => toggleSetting( setPushNotifications, pushNotifications, 'push_notifications' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ pushNotifications ? "#ffffff" : "#ffffff" }
                                    />
                                </View>

                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="mail" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Email</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Nhận thông báo qua email</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ emailNotifications }
                                        onValueChange={ () => toggleSetting( setEmailNotifications, emailNotifications, 'email_notifications' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ emailNotifications ? "#ffffff" : "#ffffff" }
                                    />
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="alert" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Thông báo giao dịch</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Nhận thông báo khi có giao dịch</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ transactionAlerts }
                                        onValueChange={ () => toggleSetting( setTransactionAlerts, transactionAlerts, 'transaction_alerts' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ transactionAlerts ? "#ffffff" : "#ffffff" }
                                    />
                                </View>
                            </View>
                        </Card>
                    </Animated.View>

                    {/* Privacy Settings */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 400 ).delay( 200 ) }
                        className="mx-4 mt-4"
                    >
                        <Card className="overflow-hidden">
                            <View className="p-4 border-b border-gray-100">
                                <ThemedText className="text-lg font-bold">Quyền riêng tư</ThemedText>
                            </View>

                            <View className="p-4">
                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="location" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Dịch vụ vị trí</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Cho phép ứng dụng truy cập vị trí</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ locationServices }
                                        onValueChange={ () => toggleSetting( setLocationServices, locationServices, 'location_services' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ locationServices ? "#ffffff" : "#ffffff" }
                                    />
                                </View>

                                <View className="flex-row items-center justify-between mb-6">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <Ionicons name="analytics" size={ 18 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Phân tích dữ liệu</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Chia sẻ dữ liệu sử dụng ứng dụng</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ analytics }
                                        onValueChange={ () => toggleSetting( setAnalytics, analytics, 'analytics' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ analytics ? "#ffffff" : "#ffffff" }
                                    />
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <View className="w-10 h-10 rounded-full bg-indigo-100 items-center justify-center mr-3">
                                            <MaterialCommunityIcons name="vibrate" size={ 24 } color="#4f46e5" />
                                        </View>
                                        <View>
                                            <ThemedText className="text-base font-medium">Phản hồi xúc giác</ThemedText>
                                            <ThemedText className="text-xs text-gray-500">Rung nhẹ khi tương tác</ThemedText>
                                        </View>
                                    </View>
                                    <Switch
                                        value={ hapticFeedback }
                                        onValueChange={ () => toggleSetting( setHapticFeedback, hapticFeedback, 'haptic_feedback' ) }
                                        trackColor={ { false: "#e5e7eb", true: "#4f46e5" } }
                                        thumbColor={ hapticFeedback ? "#ffffff" : "#ffffff" }
                                    />
                                </View>
                            </View>
                        </Card>
                    </Animated.View>
                </ScrollView>
            </SafeAreaView>
        </ThemedView>
    );
}

















