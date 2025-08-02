import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Tabs } from 'expo-router';
import { View, StatusBar } from 'react-native';
import { useFabStore } from '@/store/useFABStore';
import { useTabBarStore } from '@/store/useTabbarStore';
import useAndroidBackHandler from '@/hooks/useAndroidBackHanler';
import FloatingActionButton from '@/components/fab/FloatingActionButton';
import TabIcon from '@/components/tab/TabIcon';

export default function TabsLayout ()
{
  const isTabBarVisible = useTabBarStore( state => state.isTabBarVisible );
  const isVisibleFab = useFabStore( ( state ) => state.visible );
  const isOpenFab = useFabStore( state => state.isOpen );
  useAndroidBackHandler();


  return (
    <SafeAreaView className="flex-1 bg-[#041838]">
      <StatusBar barStyle={ "light-content" } translucent backgroundColor={ "transparent" } />
      <>
        <Tabs
          initialRouteName="home/index"
          // tabBar={ props => <TabbarBottom { ...props } /> }
          screenOptions={ {
            animation: "none",
            headerShown: false,
            tabBarActiveTintColor: '#1c40f2',
            tabBarInactiveTintColor: '#FFD700',

            // ###
            tabBarLabelStyle: {
              display: "none",
              fontSize: 10,
              width: 100,
            },

            //###
            tabBarItemStyle: {
              paddingHorizontal: 12,
              paddingTop: 10,
              //backgroundColor: "red",
              paddingVertical: 6,
              marginHorizontal: 6,
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: 70,
            },

            //CSS cho thanh Tabbar
            //###
            tabBarStyle: {
              display: isTabBarVisible ? "flex" : "none",
              position: 'absolute',
              // backgroundColor: "blue",
              alignItems: 'center',
              justifyContent: "center",
              height: 60,
              paddingBottom: 10,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#FFD700",
            },
          } }
        >
          <Tabs.Screen
            name="home/index"
            options={ {
              title: 'Trang chủ',
              tabBarIcon: ( { focused } ) =>
                <TabIcon
                  focused={ focused }
                  activeIcon={ require( '@/assets/images/home_navy.png' ) }
                  inactiveIcon={ require( '@/assets/images/home-white.png' ) }
                  size={ 28 }
                />,
            } }
          />
          <Tabs.Screen
            name="history/index"
            options={ {
              title: 'Lịch sử',
              tabBarIcon: ( { focused } ) =>
                <TabIcon
                  focused={ focused }
                  activeIcon={ require( '@/assets/images/list_navy.png' ) }
                  inactiveIcon={ require( '@/assets/images/list_black.png' ) }
                  size={ 28 }
                />,
            } }
            listeners={ {
              tabPress: ( e ) =>
              {
                e.preventDefault();
                router.replace( "/(tabs)/history" );
              },
            } }
          />
        </Tabs>

        {/* Khi FAB mở, hiện blur và nền mờ */ }
        { isOpenFab && (
          <>
            <BlurView
              intensity={ 70 }
              tint="dark"
              style={ {
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                zIndex: 1000,
              } }
            />
            <View
              style={ {
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.4)',
                zIndex: 1001,
              } }
            />
          </>
        ) }

        {/* Nút FAB luôn nằm trên cùng (zIndex cao nhất) */ }
        { isVisibleFab && (
          <FloatingActionButton />
        ) }

      </>
    </SafeAreaView>
  );
}
