import { formatCurrencyVND } from "@/utils/format";
import { AntDesign } from "@expo/vector-icons";
import { Text, View } from "react-native";
import WaveButton from "../button/WaveButton";

interface TransactionItemProps
{
    id: string;
    amount: number;
    time: string;
}

export default function TransactionItem ( { id, amount, time }: TransactionItemProps )
{
    return (
        <>
            <WaveButton className="flex-row justify-between items-center py-2" to={ { pathname: "/transaction/[id]", params: { id } } }>
                <View>
                    <Text className="text-gray-500 text-[10px]">{ time }</Text>
                    <Text className={ `text-md font-bold ${ amount < 0 ? "text-red-500" : "text-green-600" }` }>{ formatCurrencyVND( amount ) }</Text>
                </View>
                <AntDesign name="right" size={ 16 } color="gray" />
            </WaveButton>
            <View className="w-[90%] self-center border-b border-gray-100" />
        </>
    );
}