export const formatCardNumber = ( cardNumber: string | undefined ) =>
{
    if ( !cardNumber ) return "";
    return cardNumber.replace( /(\d{4})/g, "$1 " ).trim();
};

export const formatHiddenCardNumber = ( cardNumber: string | undefined ) =>
{
    if ( !cardNumber ) return "";
    const first4 = cardNumber.slice( 0, 4 );
    const hidden = "*".repeat( cardNumber.length - 4 );
    return formatCardNumber( first4 + hidden );
};

export const formatCurrencyVND = ( amount: any ) =>
{
    if ( typeof amount !== "number" )
    {
        amount = Number( amount );
    }

    return new Intl.NumberFormat( "vi-VN", {
        style: "currency",
        currency: "VND",
    } ).format( amount );
};

export const formatDate = ( dateInput: string | Date ): string =>
{
    const date = new Date( dateInput );
    return date.toLocaleDateString( 'vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    } );
};

export const formatDayMonth = ( date: Date ) =>
{
    const day = date.getDate().toString().padStart( 2, '0' );
    const month = ( date.getMonth() + 1 ).toString().padStart( 2, '0' );
    return `${ day }/${ month }`;
};

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

export const formatCurrency = ( value: string ) =>
{
    if ( !value ) return '';
    const number = parseInt( value.replace( /\D/g, '' ) );
    return number.toLocaleString( 'vi-VN' );
};

export const parseCurrency = ( value: string ) =>
{
    return value.replace( /\D/g, '' );
};