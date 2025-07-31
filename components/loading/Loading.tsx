import React, { useCallback } from 'react';
import { View, Text, StatusBar, ActivityIndicator } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useTabBarStore } from '@/store/useTabbarStore';
import { useFabStore } from '@/store/useFABStore';
import { useFocusEffect } from '@react-navigation/native';


interface LoadingProps
{
    message?: string;
    icon?: 'bank' | 'wallet' | 'card' | 'transfer' | 'default';
    iconColor?: string;
    backgroundColor?: string;
    statusBarColor?: string;
    statusBarStyle?: 'light-content' | 'dark-content';
}

export default function Loading ( {
    message = 'Đang tải...',
    icon = 'default',
    iconColor = '#3b82f6',
    backgroundColor = '#ffffff',
    statusBarColor = 'transparent',
    statusBarStyle = 'light-content'
}: LoadingProps )
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

    // Map icon type to the appropriate icon component
    const renderIcon = () =>
    {
        switch ( icon )
        {
            case 'bank':
                return <MaterialCommunityIcons name="bank-outline" size={ 60 } color={ iconColor } />;
            case 'wallet':
                return <Ionicons name="wallet-outline" size={ 60 } color={ iconColor } />;
            case 'card':
                return <Ionicons name="card-outline" size={ 60 } color={ iconColor } />;
            case 'transfer':
                return <MaterialCommunityIcons name="bank-transfer" size={ 60 } color={ iconColor } />;
            case 'default':
            default:
                return <MaterialCommunityIcons name="bank-outline" size={ 60 } color={ iconColor } />;
        }
    };

    return (
        <View className="flex-1 justify-center items-center" style={ { backgroundColor } }>
            <StatusBar barStyle={ statusBarStyle } backgroundColor={ statusBarColor } translucent />
            <Animated.View entering={ FadeIn.duration( 800 ) }>
                { renderIcon() }
            </Animated.View>
            <Animated.Text
                entering={ FadeIn.delay( 300 ).duration( 800 ) }
                className="text-slate-600 mt-4 text-base"
            >
                { message }
            </Animated.Text>
            <ActivityIndicator className='mt-4' size="large" color="#1c40f2" />
        </View>
    );
}
