import React from 'react';
import { View, Text, Image } from 'react-native';
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
            <View className="flex-1">
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                        <Image
                            source={ { uri: item.bankLogo } }
                            className="w-8 h-8 bg-blue-300/20 rounded-full"
                            resizeMode="contain"
                        /> 
                        <Text className="text-sm text-black mt-1 font-semibold"> { item.recieveCard }</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                        <Text className="text-[10px] text-gray-500 mt-1">{ item.time }</Text>
                        <Text className="text-[12px] text-gray-500 mt-1">|</Text>
                        <Text className="text-[10px] text-gray-500 mt-1">
                            { item.date ? formatDayMonthYear( item.date ) : "" }
                        </Text>
                    </View>
                </View>
                <View className="flex-row items-center">
                    <View className="flex-row items-center">
                        <Text className="text-sm text-green-600 font-semibold">
                            +{ formatCurrencyWithCode( item.amount ) }
                        </Text>
                    </View>
                </View>
            </View>
        </>
    );

}

