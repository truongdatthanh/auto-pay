import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useAuthStore } from '@/store/useAuthStore';

export function useAppReady() {
    const [isReady, setIsReady] = useState(false);
    const { checkAuth, isInitialized } = useAuthStore();

    useEffect(() => {
        const prepare = async () => {
            try {
                // Kiểm tra authentication trước
                await checkAuth();
                
                // Thêm delay nhỏ để đảm bảo UI đã sẵn sàng
                await new Promise(resolve => setTimeout(resolve, 500));
                
                // Ẩn splash screen
                await SplashScreen.hideAsync();
                
                setIsReady(true);
            } catch (error) {
                console.error('App preparation error:', error);
                // Vẫn set ready để app không bị treo
                setIsReady(true);
            }
        };

        prepare();
    }, [checkAuth]);

    return isReady && isInitialized;
}