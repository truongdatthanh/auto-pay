
import { Image, ScrollView, Text, TouchableOpacity, View, StatusBar, SafeAreaView, Platform } from "react-native";
import { useEffect, useState, useCallback } from "react";
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import mockDataTransation from "../../assets/data.json";
import CardInfo from "@/components/CardInfo";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";
import { generateQR } from "@/utils/generateQR";
import { convertEMVCode } from "@/utils/encodeEMVCode";
import { LinearGradient } from "expo-linear-gradient";
import Seperate from "@/components/Seperate";
import QRCode from "react-native-qrcode-svg";




interface ITransactionHistory
{
    id: string | undefined;
    STK: string | undefined;
    name: string | undefined;
    logoBanking: string | undefined;
    bankName: string | undefined;
    transactionHistory: {
        date: string;
        amount: number;
        description: string;
    }[];
}

export default function BankAccount ()
{
    const [ selected, setSelected ] = useState( "income" );
    const [ dataBanking, setDataBanking ] = useState( mockDataTransation );
    const [ currentCard, setCurrentCard ] = useState<ITransactionHistory>();
    const [ isLoading, setIsLoading ] = useState( true );
    const [ qrData, setQrData ] = useState( "" );

    const incomeItems: any[] = [];
    const outcomeItems: any[] = [];

    useFocusEffect(
        useCallback( () =>
        {
            const fetchCardData = async () =>
            {
                setIsLoading( true );
                try
                {
                    const getCard = await AsyncStorage.getItem( "selectedCard" );
                    if ( getCard !== null )
                    {
                        const parsedCard = JSON.parse( getCard );
                        setCurrentCard( parsedCard );
                        setQrData(
                            convertEMVCode( {
                                accountNumber: parsedCard.STK,
                                bankBin: parsedCard.bankbin,
                                amount: 0,
                                addInfo: "",
                            } )
                        );
                    }
                } catch ( error )
                {
                    console.error( "Error fetching card data:", error );
                } finally
                {
                    setIsLoading( false );
                }
            };

            fetchCardData();
        }, [] )
    );

    // Filter transaction data
    for ( const item of dataBanking )
    {
        if ( item.amount > 0 )
        {
            incomeItems.push( item );
        } else
        {
            outcomeItems.push( item );
        }
    }

    const handleCreateQR = () =>
    {
        router.push( {
            pathname: '/(tabs)/qr/create',
            params: { cardSTK: currentCard?.STK }
        } );
    };

    const handleSaveQR = () =>
    {
        console.log( "Saving QR code..." );
    };

    const handleShareQR = () =>
    {

        console.log( "Sharing QR code..." );
    };

    if ( isLoading )
    {
        return (
            <Loading message="Đang tải thông tin tài khoản..." />
        );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <ScrollView className="flex-1 bg-slate-50">
                {/* QR Code */ }
                <View className="bg-white m-4 mt-8 p-4 rounded-3xl shadow-md border border-gray-200">
                    <View className="justify-center items-center">
                        <View className="items-center">
                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold text-lg">{ currentCard?.name?.toUpperCase() }</Text>
                            </View>
                            <View className="flex-row justify-between items-center">
                                <Text className="font-semibold text-md">{ currentCard?.STK }</Text>
                                <TouchableOpacity className="p-1">
                                    <Ionicons name="copy-outline" size={ 16 } color="#3b82f6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            { generateQR( qrData ) }
                        </View>
                        <View className="flex-row justify-center items-center space-x-8">
                            <Image source={ require( "../../assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
                            <Image source={ { uri: currentCard?.logoBanking } } className="w-[100px] h-[50px]" resizeMode="contain" />
                        </View>
                        <View className="border-t border-dashed border-gray-400 my-2 w-full" />
                        <View className="flex-row justify-between items-center w-full mt-2">
                            <TouchableOpacity
                                className="border border-slate-300 bg-slate-50 px-4 py-2.5 rounded-xl flex-row items-center"
                                onPress={ handleSaveQR }
                            >
                                <Entypo name="download" size={ 16 } color="#475569" />
                                <Text className="text-slate-600 ml-2 font-medium">Lưu mã QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="px-4 py-2.5 rounded-xl flex-row items-center bg-[#1c40f2]"
                                onPress={ handleShareQR }
                            >
                                <FontAwesome name="share-square-o" size={ 16 } color="white" />
                                <Text className="text-white ml-2 font-medium">Chia sẻ QR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* -----------------------------------------End----------------------------------------- */ }

                {/* Lịch sử giao dịch */ }
                <View className="min-h-[200px] rounded-t-3xl p-5 bg-white mt-2">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg text-slate-800 font-bold">
                            Giao dịch gần đây
                        </Text>
                        <TouchableOpacity
                            className="flex-row items-center"
                            onPress={ () => router.push( "/(tabs)/history" ) }
                        >
                            <Text className="text-blue-500 font-medium">Xem thêm</Text>
                            <Ionicons name="chevron-forward" size={ 16 } color="#3b82f6" />
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row items-center justify-between bg-slate-100 p-1 rounded-xl">
                        <TouchableOpacity
                            className={ `flex-1 p-3 rounded-lg ${ selected === "income" ? "bg-blue-500" : "bg-transparent" }` }
                            onPress={ () => setSelected( "income" ) }
                        >
                            <Text
                                className={ `text-center font-medium ${ selected === "income" ? "text-white" : "text-slate-600" }` }
                            >
                                Giao dịch đến
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={ `flex-1 p-3 rounded-lg ${ selected === "outcome" ? "bg-blue-500" : "bg-transparent" }` }
                            onPress={ () => setSelected( "outcome" ) }
                        >
                            <Text
                                className={ `text-center font-medium ${ selected === "outcome" ? "text-white" : "text-slate-600" }` }
                            >
                                Giao dịch đi
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View className="mt-4">
                        { selected === "income" ? (
                            incomeItems.length > 0 ? (
                                incomeItems.map( ( item, index ) => (
                                    <Animated.View
                                        key={ index }
                                        entering={ FadeInDown.delay( index * 100 ).duration( 400 ) }
                                        className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-3"
                                    >
                                        <CardInfo
                                            id={ item.id }
                                            STK={ item.STK }
                                            name={ item.name }
                                            date={ item.date }
                                            amount={ item.amount }
                                            content={ item.content }
                                            logoBanking={ item.logoBanking }
                                            transactionId={ item.transactionId }
                                        />
                                    </Animated.View>
                                ) )
                            ) : (
                                <View className="items-center justify-center py-10">
                                    <Ionicons name="wallet-outline" size={ 50 } color="#cbd5e1" />
                                    <Text className="text-slate-400 mt-3 text-center">
                                        Không có giao dịch đến nào
                                    </Text>
                                </View>
                            )
                        ) : outcomeItems.length > 0 ? (
                            outcomeItems.map( ( item, index ) => (
                                <Animated.View
                                    key={ index }
                                    entering={ FadeInDown.delay( index * 100 ).duration( 400 ) }
                                    className="bg-white p-4 border border-slate-200 rounded-xl shadow-sm mb-3"
                                >
                                    <CardInfo
                                        id={ item.id }
                                        STK={ item.STK }
                                        name={ item.name }
                                        date={ item.date }
                                        amount={ item.amount }
                                        content={ item.content }
                                        logoBanking={ item.logoBanking }
                                        transactionId={ item.transactionId }
                                    />
                                </Animated.View>
                            ) )
                        ) : (
                            <View className="items-center justify-center py-10">
                                <Ionicons name="wallet-outline" size={ 50 } color="#cbd5e1" />
                                <Text className="text-slate-400 mt-3 text-center">
                                    Không có giao dịch đi nào
                                </Text>
                            </View>
                        ) }
                    </View>
                </View>
                {/* -----------------------------------------End----------------------------------------- */ }
            </ScrollView>

            {/* Button tạo QR */ }
            <TouchableOpacity
                className="absolute bottom-5 right-5 w-14 h-14 rounded-full bg-[#1c40f2] items-center justify-center shadow-lg elevation-5"
                onPress={ handleCreateQR }
            >
                <Entypo name="plus" size={ 28 } color="white" />
            </TouchableOpacity>
            {/* -----------------------------------------End----------------------------------------- */ }
        </>
    );
}


// import { Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
// import { useEffect, useState } from "react";
// import QRCode from "react-native-qrcode-svg";
// import BankingCard from "@/components/BankCard";
// import Seperate from "@/components/Seperate";
// import Entypo from '@expo/vector-icons/Entypo';
// import { FontAwesome } from "@expo/vector-icons";
// import myBankingAccount from "../../assets/my-bank-account.json";
// import mockDataTransation from "../../assets/data.json"
// import CardInfo from "@/components/CardInfo";
// import { router } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// interface ITransactionHistory
// {
//     id: string | undefined;
//     STK: string | undefined;
//     name: string | undefined;
//     logoBanking: string | undefined;
//     bankName: string | undefined;
//     transactionHistory: {
//         date: string;
//         amount: number;
//         description: string;
//     }[];
// }

// export default function BankAccount ()
// {
//     const [ selected, setSelected ] = useState( "income" );
//     const [ dataBanking, setDataBanking ] = useState( mockDataTransation );
//     const [ currentCard, setCurrentCard ] = useState<ITransactionHistory>();

//     const incomeItems: any[] = [];
//     const outcomeItems: any[] = [];

//     useEffect( () =>
//     {
//         const fectCardId = async () =>
//         {
//             const getCard = await AsyncStorage.getItem( "selectedCard" );
//             if ( getCard !== null )
//             {
//                 setCurrentCard( JSON.parse( getCard ) );//Chuyển đổi Json thành Obj Js

//             }

//             console.log( "getacard", getCard );
//         }
//         fectCardId();
//     }, [] );

//     console.log( "current card: ", currentCard )

//     for ( const item of dataBanking )
//     {
//         if ( item.amount > 0 )
//         {
//             incomeItems.push( item );
//         } else
//         {
//             outcomeItems.push( item );
//         }
//     }

//     const handleCreateQR = () =>
//     {
//         router.push( {
//             pathname: '/(tabs)/qr/create',
//             params: { cardSTK: currentCard?.STK, }

//         } )
//     };

//     return (
//         <>
//             <ScrollView className="flex-1">
//                 <View className="justify-center items-center">
//                     {/* QR */ }
//                     <View className="justify-center mt-4 items-center w-full max-w-[340px] p-4 mx-4 bg-white rounded-3xl shadow-md">
//                         <Text className="font-bold">{ currentCard?.name?.toUpperCase() }</Text>
//                         <Text className="text-lg">{ currentCard?.STK }</Text>
//                         <Text className="text-base">{ currentCard?.bankName }</Text>
//                         <Seperate />
//                         <View className="bg-white border-2 border-gray-300 p-4 rounded-lg">
//                             {/* Truoc khi tao QR code can phai chuyen obj js thanh json */ }
//                             <QRCode
//                                 value={ JSON.stringify( currentCard?.bankName ) }
//                                 size={ 200 }
//                                 logo={ require( "../../assets/images/logo-autopay-4.png" ) }
//                                 logoSize={ 30 }
//                             />
//                         </View>
//                         <Seperate />
//                         <View style={ { maxWidth: 250 } } className="flex-row w-full justify-between items-center bg-white">
//                             <Text className="text-xl text-black font-bold">⛛AutoPAY</Text>
//                             <Image source={ { uri: currentCard?.logoBanking } } className="w-20 h-16" resizeMode="contain" />
//                         </View>
//                         <View className="flex-row justify-between items-center w-full">
//                             <TouchableOpacity className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-full flex-row items-center" onPress={ () => console.log( "Lưu mã QR" ) }>
//                                 <Entypo name="download" size={ 18 } color="black" />
//                                 <Text className="text-base ml-2">Lưu mã QR</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity className="px-4 py-2 rounded-full flex-row items-center bg-blue-500" onPress={ () => console.log( "Chia sẻ mã QR" ) }>
//                                 <FontAwesome name="share-square-o" size={ 20 } color="white" />
//                                 <Text className="text-base text-white ml-2">Chia sẻ QR</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                     {/* Ket thuc QR */ }


//                     {/* lich su giao dich gan day */ }
//                     <View className="w-full min-h-[200px] rounded-t-3xl p-4 bg-blue-50 mt-4">
//                         <View className="flex-row justify-between items-center px-4">
//                             <Text className="text-lg text-black font-bold">
//                                 Giao dịch gần đây
//                             </Text>
//                             <TouchableOpacity onPress={ () => router.push( "/(tabs)/history" ) }>
//                                 <Text className="text-base text-gray-500"> Xem thêm </Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View className="flex-row items-center justify-between bg-white p-2 rounded-xl mt-4">
//                             <TouchableOpacity
//                                 className={ `flex-1 p-3 rounded-lg ${ selected === "income" ? "bg-black" : "bg-gray-100" }` }
//                                 onPress={ () => setSelected( "income" ) }
//                             >
//                                 <Text
//                                     className={ `text-center text-base font-medium ${ selected === "income" ? "text-white" : "text-black" }` }
//                                 >
//                                     Giao dịch đến
//                                 </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity
//                                 className={ `flex-1 p-3 rounded-lg ${ selected === "outcome" ? "bg-black" : "bg-gray-100" }` }
//                                 onPress={ () => setSelected( "outcome" ) }
//                             >
//                                 <Text
//                                     className={ `text-center text-base font-medium ${ selected === "outcome" ? "text-white" : "text-black" }` }
//                                 >
//                                     Giao dịch đi
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View className="mt-4">
//                             {
//                                 selected === "income"
//                                     ? incomeItems.map( ( item, index ) => (
//                                         <View key={ index } className="bg-white p-4 border rounded-lg shadow-sm mb-1">
//                                             <CardInfo
//                                                 id={ item.id }
//                                                 STK={ item.STK }
//                                                 name={ item.name }
//                                                 date={ item.date }
//                                                 amount={ item.amount }
//                                                 content={ item.content }
//                                                 logoBanking={ item.logoBanking }
//                                                 transactionId={ item.transactionId } />
//                                         </View>
//                                     ) )
//                                     : outcomeItems.map( ( item, index ) => (
//                                         <View key={ index } className="bg-white p-4 border rounded-lg shadow-sm mb-1">
//                                             <CardInfo
//                                                 id={ item.id }
//                                                 STK={ item.STK }
//                                                 name={ item.name }
//                                                 date={ item.date }
//                                                 amount={ item.amount }
//                                                 content={ item.content }
//                                                 logoBanking={ item.logoBanking }
//                                                 transactionId={ item.transactionId } />
//                                         </View>
//                                     ) )
//                             }
//                         </View>
//                     </View>
//                     {/* Ket thuc lich su giao dich */ }
//                 </View>
//             </ScrollView>
//             <TouchableOpacity className="absolute bottom-5 right-2 w-16 h-16 rounded-full bg-blue-500 items-center justify-center" onPress={ handleCreateQR }>
//                 <Entypo name="plus" size={ 30 } color="white" />
//             </TouchableOpacity>
//         </>
//     );
// }



