import React from 'react';
import { Button, View, Text } from 'react-native';
import * as Speech from 'expo-speech';

export default function SpeechTestScreen ( { amount }: { amount: string } )
{
    const handleSpeak = () =>
    {
        const message = `Bạn vừa nhận được ${ amount } đồng từ anh Đạt đẹp trai`;
        Speech.speak( message, {
            language: 'vi-VN',
            rate: 0.95,     // đọc chậm lại một chút cho dễ nghe
            pitch: 1.2      // cao hơn một chút, dễ nghe hơn giọng mặc định
        } );
    };

    return (
        <View>
            <Text>Test Text-to-Speech</Text>
            <Button title="Đọc thử" onPress={ handleSpeak } />
        </View>
    );
}
