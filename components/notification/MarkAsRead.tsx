import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

interface MarkAllReadProps
{
    unreadCount: number;
    onMarkAllRead: () => void;
}

export default function MarkAsRead ( {
    unreadCount,
    onMarkAllRead,
}: MarkAllReadProps ) 
{
    if ( unreadCount === 0 ) return null;

    return (  
        <View className="px-4 py-2 bg-white border-b border-gray-200">
            <TouchableOpacity
                onPress={ onMarkAllRead }
                className="flex-row items-center justify-between py-2"
            >
                <Text className="text-sm text-gray-600">
                    { unreadCount } thông báo chưa đọc
                </Text>
                <View className="flex-row items-center">
                    <FontAwesome5 name="check-double" size={ 14 } color="#3B82F6" />
                    <Text className="text-sm text-blue-500 ml-2 font-medium">
                        Đánh dấu đã đọc
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

