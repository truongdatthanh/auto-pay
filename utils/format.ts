//Hàm format số thẻ cứ 4 số sẽ chèn space
export const formatCardNumber = ( cardNumber: string | undefined ) =>
{
    //trim() dùng loại bỏ khoảng trống
    if ( !cardNumber ) return "";
    return cardNumber.replace( /(\d{4})/g, "$1 " ).trim();
};

//hàm format ẩn hiện số thẻ thành ****
export const formatHiddenCardNumber = ( cardNumber: string | undefined ) =>
{
    if ( !cardNumber ) return "";
    const first4 = cardNumber.slice( 0, 4 );
    const hidden = "*".repeat( cardNumber.length - 4 );
    return formatCardNumber( first4 + hidden );
};


//Hàm format ngày (dd/mm/yyyy)
export const formatDayMonthYear = ( dateInput: string | Date ): string =>
{
    const date = new Date( dateInput );
    return date.toLocaleDateString( 'vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    } );
};


// Hàm format time (giờ:phút:giây)
export const formatHourMinuteSecond = ( dateInput: string | Date ): string =>
{
    const date = new Date( dateInput );
    return date.toLocaleTimeString( 'vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // Định dạng 24h
    } );
};

//Hàm format (dd/mm)
export const formatDayMonth = ( date: string | Date ): string =>
{
    const parsedDate = typeof date === 'string' ? new Date( date ) : date;

    if ( isNaN( parsedDate.getTime() ) )
    {
        return 'Invalid date';
    }

    const day = parsedDate.getDate().toString().padStart( 2, '0' );
    const month = ( parsedDate.getMonth() + 1 ).toString().padStart( 2, '0' );

    return `${ day }/${ month }`;
};

//Hàm format  khoảng cách
export const formatAccountNumber = ( text: any ) =>
{

    // Remove all non-numeric characters
    const cleaned = text.replace( /[^0-9]/g, '' );

    // Format with spaces every 4 digits
    let formatted = '';
    for ( let i = 0; i < cleaned.length; i++ )
    {
        if ( i > 0 && i % 4 === 0 )
        {
            formatted += ' ';
        }
        formatted += cleaned[ i ];
    }
    return formatted;
};


//Hàm xóa các thanh dấu Việt Nam
export const removeVietnameseTonesAndSpaces = ( str: string ) =>
{
    if ( !str ) return '';

    return str
        .normalize( 'NFD' )
        .replace( /[\u0300-\u036f]/g, '' ) // Loại bỏ dấu
        .replace( /đ/g, 'd' )
        .replace( /Đ/g, 'D' )
        .replace( /\s+/g, '' ); // Loại bỏ tất cả khoảng trắng
};

//Hàm format số tiền thành Vnđ
export const formatCurrencyWithCode = ( amount: any ): string =>
{
    if ( typeof amount !== "number" )
    {
        amount = Number( amount );
    }

    return new Intl.NumberFormat( "vi-VN", {
        style: "currency",
        currency: "VND",
        currencyDisplay: "code", // Hiển thị mã tiền tệ VND thay vì ký hiệu ₫
    } ).format( amount );
};

export const formatCurrencyWithoutCode = ( amount: any ): string =>
{
    if ( !amount && amount !== 0 ) return '';

    // Chuyển đổi về number bằng cách loại bỏ tất cả ký tự không phải số
    const number = parseFloat( String( amount ).replace( /[^\d.-]/g, '' ) );

    // Kiểm tra nếu không phải số hợp lệ
    if ( isNaN( number ) ) return '';

    return number.toLocaleString( 'vi-VN' );
};

export const parseCurrency = ( value: string ) =>
{
    return value.replace( /\D/g, '' );
};

export const generateIdOptimized = (): string =>
{
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const parts = [];

    // Tạo 3 phần, mỗi phần 4 ký tự
    for ( let part = 0; part < 3; part++ )
    {
        let partString = '';
        for ( let i = 0; i < 4; i++ )
        {
            const randomIndex = Math.floor( Math.random() * characters.length );
            partString += characters[ randomIndex ];
        }
        parts.push( partString );
    }

    return parts.join( '-' );
};