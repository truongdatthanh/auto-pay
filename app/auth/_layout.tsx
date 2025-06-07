import { Stack } from 'expo-router';
import '@/global.css';

export default function AuthLayout ()
{
  return (
    <>
      <Stack initialRouteName='login'>
        <Stack.Screen name='login' options={ { headerShown: false, } } />
        <Stack.Screen name='register' options={ { headerShown: false, presentation: "modal" } } />
        <Stack.Screen name='forgot-password' options={ { headerShown: false, } } />
        <Stack.Screen name='pin' options={ { headerShown: false, } } />
        <Stack.Screen name='confirm-pin' options={ { headerShown: false, } } />
        <Stack.Screen name='phone-number' options={ { headerShown: false, } } />
        <Stack.Screen name='success' options={ { headerShown: false, } } />
        <Stack.Screen name='verify-otp' options={ { headerShown: false, } } />
        <Stack.Screen name='term' options={ { headerShown: false, } } />
      </Stack>

    </>

  )
}

