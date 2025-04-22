import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import mockFaqs from '../../assets/faqs.json'

export default function ReportProblem ()
{
    const FAQS = mockFaqs;

    const [ openIndex, setOpenIndex ] = useState<number | null>( null );

    const toggleOpen = ( index: number ) =>
    {
        setOpenIndex( openIndex === index ? null : index );
    };

    return (
        <ScrollView className="flex-1 bg-white p-4">
            <Text className="text-2xl font-bold mb-4 text-center">Một số câu hỏi thường gặp</Text>
            { FAQS.map( ( faq, index ) => (
                <View key={ index } className="mb-2 bg-gray-100 rounded-lg">
                    <TouchableOpacity
                        onPress={ () => toggleOpen( index ) }
                        className="flex-row justify-between items-start p-4 bg-gray-200 rounded-lg mb-2"
                    >
                        <View className="flex-1 pr-2">
                            <Text className="text-base font-medium text-black">
                                { faq.question }
                            </Text>
                        </View>
                        <AntDesign
                            name={ openIndex === index ? 'upcircleo' : 'downcircleo' }
                            size={ 20 }
                            color="black"
                        />
                    </TouchableOpacity>

                    { openIndex === index && (
                        <View className="px-4 pb-4">
                            <Text className="text-sm text-gray-700">{ faq.answer }</Text>
                        </View>
                    ) }
                </View>
            ) ) }
        </ScrollView>
    );
}
