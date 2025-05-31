import { View, Text, Switch } from 'react-native';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SystemSetting ()
{
    const [ isDarkMode, setIsDarkMode ] = useState( false );

    const toggleDarkMode = async () =>
    {
        const newValue = !isDarkMode;
        await AsyncStorage.setItem( 'dark_mode_enabled', newValue.toString() );
        setIsDarkMode( newValue );
    };

    return (
        <>
            <View className="m-4 bg-white rounded-xl p-4 flex-row justify-between items-center">
                <Text className="text-md font-semibold">Chế độ tối</Text>
                <Switch value={ isDarkMode } onValueChange={ toggleDarkMode } />
            </View>
        </>
    );
}

