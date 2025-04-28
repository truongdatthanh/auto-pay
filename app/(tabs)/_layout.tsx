import { View, Keyboard, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import AppHeader from '@/components/App.header';
import { useState, useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';


export default function HomeLayout ()
{
  const [ isTabBarVisible, setIsTabBarVisible ] = useState( true );

  useEffect( () =>
  {

    const keyboardDidShowListener = Keyboard.addListener( 'keyboardDidShow', () =>
    {
      setIsTabBarVisible( false ); 
    } );

    const keyboardDidHideListener = Keyboard.addListener( 'keyboardDidHide', () =>
    {
      setIsTabBarVisible( true );
    } );

    return () =>
    {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [] );

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <Tabs
        initialRouteName="index"
        screenOptions={ {
          tabBarShowLabel: true, // Show label below the icon
          tabBarActiveTintColor: 'blue', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
          tabBarStyle: {
            position: 'absolute',
            bottom: isTabBarVisible ? 20 : -70, // Hide or show based on isTabBarVisible
            left: 20,
            right: 20,
            height: 70,
            borderRadius: 50,
            marginHorizontal: 20,
            elevation: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
          },
          headerPressColor: '#3377f2',
          // tabBarLabelStyle: {
          //   fontSize: 12,
          //   fontWeight: 'bold',
          //   // marginBottom: 5,
          // },
          tabBarItemStyle: {
            marginTop: 8,
            position: 'relative',
          },
        } }
      >
        <Tabs.Screen
          name="index"
          options={ {
            title: 'Home',
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="home" size={ 30 } color={ color } />
            ),
            header: () => <AppHeader />,
          } }
        />

        <Tabs.Screen
          name="qr"
          options={ {
            tabBarShowLabel: false, // Hide the label for this tab
            title: 'Scan',
            tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
            headerShown: false,
            tabBarIcon: ( { color } ) => (
              // <View
              //   style={ {
              //     position: 'absolute',
              //     top: -35,
              //     width: 70,
              //     height: 70,
              //     borderRadius: 35,
              //     backgroundColor: 'green',
              //     justifyContent: 'center',
              //     alignItems: 'center',
              //     shadowColor: '#000',
              //     shadowOffset: { width: 0, height: 4 },
              //     shadowOpacity: 0.3,
              //     shadowRadius: 5,
              //     elevation: 5,
              //   } }
              // >
              <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color={ color } />
              // </View>
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

        <Tabs.Screen
          name="user"
          options={ {
            title: 'Profile',
            tabBarIcon: ( { color } ) => (
              <FontAwesome name="user-o" size={ 24 } color={ color } />
            ),
            headerShown: false,
            tabBarStyle: { display: 'none' }, // Hide the tab bar for this screen
          } }
        />
      </Tabs>
    </SafeAreaView>
  );
}
