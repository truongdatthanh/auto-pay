import { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler } from 'react-native-reanimated';

export function useHideTabBarOnScroll() {
  const offsetY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const currentOffset = event.contentOffset.y;
      offsetY.value = currentOffset;
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: offsetY.value > 50 ? 100 : 0, // Ẩn nếu cuộn > 50
        },
      ],
    };
  });

  return { scrollHandler, animatedStyle };
}
