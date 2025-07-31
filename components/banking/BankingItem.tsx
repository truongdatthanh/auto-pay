import { Image, Text, View } from "react-native";
import WaveButton from "../button/WaveButton";
import { AntDesign } from "@expo/vector-icons";
import { IBanking } from "@/interface/IBanking";

interface BankingItemProps
{
    item: IBanking;
}

export default function BankingItem ( { item }: BankingItemProps )
{
    return (
        <>
            <WaveButton to={ {
                pathname: "/bank/add",
                params: {
                    data: JSON.stringify( item )
                }
            } }
                className="flex-row justify-between items-center"
            >
                <View className='flex-row items-center flex-1'>
                    <Image
                        source={ { uri: item.logo } }
                        className="w-16 h-10 mr-2"
                        resizeMode="contain"
                    />
                    <Text className='text-sm flex-1 font-semibold'>{ item.name }</Text>
                </View>
                <AntDesign name="right" size={ 16 } color="gray" className="pl-2"/>
            </WaveButton >
        </>

    );
}