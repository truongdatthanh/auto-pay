import { View } from 'react-native';

interface UnreadDotProps
{
    isUnread: boolean;
    show: boolean;
}

//hình tròn màu đỏ để đánh dấu chưa đọc
export default function UnreadDot ( { isUnread, show }: UnreadDotProps )
{
    if ( !isUnread || !show ) return null;

    return (
        // <View className="absolute right-0">
        <View className="relative">
            {/* <View className="h-5 w-5 bg-white shadow-md rounded-full absolute top-[-5] right-[-3] flex items-center justify-center"> */ }
            <View className="h-2 w-2 bg-red-500 rounded-full absolute top-[-2] right-[-1]" />
        </View>
        // </View>
        // </View>
    );
};

