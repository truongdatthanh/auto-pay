// import { useRef, useCallback } from 'react';
// import { NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';

// let setIsTabBarVisibleGlobal: ( ( visible: boolean ) => void ) | null = null;

// export const registerSetTabBarVisible = ( fn: ( visible: boolean ) => void ) =>
// {
//   setIsTabBarVisibleGlobal = fn;
//   console.log( 'registerSetTabBarVisible called' );
// };

// export default function useHideTabBarOnScroll ()
// {
//   const lastOffsetY = useRef( 0 );
//   const isHidden = useRef( false );
//   const hasPassedThreshold = useRef( false );

//   // Lấy chiều cao màn hình
//   const screenHeight = Dimensions.get( 'window' ).height;
//   // Tính ngưỡng 25% chiều cao màn hình
//   const threshold = screenHeight * 0.25;

//   const handleScroll = useCallback( ( event: NativeSyntheticEvent<NativeScrollEvent> ) =>
//   {
//     const currentOffsetY = event.nativeEvent.contentOffset.y;
//     const diff = currentOffsetY - lastOffsetY.current;

//     if(Math.abs( diff ) < 10) return;

//     // Cuộn xuống vượt 25% chiều cao màn hình và tab bar đang hiển thị thì ẩn
//     if ( !isHidden.current && currentOffsetY > threshold )
//     {
//       setIsTabBarVisibleGlobal?.( false );
//       isHidden.current = true;
//       hasPassedThreshold.current = true;
//     }

//     // Nếu đã vượt ngưỡng 25%, tab bar đang ẩn và có bất kỳ cuộn lên nào (diff < 0) thì hiện tab bar
//     if ( hasPassedThreshold.current && isHidden.current && diff < 0 )
//     {
//       setIsTabBarVisibleGlobal?.( true );
//       isHidden.current = false;
//       hasPassedThreshold.current = false;
//     }

//     lastOffsetY.current = currentOffsetY;
//   }, [ threshold ] );

//   return { handleScroll };
// }

import { useTabBarStore } from '@/store/useTabbarStore';
import { useRef, useCallback } from 'react';
import { NativeSyntheticEvent, NativeScrollEvent, Dimensions } from 'react-native';


export default function useHideTabBarOnScroll ()
{
  const lastOffsetY = useRef( 0 );
  const isHidden = useRef( false );
  const screenHeight = Dimensions.get( 'window' ).height;
  const { setTabBarVisible } = useTabBarStore.getState();

  const handleScroll = useCallback( ( event: NativeSyntheticEvent<NativeScrollEvent> ) =>
  {
    const currentOffsetY = event.nativeEvent.contentOffset.y;
    const diff = currentOffsetY - lastOffsetY.current;

    // Nếu che hơn 25% màn hình thì ẩn
    if ( !isHidden.current && currentOffsetY > screenHeight * 0.25 )
    {
      setTabBarVisible( false );
      isHidden.current = true;
    }

    // Chỉ cần cuộn lên là hiện
    if ( isHidden.current && diff < 0 )
    {
      setTabBarVisible( true );
      isHidden.current = false;
    }

    lastOffsetY.current = currentOffsetY;
  }, [] );

  return { handleScroll };
}