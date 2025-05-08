import { Stack } from 'expo-router';
import '../../global.css';

export default function AuthLayout ()
{
  return (
    <>
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

        <Stack.Screen
          name='withPhoneNumber'
          options={ {
            headerShown: false,
          } }
        />

        <Stack.Screen
          name='success'
          options={ {
            headerShown: false,
          } }
        />
      </Stack>
    </>

  )
}