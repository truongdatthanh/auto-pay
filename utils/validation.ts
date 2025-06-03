import { useCallback } from "react";
import { Alert } from "react-native";

// Validate date range
export const validateDateRange = useCallback( ( start: Date, end: Date ): boolean =>
{
    const startTime = new Date( start ).setHours( 0, 0, 0, 0 );
    const endTime = new Date( end ).setHours( 0, 0, 0, 0 );

    if ( startTime > endTime )
    {
        Alert.alert( "Ngày không hợp lệ", "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc." );
        return false;
    }
    return true;
}, [] );