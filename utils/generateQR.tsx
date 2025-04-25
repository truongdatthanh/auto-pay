import QRCode from "react-native-qrcode-svg";


export const generateQR = ( data: any ) =>
{
    return <QRCode value={ JSON.stringify( data ) } size={ 200 } />;
}