import { router, Stack } from "expo-router";
import '../../../global.css';
import AppHeaderInfo from "@/components/App.headerInfo";
import { useHideTabBarOnScroll } from "@/hooks/useHideTabbarOnScroll";

export default function HistoryLayout ()
{
  return (
    <Stack initialRouteName='index'>
      <Stack.Screen
        name='index'
        options={ {
          header: () => <AppHeaderInfo title='Lịch sử giao dịch' onPress={ () => router.push("/(tabs)") } />,
        } }
      />

      <Stack.Screen
        name='details/[id]'
        options={ {
          header: () => <AppHeaderInfo title='Chi tiết giao dịch' onPress={ () => router.back() } />,
        } }
      />
    </Stack>
  );
}