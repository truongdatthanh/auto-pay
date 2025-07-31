import { convertEMVCode } from "@/utils/encodeEMVCode";
import { generateQR } from "@/utils/generateQR";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";
import mockDataBankingCard from "@/assets/banking-card.json";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Loading from "@/components/loading/Loading";
import { useCardStore } from "@/store/useCardStore";
import { IBankingTransaction } from "@/interface/IBanking";

export default function MyQR ()
{
    const currentCard = useCardStore( state => state.selectedCard );
    const setCurrentCard = useCardStore( state => state.setSelectedCard );
    const [ showCardSelector, setShowCardSelector ] = useState( false );
    const [ data ] = useState( mockDataBankingCard );
    const [ isLoading, setIsLoading ] = useState( false );
    const [ qrData, setQrData ] = useState( "" );

    useEffect( () =>
    {
        setIsLoading( true );
        if ( !currentCard ) return;

        if ( currentCard )
        {
            const emvCode = convertEMVCode( {
                accountNumber: currentCard.STK ?? "",
                bankBin: currentCard.bankbin ?? "",
                amount: 0,
                addInfo: "",
            } );
            setQrData( emvCode );
            console.log("EMVCo myqr: ", emvCode )
            setIsLoading( false );
        } else if ( data.length > 0 )
        {
            setCurrentCard( data[ 0 ] );
        }
    }, [ currentCard ] );

    const handleSelectCard = ( card: IBankingTransaction ) =>
    {
        setCurrentCard( card );
        setShowCardSelector( false );
    };

    if ( isLoading )
    {
        return <Loading message="Đợi tí..." />;
    }

    if ( !currentCard )
    {
        return <Loading message="Đang tải..." />;
    }

    return (
        <View className="flex-1">
            {/* QR Container */ }
            <View className="bg-white m-4 mt-8 p-2 rounded-lg shadow-md border border-gray-200">
                <View className="justify-center items-center p-4">
                    <View className="items-center">
                        <View className="flex-row justify-between items-center">
                            <Text className="font-semibold text-lg">{ currentCard.name?.toUpperCase() ?? "" }</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="font-semibold text-md">{ currentCard.STK ?? "" }</Text>
                            <TouchableOpacity className="p-1" onPress={ () =>
                            {
                                // Bạn có thể thêm copy clipboard tại đây
                            } }>
                                <Ionicons name="copy-outline" size={ 16 } color="#3b82f6" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        { qrData ? generateQR( qrData ) : <Text className="text-center text-gray-500">Đang tạo mã QR...</Text> }
                    </View>
                    <View className="flex-row justify-center items-center space-x-8">
                        <Image source={ require( "@/assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
                        <Image source={ { uri: currentCard.logoBanking ?? "" } } className="w-[100px] h-[50px]" resizeMode="contain" />
                    </View>
                </View>
            </View>

            {/* Chọn thẻ */ }
            <TouchableOpacity
                className="mx-4 bg-white rounded-lg overflow-hidden shadow-md border border-gray-100"
                onPress={ () => setShowCardSelector( true ) }
            >
                <View className="p-4">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Image source={ { uri: currentCard.logoBanking ?? "" } } className="w-10 h-10 rounded-lg mr-3" resizeMode="contain" />
                            <View>
                                <Text className="font-bold text-gray-800">{ currentCard.bankName ?? "" }</Text>
                                <Text className="text-gray-500 text-sm mt-1">{ currentCard.STK ?? "" }</Text>
                            </View>
                        </View>
                        <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
                    </View>
                </View>
            </TouchableOpacity>

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
                                    className={ `border-b border-gray-200 p-4 ${ currentCard?.STK === card.STK ? "bg-blue-50" : "" }` }
                                    onPress={ () => handleSelectCard( card ) }
                                >
                                    <View className="flex-row justify-between items-center">
                                        <View>
                                            <Text className="font-medium">{ card.STK ?? "" }</Text>
                                            <Text className="text-gray-500">{ card.bankName ?? "" }</Text>
                                        </View>
                                        <View className="flex-row items-center">
                                            <Image
                                                source={ { uri: card.logoBanking ?? "" } }
                                                className="w-16 h-10"
                                                resizeMode="contain"
                                            />
                                            { currentCard?.STK === card.STK && (
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
    );
}



// import { convertEMVCode } from "@/utils/encodeEMVCode";
// import { generateQR } from "@/utils/generateQR";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useCallback, useState } from "react";
// import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
// import mockDataBankingCard from "@/assets/banking-card.json";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { ScrollView } from "react-native";
// import { useFocusEffect } from "@react-navigation/native";
// import Loading from "@/components/loading/Loading";

// export default function MyQR ()
// {
//     const [ selectedCard, setSelectedCard ] = useState<any>( null );
//     const [ showCardSelector, setShowCardSelector ] = useState( false );
//     const [ data, setData ] = useState( mockDataBankingCard );
//     const [ isLoading, setIsLoading ] = useState( true );
//     const [ qrData, setQrData ] = useState( "" );

//     useFocusEffect(
//         useCallback( () =>
//         {
//             const loadSelectedCard = async () =>
//             {
//                 try
//                 {
//                     const storedCard = await AsyncStorage.getItem( "selectedCard" );
//                     if ( storedCard )
//                     {
//                         const parsedCard = JSON.parse( storedCard );
//                         setSelectedCard( parsedCard );
//                         setQrData(
//                             convertEMVCode( {
//                                 accountNumber: parsedCard.STK,
//                                 bankBin: parsedCard.bankbin,
//                                 amount: 0,
//                                 addInfo: "",
//                             } )
//                         );
//                     } else if ( data.length > 0 )
//                     {
//                         setSelectedCard( data[ 0 ] );
//                     }
//                 } catch ( error )
//                 {
//                     console.error( "Lỗi khi lấy thẻ từ AsyncStorage:", error );
//                 } finally
//                 {
//                     setTimeout( () =>
//                     {
//                         setIsLoading( false );
//                     }, 1500 );
//                 }
//             };

//             loadSelectedCard();
//         }, [ selectedCard ] )
//     );

//     const handleSelectCard = ( card: any ) =>
//     {
//         setSelectedCard( card );
//         setShowCardSelector( false );

//         // Lưu thẻ đã chọn vào AsyncStorage
//         AsyncStorage.setItem( "selectedCard", JSON.stringify( card ) )
//             .catch( err => console.error( "Lỗi khi lưu thẻ:", err ) );
//     };

//     return (
//         <>
//             { selectedCard && !isLoading ? (
//                 <View className="flex-1">
//                     {/* QR Container */ }
//                     <View className="bg-white m-4 mt-8 p-2 rounded-3xl shadow-md border border-gray-200">
//                         <View className="justify-center items-center p-4 ">
//                             <View className="items-center">
//                                 <View className="flex-row justify-between items-center">
//                                     <Text className="font-semibold text-lg">{ selectedCard.name?.toUpperCase() }</Text>
//                                 </View>
//                                 <View className="flex-row justify-between items-center">
//                                     <Text className="font-semibold text-md">{ selectedCard.STK }</Text>
//                                     <TouchableOpacity className="p-1">
//                                         <Ionicons name="copy-outline" size={ 16 } color="#3b82f6" />
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                             <View>
//                                 { generateQR( qrData ) }
//                             </View>
//                             <View className="flex-row justify-center items-center space-x-8">
//                                 <Image source={ require( "@/assets/images/Napas247.png" ) } className="w-[100px] h-[50px]" resizeMode="contain" />
//                                 <Image source={ { uri: selectedCard.logoBanking } } className="w-[100px] h-[50px]" resizeMode="contain" />
//                             </View>
//                         </View>
//                     </View>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Chọn thẻ */ }
//                     <TouchableOpacity className="mx-4 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100" onPress={ () => setShowCardSelector( true ) }>
//                         <View className="p-4 ">
//                             <View className="flex-row justify-between items-center">
//                                 <View className="flex-row items-center">
//                                     <Image source={ { uri: selectedCard.logoBanking } } className="w-10 h-10 rounded-lg mr-3" resizeMode="contain" />
//                                     <View>
//                                         <Text className="font-bold text-gray-800">{ selectedCard.bankName }</Text>
//                                         <Text className="text-gray-500 text-sm mt-1">{ selectedCard.STK }</Text>
//                                     </View>
//                                 </View>
//                                 <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Modal chọn thẻ */ }
//                     <Modal
//                         visible={ showCardSelector }
//                         transparent={ true }
//                         animationType="slide"
//                         onRequestClose={ () => setShowCardSelector( false ) }
//                     >
//                         <View className="flex-1 bg-black/50 justify-end">
//                             <View className="bg-white rounded-t-3xl p-4 max-h-[70%]">
//                                 <View className="flex-row justify-between items-center mb-4">
//                                     <Text className="text-xl font-bold">Chọn tài khoản</Text>
//                                     <TouchableOpacity onPress={ () => setShowCardSelector( false ) }>
//                                         <Ionicons name="close-circle" size={ 28 } color="#666" />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <ScrollView className="max-h-[500px]">
//                                     { data.map( ( card, index ) => (
//                                         <TouchableOpacity
//                                             key={ index }
//                                             className={ `border-b border-gray-200 p-4 ${ selectedCard?.STK === card.STK ? "bg-blue-50" : ""
//                                                 }` }
//                                             onPress={ () => handleSelectCard( card ) }
//                                         >
//                                             <View className="flex-row justify-between items-center">
//                                                 <View>
//                                                     <Text className="font-medium">{ card.STK }</Text>
//                                                     <Text className="text-gray-500">{ card.bankName }</Text>
//                                                 </View>
//                                                 <View className="flex-row items-center">
//                                                     <Image
//                                                         source={ { uri: card.logoBanking } }
//                                                         className="w-16 h-10"
//                                                         resizeMode="contain"
//                                                     />
//                                                     { selectedCard?.STK === card.STK && (
//                                                         <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
//                                                     ) }
//                                                 </View>
//                                             </View>
//                                         </TouchableOpacity>
//                                     ) ) }
//                                 </ScrollView>
//                             </View>
//                         </View>
//                     </Modal>
//                 </View >
//             ) : (
//                 <Loading message="Đang tải..." />
//             )
//             }
//         </>
//     )
// }

