import React from 'react';
import { Image, View, ImageSourcePropType } from 'react-native';

interface TabIconProps {
  focused: boolean;
  activeIcon: ImageSourcePropType;
  inactiveIcon: ImageSourcePropType;
  size?: number;
}

export default function TabIcon({
  focused,
  activeIcon,
  inactiveIcon,
  size = 32,
}: TabIconProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={focused ? activeIcon : inactiveIcon}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
      {focused && (
        <View
          style={{
            position: 'absolute',
            bottom: -8,
            width: 6,
            height: 6,
            borderRadius: 4,
            backgroundColor: '#041838',
          }}
        />
      )}
    </View>
  );
}
