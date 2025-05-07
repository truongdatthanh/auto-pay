import { convertEMVCode } from "@/utils/convertEMVCo";
import { generateQR } from "@/utils/generateQR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function MyQR ()
{
    const [ currentCard, setCurrentCard ] = useState( null );
    const data = {
        STK: "246134029400001",
        amount: 0,
        bin: "970428",
        content: "",
    }

    useEffect( () =>
    {
        const loadCard = async () =>
        {
            const cardData = await AsyncStorage.getItem( "selectedCard" );
            if ( cardData )
            {
                setCurrentCard( JSON.parse( cardData ) );
            }
        };
        loadCard();
    }, [] );

   
    const qrCode = convertEMVCode( {
        accountNumber: data.STK,
        bankBin: data.bin,
        amount: data.amount,
        addInfo: data.content,
    } );

    return (
        <View className="flex-1 bg-white">
            { generateQR( qrCode ) }
        </View>
    )
}