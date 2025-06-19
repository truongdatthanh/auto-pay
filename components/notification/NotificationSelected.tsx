import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NotificationSelectedProps
{
    selectedCount: number;
    allItemsSelected: boolean;
    onExitSelection: () => void;
    onSelectAll: () => void;
    onDeleteSelected: () => void;
}

//Component chọn để xóa
export default function NotificationSelected ( {
    selectedCount,
    allItemsSelected,
    onExitSelection,
    onSelectAll,
    onDeleteSelected,
}: NotificationSelectedProps )
{
    return (
        <>
            <View className="px-4 py-2 bg-white border-b border-gray-200">
                <View className="flex-row items-center justify-between py-2">
                    <View className="flex-row items-center gap-2">
                        <TouchableOpacity
                            onPress={ onSelectAll }
                            className="flex-row items-center"
                        >
                            <MaterialIcons
                                name={ allItemsSelected ? "check-box" : "check-box-outline-blank" }
                                size={ 20 }
                                color="#3B82F6"
                            />
                            <Text className="text-sm text-blue-500 ml-1 font-medium">
                                Chọn tất cả
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ onExitSelection } className="flex-row items-center">
                            <MaterialIcons
                                name="close"
                                size={ 24 }
                                color="#6B7280"
                            />
                            <Text className="text-sm text-[#6B7280] ml-1 font-medium">
                                Bỏ chọn
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row items-center gap-4">
                        <Text className="text-sm text-gray-600">
                            { selectedCount } đã chọn
                        </Text>
                        { selectedCount > 0 && (
                            <TouchableOpacity
                                onPress={ onDeleteSelected }
                                className="flex-row items-center"
                            >
                                <MaterialIcons name="delete" size={ 20 } color="#EF4444" />
                                <Text className="text-sm text-red-500 ml-1 font-medium">
                                    Xóa
                                </Text>
                            </TouchableOpacity>
                        ) }
                    </View>
                </View>
            </View>
        </>
    );

}

