import { Stack } from 'expo-router';
import '../../global.css';
import { StatusBar } from 'react-native';
import AppHeaderInfo from '@/components/App.headerInfo';


export default function AuthLayout ()
{
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Stack initialRouteName='login'>
        <Stack.Screen
          name='login'
          options={ {
            headerShown: false,
          } }
        />

        <Stack.Screen
          name='register'
          options={ {
            headerShown: false,
          } }
        />

        <Stack.Screen
          name='forgot-password'
          options={ {
            headerShown: false,
          } }
        />

        <Stack.Screen
          name='pinInput'
          options={ {
            headerShown: false,
          } }
        />

        <Stack.Screen
          name='confirmPin'
          options={ {
            headerShown: false,
          } }
        />
      </Stack>
    </>

  )
}