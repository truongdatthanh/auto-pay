// import React from 'react';
// import { Button, View, Alert, StyleSheet } from 'react-native';
// import * as Linking from 'expo-linking';

// export default function LinkingExample() {
//   const openFacebook = async () => {
//     const pageId = '100028118927276'; // ID page, không phải username
//     const fbAppUrl = `fb://page/${pageId}`;
//     const fbWebUrl = `https://www.facebook.com/${pageId}`;

//     try {
//       const canOpen = await Linking.canOpenURL(fbAppUrl);
//       if (canOpen) {
//         await Linking.openURL(fbAppUrl);
//       } else {
//         await Linking.openURL(fbWebUrl);
//       }
//     } catch (err) {
//       Alert.alert('Lỗi', 'Không thể mở liên kết Facebook: ' + err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Button title="Mở Fanpage Facebook" onPress={openFacebook} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
// });

import { convertEMVCode } from '@/utils/encodeEMVCode';
import { generateQR } from '@/utils/generateQR';
import { Link } from 'expo-router';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const VietQRImage = ( { bankCode, accountNumber, accountName, amount, addInfo }: { bankCode: string, accountNumber: string, accountName: string, amount: number, addInfo: string } ) =>
{
  // Encode các tham số query để đảm bảo URL hợp lệ
  const encodedName = encodeURIComponent( accountName || '' );
  const encodedAddInfo = encodeURIComponent( addInfo || '' );

  // Tạo URL cho QR
  const qrUrl1 = `https://img.vietqr.io/image/${ bankCode }-${ accountNumber }-compact2.jpg?amount=${ amount }&addInfo=${ encodedAddInfo }&accountName=${ encodedName }`;
  const qrUrl2 = "https://dl.vietqr.io/pay?app=bidv";
  const qrUrl = `https://img.vietqr.io/image/${ bankCode }-${ accountNumber }-qr-only.png?amount=10000&addInfo=abc&accountName=${ encodedName }`;
  const qrImgUrl = "https://img.vietqr.io/image/namabank-246134029400001-compact.jpg?amount=10000&addInfo=Thanh%20toan%20hoa%20don%20ABC123&accountName=TRUONG%20THANH%20DAT";

  const codeEMV = convertEMVCode( {
    accountNumber: "246134029400001",
    bankBin: "970428",
    amount: 10000,
    addInfo: "abc",
  } )

  return (
    <View style={ styles.container }>
      {/* <Text style={ styles.label }>Quét mã để chuyển khoản qua { bankCode }</Text>
      <Link href="https://dl.vietqr.io/pay?app=bidv" >Go to BIDV</Link>
      <Link href="https://dl.vietqr.io/pay?app=bidv&ba=246134029400001@nab&amount=10000&addInfo=THANH%20TOAN%20HOA%20DON%20ABC123&accountName=NGUYEN%20VAN%20A">
        Thanh toán bằng BIDV
      </Link>
      <Link href={ `https://img.vietqr.io/image/${ bankCode }-${ accountNumber }-compact2.jpg?amount=${ amount }&addInfo=${ encodedAddInfo }&accountName=${ encodedName }` }>Thanh toán bằng VCB</Link>
      { generateQR( codeEMV ) } */}
      {/* <Image source={ { uri: 'https://img.vietqr.io/image/namabank-246134029400001-compact.jpg' } } className='h-[200px] w-[200px]'/> */ }
      {/* <Image
        source={ { uri: qrUrl } }
        style={ styles.qrImage }
        resizeMode="contain"
      /> */}

      <Link href={ "deeplinkapp://nab/softotp" }>NAB</Link>

      <Link href={ "bidv.smartbanking.partner://payment" }>BIDV</Link>

      {/* <Text>Quet de giao dich</Text>
            {generateQR("https://dl.vietqr.io/pay?app=nab&ba=246134029400001@nama&am=10000&add=abc")} */}
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: '600',
  },
  qrImage: {
    width: 250,
    height: 250,
    borderRadius: 12,
  },
} );

export default VietQRImage;

