import { useEffect, useRef } from 'react';
import { AppState, Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

type NavigationBarMode = 'hidden-overlay' | 'hidden-inset' | 'visible' | 'custom';

interface NavigationBarOptions {
  mode?: NavigationBarMode;
  backgroundColor?: string;
  buttonStyle?: 'light' | 'dark';
  restoreOnBlur?: boolean; // Có restore lại khi screen blur không
}

const defaultOptions: NavigationBarOptions = {
  mode: 'hidden-overlay',
  restoreOnBlur: true,
};

export const useNavigationBar = (options: NavigationBarOptions = defaultOptions) => {
  const appState = useRef(AppState.currentState);
  const previousConfig = useRef<any>(null);
  const { mode, backgroundColor, buttonStyle, restoreOnBlur } = { ...defaultOptions, ...options };

  // Áp dụng config navigation bar
  const applyConfig = useCallback(async () => {
    if (Platform.OS !== 'android') return;

    try {
      switch (mode) {
        case 'hidden-overlay':
          await NavigationBar.setVisibilityAsync('hidden');
          await NavigationBar.setBehaviorAsync('overlay-swipe');
          break;
        case 'hidden-inset':
          await NavigationBar.setVisibilityAsync('hidden');
          await NavigationBar.setBehaviorAsync('inset-touch');
          break;
        case 'visible':
          await NavigationBar.setVisibilityAsync('visible');
          await NavigationBar.setBehaviorAsync('inset-touch');
          break;
      }

      if (backgroundColor) {
        await NavigationBar.setBackgroundColorAsync(backgroundColor);
      }

      if (buttonStyle) {
        await NavigationBar.setButtonStyleAsync(buttonStyle);
      }

      console.log(`Navigation bar applied: ${mode} mode for current screen`);
    } catch (error) {
      console.error('Error applying navigation bar config:', error);
    }
  }, [mode, backgroundColor, buttonStyle]);

  // Lưu config hiện tại và restore nếu cần
  const saveCurrentConfig = useCallback(async () => {
    if (Platform.OS !== 'android' || !restoreOnBlur) return;

    try {
      // Lưu config hiện tại (giả lập - expo không có API get current config)
      previousConfig.current = {
        visibility: 'visible',
        behavior: 'inset-touch',
      };
    } catch (error) {
      console.error('Error saving navigation bar config:', error);
    }
  }, [restoreOnBlur]);

  const restoreConfig = useCallback(async () => {
    if (Platform.OS !== 'android' || !restoreOnBlur || !previousConfig.current) return;

    try {
      await NavigationBar.setVisibilityAsync('visible');
      await NavigationBar.setBehaviorAsync('inset-touch');
      console.log('Navigation bar restored to previous config');
    } catch (error) {
      console.error('Error restoring navigation bar config:', error);
    }
  }, [restoreOnBlur]);

  // Sử dụng useFocusEffect để chỉ áp dụng khi screen được focus
  useFocusEffect(
    useCallback(() => {
      // Khi screen focus
      saveCurrentConfig();
      applyConfig();

      // Cleanup khi screen blur
      return () => {
        if (restoreOnBlur) {
          restoreConfig();
        }
      };
    }, [applyConfig, saveCurrentConfig, restoreConfig])
  );

  // Xử lý khi app resume từ background (chỉ khi screen đang focus)
  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) && 
        nextAppState === 'active' && 
        Platform.OS === 'android'
      ) {
        // Chỉ áp dụng lại nếu screen này đang được focus
        applyConfig();
        console.log('Navigation bar reapplied on app resume for focused screen');
      }
      
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [applyConfig]);

  // Return manual controls
  return {
    refresh: applyConfig,
    hide: useCallback(async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('hidden');
        await NavigationBar.setBehaviorAsync('inset-touch');
      }
    }, []),
    show: useCallback(async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('visible');
        await NavigationBar.setBehaviorAsync('inset-touch');
      }
    }, []),
    setOverlay: useCallback(async () => {
      if (Platform.OS === 'android') {
        await NavigationBar.setVisibilityAsync('hidden');
        await NavigationBar.setBehaviorAsync('overlay-swipe');
      }
    }, []),
  };
};