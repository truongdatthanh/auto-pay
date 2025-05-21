// import useTabPressHandler from '@/hooks/useTabPressHandle';
// import { useTabBarStore } from '@/store/useTabbarStore';
// import { router, Tabs, usePathname } from 'expo-router';
// import { Image, Text, TouchableOpacity } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';


// export default function TabsLayout ()
// {
//   const insets = useSafeAreaInsets(); // lấy insets động theo device
//   const isTabBarVisible = useTabBarStore( state => state.isTabBarVisible );
//   const pathname = usePathname(); // lấy pathname hiện tại

//   return (
//     <Tabs
//       initialRouteName="index"
//       screenOptions={ {
//         headerShown: false,
//         tabBarActiveTintColor: '#1c40f2',
//         tabBarInactiveTintColor: 'black',


//         tabBarLabelStyle: {
//           fontSize: 10,
//           width: 100,
//         },

//         tabBarItemStyle: {
//           paddingHorizontal: 12,
//           paddingVertical: 6,
//           marginHorizontal: 6,
//           justifyContent: 'center',
//           alignItems: 'center',
//           //flexDirection: 'row', // để icon và label nằm ngang nếu cần
//           minWidth: 70, // tăng kích thước tối thiểu để bao phủ icon + label
//         },

//         //CSS cho thanh Tabbar
//         tabBarStyle: {
//           display: isTabBarVisible ? "flex" : "none", // ẩn
//           position: 'absolute',
//           backgroundColor: "white",
//           alignItems: 'center',
//           marginBottom: insets.bottom,
//           height: 60,
//           //zIndex: 1000,
//           paddingBottom: 10, // thêm padding để icon không bị đè
//         },
//       } }
//     >
//       <Tabs.Screen
//         name="index"
//         options={ {
//           title: 'Trang chủ',
//           tabBarIcon: ( { focused } ) =>
//             <Image source={ focused ? require( "@/assets/images/home_blue.png" ) : require( "@/assets/images/home_black.png" ) }
//               className={ focused ? "w-10 h-10" : "w-6 h-6" }
//               resizeMode='contain'
//             />,
//         } }
//       />
//       <Tabs.Screen
//         name="qr"
//         options={ {
//           title: 'QR',
//           tabBarIcon: ( { focused } ) =>
//             <Image source={ focused ? require( "@/assets/images/scan_blue.png" ) : require( "@/assets/images/scan_black.png" ) }
//               className={ focused ? "w-10 h-10" : "w-7 h-7" }
//             />,
//         } }
//         listeners={ {
//           tabPress: e =>
//           {
//             e.preventDefault();
//             router.replace( { pathname: '/(tabs)/qr', params: { tabIndex: 0 } } );
//           },
//         } }
//       />
//       <Tabs.Screen
//         name="history"
//         options={ {
//           title: 'Lịch sử',
//           tabBarIcon: ( { focused } ) =>
//             <Image source={ focused ? require( "@/assets/images/history_blue.png" ) : require( "@/assets/images/history.png" ) }
//               className={ focused ? "w-8 h-8" : "w-6 h-6" }
//               resizeMode='contain'
//             />,
//         } }
//         listeners={ {
//           tabPress: e =>
//           {
//             if ( pathname === '/history' )
//             {
//               e.preventDefault();
//               return;
//             }
//           },
//         } }
//       />
//       <Tabs.Screen
//         name="user"
//         options={ {
//           title: 'Tài khoản',
//           tabBarIcon: ( { focused } ) =>
//             <Image source={ focused ? require( "@/assets/images/user_blue.png" ) : require( "@/assets/images/user_black.png" ) }
//               className={ focused ? "w-8 h-8" : "w-7 h-7" } />,
//         } }
//       />
//     </Tabs>
//   );
// }

import useTabPressHandler from '@/hooks/useTabPressHandle';
import { useTabBarStore } from '@/store/useTabbarStore';
import { router, Tabs, usePathname } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout ()
{
  const insets = useSafeAreaInsets();
  const isTabBarVisible = useTabBarStore( state => state.isTabBarVisible );
  const pathname = usePathname();

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={ {
        headerShown: false,
        tabBarStyle: {
          display: isTabBarVisible ? "flex" : "none",
          position: 'absolute',
          backgroundColor: "white",
          alignItems: 'center',
          marginBottom: insets.bottom,
          height: 60,
          paddingBottom: 10,
        },
      } }
    >
      <Tabs.Screen
        name="index"
        options={ {
          title: 'Trang chủ',
          tabBarButton: ( props ) => (


            <TouchableOpacity
              onPress={ props.onPress }
              accessibilityState={ props.accessibilityState }
              style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
            >
              <Image
                source={
                  props.accessibilityState?.selected
                    ? require( '@/assets/images/home_blue.png' )
                    : require( '@/assets/images/home_black.png' )
                }
                style={ { width: props.accessibilityState?.selected ? 40 : 24, height: props.accessibilityState?.selected ? 40 : 24 } }
                resizeMode='contain'
              />
              <Text style={ { fontSize: 10, color: props.accessibilityState?.selected ? '#1c40f2' : 'black' } }>
                Trang chủ
              </Text>
            </TouchableOpacity>
          ),
        } }
      />
      <Tabs.Screen
        name="qr"
        options={ {
          title: 'QR',
          tabBarButton: ( props ) => (
            <TouchableOpacity
              onPress={ () => router.replace( { pathname: '/(tabs)/qr', params: { tabIndex: 0 } } ) }
              style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
            >
              <Image
                source={
                  props.accessibilityState?.selected
                    ? require( '@/assets/images/scan_blue.png' )
                    : require( '@/assets/images/scan_black.png' )
                }
                style={ { width: props.accessibilityState?.selected ? 36 : 28, height: props.accessibilityState?.selected ? 36 : 28 } }
              />
              <Text style={ { fontSize: 10, color: props.accessibilityState?.selected ? '#1c40f2' : 'black' } }>
                QR
              </Text>
            </TouchableOpacity>
          ),
        } }
      />
      <Tabs.Screen
        name="history"
        options={ {
          title: 'Lịch sử',
          tabBarButton: ( props ) => (
            <TouchableOpacity
              accessibilityState={ props.accessibilityState }
              onPress={ ( e ) =>
              {
                if ( pathname === '/history' )
                {
                  e.preventDefault();
                  return;
                }
                props.onPress?.( e );
              } }
              style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
            >
              <Image
                source={
                  props.accessibilityState?.selected
                    ? require( '@/assets/images/history_blue.png' )
                    : require( '@/assets/images/history.png' )
                }
                style={ { width: props.accessibilityState?.selected ? 32 : 24, height: props.accessibilityState?.selected ? 32 : 24 } }
                resizeMode='contain'
              />
              <Text style={ { fontSize: 10, color: props.accessibilityState?.selected ? '#1c40f2' : 'black' } }>
                Lịch sử
              </Text>
            </TouchableOpacity>
          ),
        } }
      />
      <Tabs.Screen
        name="user"
        options={ {
          title: 'Tài khoản',
          tabBarButton: ( props ) => (
            <TouchableOpacity
              onPress={ props.onPress }
              accessibilityState={ props.accessibilityState }
              style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
            >
              <Image
                source={
                  props.accessibilityState?.selected
                    ? require( '@/assets/images/user_blue.png' )
                    : require( '@/assets/images/user_black.png' )
                }
                style={ { width: props.accessibilityState?.selected ? 32 : 28, height: props.accessibilityState?.selected ? 32 : 28 } }
              />
              <Text style={ { fontSize: 10, color: props.accessibilityState?.selected ? '#1c40f2' : 'black' } }>
                Tài khoản
              </Text>
            </TouchableOpacity>
          ),
        } }
      />
    </Tabs>
  );
}
