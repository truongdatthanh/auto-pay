import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { useState } from 'react';
import { AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import mockFaqs from '@/assets/faqs.json';
import Animated, { FadeInDown } from 'react-native-reanimated';
import TabbarTop from '@/components/tabbar/TabbarTop';

export default function ReportProblem ()
{
    const FAQS = mockFaqs;
    const [ openIndex, setOpenIndex ] = useState<number | null>( null );
    const [ activeTab, setActiveTab ] = useState( 'Câu hỏi thường gặp' );
    const [ problem, setProblem ] = useState( '' );
    const [ email, setEmail ] = useState( '' );

    const toggleOpen = ( index: number ) =>
    {
        setOpenIndex( openIndex === index ? null : index );
    };

    const handleTabChange = ( tab: string ) =>
    {
        setActiveTab( tab );
    };

    const handleSubmit = () =>
    {
        if ( !problem.trim() )
        {
            Alert.alert( "Thông báo", "Vui lòng mô tả vấn đề của bạn" );
            return;
        }

        Alert.alert(
            "Gửi báo cáo thành công",
            "Cảm ơn bạn đã báo cáo vấn đề. Chúng tôi sẽ xem xét và phản hồi sớm nhất có thể.",
            [ {
                text: "Đồng ý", onPress: () =>
                {
                    setProblem( '' );
                    setEmail( '' );
                }
            } ]
        );
    };

    return (
        <View className="flex-1 bg-white">
            <TabbarTop
                tabs={ [ 'Câu hỏi thường gặp', 'Báo cáo vấn đề' ] }
                onTabChange={ handleTabChange }
            />

            { activeTab === 'Câu hỏi thường gặp' ? (
                <ScrollView className="flex-1 p-4">
                    <Animated.View entering={ FadeInDown.duration( 400 ) } className="mb-4">
                        <Text className="text-2xl font-bold mb-2 text-gray-800">Câu hỏi thường gặp</Text>
                        <Text className="text-gray-500 mb-4">Tìm câu trả lời nhanh cho các câu hỏi phổ biến</Text>
                    </Animated.View>

                    { FAQS.map( ( faq, index ) => (
                        <Animated.View
                            key={ index }
                            entering={ FadeInDown.duration( 400 ).delay( index * 100 ) }
                            className="mb-3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                        >
                            <TouchableOpacity
                                onPress={ () => toggleOpen( index ) }
                                className="flex-row justify-between items-center p-4"
                            >
                                <View className="flex-row items-center flex-1">
                                    <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
                                        <AntDesign name="questioncircle" size={ 16 } color="#1c40f2" />
                                    </View>
                                    <Text className="text-base font-medium text-gray-800 flex-1 pr-2">
                                        { faq.question }
                                    </Text>
                                </View>
                                <AntDesign
                                    name={ openIndex === index ? 'minuscircle' : 'pluscircle' }
                                    size={ 20 }
                                    color={ openIndex === index ? "#ef4444" : "#1c40f2" }
                                />
                            </TouchableOpacity>

                            { openIndex === index && (
                                <View className="px-4 pb-4 pt-1 bg-blue-50 mx-4 mb-4 rounded-lg">
                                    <Text className="text-gray-700 leading-5">{ faq.answer }</Text>
                                </View>
                            ) }
                        </Animated.View>
                    ) ) }

                    <View className="h-6" />
                </ScrollView>
            ) : (
                <ScrollView className="flex-1 p-4">
                    <Animated.View entering={ FadeInDown.duration( 400 ) } className="mb-6">
                        <Text className="text-2xl font-bold mb-2 text-gray-800">Báo cáo vấn đề</Text>
                        <Text className="text-gray-500 mb-4">Hãy cho chúng tôi biết vấn đề bạn đang gặp phải</Text>
                    </Animated.View>

                    <Animated.View entering={ FadeInDown.duration( 400 ).delay( 100 ) } className="mb-6">
                        <View className="flex-row items-center mb-2">
                            <MaterialIcons name="description" size={ 18 } color="#1c40f2" />
                            <Text className="text-base font-medium text-gray-800 ml-2">Mô tả vấn đề</Text>
                        </View>
                        <TextInput
                            className="bg-gray-50 rounded-xl p-4 min-h-[150px] text-gray-800 border border-gray-200"
                            placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
                            placeholderTextColor="#9ca3af"
                            multiline
                            textAlignVertical="top"
                            value={ problem }
                            onChangeText={ setProblem }
                        />
                    </Animated.View>

                    <Animated.View entering={ FadeInDown.duration( 400 ).delay( 200 ) } className="mb-6">
                        <View className="flex-row items-center mb-2">
                            <MaterialIcons name="email" size={ 18 } color="#1c40f2" />
                            <Text className="text-base font-medium text-gray-800 ml-2">Email liên hệ (tùy chọn)</Text>
                        </View>
                        <TextInput
                            className="bg-gray-50 rounded-xl p-4 text-gray-800 border border-gray-200"
                            placeholder="Email để chúng tôi phản hồi..."
                            placeholderTextColor="#9ca3af"
                            keyboardType="email-address"
                            value={ email }
                            onChangeText={ setEmail }
                        />
                    </Animated.View>

                    <Animated.View entering={ FadeInDown.duration( 400 ).delay( 300 ) } className="mb-6">
                        <TouchableOpacity
                            className="bg-[#1c40f2] rounded-xl py-4 items-center"
                            onPress={ handleSubmit }
                        >
                            <Text className="text-white font-semibold text-base">Gửi báo cáo</Text>
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View entering={ FadeInDown.duration( 400 ).delay( 400 ) } className="mb-8 bg-amber-50 p-4 rounded-xl">
                        <View className="flex-row">
                            <Ionicons name="information-circle" size={ 24 } color="#f59e0b" />
                            <View className="ml-3 flex-1">
                                <Text className="text-base font-medium text-gray-800">Lưu ý</Text>
                                <Text className="text-gray-600 mt-1">
                                    Chúng tôi sẽ xem xét báo cáo của bạn và phản hồi trong thời gian sớm nhất.
                                    Cảm ơn bạn đã giúp chúng tôi cải thiện dịch vụ!
                                </Text>
                            </View>
                        </View>
                    </Animated.View>
                </ScrollView>
            ) }
        </View>
    );
}