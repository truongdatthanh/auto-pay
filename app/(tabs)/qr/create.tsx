// import { Ionicons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useLocalSearchParams } from "expo-router/build/hooks";
// import { useState } from "react";
// import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import mockDataBankingCard from "../../../assets/banking-card.json"

// export default function CreateMyQR ()
// {
//     const params = useLocalSearchParams();
//     //{cardSTK} là thuộc tính ở cha khi truyền param xuống cho con, nếu thuộc tính không giống nhau sẽ bị undefinded
//     const { cardSTK } = params;
//     const [ amount, setAmount ] = useState( "" );
//     const [ content, setContent ] = useState( "" );
//     const [ data, setData ] = useState( mockDataBankingCard );
//     const currentCard = data.find( ( item ) => item.STK === cardSTK );

//     const handleSubmit = () =>
//     {
//         if ( amount === "" || content === "" )
//         {
//             alert( "Vui lòng nhập đầy đủ thông tin" );
//             return;
//         }

//         const data = {
//             STK: currentCard?.STK,
//             amount: amount,
//             bin: currentCard?.bankbin,
//             content: content,
//         };

//         console.log( "data", data );

//         router.push( {
//             pathname: "/qr/display",
//             params: {
//                 data: JSON.stringify( data )
//             },
//         } );

//     }
//     return (
//         <View className="flex-1 bg-[#1c40f2]">
//             <View className="flex-1 bg-white rounded-t-[40px]">
//                 <View className="mt-4 p-4 rounded-md">
//                     <Text className="">Tài khoản ngân hàng</Text>
//                     <View className="border justify-between flex-row items-center px-6 rounded-full">
//                         <Text className="">{ currentCard?.STK }</Text>
//                         <Image source={ { uri: currentCard?.logoBanking } } className="w-20 h-12" resizeMode="contain" />
//                     </View>
//                 </View>

//                 <View className="mt-4 p-4 rounded-md">
//                     <Text className="">Số tiền giao dịch</Text>
//                     <TextInput className="border px-4 rounded-full"
//                         placeholder="Nhập số tiền thanh toán"
//                         keyboardType="numeric"
//                         value={ amount }
//                         onChangeText={ setAmount }
//                     />
//                 </View>

//                 <View className="mt-4 p-4 rounded-md">
//                     <Text className="">Nội dung</Text>
//                     <TextInput className="border border-gray-400 p-4"
//                         placeholder="Nội dung giao dịch"
//                         keyboardType="default"
//                         multiline={ true }
//                         numberOfLines={ 4 }
//                         textAlignVertical="top"
//                         maxLength={ 100 }
//                         value={ content }
//                         onChangeText={ setContent }
//                     />
//                 </View>

//                 <TouchableOpacity className="bg-blue-500 p-4 rounded-md mt-4" onPress={ handleSubmit }>
//                     <Text className="text-white text-center">Tạo mã QR</Text>
//                 </TouchableOpacity>



//             </View>
//         </View>
//     )
// }

import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import
    {
        Image,
        Modal,
        ScrollView,
        Text,
        TextInput,
        TouchableOpacity,
        View,
        KeyboardAvoidingView,
        Platform,
        StatusBar
    } from "react-native";
import mockDataBankingCard from "../../../assets/banking-card.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateMyQR ()
{
    const params = useLocalSearchParams();
    const { cardSTK } = params;
    const [ amount, setAmount ] = useState( "10000" );
    const [ content, setContent ] = useState( "abc" );
    const [ data, setData ] = useState( mockDataBankingCard );
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

        if ( amount === "" || content === "" )
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

        console.log( "data", qrData );

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

    // Format số tiền khi nhập
    const formatAmount = ( text: string ) =>
    {
        // Chỉ giữ lại số
        const numericValue = text.replace( /[^0-9]/g, '' );
        setAmount( numericValue );
    };

    // Hiển thị số tiền đã format
    const displayAmount = () =>
    {
        if ( !amount ) return "";
        return new Intl.NumberFormat( 'vi-VN' ).format( parseInt( amount ) ) + " VNĐ";
    };

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            className="flex-1"
        >
            <StatusBar barStyle="light-content" backgroundColor="#1c40f2" />
            <View className="flex-1 bg-[#1c40f2]">

                {/* Main Content */ }
                <View className="flex-1 bg-white rounded-t-[32px] px-5 pt-[72px]">
                    <ScrollView showsVerticalScrollIndicator={ false } className="flex-1">
                        {/* Card Selection */ }
                        <View className="mb-6">
                            <Text className="text-gray-700 font-medium mb-2 ml-1">Tài khoản nguồn</Text>
                            <TouchableOpacity
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                                style={ {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 3,
                                    elevation: 2
                                } }
                                onPress={ () => setShowCardSelector( true ) }
                            >
                                { selectedCard ? (
                                    <View className="p-4">
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row items-center">
                                                <Image
                                                    source={ { uri: selectedCard.logoBanking } }
                                                    className="w-10 h-10 rounded-lg mr-3"
                                                    resizeMode="contain"
                                                />
                                                <View>
                                                    <Text className="font-bold text-gray-800">{ selectedCard.bankName }</Text>
                                                    <Text className="text-gray-500 text-sm mt-1">{ selectedCard.STK }</Text>
                                                </View>
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

                        {/* Amount Input */ }
                        <View className="mb-6">
                            <Text className="text-gray-700 font-medium mb-2 ml-1">Số tiền</Text>
                            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                                style={ {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 3,
                                    elevation: 2
                                } }
                            >
                                <View className="flex-row items-center p-4">
                                    <FontAwesome5 name="money-bill-wave" size={ 18 } color="#1c40f2" className="mr-3" />
                                    <TextInput
                                        className="flex-1 text-gray-800 text-base"
                                        placeholder="Nhập số tiền thanh toán"
                                        keyboardType="numeric"
                                        value={ amount }
                                        onChangeText={ formatAmount }
                                    />
                                </View>
                                { amount ? (
                                    <View className="bg-gray-50 px-4 py-2 border-t border-gray-100">
                                        <Text className="text-right text-gray-500">{ displayAmount() }</Text>
                                    </View>
                                ) : null }
                            </View>
                        </View>

                        {/* Content Input */ }
                        <View className="mb-8">
                            <Text className="text-gray-700 font-medium mb-2 ml-1">Nội dung chuyển khoản</Text>
                            <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                                style={ {
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 3,
                                    elevation: 2
                                } }
                            >
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

                        {/* Create QR Button */ }
                        <TouchableOpacity
                            className={ `rounded-2xl py-4 mb-8 ${ selectedCard && amount && content ? "bg-[#1c40f2]" : "bg-gray-300"
                                }` }
                            onPress={ handleSubmit }
                            disabled={ !selectedCard || !amount || !content }
                        >
                            <View className="flex-row justify-center items-center">
                                <Ionicons name="qr-code" size={ 20 } color="white" className="mr-2" />
                                <Text className="text-white font-bold text-base ml-2">Tạo mã QR</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

              {/* Modal chọn thẻ */ }
                 <Modal
                    visible={ showCardSelector }
                    transparent={ true }
                    animationType="slide"
                    onRequestClose={ () => setShowCardSelector( false ) }
                >
                    <View className="flex-1 bg-black/50 justify-end">
                        <View className="bg-white rounded-t-3xl p-4 max-h-[70%]">
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-xl font-bold">Chọn tài khoản</Text>
                                <TouchableOpacity onPress={ () => setShowCardSelector( false ) }>
                                    <Ionicons name="close-circle" size={ 28 } color="#666" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="max-h-[500px]">
                                { data.map( ( card, index ) => (
                                    <TouchableOpacity
                                        key={ index }
                                        className={ `border-b border-gray-200 p-4 ${ selectedCard?.STK === card.STK ? "bg-blue-50" : ""
                                            }` }
                                        onPress={ () => handleSelectCard( card ) }
                                    >
                                        <View className="flex-row justify-between items-center">
                                            <View>
                                                <Text className="font-medium">{ card.STK }</Text>
                                                <Text className="text-gray-500">{ card.bankName }</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <Image
                                                    source={ { uri: card.logoBanking } }
                                                    className="w-16 h-10"
                                                    resizeMode="contain"
                                                />
                                                { selectedCard?.STK === card.STK && (
                                                    <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
                                                ) }
                                            </View>
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