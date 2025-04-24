import { Redirect, Slot, usePathname, useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function RootLayout ()
{
  const router = useRouter();
  const pathname = usePathname();
  console.log( "layout tong: ", pathname );
  const isLoggedIn = false;

  useEffect( () =>
  {
    const prepare = async () =>
    {
      // Ví dụ: chờ 2 giây hoặc load dữ liệu trước
      await new Promise( resolve => setTimeout( resolve, 2000 ) );
      await SplashScreen.hideAsync(); // Ẩn splash khi sẵn sàng
    };
    prepare();
  }, [] );

  useEffect( () =>
  {
    if ( isLoggedIn )
    {
      router.replace( '/(tabs)' );
    }
    else
    {
      router.replace( '/(auth)/login' );
    }
  }, [ isLoggedIn ] );

  return (
    <GestureHandlerRootView style={ { flex: 1 } }>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" translucent={ false } />
      <Slot />
    </GestureHandlerRootView>


  );
}
