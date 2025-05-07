import { View, Keyboard, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
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
            tabBarShowLabel: false,
            title: 'Scan',
            tabBarStyle: { display: 'none' },
            headerShown: false,
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color={ color } />
            ),
          } }
          listeners={ {
            tabPress: ( e ) =>
            {
              // Ngăn điều hướng mặc định
              e.preventDefault();
              // Luôn chuyển đến tab Scan (index 0) khi ấn vào tab QR
              router.replace( {
                pathname: "/(tabs)/qr",
                params: { tabIndex: 0 }
              } );
            },
          } }
        />

        <Tabs.Screen
          name="history"
          options={ {
            title: 'History',
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="history" size={ 24 } color={ color } />
            ),
            headerShown: false
          } }
          listeners={ {
            tabPress: ( e ) =>
            {
              e.preventDefault(); // Ngăn điều hướng mặc định
              router.replace( "/(tabs)/history" ); // Luôn về index
            },
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
