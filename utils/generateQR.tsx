import { Image, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";


export const generateQR = ( data: string ) =>
{
    return (
        <>
            {/* <QRCode value={ data } size={ 200 } logo={ require( "../assets/images/logo-autopay-4.png" ) } logoSize={ 30 } /> */ }
            <View className="relative p-8">
                <View className="justify-center items-center">
                    <View className="p-6 border border-black rounded-2xl">
                        <QRCode value={ data } size={ 200 } logo={ require( "@/assets/images/logo-autopay-4.png" ) } logoSize={ 30 } />
                    </View>
                    {/* <Text className="absolute bottom-0 text-xl font-semibold bg-white px-4 text-black">⛛ AUTOPAY</Text> */ }
                </View>
                <View className="absolute bottom-0 bg-white self-center">
                    <Image source={ require( "@/assets/images/logo-autopay-cachdieu-black.png" ) } style={ { width: 150, height: 50 } } />
                </View>
            </View>

        </>
    );
}




