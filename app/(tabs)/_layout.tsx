// import { View, Keyboard, SafeAreaView } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { router, Tabs, usePathname } from 'expo-router';
// import { useState, useEffect } from 'react';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useTabBarStore } from '@/store/useTabbarStore';

// export default function HomeLayout ()
// {

//   const pathname = usePathname();
//   const isTabbarVisibleZustand = useTabBarStore( ( state ) => state.isTabBarVisible );
//   const setIsTabBarVisibleZustand = useTabBarStore( ( state ) => state.setTabBarVisible );

//   useEffect( () =>
//   {
//     if ( pathname.includes( '/transaction/' ) )
//     {
//       setIsTabBarVisibleZustand( false );
//     } else
//     {
//       setIsTabBarVisibleZustand( true );
//     }
//   }, [ pathname ] );

//   return (
//     <SafeAreaView style={ { flex: 1 } }>
//       <Tabs
//         initialRouteName="index"
//         screenOptions={ {
//           tabBarShowLabel: true,
//           tabBarActiveTintColor: 'blue',
//           tabBarInactiveTintColor: 'gray',
//           tabBarStyle: {
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             right: 20,
//             height: 70,
//             borderRadius: 50,
//             marginHorizontal: 20,
//             elevation: 10,
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowOffset: { width: 0, height: 5 },
//             shadowRadius: 10,
//             display: isTabbarVisibleZustand ? 'flex' : 'none'
//           },
//           headerPressColor: '#3377f2',
//           tabBarItemStyle: {
//             marginTop: 8,
//             position: 'relative',
//           },
//         } }
//       >
//         {/* Các tab screens giữ nguyên */ }
//         <Tabs.Screen
//           name="index"
//           options={ {
//             title: 'Home',
//             tabBarIcon: ( { color } ) => (
//               <MaterialCommunityIcons name="home" size={ 30 } color={ color } />
//             ),
//             headerShown: false,
//           } }
//         />

//         <Tabs.Screen
//           name="qr"
//           options={ {
//             tabBarShowLabel: false,
//             title: 'Scan',
//             tabBarStyle: { display: 'none' },
//             headerShown: false,
//             tabBarIcon: ( { color } ) => (
//               <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color={ color } />
//             ),
//           } }
//           listeners={ {
//             tabPress: ( e ) =>
//             {
//               e.preventDefault();
//               router.replace( {
//                 pathname: "/(tabs)/qr",
//                 params: { tabIndex: 0 }
//               } );
//             },
//           } }
//         />

//         <Tabs.Screen
//           name="history"
//           options={ {
//             title: 'History',
//             tabBarIcon: ( { color } ) => (
//               <MaterialCommunityIcons name="history" size={ 24 } color={ color } />
//             ),
//             headerShown: false
//           } }
//           listeners={ {
//             tabPress: ( e ) =>
//             {
//               e.preventDefault();
//               router.replace( "/(tabs)/history" );
//             },
//           } }
//         />

//         <Tabs.Screen
//           name="user"
//           options={ {
//             title: 'Profile',
//             tabBarIcon: ( { color } ) => (
//               <FontAwesome name="user-o" size={ 24 } color={ color } />
//             ),
//             headerShown: false,
//             tabBarStyle: { display: 'none' },
//           } }
//         />
//       </Tabs>
//     </SafeAreaView>
//   );
// }

import { View, Keyboard, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Tabs, usePathname } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTabBarStore } from '@/store/useTabbarStore';

export default function HomeLayout ()
{
  const pathname = usePathname();
  const isTabbarVisibleZustand = useTabBarStore( ( state ) => state.isTabBarVisible );
  const setIsTabBarVisibleZustand = useTabBarStore( ( state ) => state.setTabBarVisible );

  const translateY = useRef( new Animated.Value( 0 ) ).current;

  // Ẩn/hiện tabbar bằng animation
  useEffect( () =>
  {
    Animated.timing( translateY, {
      toValue: isTabbarVisibleZustand ? 0 : 100, // Trượt xuống 100 khi ẩn
      duration: 150,
      useNativeDriver: true,
    } ).start();
  }, [ isTabbarVisibleZustand ] );

  useEffect( () =>
  {
    if ( pathname.includes( '/transaction/' ) )
    {
      setIsTabBarVisibleZustand( false );
    } else
    {
      setIsTabBarVisibleZustand( true );
    }
  }, [ pathname ] );

  return (
    <SafeAreaView style={ { flex: 1 } }>
      <Tabs
        initialRouteName="index"
        screenOptions={ {
          tabBarShowLabel: true,
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
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
            transform: [ { translateY } ],
          },
          headerPressColor: '#3377f2',
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
            headerShown: false,
          } }
        />

        <Tabs.Screen
          name="qr"
          options={ {
            tabBarShowLabel: false,
            title: 'Scan',
            tabBarStyle: { display: 'none' }, // Tab này không hiển thị tabbar
            headerShown: false,
            tabBarIcon: ( { color } ) => (
              <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color={ color } />
            ),
          } }
          listeners={ {
            tabPress: ( e ) =>
            {
              e.preventDefault();
              router.replace( {
                pathname: "/(tabs)/qr",
                params: { tabIndex: 0 },
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
            headerShown: false,
          } }
          listeners={ {
            tabPress: ( e ) =>
            {
              e.preventDefault();
              router.replace( "/(tabs)/history" );
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
            tabBarStyle: { display: 'none' }, // Profile không hiển thị tabbar
          } }
        />
      </Tabs>
    </SafeAreaView>
  );
}
