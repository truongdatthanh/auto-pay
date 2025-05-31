import { Slot, useRouter, usePathname } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AppState, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
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

  // Chuẩn bị
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
  // ------------------------------------- END ------------------------------------- //

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
    } else if ( !isLoggedIn && pathname !== '/auth/login' )
    {
      router.replace( '/auth/login' );
    }
  }, [ isReady, isLoggedIn ] );
  // ------------------------------------- END ------------------------------------- //
  if ( !isReady ) return null

  console.log( "-----pathname app:", pathname );

  return (
    <PaperProvider>
      <SafeAreaProvider className='flex-1'>
        <Slot />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

// import { Stack, useRouter, usePathname } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import { AppState, Platform, View } from 'react-native';
// import * as NavigationBar from 'expo-navigation-bar';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import { PaperProvider } from 'react-native-paper';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout ()
// {
//   const appState = useRef( AppState.currentState );
//   const router = useRouter();
//   const pathname = usePathname();
//   const [ isReady, setIsReady ] = useState( false );
//   const [ isNavigating, setIsNavigating ] = useState( false );
//   const isLoggedIn = false; // sau này thay bằng kiểm tra AsyncStorage

//   // Chuẩn bị
//   useEffect( () =>
//   {
//     const prepare = async () =>
//     {
//       await new Promise( resolve => setTimeout( resolve, 2000 ) ); // mô phỏng loading
//       await SplashScreen.hideAsync();
//       setIsReady( true ); // chỉ sau khi splash ẩn, layout mới sẵn sàng
//     };

//     prepare();
//   }, [] );

//   // Gọi đổi màu ngay khi mount
//   useEffect( () =>
//   {
//     if ( Platform.OS === 'android' )
//     {
//       NavigationBar.setBackgroundColorAsync( 'black' );
//       NavigationBar.setButtonStyleAsync( 'light' );
//       console.log( 'mounted' );
//     }
//   }, [] );

//   // Gọi đổi màu khi app từ background trở lại
//   useEffect( () =>
//   {
//     const subscription = AppState.addEventListener( 'change', nextAppState =>
//     {
//       console.log( 'AppState changed:', appState.current );
//       console.log( 'nextAppState:', nextAppState );
//       if ( appState.current.match( /inactive|background/ ) && nextAppState === 'active' && Platform.OS === 'android' )
//       {
//         NavigationBar.setBackgroundColorAsync( 'black' );
//         NavigationBar.setButtonStyleAsync( 'light' );
//       }
//       appState.current = nextAppState;
//     } );

//     return () => subscription.remove();
//   }, [] );

//   // Chuyển hướng một lần duy nhất khi app ready
//   useEffect( () =>
//   {
//     if ( !isReady ) return;

//     // Chỉ redirect một lần khi app khởi động
//     if ( isLoggedIn )
//     {
//       router.replace( '/(tabs)/home' );
//     } else
//     {
//       router.replace( '/auth/login' );
//     }
//   }, [ isReady ] ); // Chỉ phụ thuộc vào isReady

//   // Loading state với background đen để tránh flash
//   if ( !isReady )
//   {
//     return (
//       <View style={ { flex: 1, backgroundColor: '#000' } } />
//     );
//   }

//   console.log( "-----pathname app:", pathname );

//   return (
//     <PaperProvider>
//       <SafeAreaProvider style={ { flex: 1, backgroundColor: '#000' } }>
//         <Stack
//           screenOptions={ {
//             headerShown: false,
//             animation: 'fade', // Smooth transition
//             animationDuration: 150, // Nhanh nhưng mượt
//             contentStyle: { backgroundColor: '#000' }, // Consistent background
//             gestureEnabled: true,
//             animationTypeForReplace: 'push', // Smooth replace animation
//           } }
//         >
//           {/* Tự động detect tất cả screens */ }
//         </Stack>
//       </SafeAreaProvider>
//     </PaperProvider>
//   );
// }