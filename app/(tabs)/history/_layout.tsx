import { router, Stack } from "expo-router";
import '@/global.css';

export default function HistoryLayout ()
{
  return (
    <Stack
      initialRouteName='index'
      screenOptions={ {
        animation: 'fade_from_bottom', // hoặc 'fade'
        presentation: 'card',
      } }>
      <Stack.Screen
        name='index'
        options={ {
          headerShown: false,
        } }
      />

      <Stack.Screen
        name='transaction/[id]'
        options={ {
          headerShown: false,
        } }

      />
    </Stack>
  );
}