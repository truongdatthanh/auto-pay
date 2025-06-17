import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, StatusBar } from "react-native";
import mockDataBankingCard from "@/assets/banking-card.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useCardStore } from "@/store/useCardStore";
import { IBankingTransaction } from "@/interface/IBanking";

export default function CreateMyQR ()
{
    const selectedCard = useCardStore( state => state.selectedCard );
    const setSelectedCard = useCardStore( state => state.setSelectedCard )
    const [ amount, setAmount ] = useState( "10000" );
    const [ content, setContent ] = useState( "abc" );
    const data = mockDataBankingCard;
    const [ showCardSelector, setShowCardSelector ] = useState( false );
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

    // Hàm submit để tạo mã QR thanh toán
    const handleSubmit = () =>
    {
        if ( !selectedCard )
        {
            alert( "Vui lòng chọn tài khoản ngân hàng" );
            return;
        }

        if ( amount === "" )
        {
            alert( "Vui lòng nhập đầy đủ thông tin" );
            return;
        }

        const qrData = {
            accountNumber: selectedCard.STK,
            amount: amount,
            bin: selectedCard.bankbin,
            content: content,
            bankName: selectedCard.bankName,
            bankLogo: selectedCard.logoBanking,
            accountName: selectedCard.name
        };

        router.push( {
            pathname: "/qr/display",
            params: {
                data: JSON.stringify( qrData )
            },
        } );
    };
    // ---------------------------------- END ------------------------------------- //

    // Hàm chọn thẻ ngân hàng
    const handleSelectCard = useCallback( ( card: IBankingTransaction ) =>
    {
        setSelectedCard( card );
        setShowCardSelector( false );
    }, [ setSelectedCard ] );
    // ---------------------------------- END ------------------------------------- //

    const handleAmountChange = ( text: string ) =>
    {
        // Allow only numeric values and prevent negative or excessive amounts
        const numericValue = text.replace( /[^0-9]/g, '' );
        if ( numericValue && Number( numericValue ) > 1_000_000_000 )
        {
            // Example max limit: 1 billion VND
            alert( 'Số tiền vượt quá giới hạn cho phép (1 tỷ VNĐ)' );
            return;
        }
        setAmount( numericValue );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
                <KeyboardAwareScrollView
                    ref={ scrollViewRef }
                    enableOnAndroid
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={ { flexGrow: 1 } }
                    keyboardDismissMode="interactive"
                    keyboardOpeningTime={ 250 }
                >
                    <View className="flex-1 bg-black">
                        <View className="flex-1 bg-[#f8f8f8] rounded-t-[32px] px-5 pt-6">
                            <View className="items-center my-4">
                                <Text className="text-4xl font-bold text-black italic">⛛ AUTOPAY </Text>
                            </View>

                            {/* Số tài khoản */ }
                            <View className="mb-6">
                                <Text className="text-gray-700 font-medium mb-2 ml-1">Số tài khoản</Text>
                                <TouchableOpacity
                                    className="bg-white rounded-xl overflow-hidden border border-gray-300"
                                    onPress={ () => setShowCardSelector( true ) }
                                >
                                    { selectedCard ? (
                                        <View className="p-4">
                                            <View className="flex-row justify-between items-center">
                                                <View className="flex-row items-center">
                                                    <Image
                                                        source={ require( "@/assets/images/bank-black.png" ) }
                                                        className="w-7 h-7 mr-8"
                                                    />
                                                    <Text className="font-semibold text-md">{ selectedCard.STK }</Text>
                                                </View>
                                                <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="black" />
                                            </View>
                                        </View>
                                    ) : (
                                        <View className="p-4 flex-row justify-between items-center">
                                            <Text className="text-gray-400">Chọn tài khoản ngân hàng</Text>
                                            <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
                                        </View>
                                    ) }
                                </TouchableOpacity>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */ }

                            {/* Tên chủ tài khoản */ }
                            <View className="mb-6 ">
                                <Text className="text-gray-700 font-medium mb-2 ml-1">Tên chủ tài khoản</Text>
                                <View className="bg-gray-300 rounded-xl overflow-hidden  border border-gray-500">
                                    <View className="flex-row items-center px-4 py-4">
                                        <Image source={ require( "@/assets/images/user.png" ) } className="w-7 h-7 mr-4" />
                                        <Text className="text-gray-500 font-semibold text-md"> { selectedCard?.name?.toUpperCase() }</Text>
                                    </View>
                                </View>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */ }

                            {/* Số tiền */ }
                            <View className="mb-6">
                                <Text className="text-gray-700 font-medium mb-2 ml-1">Số tiền</Text>
                                <View className="bg-white rounded-xl overflow-hidden border border-gray-300">
                                    <View className="flex-row items-center px-4 py-2">
                                        <Image source={ require( "@/assets/images/coin.png" ) } className="w-7 h-7 mr-4" />
                                        <TextInput
                                            className="flex-1 font-semibold text-md"
                                            placeholder="Nhập số tiền thanh toán"
                                            keyboardType="numeric"
                                            value={ amount }
                                            onChangeText={ handleAmountChange }
                                        />
                                        <Text>VNĐ</Text>
                                    </View>
                                </View>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */ }

                            {/* Nội dung */ }
                            <View className="mb-8">
                                <Text className="text-gray-700 font-medium mb-2 ml-1">Nội dung chuyển khoản</Text>
                                <View className="bg-white rounded-xl overflow-hidden  border border-gray-300">
                                    <TextInput
                                        className="p-4 text-gray-800 text-base"
                                        placeholder="Nhập nội dung chuyển khoản"
                                        multiline={ true }
                                        numberOfLines={ 4 }
                                        textAlignVertical="top"
                                        maxLength={ 100 }
                                        value={ content }
                                        onChangeText={ setContent }
                                        keyboardType="email-address"
                                    />
                                    <View className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex-row justify-end">
                                        <Text className="text-gray-500 text-xs">{ content.length }/100</Text>
                                    </View>
                                </View>
                            </View>
                            {/* -----------------------------------------End----------------------------------------- */ }

                            {/* Button Submit */ }
                            <TouchableOpacity
                                className={ `rounded-xl py-4 mb-8 ${ selectedCard && amount ? "bg-[#1c40f2]" : "bg-gray-300"
                                    }` }
                                onPress={ handleSubmit }
                                disabled={ !selectedCard || !amount }
                            >
                                <View className="flex-row justify-center items-center">
                                    <Ionicons name="qr-code" size={ 20 } color="white" className="mr-2" />
                                    <Text className="text-white font-bold text-base ml-2">Tạo mã QR</Text>
                                </View>
                            </TouchableOpacity>
                            {/* -----------------------------------------End----------------------------------------- */ }
                        </View>


                        {/* Modal chọn thẻ */ }
                        <Modal
                            visible={ showCardSelector }
                            transparent={ true }
                            animationType="slide"
                            onRequestClose={ () => setShowCardSelector( false ) }
                        >
                            <View className="flex-1 bg-black/70 justify-end">
                                <View className="bg-white rounded-t-3xl p-5 max-h-[70%]">
                                    <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
                                    <View className="flex-row justify-between items-center mb-4">
                                        <Text className="text-xl font-bold">Chọn tài khoản</Text>
                                        <TouchableOpacity
                                            onPress={ () => setShowCardSelector( false ) }
                                            className="bg-gray-100 rounded-full p-2"
                                        >
                                            <Ionicons name="close" size={ 24 } color="#666" />
                                        </TouchableOpacity>
                                    </View>

                                    <ScrollView className="max-h-[500px]">
                                        { data.map( ( card, index ) => (
                                            <TouchableOpacity
                                                key={ card.id }
                                                className={ `border-b border-gray-200 p-4 rounded-xl ${ selectedCard?.STK === card.STK ? "bg-blue-50 border border-blue-200" : ""
                                                    }` }
                                                onPress={ () => handleSelectCard( card ) }
                                            >
                                                <View className="flex-row justify-between items-center">
                                                    <View className="flex-row items-center">
                                                        <Image
                                                            source={ { uri: card.logoBanking } }
                                                            className="w-12 h-12 rounded-lg mr-3"
                                                            resizeMode="contain"
                                                        />
                                                        <View>
                                                            <Text className="font-medium text-gray-800">{ card.bankName }</Text>
                                                            <Text className="text-gray-500 text-sm mt-1">{ card.STK }</Text>
                                                        </View>
                                                    </View>
                                                    { selectedCard?.STK === card.STK && (
                                                        <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
                                                    ) }
                                                </View>
                                            </TouchableOpacity>
                                        ) ) }
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </View>
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback>
        </>
    );
}

