import { useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { router, usePathname, useRouter } from 'expo-router';

export function useAuth() {
  const { isAuthenticated, isLoading, isInitialized, user } = useAuthStore();
  const pathName = usePathname()


  // Tự động redirect dựa trên trạng thái authentication
  useEffect(() => {
    if (!isInitialized || isLoading) return;

    if (isAuthenticated) {
      // User đã đăng nhập, chuyển đến main app nếu đang ở auth flow
      const currentPath = pathName;
      if (currentPath.startsWith('/(modals)') || currentPath.startsWith('/auth')) {
        router.replace('/(tabs)/home');
      }
    } else {
      // User chưa đăng nhập, chuyển đến auth flow nếu đang ở main app
      const currentPath = pathName;
      if (currentPath.startsWith('/(tabs)')) {
        router.replace('/(auth)/login');
      }
    }
  }, [isAuthenticated, isLoading, isInitialized, router]);

  return {
    isAuthenticated,
    isLoading,
    isInitialized,
    user,
  };
} 