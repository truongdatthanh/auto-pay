import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import AppHeader from '@/components/App.header';


export default function TabLayout ()
{

  return (
    <>
      <Tabs
        initialRouteName="index"
        screenOptions={ {
          tabBarShowLabel: true,//Chữ dưới icon
          tabBarActiveTintColor: 'blue',//tabbar active sẽ có màu xanh
          tabBarInactiveTintColor: 'gray',//tabbar inactive sẽ có màu xám
          tabBarStyle: {//thanh tabbar
            marginHorizontal: 10,
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 70,
            backgroundColor: 'white',
            borderRadius: 35,
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarLabelStyle: {//chữ dưới icon
            fontSize: 12,
            fontWeight: 'bold',
            marginBottom: 5,
          },
          tabBarItemStyle: {//cac item trong tabbar
            marginTop: 10,
          },
        } }
      >
        <Tabs.Screen
          name="index"
          options={ {
            title: 'Home',
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="home" size={ 24 } color={ color } />
            ),
            header: () => <AppHeader />,
          } }
        />

        <Tabs.Screen
          name="qr/QR-scanner"
          options={ {
            title: '',
            tabBarIcon: () => (
              <View
                style={ {
                  position: 'absolute',
                  top: -35,
                  width: 70,
                  height: 70,
                  borderRadius: 35,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  elevation: 5,
                } }
              >
                <MaterialCommunityIcons name="qrcode-scan" size={ 32 } color="white" />
              </View>
            ),
          } }
        />

        <Tabs.Screen
          name="history"
          options={ {
            title: 'History',
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="history" size={ 24 } color={ color } />
            ),
            headerShown: false,
          } }
        />
      </Tabs>
    </>
  );
}






