import { Stack } from "expo-router";
import '../../../global.css';
import AppHeaderInfo from "@/components/App.headerInfo";

export default function HistoryLayout ()
{
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={ {
          header: () => <AppHeaderInfo title='Lịch sử giao dịch' />,
        } }

      />
    </Stack>
  );
}