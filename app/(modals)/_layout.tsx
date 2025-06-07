import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ModalLayout ()
{
  return (
    // <SafeAreaView className='flex-1'>
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <Stack screenOptions={ { presentation: 'modal', headerShown: false } } initialRouteName='index'>
        <Stack.Screen name='index' options={ { headerShown: false } } />
      </Stack>
    </>

    /* </SafeAreaView> */ 


  );
}