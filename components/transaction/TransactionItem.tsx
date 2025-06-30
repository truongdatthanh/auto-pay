// import { formatCurrencyWithCode, formatDayMonth } from "@/utils/format";
// import { AntDesign } from "@expo/vector-icons";
// import { Image, Text, View } from "react-native";
// import WaveButton from "../button/WaveButton";

// interface TransactionItemProps
// {
//     id: string;
//     amount: number;
//     time: string;
//     content?: string;
//     date: string;
// }

// export default function TransactionItem ( { id, amount, time, content, date }: TransactionItemProps )
// {
//     return (
//         <>
//             <View className="bg-slate-50 mx-4 rounded-lg" style={ {
//                 shadowColor: '#000',
//                 shadowOffset: {
//                     width: 0,
//                     height: 4,
//                 },
//                 shadowOpacity: 0.25,
//                 shadowRadius: 8,
//                 elevation: 8, // For Android
//             } }>
//                 <WaveButton className="flex-row justify-between items-center py-2 gap-2" to={ { pathname: "/transaction/[id]", params: { id } } }>
//                     { Number( amount ) > 0 ? (
//                         <View className='bg-green-400/20 rounded-full p-2'>
//                             <Image source={ require( "@/assets/images/income.png" ) } className='w-5 h-5' resizeMode='contain' />
//                         </View>
//                     ) : (
//                         <View className='bg-red-400/20 rounded-full p-2'>
//                             <Image source={ require( "@/assets/images/outcome.png" ) } className='w-5 h-5' resizeMode='contain' />
//                         </View>
//                     ) }
//                     <View className="flex-1">
//                         <Text className={ `text-md font-bold ${ amount < 0 ? "text-red-500" : "text-green-600" }` }>{ Number( amount ) > 0 && "+" }{ formatCurrencyWithCode( amount ) }</Text>
//                         <Text
//                             numberOfLines={ 1 }
//                             ellipsizeMode="tail"
//                             className="text-[12px] max-w-[75%] text-gray-400"
//                         >
//                             { content }
//                         </Text>
//                     </View>
//                     <View className="self-end items-end">
//                         <Text className="text-gray-400 text-[9px]">{ formatDayMonth( date ) }</Text>
//                         <Text className="text-gray-400 text-[9px]">{ time }</Text>
//                     </View>
//                 </WaveButton>
//             </View>
//         </>
//     );
// }

import { formatCurrencyWithCode, formatDayMonth } from "@/utils/format";
import { Image, Text, View } from "react-native";
import WaveButton from "../button/WaveButton";

interface TransactionItemProps
{
    id: string;
    amount: number;
    time: string;
    content?: string;
    date: string;
}

// Hàm tính toán hiển thị ngày thông minh
const getSmartDateDisplay = ( transactionDate: string ) =>
{
    const today = new Date();
    const txDate = new Date( transactionDate );

    // Reset time để so sánh chỉ ngày
    today.setHours( 0, 0, 0, 0 );
    txDate.setHours( 0, 0, 0, 0 );

    const diffTime = today.getTime() - txDate.getTime();
    const diffDays = Math.floor( diffTime / ( 1000 * 60 * 60 * 24 ) );

    if ( diffDays === 0 )
    {
        return "Hôm nay";
    } else if ( diffDays === 1 )
    {
        return "Hôm qua";
    } else
    {
        return formatDayMonth( transactionDate );
    }
};

export default function TransactionItem ( { id, amount, time, content, date }: TransactionItemProps )
{
    const smartDate = getSmartDateDisplay( date );

    return (
        <>
            <View className="bg-slate-50 mx-4 rounded-lg" style={ {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 4,
                },
                shadowOpacity: 0.25,
                shadowRadius: 8,
                elevation: 8, // For Android
            } }>
                <WaveButton className="flex-row justify-between items-center py-2 gap-2" to={ { pathname: "/transaction/[id]", params: { id } } }>
                    { Number( amount ) > 0 ? (
                        <View className='bg-green-400/20 rounded-full p-2'>
                            <Image source={ require( "@/assets/images/income.png" ) } className='w-5 h-5' resizeMode='contain' />
                        </View>
                    ) : (
                        <View className='bg-red-400/20 rounded-full p-2'>
                            <Image source={ require( "@/assets/images/outcome.png" ) } className='w-5 h-5' resizeMode='contain' />
                        </View>
                    ) }
                    <View className="flex-1">
                        <Text className={ `text-md font-bold ${ amount < 0 ? "text-red-500" : "text-green-600" }` }>{ Number( amount ) > 0 && "+" }{ formatCurrencyWithCode( amount ) }</Text>
                        <Text
                            numberOfLines={ 1 }
                            ellipsizeMode="tail"
                            className="text-[12px] max-w-[75%] text-gray-400"
                        >
                            { content }
                        </Text>
                    </View>
                    <View className="self-end items-end">
                        <Text className="text-gray-400 text-[9px]">{ smartDate }</Text>
                        <Text className="text-gray-400 text-[9px]">{ time }</Text>
                    </View>
                </WaveButton>
            </View>
        </>
    );
}