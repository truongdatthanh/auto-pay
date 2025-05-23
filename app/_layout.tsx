import { Slot, useRouter, usePathname } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppState, Platform, Text } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';


SplashScreen.preventAutoHideAsync();

export default function RootLayout ()
{
  const appState = useRef( AppState.currentState );
  const router = useRouter();
  const pathname = usePathname();
  const [ isReady, setIsReady ] = useState( false );
  const isLoggedIn = false; // sau này thay bằng kiểm tra AsyncStorage

  useEffect( () =>
  {
    const prepare = async () =>
    {
      await new Promise( resolve => setTimeout( resolve, 2000 ) ); // mô phỏng loading
      await SplashScreen.hideAsync();
      setIsReady( true ); // chỉ sau khi splash ẩn, layout mới sẵn sàng
    };

    prepare();
  }, [] );

  // Gọi đổi màu ngay khi mount
  useEffect( () =>
  {
    if ( Platform.OS === 'android' )
    {
      NavigationBar.setBackgroundColorAsync( 'black' );
      NavigationBar.setButtonStyleAsync( 'light' );
      console.log( 'mounted' );
    }
  }, [] );

  // Gọi đổi màu khi app từ background trở lại
  useEffect( () =>
  {
    const subscription = AppState.addEventListener( 'change', nextAppState =>
    {
      if (
        appState.current.match( /inactive|background/ ) &&
        nextAppState === 'active' &&
        Platform.OS === 'android'
      )
      {
        NavigationBar.setBackgroundColorAsync( 'black' );
        NavigationBar.setButtonStyleAsync( 'light' );
      }
      appState.current = nextAppState;
    } );

    return () => subscription.remove();
  }, [] );

  useEffect( () =>
  {
    if ( !isReady ) return;

    if ( isLoggedIn && pathname !== '/(tabs)' )
    {
      router.replace( '/(tabs)' );
    } else if ( !isLoggedIn && pathname !== '/(auth)/login' )
    {
      router.replace( '/(auth)/login' );
    }
  }, [ isReady, isLoggedIn ] );

  if ( !isReady )
  {
    // Tránh render Slot hoặc navigate khi chưa sẵn sàng
    return null;
  }

  console.log( "pathname", pathname );

  return (
    // <GestureHandlerRootView className="flex-1">
    <PaperProvider>
      <SafeAreaProvider className='flex-1'>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
    // </GestureHandlerRootView>
  );
}

