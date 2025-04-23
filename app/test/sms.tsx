
import * as SMS from 'expo-sms';
import { Button, View } from 'react-native';

export default function TestSMS ()
{
    const sendSMS = async () =>
    {
        const isAvailable = await SMS.isAvailableAsync();
        if ( isAvailable )
        {
            const { result } = await SMS.sendSMSAsync(
                [ '0943369278' ], // Số điện thoại người nhận
                'Xin chào! Đây là tin nhắn từ ứng dụng Expo.' // Nội dung tin nhắn
            );
            console.log( result ); // Kết quả: sent, cancelled,...
        } else
        {
            alert( 'Thiết bị không hỗ trợ gửi SMS' );
        }
    };

    return (
        <View style={ { padding: 20 } }>
            <Button title="Gửi SMS" onPress={ sendSMS } />
        </View>
    );
}
