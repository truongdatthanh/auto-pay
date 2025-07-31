import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


interface MenuItem
{
    label: string;
    onPress: () => void;
}

interface ToggleMenuProps
{
    menuItems: MenuItem[];
}


export default function ToggleMenu ( { menuItems } : ToggleMenuProps ) 
{
    const [ isOpen, setIsOpen ] = useState( false );

    return (
        <View className="relative z-10">
            {/* Toggle Button */ }
            <TouchableOpacity
                className="bg-blue-600 px-4 py-2 rounded-md"
                onPress={ () => setIsOpen( !isOpen ) }
            >
                <Text className="text-white text-base font-semibold">☰ Menu</Text>
            </TouchableOpacity>

            {/* Overlay Menu */ }
            { isOpen && (
                <View className="absolute top-12 left-0 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-20">
                    { menuItems.map( ( item, index ) => (
                        <TouchableOpacity
                            key={ index }
                            className="px-4 py-3 border-b border-gray-100"
                            onPress={ () =>
                            {
                                setIsOpen( false );
                                item.onPress();
                            } }
                        >
                            <Text className="text-gray-800 text-base">{ item.label }</Text>
                        </TouchableOpacity>
                    ) ) }
                </View>
            ) }
        </View>
    );
};


