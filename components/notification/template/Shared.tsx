import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { INotification } from '@/interface/INotification';

interface SharedContentProps
{
    item: INotification;
}

export default function SharedContent ( { item }: SharedContentProps )
{
    return (
        <>
            <View className="w-12 h-12 rounded-full bg-green-100 justify-center items-center">
                <FontAwesome5 name="share-alt" size={ 20 } color="#10B981" />
            </View>
            <View className="ml-4 flex-1">
                <Text className="text-green-600 font-bold text-sm mb-1">
                    📤 CHIA SẺ
                </Text>
                <Text className="text-sm text-gray-400 mt-1">{ item.content }</Text>
                <Text className="text-sm text-gray-400 mt-1">{ item.time }</Text>
            </View>
        </>
    );
}


