import { router, Stack } from "expo-router";
import '../../../global.css';
import AppHeaderInfo from "@/components/App.headerInfo";

export default function HistoryLayout ()
{
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={ {
          header: () => <AppHeaderInfo title='Lịch sử giao dịch' onPress={ () => router.push( "/(tabs)" ) } />,
        } }
      />

      <Stack.Screen
        name='transaction/[id]'
        options={ {
          headerShown: false,
        } }
        
      />

      <Stack.Screen
        name='statistics'
        options={ {
          header: () => <AppHeaderInfo title='Thống kê giao dịch' onPress={ () => router.replace( "/(tabs)" ) } />,
        } }
      />
    </Stack>
  );
}