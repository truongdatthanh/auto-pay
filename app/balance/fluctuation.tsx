import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import ViewShot from 'react-native-view-shot';
import { Share } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get( 'window' );

const mockData = {
    labels: [ "T2", "T3", "T4", "T5", "T6", "T7", "CN" ],
    datasets: [
        {
            data: [ 20, 45, 28, 80, 99, 43, 76 ],
            color: ( opacity = 1 ) => `rgba(28, 64, 242, ${ opacity })`,
            strokeWidth: 2
        }
    ],
    legend: [ "Biến động số dư" ]
};

export default function ShareBalanceFluctuation ()
{
    const [ isLoading, setIsLoading ] = useState( false );
    const [ captureReady, setCaptureReady ] = useState( false );
    const viewShotRef = useRef<ViewShot>( null );

    const balanceData = {
        currentBalance: "12,500,000",
        currency: "VND",
        percentChange: 12.5,
        isPositive: true,
        period: "tuần này"
    };

    useEffect( () =>
    {
        const timer = setTimeout( () => setCaptureReady( true ), 500 );
        return () => clearTimeout( timer );
    }, [] );

    const handleShare = async () =>
    {
        if ( !captureReady ) return;

        try
        {
            Haptics.impactAsync( Haptics.ImpactFeedbackStyle.Medium );
            setIsLoading( true );

            const uri = await viewShotRef.current?.capture?.();
            const result = await Share.share( {
                title: 'Biến động số dư AutoPAY',
                message: 'Xem biến động số dư tài khoản AutoPAY của tôi trong tuần này!',
                url: Platform.OS === 'ios' ? uri : `file://${ uri }`,
            } );

        } catch ( error )
        {
            console.error( 'Error sharing:', error );
        } finally
        {
            setIsLoading( false );
        }
    };

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Header */ }
            <LinearGradient
                colors={ [ '#1c40f2', '#3b5fe2' ] }
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
                className="pt-12 pb-4"
            >
                <SafeAreaView edges={ [ 'top' ] }>
                    <View className="flex-row items-center px-4 pt-2">
                        <TouchableOpacity
                            onPress={ () => router.back() }
                            className="p-2 rounded-full bg-white/20 mr-3"
                        >
                            <Ionicons name="arrow-back-outline" size={ 22 } color="white" />
                        </TouchableOpacity>
                        <Text className="text-lg font-bold text-white">Chia sẻ biến động số dư</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            {/* Content */ }
            <SafeAreaView edges={ [ 'bottom' ] } className="flex-1 px-4">
                <Animated.View entering={ FadeInDown.duration( 500 ) } className="mt-6">
                    <Text className="text-base font-semibold text-gray-600 mb-3 ml-1">Xem trước</Text>

                    <View className="rounded-2xl shadow-md overflow-hidden bg-white">
                        <ViewShot
                            ref={ viewShotRef }
                            options={ { format: 'jpg', quality: 0.9 } }

                        >
                            <View className="p-4">

                                {/* Card Header */ }
                                <View className="flex-row items-center mb-4">
                                    <Image source={ require( '@/assets/images/logo-autopay.png' ) } className="w-8 h-8 mr-3" />
                                    <Text className="text-lg font-bold text-[#1c40f2]">Biến động số dư</Text>
                                </View>

                                {/* Balance Info */ }
                                <View className="mb-5">
                                    <Text className="text-sm text-gray-500 mb-1">Số dư hiện tại</Text>
                                    <View className="flex-row items-end">
                                        <Text className="text-2xl font-bold text-gray-900">{ balanceData.currentBalance }</Text>
                                        <Text className="text-base font-semibold text-gray-500 ml-1 mb-1">{ balanceData.currency }</Text>
                                    </View>
                                    <View className="flex-row items-center mt-2">
                                        <MaterialCommunityIcons
                                            name={ balanceData.isPositive ? "arrow-up-bold" : "arrow-down-bold" }
                                            size={ 16 }
                                            color={ balanceData.isPositive ? "#10b981" : "#ef4444" }
                                        />
                                        <Text className={ `text-sm font-medium ml-1 ${ balanceData.isPositive ? 'text-green-500' : 'text-red-500' }` }>
                                            { balanceData.percentChange }% trong { balanceData.period }
                                        </Text>
                                    </View>
                                </View>

                                {/* Chart */ }
                                <View className="items-center mb-4">
                                    <LineChart
                                        data={ mockData }
                                        width={ width - 80 }
                                        height={ 180 }
                                        chartConfig={ {
                                            backgroundColor: "#fff",
                                            backgroundGradientFrom: "#fff",
                                            backgroundGradientTo: "#fff",
                                            decimalPlaces: 0,
                                            color: ( opacity = 1 ) => `rgba(28, 64, 242, ${ opacity })`,
                                            labelColor: ( opacity = 1 ) => `rgba(0, 0, 0, ${ opacity })`,
                                            style: { borderRadius: 16 },
                                            propsForDots: {
                                                r: "4",
                                                strokeWidth: "2",
                                                stroke: "#1c40f2"
                                            }
                                        } }
                                        bezier
                                        style={ { borderRadius: 16, marginVertical: 8 } }
                                    />
                                </View>

                                {/* Footer */ }
                                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                                    <Text className="text-xs text-gray-500">AutoPAY - Thanh toán thông minh</Text>
                                    <Text className="text-xs text-gray-500">{ new Date().toLocaleDateString( 'vi-VN' ) }</Text>
                                </View>

                            </View>
                        </ViewShot>
                    </View>
                </Animated.View>

                {/* Share Button */ }
                <Animated.View entering={ FadeInUp.duration( 500 ) } className="mt-8">
                    <TouchableOpacity
                        onPress={ handleShare }
                        disabled={ isLoading || !captureReady }
                        className="bg-[#1c40f2] rounded-xl py-4 flex-row justify-center items-center shadow-lg shadow-blue-500/30"
                    >
                        { isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Ionicons name="share-social-outline" size={ 20 } color="#ffffff" className="mr-2" />
                                <Text className="text-white font-semibold text-base">Chia sẻ ngay</Text>
                            </>
                        ) }
                    </TouchableOpacity>

                    <Text className="text-xs text-gray-500 text-center mt-4 px-6">
                        Thông tin biến động số dư sẽ được chia sẻ dưới dạng hình ảnh và không bao gồm thông tin cá nhân nhạy cảm.
                    </Text>
                </Animated.View>
            </SafeAreaView>
        </View>
    );
}