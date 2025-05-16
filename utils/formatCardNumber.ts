const formatCardNumber = ( cardNumber: string | undefined ) =>
{
    if ( !cardNumber ) return "";
    return cardNumber.replace( /(\d{4})/g, "$1 " ).trim();
};

const formatHiddenCardNumber = ( cardNumber: string | undefined ) =>
{
    if ( !cardNumber ) return "";
    const first4 = cardNumber.slice( 0, 4 );
    const hidden = "*".repeat( cardNumber.length - 4 );
    return formatCardNumber( first4 + hidden );
};

export { formatCardNumber, formatHiddenCardNumber };
