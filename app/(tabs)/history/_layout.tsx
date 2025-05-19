import { router, Stack } from "expo-router";
import '../../../global.css';

export default function HistoryLayout ()
{
  return (
    <Stack initialRouteName='index'>
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