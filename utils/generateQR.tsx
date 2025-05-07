import QRCode from "react-native-qrcode-svg";


export const generateQR = ( data: any ) =>
{
    return <QRCode value={ JSON.stringify( data ).replace( /"/g, '' ) } size={ 200 } logo={ require( "../assets/images/logo-autopay-4.png" ) } logoSize={ 30 }/>;
}