import { crc16ccitt } from "./calculateCRC";

// id - lenght - value
// 00 02 01 (Chuẩn định dạng của QR EMVCo) - 01 02 12(11 qr Tĩnh, 12 QR động - chỉ cho giao dịch 1 lần) - 38 59 
// [00 10 A000000727 (AID của vietQR) - [01 29 - [00 06 970428 (BIN banking) - 01 15 246134029400001 (STK)]] (STK, BIN) - 
// 02 08 QRIBFTTA (Phương thức chuyển khoản liên kết ngân hàng)] (Dùng cho VietQR) -
// 53 03 704 (704 mã tiền tệ của VN) - 54 05 10000 (Số tiền)- 58 02 VN (Mã quốc gia)- 62 07 0803abc(nội dung ck) - 63 04 7CF8 (CRC)
export function convertEMVCode ( { accountNumber, bankBin, amount, addInfo, }: { accountNumber: string, bankBin: string, amount: number, addInfo: string, } )
{

    const payloadFormat = '00';
    const pointOfInitiation = '01'; // static QR

    const merchantAccountInfo = '38';

    const guid = '00' + '14' + 'A000000727010111'; // VietQR template

    const accInfo = '01' + ( accountNumber.length < 10 ? '0' : '' ) + accountNumber.length + accountNumber;
    const bankInfo = '02' + '08' + 'QRIBFTTA';

    const fullMerchantInfo = guid + accInfo + bankInfo;
    const merchantInfo = merchantAccountInfo + ( '' + fullMerchantInfo.length ).padStart( 2, '0' ) + fullMerchantInfo;

    const transactionCurrency = '53' + '03' + '704';
    const countryCode = '58' + '02' + 'VN';
    const transactionAmount = amount ? '54' + String( amount ).length.toString().padStart( 2, '0' ) + amount : '';
    const additionalInfo = addInfo ? '62' + String( addInfo.length + 4 ).toString().padStart( 2, '0' ) + '08' + addInfo.length.toString().padStart( 2, '0' ) + addInfo : '';

    let payload = payloadFormat + '02' + pointOfInitiation + merchantInfo + transactionCurrency + countryCode + transactionAmount + additionalInfo;

    // Add CRC placeholder
    payload += '6304';

    // Calculate CRC-16 CCITT
    const crcValue = crc16ccitt( payload );
    console.log( "payloadFormat ", payloadFormat )
    console.log( "pointOfInitiation ", pointOfInitiation )
    console.log( "merchantAccountInfo", merchantAccountInfo )
    console.log( "guid", guid )
    console.log( "accInfo", accInfo )
    console.log( "bankInfo", bankInfo )
    console.log( "fullMerchantInfo", fullMerchantInfo )
    console.log( "merchantInfo ", merchantInfo )
    console.log( "transactionCurrency ", transactionCurrency )
    console.log( "countryCode ", countryCode )
    console.log( "transactionAmount ", transactionAmount )
    console.log( "additionalInfo", additionalInfo )
    console.log( "payload ", payload )
    return payload + crcValue;
}

