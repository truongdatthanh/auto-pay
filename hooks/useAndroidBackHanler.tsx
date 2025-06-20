import { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

export default function useAndroidBackHandler ()
{
    const router = useRouter();
    const segments = useSegments();
    console.log("trgger backHandler")
    useEffect( () =>
    {
        const onBackPress = () =>
        {
            // Nếu không ở tab home, khi nhấn back sẽ chuyển về tab home
            if ( segments[ 0 ] !== 'home' )
            {
                router.replace( '/(tabs)/home' );
                return true; // Đã xử lý event back
            }
            // Nếu đang ở tab home, trả về false để hệ thống xử lý (thoát app)
            return false;
        };

        const subscription = BackHandler.addEventListener( 'hardwareBackPress', onBackPress );

        // cleanup: gọi subscription.remove()
        return () => subscription.remove();
    }, [ segments, router ] );
}
