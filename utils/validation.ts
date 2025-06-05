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

export const validateEmail = ( email: string ) =>
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if ( !email.trim() )
    {
        return 'Email không được để trống';
    }
    if ( !emailRegex.test( email ) )
    {
        return 'Email không hợp lệ';
    }
    return null;
};

export const validatePassword = ( password: string ) =>
{
    if ( !password )
    {
        return 'Mật khẩu không được để trống';
    }
    if ( password.length < 6 )
    {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    return null;
};

export const validateFullName = ( name: string ): string | null =>
{
    if ( !name.trim() )
    {
        return "Họ tên không được để trống";
    }
    if ( name.trim().length < 2 )
    {
        return "Họ tên phải có ít nhất 2 ký tự";
    }
    if ( !/^[a-zA-ZÀ-ỹ\s]+$/.test( name.trim() ) )
    {
        return "Họ tên chỉ được chứa chữ cái và khoảng trắng";
    }
    return null;
};

export const validateConfirmPassword = ( confirmPwd: string, originalPwd: string ): string | null =>
{
    if ( !confirmPwd )
    {
        return "Vui lòng xác nhận mật khẩu";
    }
    if ( confirmPwd !== originalPwd )
    {
        return "Mật khẩu xác nhận không khớp";
    }
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
