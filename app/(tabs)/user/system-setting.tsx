import { View, Text, Switch, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Option from "@/components/Option";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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

