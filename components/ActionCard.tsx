import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageSourcePropType } from 'react-native';

interface ActionCardProps
{
  logo: ImageSourcePropType;
  title: string;
  description?: string;
  buttonText: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  buttonColor?: string;
  buttonTextColor?: string;
}

export default function ActionCard ( {
  logo,
  title,
  description,
  buttonText,
  onPress,
  backgroundColor = '#ffffff',
  textColor = '#000000',
  buttonColor = '#1c40f2',
  buttonTextColor = '#ffffff'
}: ActionCardProps )
{
  return (
    <View
      className="rounded-xl p-6 my-2 mx-4 shadow-md"
      style={ { backgroundColor } }
    >
      {/* Logo và Tiêu đề */ }
      <View className="flex-row items-center mb-4">
        <Image
          source={ logo }
          className="w-12 h-12 rounded-full mr-4"
          resizeMode="contain"
        />
        <View className="flex-1">
          <Text
            className="text-lg font-bold"
            style={ { color: textColor } }
          >
            { title }
          </Text>
          { description && (
            <Text
              className="text-sm mt-1"
              style={ { color: textColor + '99' } } // Thêm độ trong suốt
            >
              { description }
            </Text>
          ) }
        </View>
      </View>

      {/* Nút hành động */ }
      <TouchableOpacity
        className="rounded-full py-3 px-6 mt-2"
        style={ { backgroundColor: buttonColor } }
        onPress={ onPress }
      >
        <Text
          className="text-center font-semibold"
          style={ { color: buttonTextColor } }
        >
          { buttonText }
        </Text>
      </TouchableOpacity>
    </View>
  );
}
