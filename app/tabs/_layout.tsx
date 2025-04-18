import { Stack, Tabs } from 'expo-router';
import '../../global.css';


export default function TabsLayout ()
{
  return (
    <Tabs initialRouteName='home'>
      <Tabs.Screen
        name="home"
        options={ {
          title: 'Home',
          headerShown: false,
        } }

      />

      <Tabs.Screen
        name="QR-scanner"
        options={ {
          title: 'QR',
          headerShown: false,
        } }
      />

      <Tabs.Screen
        name="history"
        options={ {
          title: 'History',
          headerShown: false,
        } }
      />
    </Tabs>
  );
}




