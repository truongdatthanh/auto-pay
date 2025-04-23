// import { Image, Text, View } from "react-native";
// import myBankingAccount from "../../assets/my-bank-account.json"
// import { useState } from "react";
// import QRCode from "react-native-qrcode-svg";

// export default function BankAccount ()
// {
//     const [ bankAccount, setBankAccount ] = useState( myBankingAccount );
//     console.log( "bankAccount", bankAccount );
//     const jsonData = bankAccount.filter( ( item: any ) => item.id === "1" );
//     const jsonString = JSON.stringify( jsonData[0].bank_name );

//     return (
//         <>
//             <View className="flex-1 bg-white pt-10">
//                 <View className="bg-red-500 p-4">
//                     <Text>Header</Text>
//                 </View>

//                 <View className="flex-1 items-center bg-blue-500">
//                     <View className="bg-white p-8 items-center border-2 border-gray-200">
//                         <Text>{ jsonData[ 0 ].name }</Text>
//                         <Text>{ jsonData[ 0 ].STK }</Text>
//                         <QRCode
//                             value={ jsonString }
//                             size={ 200 }
//                             logo={ require( "../../assets/images/logo-autopay-4.png" ) }
//                             logoSize={ 50 }
//                             logoBackgroundColor="transparent" />
//                         <View className="flex-row items-center justify-between mt-4  border-2 border-gray-200">
//                             <Text>AutoPAY</Text>
//                             <Image source={{uri: jsonData[0].bank_logo}} className="w-20 h-10" />
//                         </View>
//                     </View>
//                     <Text>Body</Text>
//                 </View>


//             </View>
//         </>
//     )

// }

import { Image, Text, View } from "react-native";
import myBankingAccount from "../../assets/my-bank-account.json";
import { useState } from "react";
import QRCode from "react-native-qrcode-svg";

export default function BankAccount ()
{
    const [ bankAccount ] = useState( myBankingAccount );
    const jsonData = bankAccount.filter( ( item: any ) => item.id === "1" );
    const jsonString = JSON.stringify( jsonData[ 0 ].bank_name );

    return (
        <View className="flex-1 bg-white pt-10">
            {/* Header */ }
            <View className="bg-red-500 px-4 py-3">
                <Text className="text-white text-lg font-semibold">Thông tin tài khoản</Text>
            </View>

            {/* Body */ }
            <View className="flex-1 items-center justify-center px-4 bg-blue-50">
                <View className="bg-white p-6 rounded-2xl border-t border-gray-200 shadow-md w-full max-w-[340px] items-center">
                    <Text className="text-lg font-bold mb-2">{ jsonData[ 0 ].name }</Text>
                    <Text className="text-gray-700 text-base mb-4">STK: { jsonData[ 0 ].STK }</Text>
                    <View className="w-full border-t border-gray-200 mb-4"></View>
                    <QRCode
                        value={ jsonString }
                        size={ 200 }
                        logo={ require( "../../assets/images/logo-autopay-4.png" ) }
                        logoSize={ 50 }
                        logoBackgroundColor="transparent"
                    />
                    <View className="flex-row items-center justify-between mt-6 w-full border-t border-gray-200 pt-3">
                        <Text className="text-base font-medium text-gray-800">AutoPAY</Text>
                        <Image source={ { uri: jsonData[ 0 ].bank_logo } } className="w-20 h-10 ml-4" />
                    </View>
                </View>

                <View>
                    <Text className="text-gray-500 text-sm mt-4">Để nhận tiền, bạn có thể chia sẻ mã QR này với người khác.</Text>
                    <Text className="text-gray-500 text-sm">Hoặc cung cấp số tài khoản và tên ngân hàng của bạn.</Text>
                </View>

            </View>
        </View>
    );
}
