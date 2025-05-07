import { convertEMVCode } from "@/utils/convertEMVCo";
import { generateQR } from "@/utils/generateQR";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function DisplayQR ()
{
    const params = useLocalSearchParams();

    // Ép kiểu chắc chắn và parse lại từ JSON
    const data = typeof params.data === 'string' ? JSON.parse( params.data ) : null;

    if ( !data ) return null;

    const qrCode = convertEMVCode( {
        accountNumber: data.STK,
        bankBin: data.bin,
        amount: data.amount,
        addInfo: data.content,
    } );


    return (
        <View className="flex-1 justify-center items-center bg-white pb-10">
            <View className="border-[15px] p-2">
                { generateQR( qrCode ) }
            </View>
        </View>
    );
}