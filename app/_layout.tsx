import { Slot, useRouter, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';


SplashScreen.preventAutoHideAsync();

export default function RootLayout ()
{
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
    <GestureHandlerRootView style={ { flex: 1 } }>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Slot />
    </GestureHandlerRootView>
  );
}
