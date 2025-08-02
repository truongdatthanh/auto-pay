export const AUTH_NAVIGATION_CONFIG = {
  animation: 'slide_from_right' as const,
  animationDuration: 200,
  gestureEnabled: true,
  gestureDirection: 'horizontal' as const,
  headerShown: false,
  freezeOnBlur: true,
};

export const SCREEN_TRANSITION_CONFIG = {
  cardStyleInterpolator: ({ current, layouts }: any) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
}; 