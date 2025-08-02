import { Stack } from 'expo-router';
import '@/global.css';

export default function AuthLayout ()
{
  return (
    <>
      <Stack initialRouteName='login' screenOptions={ {
        freezeOnBlur: true,
        headerShown: false,
      } }>
        <Stack.Screen name='login' />
        <Stack.Screen name='register' />
        <Stack.Screen name='forgot-password' />
        <Stack.Screen name='pin' />
        <Stack.Screen name='confirm-pin' />
        <Stack.Screen name='phone-number' />
        <Stack.Screen name='success' />
        <Stack.Screen name='verify-otp' />
        <Stack.Screen name='term' />
      </Stack>
    </>
  )
}

