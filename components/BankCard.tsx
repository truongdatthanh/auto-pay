import React from "react";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { router } from "expo-router";
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface IBankCard
{
    id: string | undefined;
    STK: string | undefined;
    name: string | undefined;
    logoBanking: string | undefined;
    bankName: string | undefined;
}

export default function BankingCard ( props: IBankCard )
{
    const bankCard: IBankCard = props;

    // Format card number with spaces for better readability
    const formatCardNumber = ( cardNumber: string | undefined ) =>
    {
        if ( !cardNumber ) return "";
        return cardNumber.replace( /(\d{4})/g, "$1 " ).trim();
    };

    const handleBankCardDetail = () =>
    {
        console.log( "pressed!" )
        router.push( {
            pathname: "/bank-account",
            params: { id: JSON.stringify( bankCard.STK ) }
        } );
    };

    // Determine gradient colors based on bank name (could be expanded)
    const getCardGradient = (): [ string, string ] =>
    {
        // Default blue gradient
        let colors: [ string, string ] = [ '#1e3a8a', '#3b82f6' ];

        // Custom gradients for specific banks
        if ( bankCard.bankName?.toLowerCase().includes( 'vietcombank' ) )
        {
            return [ '#006F4E', '#4CAF50' ];
        } else if ( bankCard.bankName?.toLowerCase().includes( 'techcombank' ) )
        {
            return [ '#BB0F23', '#F44336' ];
        } else if ( bankCard.bankName?.toLowerCase().includes( 'mb bank' ) )
        {
            return [ '#1A237E', '#3F51B5' ];
        } else if ( bankCard.bankName?.toLowerCase().includes( 'bidv' ) )
        {
            return [ '#FFD700', '#FFA500' ];
        }

        return colors;
    };

    return (
        <TouchableWithoutFeedback onPress={ handleBankCardDetail }>
            <View className="w-[320] h-[200]">
                <LinearGradient
                    className='h-full w-full rounded-2xl p-5 justify-between overflow-hidden'
                    colors={ getCardGradient() }
                    start={ { x: 0, y: 0 } }
                    end={ { x: 1, y: 1 } }
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <View className="w-12 h-9 bg-yellow-300/80 rounded-md mr-3" style={ {
                                borderWidth: 0.5,
                                borderColor: 'rgba(255,255,255,0.3)'
                            } }>
                                <View className="w-full h-full justify-center items-center">
                                    <View className="w-8 h-5 border-[0.5px] border-yellow-800/50 rounded-sm" />
                                </View>
                            </View>
                            <Text className="text-white text-lg font-bold">{ bankCard.bankName }</Text>
                        </View>
                        <Image
                            source={ { uri: bankCard.logoBanking } }
                            className="w-12 h-12 bg-white rounded-full"
                            resizeMode="contain"
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="text-white/80 text-xs mb-1">Số tài khoản</Text>
                        <Text className="text-white text-xl tracking-widest font-semibold">
                            { formatCardNumber( bankCard.STK ) }
                        </Text>
                    </View>

                    <View className="mt-4 justify-between flex-row items-end">
                        <View>
                            <Text className="text-white/80 text-xs mb-1">Chủ tài khoản</Text>
                            <Text className="text-white text-base">{ bankCard.name }</Text>
                        </View>
                        <View className="flex-row items-center">
                            <FontAwesome name="wifi" size={ 16 } color="white" style={ { transform: [ { rotate: '90deg' } ], marginRight: 8 } } />
                            <Image
                                source={ require( '../assets/images/master-card.png' ) }
                                className="w-14 h-14"
                                resizeMode="contain"
                            />
                        </View>
                    </View>

                    <View className="absolute top-12 right-0 w-40 h-40 rounded-full bg-white/10" style={ { transform: [ { translateX: 20 }, { translateY: -20 } ] } } />
                    <View className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-black/5" style={ { transform: [ { translateX: -30 }, { translateY: 30 } ] } } />
                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    );
}