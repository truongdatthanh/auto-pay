import { useEffect } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Text, Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, } from 'react-native-reanimated';
import { formatCurrencyVND } from '@/utils/format';

const AnimatedView = Animated.View;

interface PaymentCardProps
{
    id: string;
    amount: number;
    time: string;
    isOpen: boolean;
    toggleOpen: ( id: string ) => void;
}

const PaymentCard = ( { amount, time, id, isOpen, toggleOpen }: PaymentCardProps ) =>
{
    const height = useSharedValue( isOpen ? 30 : 10 );

    useEffect( () =>
    {
        height.value = withTiming( isOpen ? 30 : 10, { duration: 300 } );
    }, [ isOpen ] );

    const animatedStyle = useAnimatedStyle( () => ( {
        height: height.value,
    } ) );

    return (
        <AnimatedView key={ id } className="rounded-lg overflow-hidden">
            <Pressable
                className="bg-white rounded-t-lg flex-row justify-between items-center px-4 py-2"
                onPress={ () => toggleOpen( id ) }
            >
                <View>
                    <Text className="text-gray-500 text-sm">{ id }</Text>
                    <Text className={ `text-md font-bold ${ amount < 0 ? "text-red-500" : "text-green-600" }` }>{ formatCurrencyVND( amount ) }</Text>
                </View>

                <Text className="text-sm text-gray-500">{ time }</Text>
            </Pressable>

            <Animated.View
                style={ animatedStyle }
                className="bg-gray-500 rounded-b-lg px-4 justify-center"
            >
                { isOpen && (
                    <Pressable
                        className="flex-row items-center self-end"
                        onPress={ () =>
                            router.push( {
                                pathname: "/(tabs)/history/transaction/[id]",
                                params: { id },
                            } )
                        }
                    >
                        <Text className="text-white text-sm mr-1">Xem chi tiết</Text>
                        <AntDesign name="arrowright" size={ 12 } color="white" />
                    </Pressable>
                ) }
            </Animated.View>
        </AnimatedView>
    );
};

export default PaymentCard;
