import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { formatCardNumber } from "@/utils/format";
import { IBankingTransaction } from "@/interface/IBanking";
import { useMemo, useCallback } from 'react';

// Constants
const CARD_DIMENSIONS = {
    width: 320,
    height: 200
};

const BANK_GRADIENTS: Record<string, [ string, string ]> = {
    bidv: [ '#006F4E', '#4CAF50' ],
    techcombank: [ '#BB0F23', '#F44336' ],
    mbbank: [ '#1A237E', '#3F51B5' ],
    vietcombank: [ '#FFD700', '#FFA500' ],
    default: [ '#0284c7', '#1e293b' ]
};

interface BankingCardProps extends IBankingTransaction
{
    onPress?: ( card: IBankingTransaction ) => void;
}

export default function BankingCard ( props: BankingCardProps )
{
    const { onPress, ...bankCard } = props;
    console.log( "------bank account" )
    // Memoized gradient calculation
    const cardGradient = useMemo( (): [ string, string ] =>
    {
        if ( !bankCard.bankName ) return BANK_GRADIENTS.default;

        const bankKey = Object.keys( BANK_GRADIENTS ).find( key =>
            key !== 'default' &&
            bankCard.bankName?.toLowerCase().includes( key )
        );

        return BANK_GRADIENTS[ bankKey || 'default' ];
    }, [ bankCard.bankName ] );

    // Memoized press handler
    const handlePress = useCallback( () =>
    {
        if ( onPress )
        {
            onPress( bankCard );
        } else
        {
            router.push( `/bank/${ bankCard.STK }` );
        }
    }, [ bankCard, onPress ] );

    // Safe data access
    const displayName = bankCard.name || 'Unknown Account';
    const displayBankName = bankCard.bankName || 'Unknown Bank';
    const displaySTK = bankCard.STK || '****';

    return (
        <TouchableWithoutFeedback
            onPress={ handlePress }
            accessibilityRole="button"
            accessibilityLabel={ `Banking card for ${ displayBankName }, account holder ${ displayName }` }
            accessibilityHint="Double tap to view account details"
        >
            <View
                className="rounded-2xl shadow-lg"
                style={ {
                    width: CARD_DIMENSIONS.width,
                    height: CARD_DIMENSIONS.height
                } }
            >
                <LinearGradient
                    className='h-full w-full rounded-2xl p-5 justify-between overflow-hidden'
                    colors={ cardGradient }
                    start={ { x: 0, y: 0 } }
                    end={ { x: 1, y: 1 } }
                >
                    {/* Header with chip and bank info */ }
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center flex-1">
                            <View className="w-12 h-9 mr-3">
                                <Image
                                    source={ require( '@/assets/images/chip.png' ) }
                                    className="w-full h-12"
                                    resizeMode="contain"
                                    accessibilityLabel="Card chip"
                                />
                            </View>
                            <Text
                                className="text-white text-lg font-bold flex-1"
                                numberOfLines={ 1 }
                                ellipsizeMode="tail"
                            >
                                { displayBankName }
                            </Text>
                        </View>

                        { bankCard.logoBanking && (
                            <Image
                                source={ { uri: bankCard.logoBanking } }
                                className="w-12 h-12 bg-white rounded-full"
                                resizeMode="contain"
                                onError={ () => console.warn( 'Failed to load bank logo' ) }
                                accessibilityLabel={ `${ displayBankName } logo` }
                            />
                        ) }
                    </View>

                    {/* Account number section */ }
                    <View className="mt-4">
                        <Text className="text-white/80 text-xs mb-1">
                            Số tài khoản
                        </Text>
                        <Text
                            className="text-white text-xl tracking-widest font-semibold"
                            numberOfLines={ 1 }
                            adjustsFontSizeToFit
                        >
                            { formatCardNumber( displaySTK ) }
                        </Text>
                    </View>

                    {/* Footer with account holder and card network */ }
                    <View className="mt-4 justify-between flex-row items-end">
                        <View className="flex-1 mr-4">
                            <Text className="text-white/80 text-xs mb-1">
                                Chủ tài khoản
                            </Text>
                            <Text
                                className="text-white text-base font-medium"
                                numberOfLines={ 1 }
                                ellipsizeMode="tail"
                            >
                                { displayName.toUpperCase() }
                            </Text>
                        </View>

                        <View className="flex-row items-center">
                            <FontAwesome
                                name="wifi"
                                size={ 16 }
                                color="white"
                                style={ {
                                    transform: [ { rotate: '90deg' } ],
                                    marginRight: 8
                                } }
                                accessibilityLabel="Contactless payment"
                            />
                            <Image
                                source={ require( '@/assets/images/master-card.png' ) }
                                className="w-14 h-14"
                                resizeMode="contain"
                                accessibilityLabel="Mastercard"
                            />
                        </View>
                    </View>

                    {/* Decorative background elements */ }
                    <View
                        className="absolute w-40 h-40 rounded-full bg-white/5"
                        style={ {
                            top: 48,
                            right: -20,
                            transform: [ { translateY: -20 } ]
                        } }
                    />
                    <View
                        className="absolute w-60 h-60 rounded-full bg-white/5"
                        style={ {
                            bottom: -30,
                            left: -30,
                            transform: [ { translateY: 30 } ]
                        } }
                    />
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
}