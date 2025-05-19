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