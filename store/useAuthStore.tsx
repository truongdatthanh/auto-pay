import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

interface User {
  id?: number;
  email: string;
  fullName?: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isInitialized: false,

  login: async (user: User) => {
    try {
      // Lưu user vào SecureStore để bảo mật
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Login error:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('user');
      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch (error) {
      console.error('Logout error:', error);
      set({ isLoading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      
      // Kiểm tra user từ SecureStore
      const userData = await SecureStore.getItemAsync('user');
      
      if (userData) {
        const user = JSON.parse(userData);
        set({ 
          user, 
          isAuthenticated: true, 
          isLoading: false, 
          isInitialized: true 
        });
      } else {
        set({ 
          user: null, 
          isAuthenticated: false, 
          isLoading: false, 
          isInitialized: true 
        });
      }
    } catch (error) {
      console.error('Check auth error:', error);
      set({ 
        user: null, 
        isAuthenticated: false, 
        isLoading: false, 
        isInitialized: true 
      });
    }
  },

  clearAuth: () => {
    set({ 
      user: null, 
      isAuthenticated: false, 
      isLoading: false, 
      isInitialized: true 
    });
  },
})); 