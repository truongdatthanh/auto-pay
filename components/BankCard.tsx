// import { Image, Text, View } from "react-native";
// import { LinearGradient } from 'expo-linear-gradient';

// interface IBankCard
// {
//     id: string,
//     STK: string,
//     name: string,
//     logoBanking: string,
//     bankName: string,
// }
// export default function BankingCard ( props: IBankCard )
// {
//     const bankCard: IBankCard = props;

//     return (
//         <LinearGradient
//             className="h-[150] w-[300] px-6 py-8 border border-gray-300 rounded-3xl gap-4"
//             colors={ [ '#2563eb', '#60a5fa' ] }
//             start={ { x: 0, y: 0 } }
//             end={ { x: 1, y: 1 } }

//         >
//             <View className="flex-row items-center gap-4">
//                 <Image
//                     source={ { uri: bankCard.logoBanking } }
//                     className="bg-white"
//                     resizeMode="contain"
//                 />
//                 <Text className="text-xl text-white font-semibold">{ bankCard.bankName }</Text>
//             </View>
//             <View>
//                 <Text className="text-md font-bold text-white">{ bankCard.STK }</Text>
//                 <Text className="text-sm text-white">{ bankCard.name } </Text>
//             </View>

//         </LinearGradient>
//     );
// }

//  className="h-[150] w-[300] bg-white px-6 py-8 border border-gray-300 rounded-3xl gap-4 "
import { Image, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface IBankCard
{
    id: string,
    STK: string,
    name: string,
    logoBanking: string,
    bankName: string,
}

export default function BankingCard ( props: IBankCard )
{
    const bankCard: IBankCard = props;

    return (
        <LinearGradient
            className="w-[320] h-[180] p-5 justify-between"
            colors={ [ '#1e3a8a', '#3b82f6' ] }
            start={ { x: 0, y: 0 } }
            end={ { x: 1, y: 1 } }
            style={ { borderRadius: 10 } }
        >
            <View className="flex-row items-center justify-between">
                <Text className="text-white text-lg font-bold">{ bankCard.bankName }</Text>
                <Image
                    source={ { uri: bankCard.logoBanking } }
                    className="w-12 h-12 bg-white rounded-full"
                    resizeMode="contain"
                />
            </View>

            <View className="mt-6">
                <Text className="text-white text-xl tracking-widest font-semibold">
                    { bankCard.STK }
                </Text>
                <Text className="text-white text-base mt-1">{ bankCard.name }</Text>
            </View>
        </LinearGradient>
    );
}
