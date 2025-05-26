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
