import { router, Slot, usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAppReady } from '@/hooks/useAppReady';
import { useBiometricStore } from '@/store/useBiometricStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout ()
{
  const appState = useRef( AppState.currentState );
  const pathname = usePathname();
  const isReady = useAppReady();
  const isLoggedIn = false; // sau này thay bằng kiểm tra AsyncStorage
  useEffect( () =>
  {
    useBiometricStore.getState().loadBiometricSetting();
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
  // ------------------------------------- END ------------------------------------- //

  // Gọi đổi màu khi app từ background trở lại
  useEffect( () =>
  {
    const subscription = AppState.addEventListener( 'change', nextAppState =>
    {
      console.log( 'AppState changed:', appState.current );
      console.log( 'nextAppState:', nextAppState );
      if ( appState.current.match( /inactive|background/ ) && nextAppState === 'active' && Platform.OS === 'android' )
      {
        NavigationBar.setBackgroundColorAsync( 'black' );
        NavigationBar.setButtonStyleAsync( 'light' );
      }
      appState.current = nextAppState;
    } );
    return () => subscription.remove();
  }, [] );
  // ------------------------------------- END ------------------------------------- //

  // Chuyển hướng dựa trên trạng thái đăng nhập
  useEffect( () =>
  {
    if ( !isReady ) return;

    if ( isLoggedIn && pathname !== '/(tabs)' )
    {
      router.replace( '/(tabs)/home' );
    } else if ( !isLoggedIn && pathname !== '/(auth)/login' )
    {
      router.replace( '/(auth)/login' );
    }
  }, [ isReady, isLoggedIn ] );
  // ------------------------------------- END ------------------------------------- //

  useEffect( () =>
  {
    console.log( 'Pathname changed:', pathname );
  }, [ pathname ] );

  if ( !isReady ) return null;

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <SafeAreaProvider>
        <PaperProvider>
          <Slot />
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}



// // app/index.tsx
// import { Redirect } from 'expo-router';

// export default function Index ()
// {
//   // Ví dụ: luôn điều hướng về /login
//   return <Redirect href="/(auth)/login" />;
// }


