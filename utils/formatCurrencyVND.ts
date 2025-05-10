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


