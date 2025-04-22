import { Link } from "expo-router";
import { Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function ContactWithUs ()
{
    return (
        <View className="flex-1 bg-white p-6">
            <View className="items-center justify-center mt-10 mb-6">
                <Text className="text-5xl font-bold text-center">⛛ AutoPAY</Text>
            </View>

            <View className="mb-6">
                <Text className="text-2xl font-semibold text-gray-800 mb-2">
                    Thanh toán an toàn, tiện lợi và bảo mật
                </Text>
                <Text className="text-base text-gray-600">
                    Dễ dàng quản lý mọi thanh toán, hóa đơn, lịch sử giao dịch với dịch vụ tích hợp open banking của chúng tôi.
                </Text>
            </View>

            <View className="mb-6">
                <Text className="text-base text-gray-800 mb-1">✔ Tốc độ xử lý nhanh</Text>
                <Text className="text-base text-gray-800 mb-1">✔ Hỗ trợ nhiều ngân hàng</Text>
                <Text className="text-base text-gray-800 mb-1">✔ Bảo mật tuyệt đối</Text>
                <Text className="text-base text-gray-800">✔ Dễ dàng tích hợp</Text>
            </View>

            <View className="border-t border-gray-300 pt-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</Text>
                <Text className="text-base text-gray-700">📞 Hotline: 1900 1234</Text>
                <Text className="text-base text-gray-700">✉ Email: support@autopay.vn</Text>
            </View>


            <View className="border-t border-gray-300 pt-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">Trang web của chúng tôi</Text>
                <Link href="https://autopay.vn/" className="text-blue-500 border boder-gray-500 p-4 rounded-lg" >
                    autopay.vn
                </Link>
            </View>

            <View className="border-t border-gray-300 pt-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">Mạng xã hội</Text>
                <View className="flex-row gap-4" >
                    <FontAwesome5 name="facebook" size={ 24 } color="blue" />
                    <FontAwesome6 name="x-twitter" size={ 24 } color="black" />
                    <FontAwesome5 name="youtube" size={ 24 } color="red" />
                    <FontAwesome5 name="github" size={24} color="black" />
                </View>
            </View>
        </View>
    );
}
