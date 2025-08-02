import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { StatusBar } from 'react-native';

export default function useStatusBar() {
  useFocusEffect(
    useCallback(() => {
      // Cấu hình StatusBar cho màn hình auth
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('light-content');
      StatusBar.setTranslucent(true);
      
      return () => {
        // Cleanup khi màn hình mất focus
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setBarStyle('light-content');
        StatusBar.setTranslucent(true);
      };
    }, [])
  );
} 