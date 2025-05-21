import { Stack } from 'expo-router';
import '@/global.css';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, Platform } from 'react-native';
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';


export default function AuthLayout ()
{
  return (
    <SafeAreaView style={ { flex: 1, backgroundColor: "blue" } }>
      <Stack initialRouteName='login'>
        <Stack.Screen name='login' options={ { headerShown: false, } } />
        <Stack.Screen name='register' options={ { headerShown: false, } } />
        <Stack.Screen name='forgot-password' options={ { headerShown: false, } } />
        <Stack.Screen name='pin' options={ { headerShown: false, } } />
        <Stack.Screen name='confirm-pin' options={ { headerShown: false, } } />
        <Stack.Screen name='phone-number' options={ { headerShown: false, } } />
        <Stack.Screen name='success' options={ { headerShown: false, } } />
        <Stack.Screen name='verify-otp' options={ { headerShown: false, } } />
      </Stack>
    </SafeAreaView>
  )
}

