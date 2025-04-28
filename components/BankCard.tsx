
import { Dimensions, Image, Text, Touchable, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";

interface IBankCard
{
    id: string | undefined,
    STK: string | undefined
    name: string | undefined,
    logoBanking: string | undefined,
    bankName: string | undefined,
}

export default function BankingCard ( props: IBankCard )
{
    const bankCard: IBankCard = props;

    const handleBankCardDetail = () =>
    {
        router.push( {
            pathname: "/bank-account",
            params: {id: JSON.stringify(bankCard.STK)}
        })
    }
    return (
        <TouchableWithoutFeedback onPress={ handleBankCardDetail }>
            <LinearGradient
                className='h-[180] w-[320] p-5 justify-between'
                colors={ [ '#1e3a8a', '#3b82f6' ] }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
                style={ { borderRadius: 10 } }
            >
                <View className="flex-row items-center justify-between">
                    <Text className="text-white text-lg font-bold">{ bankCard.bankName }</Text>
                    <Image
                        source={ { uri: bankCard.logoBanking } }
                        className="w-12 h-12 bg-white rounded-full"
                        resizeMode="contain"
                    />
                </View>

                <View className="mt-6 justify-between flex-row">
                    <View>
                        <Text className="text-white text-xl tracking-widest font-semibold">
                            { bankCard.STK }
                        </Text>
                        <Text className="text-white text-base mt-1">{ bankCard.name }</Text>
                    </View>
                    <View>
                        <Image source={ require( '../assets/images/master-card.png' ) } className="w-16 h-16" resizeMode="contain" />
                    </View>

                </View>
            </LinearGradient>
        </TouchableWithoutFeedback>

    );
}
