import { Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";


export const generateQR = ( data: string ) =>
{
    return (
        <>
            {/* <QRCode value={ data } size={ 200 } logo={ require( "../assets/images/logo-autopay-4.png" ) } logoSize={ 30 } /> */ }
            <View className="justify-center items-center relative p-4">
                <View className="p-6 border border-black rounded-2xl">
                    <QRCode value={ data } size={ 200 } logo={ require( "@/assets/images/logo-autopay-4.png" ) } logoSize={ 30 } />
                </View>
                <Text className="absolute bottom-0 text-xl font-semibold bg-white px-4 text-black">⛛ AUTOPAY</Text>
            </View>
        </>
    );
}




