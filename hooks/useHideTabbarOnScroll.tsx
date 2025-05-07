import { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming } from 'react-native-reanimated';

export function useHideTabBarOnScroll ( threshold = 50 )
{
  const offsetY = useSharedValue( 0 );
  const lastScrollY = useSharedValue( 0 );
  const isScrollingDown = useSharedValue( false );

  const scrollHandler = useAnimatedScrollHandler( {
    onScroll: ( event ) =>
    {
      const currentOffset = event.contentOffset.y;
      isScrollingDown.value = currentOffset > lastScrollY.value;
      lastScrollY.value = currentOffset;

      // Chỉ cập nhật offsetY khi scroll đủ threshold để tránh hiệu ứng nhấp nháy
      if (
        ( isScrollingDown.value && currentOffset > threshold ) ||
        ( !isScrollingDown.value && currentOffset <= 0 )
      )
      {
        offsetY.value = currentOffset;
      }
    },
  } );

  const animatedStyle = useAnimatedStyle( () =>
  {
    return {
      transform: [
        {
          translateY: withTiming(
            isScrollingDown.value && offsetY.value > threshold ? 100 : 0,
            { duration: 300 }
          ),
        },
      ],
    };
  } );

  return { scrollHandler, animatedStyle, isScrollingDown };
}
