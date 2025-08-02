import React from 'react';
import { View, StatusBar } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthBackground from './AuthBackground';

interface AuthScreenWrapperProps
{
  children: React.ReactNode;
  edges?: ( 'top' | 'right' | 'bottom' | 'left' )[];
}

export default function AuthScreenWrapper ( {
  children,
  edges = [ 'right', 'bottom', 'left' ]
}: AuthScreenWrapperProps )
{
  return (
    <>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <SafeAreaView style={ { flex: 1 } } edges={ edges }>
        <AuthBackground>
            { children }
        </AuthBackground>
      </SafeAreaView>
    </>
  );
} 