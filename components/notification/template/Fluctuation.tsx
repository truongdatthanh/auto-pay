import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { INotification } from '@/interface/INotification';
import { formatCurrencyWithCode, formatDayMonthYear } from '@/utils/format';

interface FluctuationContentProps
{
    item: INotification;
}

export default function FluctuationContent ( { item }: FluctuationContentProps ) 
{
    return (
        <>
            <View className="flex-1 py-2">
                <View className="flex-row items-center">
                    { Number( item.amount ) > 0 ? (
                        <View className='bg-green-400/20 rounded-full p-2'>
                            <Image source={ require( "@/assets/images/income.png" ) } className='w-6 h-6' resizeMode='contain' />
                        </View>
                    ) : (
                        <View className='bg-red-400/20 rounded-full p-2'>
                            <Image source={ require( "@/assets/images/outcome.png" ) } className='w-6 h-6' resizeMode='contain' />
                        </View>
                    ) }
                    <View className='flex-1 ml-4 gap-1'>
                        <View className='flex-row items-center'>
                            <Image
                                source={ { uri: item.bankLogo } }
                                className="w-8 h-6 bg-blue-300/20 rounded-lg"
                                resizeMode="contain"
                            />
                            <Text className="text-sm text-black font-semibold"> { item.recieveCard }</Text>
                        </View>
                        <View className='flex-row items-center justify-between'>
                            <View className="flex-row items-center">
                                <View className="flex-row items-center">
                                    <Text className={ `${ Number( item.amount ) > 0 ? "text-green-600" : "text-red-500" } text-sm  font-semibold` }>
                                        { Number( item.amount ) > 0 && "+" }{ formatCurrencyWithCode( item.amount ) }
                                    </Text>
                                </View>
                            </View>
                            <View className="flex-row items-center gap-1">
                                <Text className="text-[10px] text-gray-500 mt-1">{ item.time }</Text>
                                <Text className="text-[12px] text-gray-500 mt-1">|</Text>
                                <Text className="text-[10px] text-gray-500 mt-1">
                                    { item.date ? formatDayMonthYear( item.date ) : "" }
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );

}

