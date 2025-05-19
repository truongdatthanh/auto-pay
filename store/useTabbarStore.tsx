import { create } from 'zustand';

type TabBarStore = {
  isTabBarVisible: boolean;
  setTabBarVisible: (visible: boolean) => void;
};

export const useTabBarStore = create<TabBarStore>((set) => ({
  isTabBarVisible: true,
  setTabBarVisible: (visible) => set({ isTabBarVisible: visible }),
}));