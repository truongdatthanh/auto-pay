import { Stack } from 'expo-router';
import { SafeAreaView, StatusBar } from 'react-native';

export default function BankAccountLayout ()
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            
            <Stack
                screenOptions={ {
                    headerShown: false,
                    headerStyle: { backgroundColor: '#f2f2f2' },
                    headerTintColor: '#333',
                } }
            />
        </>

    );
}