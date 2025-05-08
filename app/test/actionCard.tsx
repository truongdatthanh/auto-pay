import ActionCard from '@/components/ActionCard';
import React from 'react';
import { View, Alert, ScrollView } from 'react-native';

export default function ActionCardExample ()
{
    const handleActivate = () =>
    {
        Alert.alert( 'Kích hoạt thành công', 'Bạn đã kích hoạt dịch vụ này!' );
    };

    const handlePayment = () =>
    {
        Alert.alert( 'Thanh toán', 'Đang chuyển đến trang thanh toán...' );
    };

    const handleConnect = () =>
    {
        Alert.alert( 'Kết nối', 'Đang kết nối với thiết bị...' );
    };

    return (
        <ScrollView className="flex-1 bg-gray-100 pt-4">
            {/* Thẻ mặc định */ }
            <ActionCard
                logo={ require( '../../assets/images/logo-autopay-4.png' ) }
                title="Kích hoạt AutoPAY"
                description="Thanh toán tự động, không lo trễ hạn"
                buttonText="Kích hoạt ngay"
                onPress={ handleActivate }
            />

            {/* Thẻ với màu sắc tùy chỉnh */ }
            <ActionCard
                logo={ require( '../../assets/images/500.jpg' ) }
                title="Thanh toán hóa đơn"
                description="Thanh toán nhanh chóng và an toàn"
                buttonText="Thanh toán"
                onPress={ handlePayment }
                backgroundColor="#f0f8ff"
                buttonColor="#ff6b6b"
            />

            {/* Thẻ với màu sắc khác */ }
            <ActionCard
                logo={ require( '../../assets/images/logo-autopay-4.png' ) }
                title="Kết nối thiết bị"
                buttonText="Kết nối"
                onPress={ handleConnect }
                backgroundColor="#1c40f2"
                textColor="#ffffff"
                buttonColor="#ffffff"
                buttonTextColor="#1c40f2"
            />
        </ScrollView>
    );
} 