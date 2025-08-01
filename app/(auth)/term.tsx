import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TermsAndConditionsScreen ()
{
  return (
    <SafeAreaView className='flex-1 bg-white'>
      <View>
        <TouchableOpacity
          onPress={ () => router.back() }
          className="absolute top-4 left-3 z-10"
        >
          <Ionicons name="return-up-back" size={ 40 } color="black" />
        </TouchableOpacity>

        {/* Title */ }
        <View className="mt-20">
          <Text className="text-2xl font-bold mb-4 text-center">Chính Sách & Điều Khoản</Text>
        </View>
      </View>
      <ScrollView className="flex-1 px-4 py-6">
        {/* <Text className="text-2xl font-bold mb-4 text-center">Chính Sách & Điều Khoản</Text> */ }
        <View className="space-y-4">
          <Text className="text-base text-gray-700">
            Chào mừng bạn đến với ứng dụng của chúng tôi. Khi bạn sử dụng ứng dụng này, bạn đồng ý tuân thủ các điều khoản và điều kiện dưới đây.
          </Text>

          <Text className="text-lg font-semibold">1. Chấp nhận điều khoản</Text>
          <Text className="text-base text-gray-700">
            Bằng việc sử dụng ứng dụng, bạn đồng ý bị ràng buộc bởi các điều khoản này. Nếu bạn không đồng ý, vui lòng không sử dụng ứng dụng.
          </Text>

          <Text className="text-lg font-semibold">2. Quyền sở hữu trí tuệ</Text>
          <Text className="text-base text-gray-700">
            Mọi nội dung, hình ảnh, thiết kế và mã nguồn thuộc về chúng tôi và được bảo vệ bởi luật bản quyền.
          </Text>

          <Text className="text-lg font-semibold">3. Thay đổi điều khoản</Text>
          <Text className="text-base text-gray-700">
            Chúng tôi có thể cập nhật các điều khoản này bất kỳ lúc nào. Việc tiếp tục sử dụng ứng dụng đồng nghĩa với việc bạn chấp nhận các thay đổi đó.
          </Text>

          <Text className="text-lg font-semibold">4. Liên hệ</Text>
          <Text className="text-base text-gray-700">
            Nếu bạn có bất kỳ câu hỏi nào về chính sách và điều khoản này, vui lòng liên hệ với chúng tôi qua email: support@example.com
          </Text>

          <Text className="text-sm text-gray-500 mt-6 text-center">Cập nhật lần cuối: 18/04/2025</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}