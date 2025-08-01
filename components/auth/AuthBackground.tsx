import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface AuthBackgroundProps
{
  children: React.ReactNode;
}

export default function AuthBackground ( { children }: AuthBackgroundProps )
{
  const insets = useSafeAreaInsets();
  return (
    <View style={ { flex: 1 } }>
      <LinearGradient
        colors={ [ '#041838', '#203a43', '#525252' ] }
        style={ {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        } }
        start={ { x: 0, y: 0 } }
        end={ { x: 1, y: 1 } }
      />
      <View style={ { flex: 1 } }>
        { children }
      </View>
    </View>
  );
} 