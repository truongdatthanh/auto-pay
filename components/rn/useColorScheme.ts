import { useEffect, useState } from 'react';
import { useColorScheme as _useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa các loại theme có thể có
export type ThemeType = 'light' | 'dark' | 'system';

// Hook tùy chỉnh để lấy và quản lý theme
export function useColorScheme ()
{
    const systemColorScheme = _useColorScheme() as 'light' | 'dark';
    const [ theme, setTheme ] = useState<'light' | 'dark'>( systemColorScheme );
    const [ themePreference, setThemePreference ] = useState<ThemeType>( 'system' );

    // Load theme preference từ AsyncStorage khi component mount
    useEffect( () =>
    {
        const loadThemePreference = async () =>
        {
            try
            {
                const darkModeValue = await AsyncStorage.getItem( 'dark_mode' );
                const systemThemeValue = await AsyncStorage.getItem( 'system_theme' );

                if ( systemThemeValue === 'true' )
                {
                    setThemePreference( 'system' );
                    setTheme( systemColorScheme );
                } else if ( darkModeValue === 'true' )
                {
                    setThemePreference( 'dark' );
                    setTheme( 'dark' );
                } else
                {
                    setThemePreference( 'light' );
                    setTheme( 'light' );
                }
            } catch ( error )
            {
                console.log( 'Error loading theme preference:', error );
                // Fallback to system theme
                setThemePreference( 'system' );
                setTheme( systemColorScheme );
            }
        };

        loadThemePreference();
    }, [ systemColorScheme ] );

    // Theo dõi thay đổi của system theme
    useEffect( () =>
    {
        if ( themePreference === 'system' )
        {
            setTheme( systemColorScheme );
        }
    }, [ systemColorScheme, themePreference ] );

    return theme;
}

// Hook để thay đổi theme
export function useThemeManager ()
{
    const systemColorScheme = _useColorScheme() as 'light' | 'dark';
    const [ themePreference, setThemePreference ] = useState<ThemeType>( 'system' );

    // Load theme preference từ AsyncStorage khi component mount
    useEffect( () =>
    {
        const loadThemePreference = async () =>
        {
            try
            {
                const darkModeValue = await AsyncStorage.getItem( 'dark_mode' );
                const systemThemeValue = await AsyncStorage.getItem( 'system_theme' );

                if ( systemThemeValue === 'true' )
                {
                    setThemePreference( 'system' );
                } else if ( darkModeValue === 'true' )
                {
                    setThemePreference( 'dark' );
                } else
                {
                    setThemePreference( 'light' );
                }
            } catch ( error )
            {
                console.log( 'Error loading theme preference:', error );
                setThemePreference( 'system' );
            }
        };

        loadThemePreference();
    }, [] );

    // Hàm để thay đổi theme
    const setTheme = async ( newTheme: ThemeType ) =>
    {
        try
        {
            if ( newTheme === 'system' )
            {
                await AsyncStorage.setItem( 'system_theme', 'true' );
                await AsyncStorage.setItem( 'dark_mode', ( systemColorScheme === 'dark' ).toString() );
            } else
            {
                await AsyncStorage.setItem( 'system_theme', 'false' );
                await AsyncStorage.setItem( 'dark_mode', ( newTheme === 'dark' ).toString() );
            }
            setThemePreference( newTheme );
        } catch ( error )
        {
            console.log( 'Error saving theme preference:', error );
        }
    };

    return { themePreference, setTheme };
}