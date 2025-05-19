import { View, SafeAreaView, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router, Tabs, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTabBarStore } from '@/store/useTabbarStore';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeLayout ()
{
  const pathname = usePathname();
  const isTabbarVisibleZustand = useTabBarStore( ( state ) => state.isTabBarVisible );
  const setIsTabBarVisibleZustand = useTabBarStore( ( state ) => state.setTabBarVisible );
  const translateY = useRef( new Animated.Value( 0 ) ).current;

  useEffect( () =>
  {
    Animated.timing( translateY, {
      toValue: isTabbarVisibleZustand ? 0 : 100,
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
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: '#ccc',
          tabBarStyle: {
            position: 'absolute',
            bottom: 10,
            left: 20,
            right: 20,
            height: 60,
            borderRadius: 50,
            marginHorizontal: 20,
            elevation: 10,
            transform: [ { translateY } ],
          },
          tabBarBackground: () => (
            <LinearGradient
              colors={ [ '#3b82f6', '#6366f1' ] } // blue to indigo
              start={ { x: 0, y: 0 } }
              end={ { x: 1, y: 1 } }
              style={ {
                flex: 1,
                borderRadius: 50,
              } }
            />
          ),
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          },
          tabBarLabelStyle: {
            display: 'none',
          },
        } }
      >
        <Tabs.Screen
          name="index"
          options={ {
            title: 'Home',
            tabBarIcon: ( { color, focused } ) => (
              <View
                style={
                  focused && {
                    shadowColor: 'white',               // Đảm bảo có màu shadow
                    shadowOffset: { width: 0, height: 6 }, // Đẩy bóng xa hơn xuống dưới
                    shadowOpacity: 0.8,               // Đậm hơn (từ 0 → 1)
                    shadowRadius: 10,                 // Mượt hơn, tán rộng hơn
                    elevation: 10,                    // Android: cao hơn = bóng đậm hơn
                  }
                }
                className={ `${ focused ? 'h-14 w-14 bg-black items-center justify-center absolute bottom-2 rounded-full p-2' : 'flex-1' }` }>
                <MaterialCommunityIcons name="home" size={ focused ? 34 : 28 } color={ color } />
              </View>
            ),
            headerShown: false,
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
              <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
                <MaterialCommunityIcons name="qrcode-scan" size={ 24 } color={ color } />
              </View>
            ),
          } }
          listeners={ {
            tabPress: ( e ) =>
            {
              e.preventDefault();
              router.replace( { pathname: "/(tabs)/qr", params: { tabIndex: 0 } } );
            },
          } }
        />
        <Tabs.Screen
          name="history"
          options={ {
            title: 'History',
            tabBarIcon: ( { color, focused } ) => (
              <View
                className={ `${ focused ? 'h-14 w-14 bg-black items-center justify-center absolute bottom-2 rounded-full p-2' : 'flex-1' }` }
                style={
                  focused && {
                    shadowColor: 'white',
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.8,
                    shadowRadius: 10,
                    elevation: 15,
                  }
                }
              >
                <MaterialCommunityIcons name="history" size={ focused ? 34 : 28 } color={ color } />
              </View>
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
              <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }>
                <FontAwesome name="user-o" size={ 24 } color={ color } />
              </View>
            ),
            headerShown: false,
            tabBarStyle: { display: 'none' },
          } }
        />
      </Tabs>
    </SafeAreaView>
  );
}