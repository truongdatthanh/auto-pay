
import { View, Text } from 'react-native';
import { INotification } from '@/interface/INotification';

interface PromotionContentProps
{
    item: INotification;
}

export default function PromotionContent ( { item }: PromotionContentProps )  
{
    return (
        <>
            <View className="flex-1">
                <Text className="text-sm text-white mt-1">{ item.time }</Text>
                <Text className="text-sm text-white mt-1">{ item.content }</Text>
            </View>
        </>
    );
}


