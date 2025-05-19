import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, StatusBar } from "react-native";
import mockDataBankingCard from "@/assets/banking-card.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateMyQR ()
{
    const params = useLocalSearchParams();
    const { cardSTK } = params;
    const [ amount, setAmount ] = useState( "10000" );
    const [ content, setContent ] = useState( "abc" );
    const  data =  mockDataBankingCard ;
    const [ selectedCard, setSelectedCard ] = useState<any>( null );
    const [ showCardSelector, setShowCardSelector ] = useState( false );

    // Lấy thẻ được chọn từ params hoặc từ AsyncStorage
    useEffect( () =>
    {
        const loadSelectedCard = async () =>
        {
            if ( cardSTK )
            {
                const card = data.find( ( item ) => item.STK === cardSTK );
                if ( card )
                {
                    setSelectedCard( card );
                    return;
                }
            }

            try
            {
                const storedCard = await AsyncStorage.getItem( "selectedCard" );
                if ( storedCard )
                {
                    const parsedCard = JSON.parse( storedCard );
                    setSelectedCard( parsedCard );
                } else if ( data.length > 0 )
                {
                    setSelectedCard( data[ 0 ] );
                }
            } catch ( error )
            {
                console.error( "Lỗi khi lấy thẻ từ AsyncStorage:", error );
                if ( data.length > 0 )
                {
                    setSelectedCard( data[ 0 ] );
                }
            }
        };

        loadSelectedCard();
    }, [ cardSTK, data ] );


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
            STK: selectedCard.STK,
            amount: amount,
            bin: selectedCard.bankbin,
            content: content,
        };

        router.push( {
            pathname: "/qr/display",
            params: {
                data: JSON.stringify( qrData )
            },
        } );
    };

    const handleSelectCard = ( card: any ) =>
    {
        setSelectedCard( card );
        setShowCardSelector( false );

        // Lưu thẻ đã chọn vào AsyncStorage
        AsyncStorage.setItem( "selectedCard", JSON.stringify( card ) )
            .catch( err => console.error( "Lỗi khi lưu thẻ:", err ) );
    };

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            className="flex-1"
        >
            <StatusBar barStyle="light-content" backgroundColor="#1c40f2" />
            <View className="flex-1 bg-[#1c40f2]">
                <View className="flex-1 bg-[#f8f8f8] rounded-t-[32px] px-5 pt-6">
                    <ScrollView showsVerticalScrollIndicator={ false } className="flex-1">
                        <View className="items-center my-4">
                            <Text className="text-4xl font-bold text-[#1c40f2] italic">⛛ AUTOPAY </Text>
                        </View>
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
                                                    source={ require( "@/assets/images/dots.png" ) }
                                                    className="w-5 h-5 mr-8"
                                                />
                                                <Text className="font-semibold text-md">{ selectedCard.STK }</Text>
                                            </View>
                                            <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
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
                                        onChangeText={ setAmount }
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
                    </ScrollView>
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
                                        key={ index }
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
        </KeyboardAvoidingView>
    );
}