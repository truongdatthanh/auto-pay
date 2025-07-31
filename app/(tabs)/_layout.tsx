import { BlurView } from 'expo-blur';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, Tabs } from 'expo-router';
import { Image, View, Animated, StyleSheet, StatusBar } from 'react-native';
import { useFabStore } from '@/store/useFABStore';
import { useTabBarStore } from '@/store/useTabbarStore';
import useAndroidBackHandler from '@/hooks/useAndroidBackHanler';
import FABMenu from '@/components/action/FABMenu';
import { useEffect, useRef } from 'react';

export default function TabsLayout ()
{
  const isTabBarVisible = useTabBarStore( state => state.isTabBarVisible );
  const isVisibleFab = useFabStore( ( state ) => state.visible );
  const isOpenFab = useFabStore( state => state.isOpen );
  useAndroidBackHandler();
  const tabBarHeight = isTabBarVisible ? 80 : 0;

  // Animation cho hiệu ứng quét
  const scanLineAnim = useRef( new Animated.Value( 0 ) ).current;

  useEffect( () =>
  {
    const createScanAnimation = () =>
      Animated.sequence( [
        Animated.timing( scanLineAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: false,
        } ),
        Animated.timing( scanLineAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        } ),
      ] );

    const animation = Animated.loop( createScanAnimation() );
    animation.start();

    return () => animation.stop();
  }, [ scanLineAnim ] );

  return (
    <SafeAreaView className="flex-1 bg-[#041838]">
      <StatusBar barStyle={"light-content"} translucent backgroundColor={"transparent"} />
      <>
        <Tabs
          initialRouteName="home/index"
          screenOptions={ {
            animation: "none",
            headerShown: false,
            tabBarActiveTintColor: '#1c40f2',
            tabBarInactiveTintColor: 'black',


            tabBarLabelStyle: {
              display: "none",
              fontSize: 10,
              width: 100,
            },

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
            tabBarStyle: {
              display: isTabBarVisible ? "flex" : "none",
              position: 'absolute',
              // backgroundColor: "blue",
              alignItems: 'center',
              justifyContent: "center",
              height: 60,
              paddingBottom: 10,
            },
          } }
        >
          {/* <Tabs
          initialRouteName="home/index"
          screenOptions={ {
            animation: "none",
            headerShown: false,
            tabBarActiveTintColor: '#1c40f2',
            tabBarInactiveTintColor: 'black',

            tabBarLabelStyle: {
              display: "none",
            },

            tabBarItemStyle: {
              paddingVertical: 6,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1, // Thêm này để các item căng đều
              // Bỏ minWidth và marginHorizontal
            },

            tabBarStyle: {
              display: isTabBarVisible ? "flex" : "none",
              position: 'absolute',
              backgroundColor: "white",
              alignItems: 'center',
              justifyContent: "center",
              height: 60,
              paddingBottom: 10,
            },
          } }
        > */}
          <Tabs.Screen
            name="home/index"
            options={ {
              title: 'Trang chủ',
              tabBarIcon: ( { focused } ) =>
                <Image source={ focused ? require( "@/assets/images/home-black.png" ) : require( "@/assets/images/home-white.png" ) }
                  className="w-8 h-8"
                  resizeMode='contain'
                />
            } }
          />
          {/* <Tabs.Screen
            name="qr"
            options={ {
              title: 'QR',
              tabBarIcon: () => (
                <View
                  style={ {
                    width: 56,
                    height: 56,
                    borderRadius: 28,
                    backgroundColor: "#1c40f2",
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    overflow: 'hidden', // Quan trọng để ẩn đường quét khi ra ngoài
                  } }
                >
                  <Image
                    source={ require( "@/assets/images/scan_blue.png" ) }
                    style={ {
                      width: 32,
                      height: 32,
                      tintColor: 'white'
                    } }
                    resizeMode='contain'
                  />

              
                  <Animated.View
                    style={ {
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: 2,
                      backgroundColor: '#00ff88', // Màu xanh lá sáng
                      top: scanLineAnim.interpolate( {
                        inputRange: [ 0, 1 ],
                        outputRange: [ 0, 54 ], // Từ top (0) đến bottom (54)
                      } ),
                      shadowColor: '#00ff88',
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.8,
                      shadowRadius: 4,
                      elevation: 5,
                    } }
                  />
                </View>
              ),
              tabBarLabelStyle: {
                // fontSize: 10,
                // fontWeight: '600',
                // marginTop: -15,
                display: "none"
              }
            } }
            listeners={ {
              tabPress: e =>
              {
                e.preventDefault();
                router.replace( { pathname: '/(tabs)/qr', params: { tabIndex: 0 } } );
              },
            } }
          /> */}
          <Tabs.Screen
            name="history/index"
            options={ {
              title: 'Lịch sử',
              tabBarIcon: ( { focused } ) =>
                <Image source={ focused ? require( "@/assets/images/history-black.png" ) : require( "@/assets/images/history-white.png" ) }
                  className="w-7 h-7"
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
          <SafeAreaView
            style={ {
              position: 'absolute',
              right: 20,
              bottom: tabBarHeight,
              zIndex: 1100,
            } }
          >
            <FABMenu />
          </SafeAreaView>
        ) }

      </>
    </SafeAreaView>
  );
}
