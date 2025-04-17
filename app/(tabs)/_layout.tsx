import { Tabs } from 'expo-router';
import '../../global.css';
import AppHeader from '@/components/App.header';



export default function TabsLayout ()
{
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={ {
          title: 'Notification',
          header: () => <AppHeader />,
        } }

      />
      <Tabs.Screen
        name="(information)"
        options={ {
          title: 'Infomation',
          headerShown: false,
        } }
      />

      {/* can fix */}
      <Tabs.Screen
        name="details"
        options={ {
          title: 'Infomation',
          headerShown: false,
        } }
      />
    </Tabs>
  );
}



