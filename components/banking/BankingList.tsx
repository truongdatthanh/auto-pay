import { Text, View } from "react-native";
import mockBanking from '@/assets/banking.json';
import BankingItem from "./BankingItem";

export default function BankingList ()
{
    const bankData = mockBanking;

    return (
        <View>
            <View className='px-4'>
                <Text className="text-md font-bold text-black">Ngân hàng liên kết</Text>
                <Text className='text-sm text-gray-400'>Chọn ngân hàng để thêm/ liên kết</Text>
            </View>

            <View className='py-2 gap-1 bg-white shadow-md mt-2 mx-4 rounded-lg'>
                { bankData.map( ( item ) => (
                    <BankingItem key={ item.id } item={ item } />
                ) ) }
            </View>
        </View>
    );
}