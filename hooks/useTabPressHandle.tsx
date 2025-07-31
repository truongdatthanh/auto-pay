import { usePathname, router } from 'expo-router';

export default function useTabPressHandler ()
{
    const pathname = usePathname();

    return ( targetPath: any ) => ( e: any ) =>
    {
        if ( pathname === targetPath )
        {
            // Đang ở tab đó rồi, ngăn hành động mặc định
            e.preventDefault();
            return;
        }
        // Chuyển đến tab mới
        e.preventDefault();
        router.replace( targetPath );
    };
}