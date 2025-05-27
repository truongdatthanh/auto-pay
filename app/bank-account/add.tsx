import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import mockBanking from '@/assets/banking.json';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

export default function AddCard ()
{
    const banks = mockBanking;
    const [ selectedBank, setSelectedBank ] = useState( banks[ 0 ] );
    const [ accountNumber, setAccountNumber ] = useState( '' );
    const [ accountHolder, setAccountHolder ] = useState( '' );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ step, setStep ] = useState( 1 );
    const [ isValid, setIsValid ] = useState( false );

    // Validate form
    useEffect( () =>
    {
        if ( step === 1 )
        {
            setIsValid( selectedBank !== null );
        } else if ( step === 2 )
        {
            setIsValid( accountNumber.length >= 10 );
        } else if ( step === 3 )
        {
            setIsValid( accountHolder.length >= 3 );
        }
    }, [ selectedBank, accountNumber, accountHolder, step ] );
    // --------------------------------- END ------------------------------------- //

    // Format account number with spaces
    const formatAccountNumber = ( text: any ) =>
    {

        // Remove all non-numeric characters
        const cleaned = text.replace( /[^0-9]/g, '' );

        // Format with spaces every 4 digits
        let formatted = '';
        for ( let i = 0; i < cleaned.length; i++ )
        {
            if ( i > 0 && i % 4 === 0 )
            {
                formatted += ' ';
            }
            formatted += cleaned[ i ];
        }
        return formatted;
    };
    // --------------------------------- END ------------------------------------- //


    // Handle account number change
    const handleAccountNumberChange = ( text: any ) =>
    {
        const formatted = formatAccountNumber( text );
        setAccountNumber( formatted );
    };
    // --------------------------------- END ------------------------------------- //


    // Handle next step
    const goToNextStep = () =>
    {
        if ( step < 3 && isValid )
        {
            setStep( step + 1 );
        } else if ( step === 3 && isValid )
        {
            handleSubmit();
        }
    };
    // --------------------------------- END ------------------------------------- //


    // Handle previous step
    const goToPreviousStep = () =>
    {
        if ( step > 1 )
        {
            setStep( step - 1 );
        } else
        {
            router.back();
        }
    };
    // --------------------------------- END ------------------------------------- //


    // Handle submit
    const handleSubmit = async () =>
    {
        if ( !accountNumber || !accountHolder )
        {
            Alert.alert( 'Lỗi', 'Vui lòng nhập đầy đủ thông tin.' );
            return;
        }
        setIsLoading( true );
        try
        {
            // Simulate API call
            await new Promise( resolve => setTimeout( resolve, 1500 ) );
            // Create new card object
            const newCard = {
                id: Date.now().toString(),
                STK: accountNumber.replace( /\s/g, '' ),
                name: accountHolder,
                logoBanking: selectedBank.logo,
                bankName: selectedBank.name,
                balance: 0,
                transactionHistory: []
            };
            // Get existing cards from AsyncStorage
            const existingCardsJson = await AsyncStorage.getItem( 'bankingCards' );
            const existingCards = existingCardsJson ? JSON.parse( existingCardsJson ) : [];
            // Add new card and save back to AsyncStorage
            const updatedCards = [ ...existingCards, newCard ];
            await AsyncStorage.setItem( 'bankingCards', JSON.stringify( updatedCards ) );
            // Set as selected card
            await AsyncStorage.setItem( 'selectedCard', JSON.stringify( newCard ) );
            Alert.alert(
                'Thành công',
                'Đã thêm thẻ ngân hàng thành công!',
                [ { text: 'OK', onPress: () => router.back() } ]
            );
        } catch ( error )
        {
            console.error( 'Error adding card:', error );
            Alert.alert( 'Lỗi', 'Có lỗi xảy ra khi thêm thẻ. Vui lòng thử lại sau.' );
        } finally
        {
            setIsLoading( false );
        }
    };
    // --------------------------------- END ------------------------------------- //

    // Render step indicator
    const renderStepIndicator = () => (
        <View className="flex-row justify-center items-center my-8">
            { [ 1, 2, 3 ].map( ( i ) => (
                <View key={ i } className="flex-row items-center">
                    <View
                        className={ `w-8 h-8 rounded-full justify-center items-center ${ i === step ? 'bg-black' : i < step ? 'bg-green-500' : 'bg-gray-300'
                            }` }
                    >
                        { i < step ? (
                            <Ionicons name="checkmark" size={ 18 } color="white" />
                        ) : (
                            <Text className="text-white font-bold">{ i }</Text>
                        ) }
                    </View>
                    { i < 3 && (
                        <View className={ `w-16 h-1 ${ i < step ? 'bg-green-500' : 'bg-gray-300' }` } />
                    ) }
                </View>
            ) ) }
        </View>
    );
    // --------------------------------- END ------------------------------------- //

    // Render step content
    const renderStepContent = () =>
    {
        switch ( step )
        {
            case 1:
                return (
                    <Animated.View
                        entering={ FadeInUp.duration( 400 ) }
                        className="flex-1 px-4"
                    >
                        <Text className="text-xl font-bold mb-6">Chọn ngân hàng của bạn</Text>
                        <ScrollView className="flex-1 mb-4">
                            { banks.map( ( bank ) => (
                                <TouchableOpacity
                                    key={ bank.id }
                                    className={ `flex-row items-center p-4 mb-3 border rounded-xl ${ selectedBank.id === bank.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-gray-200 bg-white'
                                        }` }
                                    onPress={ () => setSelectedBank( bank ) }
                                >
                                    <Image
                                        source={ { uri: bank.logo } }
                                        className="w-12 h-12 rounded-lg mr-4"
                                        resizeMode="contain"
                                    />
                                    <View className="flex-1">
                                        <Text className="font-bold text-gray-800">{ bank.name }</Text>
                                        { selectedBank.id === bank.id && (
                                            <Text className="text-blue-500 text-sm mt-1">Đã chọn</Text>
                                        ) }
                                    </View>
                                    { selectedBank.id === bank.id && (
                                        <Ionicons name="checkmark-circle" size={ 24 } color="#3b82f6" />
                                    ) }
                                </TouchableOpacity>
                            ) ) }
                        </ScrollView>
                    </Animated.View>
                );

            case 2:
                return (
                    <Animated.View
                        entering={ FadeInUp.duration( 400 ) }
                        className="flex-1 px-4"
                    >
                        <Text className="text-xl font-bold mb-2">Nhập số tài khoản</Text>
                        <Text className="text-gray-500 mb-6">Vui lòng nhập số tài khoản của ngân hàng { selectedBank.name }</Text>
                        <View className="flex-row items-center mb-2">
                            <Image
                                source={ { uri: selectedBank.logo } }
                                className="w-10 h-10 rounded-lg mr-3"
                                resizeMode="contain"
                            />
                            <Text className="font-bold">{ selectedBank.name }</Text>
                        </View>
                        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                            <Text className="text-gray-500 text-sm mb-2">Số tài khoản</Text>
                            <TextInput
                                className="text-lg font-medium"
                                keyboardType="numeric"
                                placeholder="Nhập số tài khoản"
                                value={ accountNumber }
                                onChangeText={ handleAccountNumberChange }
                                maxLength={ 19 } // 16 digits + 3 spaces
                                autoFocus
                            />
                        </View>
                        <Text className="text-gray-500 text-sm">
                            Số tài khoản thường có 10-16 chữ số và không chứa ký tự đặc biệt
                        </Text>
                    </Animated.View>
                );

            case 3:
                return (
                    <Animated.View
                        entering={ FadeInUp.duration( 400 ) }
                        className="flex-1 px-4"
                    >
                        <Text className="text-xl font-bold mb-2">Tên chủ tài khoản</Text>
                        <Text className="text-gray-500 mb-6">Vui lòng nhập đúng tên chủ tài khoản</Text>
                        <View className="flex-row items-center mb-4">
                            <Image
                                source={ { uri: selectedBank.logo } }
                                className="w-10 h-10 rounded-lg mr-3"
                                resizeMode="contain"
                            />
                            <View>
                                <Text className="font-bold">{ selectedBank.name }</Text>
                                <Text className="text-gray-500">{ accountNumber }</Text>
                            </View>
                        </View>
                        <View className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                            <Text className="text-gray-500 text-sm mb-2">Tên chủ tài khoản</Text>
                            <TextInput
                                className="text-lg font-medium"
                                placeholder="Nhập tên chủ tài khoản"
                                value={ accountHolder }
                                onChangeText={ setAccountHolder }
                                autoCapitalize="words"
                                autoFocus
                            />
                        </View>
                        <Text className="text-gray-500 text-sm">
                            Tên chủ tài khoản phải trùng khớp với thông tin đăng ký tại ngân hàng
                        </Text>
                    </Animated.View>
                );

            default:
                return null;
        }
    };
    // --------------------------------- END ------------------------------------- //

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
            className="flex-1 bg-slate-50"
        >
            <StatusBar style="dark" />
            {/* Header */ }
            <Animated.View
                entering={ FadeInDown.duration( 400 ) }
                className="pb-2 px-4 bg-white border-b border-gray-200"
            >
                { step > 1 && (
                    <View className="flex-row items-center mt-2">
                        <TouchableOpacity onPress={ goToPreviousStep } className="p-2">
                            <Ionicons name="arrow-back" size={ 24 } color="#333" />
                        </TouchableOpacity>
                        <Text className="text-xl font-bold ml-2">Quay lại bước trước</Text>
                    </View>
                ) }
                { renderStepIndicator() }
            </Animated.View>
            {/* Content */ }
            <ScrollView className="flex-1">
                { renderStepContent() }
            </ScrollView>
            {/* Footer */ }
            <Animated.View
                entering={ FadeInUp.duration( 400 ) }
                className="p-4 bg-white border-t border-gray-200"
            >
                <TouchableOpacity
                    className={ `py-4 rounded-xl items-center ${ isValid ? 'bg-blue-500' : 'bg-gray-300'
                        }` }
                    onPress={ goToNextStep }
                    disabled={ !isValid || isLoading }
                >
                    { isLoading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text className="text-white font-bold text-lg">
                            { step < 3 ? 'Tiếp tục' : 'Hoàn tất' }
                        </Text>
                    ) }
                </TouchableOpacity>
            </Animated.View>
        </KeyboardAvoidingView>
    );
}