import { AntDesign, EvilIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function QuickActionGrid ( )
{
    const itemClass = 'w-1/4 max-h-40 p-2 bg-white ';
    const textClass = 'text-xs font-semibold text-center';
    return (
        <View className="flex-row flex-wrap bg-white justify-between">
            <TouchableOpacity className={ itemClass }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <Image source={ require( '../assets/images/logo-autopay-4.png' ) } className="w-6 h-6" />
                    <Text className={ textClass }>Kích hoạt AutoPAY</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass } onPress={ () => router.push( '/(tabs)/qr/QR-scanner' ) }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <Ionicons name="qr-code-sharp" size={ 20 } color="black" />
                    <Text className={ textClass }>QR của tôi</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <AntDesign name="sharealt" size={ 20 } color="black" />
                    <Text className={ textClass }>Chia sẻ biến động số dư</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <FontAwesome5 name="store" size={ 20 } color="black" />
                    <Text className={ textClass }>Quản lý cửa hàng</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass } onPress={ () => router.push( '/bank-account' ) }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <Ionicons name="information-circle-outline" size={ 25 } color="black" />
                    <Text className={ textClass }>Chi tiết tài khoản</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass } onPress={ () => router.push( '/(tabs)/history' ) }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <FontAwesome5 name="list" size={ 20 } color="black" />
                    <Text className={ textClass }>Lịch sử giao dịch</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass } onPress={ () => router.push( '/(tabs)/history/statistics' ) }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <EvilIcons name="chart" size={ 30 } color="black" />
                    <Text className={ textClass }>Thống kê giao dịch</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity className={ itemClass }>
                <View className='h-24 items-center justify-center border border-gray-300 rounded-md p-2'>
                    <FontAwesome5 name="money-check" size={ 20 } color="black" />
                    <Text className={ textClass }>Gia hạn dịch vụ</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}