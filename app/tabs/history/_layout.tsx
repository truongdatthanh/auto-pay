import { Stack } from "expo-router";
import '../../../global.css';

export default function HistoryLayout ()
{
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={ {
            headerShown: true,
            title: 'Lịch sử giao dịch',
        } }
        
      />
      <Stack.Screen
        name='detail-history'
        options={ {
          headerShown: true,
        } }
      />
    </Stack>
  );
}