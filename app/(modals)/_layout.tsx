import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function ModalLayout ()
{
  return (
    // <SafeAreaView className='flex-1'>
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Stack screenOptions={ { headerShown: true } } initialRouteName='index'>
        <Stack.Screen name='index' options={ { headerShown: false } } />
      </Stack>
    </>
    /* </SafeAreaView> */ 
  );
}