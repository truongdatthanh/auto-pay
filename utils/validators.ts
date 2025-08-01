import { useCallback } from "react";
import { Alert } from "react-native";
import { ERROR_MESSAGES } from "@/constants/messages";

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

export const validateEmail = ( email: string ) =>
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !email.trim() ) return ERROR_MESSAGES.REQUIRED_EMAIL;
    if ( !emailRegex.test( email ) ) return ERROR_MESSAGES.INVALID_EMAIL;
    return null;
};

export const validatePassword = ( password: string ) =>
{
    if ( !password ) return ERROR_MESSAGES.REQUIRED_PASSWORD;
    if ( password.length < 6 ) return ERROR_MESSAGES.SHORT_PASSWORD( 6 );
    return null;
};

export const validateFullName = ( name: string ): string | null =>
{
    if ( !name.trim() ) return ERROR_MESSAGES.REQUIRED_FULLNAME;
    if ( !/^[a-zA-ZÀ-ỹ\s]+$/.test( name.trim() ) ) return ERROR_MESSAGES.INVALID_FULLNAME;
    return null;
};

export const validateConfirmPassword = ( confirmPwd: string, originalPwd: string ): string | null =>
{
    if ( !confirmPwd ) return ERROR_MESSAGES.REQUIRED_PASSWORD;
    if ( confirmPwd.length < 6 ) return ERROR_MESSAGES.SHORT_PASSWORD( 6 )
    if ( confirmPwd !== originalPwd ) return ERROR_MESSAGES.PASSWORD_MISMATCH;
    return null;
};

export const validateTerms = ( isChecked: boolean ): string | null =>
{
    if ( !isChecked )
    {
        return "Vui lòng đồng ý với điều khoản và chính sách";
    }
    return null;
};
