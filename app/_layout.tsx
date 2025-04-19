import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout ()
{
  const router = useRouter();
  const isLoggedIn = false; 

  useEffect(() => {
    const prepare = async () => {
      // Ví dụ: chờ 2 giây hoặc load dữ liệu trước
      await new Promise(resolve => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync(); // Ẩn splash khi sẵn sàng
    };
    prepare();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/auth/login');
    }
  }, []);

  return <Slot initialRouteName='tabs'/>;
}