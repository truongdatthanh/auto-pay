import { BlurView } from 'expo-blur';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import { useFabStore } from '@/store/useFABStore';
import { useTabBarStore } from '@/store/useTabbarStore';
import FABMenu from '@/components/tabbar/FABMenu'; // giả sử bạn để FABMenu ở đây
import useAndroidBackHandler from '@/hooks/useAndroidBackHanler';

export default function TabsLayout ()
{
  const isTabBarVisible = useTabBarStore( state => state.isTabBarVisible );
  const isVisibleFab = useFabStore( ( state ) => state.visible );
  const isOpenFab = useFabStore( state => state.isOpen );
  useAndroidBackHandler();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Tabs
        initialRouteName="home/index"
        screenOptions={ {
          headerShown: false,
          tabBarActiveTintColor: '#1c40f2',
          tabBarInactiveTintColor: 'black',


          tabBarLabelStyle: {
            fontSize: 10,
            width: 100,
          },

          tabBarItemStyle: {
            paddingHorizontal: 12,
            paddingVertical: 6,
            marginHorizontal: 6,
            justifyContent: 'center',
            alignItems: 'center',
            //flexDirection: 'row', // để icon và label nằm ngang nếu cần
            minWidth: 70, // tăng kích thước tối thiểu để bao phủ icon + label
          },

          //CSS cho thanh Tabbar
          tabBarStyle: {
            display: isTabBarVisible ? "flex" : "none", // ẩn
            position: 'absolute',
            backgroundColor: "white",
            alignItems: 'center',
            // marginBottom: insets.bottom,
            height: 60,
            //zIndex: 1000,
            paddingBottom: 10, // thêm padding để icon không bị đè
          },
        } }
      >
        <Tabs.Screen
          name="home/index"
          options={ {
            title: 'Trang chủ',
            tabBarIcon: ( { focused } ) =>
              <Image source={ focused ? require( "@/assets/images/home_blue.png" ) : require( "@/assets/images/home_black.png" ) }
                className={ focused ? "w-10 h-10" : "w-6 h-6" }
                resizeMode='contain'
              />
          } }
        />
        <Tabs.Screen
          name="qr"
          options={ {
            title: 'QR',
            tabBarIcon: ( { focused } ) =>
              <Image source={ focused ? require( "@/assets/images/scan_blue.png" ) : require( "@/assets/images/scan_black.png" ) }
                className={ focused ? "w-10 h-10" : "w-7 h-7" }
                resizeMode='contain'
              />
          } }
          listeners={ {
            tabPress: e =>
            {
              e.preventDefault();
              router.replace( { pathname: '/(tabs)/qr', params: { tabIndex: 0 } } );
            },
          } }
        />
        <Tabs.Screen
          name="history"
          options={ {
            title: 'Lịch sử',
            tabBarIcon: ( { focused } ) =>
              <Image source={ focused ? require( "@/assets/images/history_blue.png" ) : require( "@/assets/images/history.png" ) }
                className={ focused ? "w-8 h-8" : "w-6 h-6" }
                resizeMode='contain'
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
        <Tabs.Screen
          name="user"
          options={ {
            title: 'Tài khoản',
            tabBarIcon: ( { focused } ) =>
              <Image source={ focused ? require( "@/assets/images/user_blue.png" ) : require( "@/assets/images/user_black.png" ) }
                className={ focused ? "w-8 h-8" : "w-7 h-7" }
                resizeMode='contain'
              />
          } }
        />
      </Tabs>

      {/* Khi FAB mở, hiện blur và nền mờ */ }
      { isOpenFab && (
        <>
          <BlurView
            intensity={ 90 }
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
        <SafeAreaView
          style={ {
            position: 'absolute',
            right: 20,
            bottom: 80,
            zIndex: 1100,
          } }
        >
          <FABMenu />
        </SafeAreaView>
      ) }
    </SafeAreaView>
  );
}
