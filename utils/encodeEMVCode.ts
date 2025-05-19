import { crc16ccitt } from "./calculateCRC";

// id - lenght - value
// 00 02 01 (Chuẩn định dạng của QR EMVCo) - 01 02 12(11 qr Tĩnh, 12 QR động - chỉ cho giao dịch 1 lần) - 38 59 
// [00 10 A000000727 (AID của vietQR) - [01 29 - [00 06 970428 (BIN banking) - 01 15 246134029400001 (STK)]] (STK, BIN) - 
// 02 08 QRIBFTTA (Phương thức chuyển khoản liên kết ngân hàng)] (Dùng cho VietQR) -
// 53 03 704 (704 mã tiền tệ của VN) - 54 05 10000 (Số tiền)- 58 02 VN (Mã quốc gia)- 62 07 0803abc(nội dung ck) - 63 04 7CF8 (CRC)
export function convertEMVCode ( { accountNumber, bankBin, amount, addInfo, }: { accountNumber: string, bankBin: string, amount: number, addInfo: string, } )
{

    const payloadFormat = '00' + "02" + "01";
    const pointOfInitiation = '01' + "02" + "12"; // static QR

    //Config tài khoản
    const merchantAccountInfo = '38';

    const guid = '00' + '10' + 'A000000727'; // VietQR template

    const bin = "00" + ( bankBin.length < 10 ? '0' : '' ) + bankBin.length + bankBin;

    const accInfo = '01' + ( accountNumber.length < 10 ? '0' : '' ) + accountNumber.length + accountNumber;//= 0115246134029400001

    const lengthTest = ( bin + accInfo ).length;//=29

    const bankInfo = "01" + ( lengthTest < 10 ? '0' : '' ) + lengthTest + bin + accInfo;//= 01 29 00 06 970428 0115246134029400001

    const bankTransferMethod = '02' + '08' + 'QRIBFTTA';

    const fullMerchantInfo = guid + bankInfo + bankTransferMethod;

    const merchantInfo = merchantAccountInfo + ( fullMerchantInfo.length < 10 ? '0' : '' ) + fullMerchantInfo.length + fullMerchantInfo;

    //Config thông tin giao dịch
    const transactionCurrency = '53' + '03' + '704';//Mã tiền tệ Việt Nam
    const countryCode = '58' + '02' + 'VN';// Mã quốc gia Việt Nam
    const transactionAmount = amount ? '54' + String( amount ).length.toString().padStart( 2, '0' ) + amount : '';//Số tiền
    const additionalInfo = addInfo ? '62' + String( addInfo.length + 4 ).toString().padStart( 2, '0' ) + '08' + addInfo.length.toString().padStart( 2, '0' ) + addInfo : '';//Nội dung

    //Định dạng QR + loại QR (Động, Tĩnh) + Thông tin tài khoản + Mã tiền tệ + Số tiền + Mã quốc gia + Nội dung
    let payload = payloadFormat + pointOfInitiation + merchantInfo + transactionCurrency + transactionAmount + countryCode + additionalInfo;

    // Add CRC placeholder
    payload += '6304';

    // Calculate CRC-16 CCITT
    const crcValue = crc16ccitt( payload );
    return payload + crcValue;
}
