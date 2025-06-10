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
    }
    // else if ( !isLoggedIn && pathname !== '/auth/login' )
    // {
    //   router.replace( '/auth/login' );
    // }
    else if ( !isLoggedIn && pathname !== '/(modals)' )
    {
      router.replace( '/(modals)' );
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


// import { Slot, useRouter, usePathname } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import { AppState, Platform } from 'react-native';
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

//   // Kiểm tra xem có phải màn hình login
//   const isLoginScreen =  pathname.includes( '/' );

//   // Ẩn navigation bar chỉ khi ở màn hình login
//   useEffect( () =>
//   {
//     if ( Platform.OS === 'android' && isLoginScreen )
//     {
//       NavigationBar.setVisibilityAsync( 'hidden' );
//       NavigationBar.setBehaviorAsync( 'overlay-swipe' );
//       console.log( 'Navigation bar hidden for login screen' );
//     } else if ( Platform.OS === 'android' && !isLoginScreen )
//     {
//       // Hiện lại navigation bar cho các màn hình khác
//       NavigationBar.setVisibilityAsync( 'visible' );
//       console.log( 'Navigation bar visible for other screens' );
//     }
//   }, [ isLoginScreen ] );

//   // Ẩn lại navigation bar khi app từ background trở lại (chỉ cho màn hình login)
//   useEffect( () =>
//   {
//     const subscription = AppState.addEventListener( 'change', nextAppState =>
//     {
//       console.log( 'AppState changed:', appState.current );
//       console.log( 'nextAppState:', nextAppState );

//       if (
//         appState.current.match( /inactive|background/ ) &&
//         nextAppState === 'active' &&
//         Platform.OS === 'android' &&
//         isLoginScreen
//       )
//       {
//         NavigationBar.setVisibilityAsync( 'hidden' );
//         NavigationBar.setBehaviorAsync( 'overlay-swipe' );
//         console.log( 'Navigation bar hidden on app resume for login screen' );
//       }

//       appState.current = nextAppState;
//     } );

//     return () => subscription.remove();
//   }, [ isLoginScreen ] );

//   // Chuyển hướng dựa trên trạng thái đăng nhập
//   useEffect( () =>
//   {
//     if ( !isReady ) return;

//     if ( isLoggedIn && pathname !== '/(tabs)' )
//     {
//       router.replace( '/(tabs)/home' );
//     } else if ( !isLoggedIn && pathname !== '/(modals)' )
//     {
//       router.replace( '/(modals)' );
//     }
//   }, [ isReady, isLoggedIn ] );

//   if ( !isReady ) return null;

//   console.log( "-----pathname app:", pathname );

//   return (
//     <PaperProvider>
//       <SafeAreaProvider className='flex-1'>
//         <Slot />
//       </SafeAreaProvider>
//     </PaperProvider>
//   );
// }

//#region hide navigationbar
// import { Slot, useRouter, usePathname } from 'expo-router';
// import { useEffect, useRef, useState } from 'react';
// import * as SplashScreen from 'expo-splash-screen';
// import { AppState, Platform } from 'react-native';
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
//   // ------------------------------------- END ------------------------------------- //

//   // Ẩn navigation bar ngay khi mount
//   useEffect( () =>
//   {
//     if ( Platform.OS === 'android' )
//     {
//       NavigationBar.setVisibilityAsync( 'hidden' );
//       NavigationBar.setBehaviorAsync( 'overlay-swipe' );
//       // NavigationBar.setBackgroundColorAsync( 'black' );
//       // NavigationBar.setButtonStyleAsync( 'light' );
//       console.log( 'Navigation bar hidden' );
//     }
//   }, [] );
//   // ------------------------------------- END ------------------------------------- //

//   // Ẩn lại navigation bar khi app từ background trở lại
//   useEffect( () =>
//   {
//     const subscription = AppState.addEventListener( 'change', nextAppState =>
//     {
//       console.log( 'AppState changed:', appState.current );
//       console.log( 'nextAppState:', nextAppState );
//       if ( appState.current.match( /inactive|background/ ) && nextAppState === 'active' && Platform.OS === 'android' )
//       {
//         NavigationBar.setVisibilityAsync( 'hidden' );
//         NavigationBar.setBehaviorAsync( 'overlay-swipe' );
//         // NavigationBar.setBackgroundColorAsync( 'black' );
//         // NavigationBar.setButtonStyleAsync( 'light' );
//       }
//       appState.current = nextAppState;
//     } );

//     return () => subscription.remove();
//   }, [] );
//   // ------------------------------------- END ------------------------------------- //

//   // Chuyển hướng dựa trên trạng thái đăng nhập
//   useEffect( () =>
//   {
//     if ( !isReady ) return;

//     if ( isLoggedIn && pathname !== '/(tabs)' )
//     {
//       router.replace( '/(tabs)/home' );
//     }
//     // else if ( !isLoggedIn && pathname !== '/auth/login' )
//     // {
//     //   router.replace( '/auth/login' );
//     // }
//     else if ( !isLoggedIn && pathname !== '/(modals)' )
//     {
//       router.replace( '/(modals)' );
//     }
//   }, [ isReady, isLoggedIn ] );
//   // ------------------------------------- END ------------------------------------- //
//   if ( !isReady ) return null

//   console.log( "-----pathname app:", pathname );

//   return (
//     <PaperProvider>
//       <SafeAreaProvider className='flex-1'>
//         <Slot />
//       </SafeAreaProvider>
//     </PaperProvider>
//   );
// }
//#endregion