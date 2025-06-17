import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView, Modal } from "react-native";
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useCallback, useState } from "react";
import mockMyBankCard from "@/assets/banking-card.json"
import AppHeaderInfo from "@/components/header/App.headerInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatCurrencyWithCode } from "@/utils/format";
import { useCardStore } from "@/store/useCardStore";
import { IBankingTransaction } from "@/interface/IBanking";

type PaymentData = {
    accountNumber: string;
    bankBin?: string;
    amount: number;
    addInfo?: string;
    bankName?: string;
};

export default function ConfirmPayment ()
{
    const params = useLocalSearchParams();
    const rawData = params.data;
    // Parse JSON string thành object, nếu data tồn tại
    const data = rawData ? JSON.parse( rawData as string ) : null;
    const currentData: PaymentData = data;
    console.log( "data confirm: ", currentData );


    const [ isVisible, setIsVisible ] = useState( false );
    const [ loading, setLoading ] = useState( false );
    const [ selectedCard, setSelectedCard ] = useState<IBankingTransaction | null>( null );
    const listBankingCard = mockMyBankCard;
    const currenCard = useCardStore( state => state.selectedCard )

    // Load selected card from AsyncStorage
    useFocusEffect(
        useCallback( () =>
        {
            const loadSelectedCard = async () =>
            {
                try
                {
                    if ( currenCard )
                    {
                        const parsedCard = currenCard;
                        setSelectedCard( parsedCard );
                    }
                } catch ( error )
                {
                    console.error( "Lỗi khi lấy thẻ từ AsyncStorage:", error );
                }
            };

            loadSelectedCard();
        }, [] )
    );
    // --------------------------------- END ------------------------------------- //

    // Handle back button
    const handleShowSelectedBank = () =>
    {
        setIsVisible( !isVisible );
    };
    // --------------------------------- END ------------------------------------- //

    // Handle select bank
    const handleSelectBank = ( bank: any ) =>
    {
        setIsVisible( false );
        setSelectedCard( bank );
    };
    // --------------------------------- END ------------------------------------- //

    // Handle continue button
    const handleContinue = () =>
    {
        setLoading( true );
        setTimeout( () =>
        {
            router.push( {
                pathname: "/payment/open-bank",
                params: { url: selectedCard?.deeplink, data: JSON.stringify( data ) },
            } );
        }, 300 );
    };
    // --------------------------------- END ------------------------------------- //

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            {/* Main Content */ }
            <SafeAreaView className="flex-1 bg-black">
                <AppHeaderInfo title="Xác nhận thanh toán" onPress={ () => router.back() } />
                {/* Transaction Card */ }
                <View className="bg-slate-50 flex-1">
                    <View className="flex-1 px-2 justify-center">
                        <View className="bg-white rounded-xl border border-gray-300 shadow-md p-5 mb-6">
                            <View className="items-center mb-4">
                                <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
                                    <FontAwesome name="bank" size={ 30 } color="#1c40f2" />
                                </View>
                                <Text className="text-lg font-medium">Thông tin giao dịch</Text>
                            </View>

                            <View className="border-t border-dashed border-gray-400 w-full" />

                            <View className="pt-4 gap-4">
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500">Tài khoản:</Text>
                                    <Text className="font-medium">{ currentData?.accountNumber }</Text>
                                </View>
                                <View className="border-t border-gray-100 w-full" />
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500 text-md">Ngân hàng:</Text>
                                    <Text className="flex-1 text-right">{ currentData?.bankName }</Text>
                                </View>
                                <View className="border-t border-gray-100 w-full" />
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500">Số tiền</Text>
                                    <Text className="font-medium text-blue-600">
                                        { formatCurrencyWithCode( currentData?.amount ) }
                                    </Text>
                                </View>
                                <View className="border-t border-gray-100 w-full" />
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-500">Nội dung</Text>
                                    <Text className={ `${ currentData?.addInfo ? 'font-medium' : 'text-gray-500' }` }>{ currentData?.addInfo ? currentData?.addInfo : '-' }</Text>
                                </View>
                            </View>
                        </View>

                        {/* Logo AutoPay */ }
                        <View className="items-center mb-6">
                            <Text className="text-xl text-black font-bold">⛛ AutoPAY</Text>
                            <Text className="text-gray-500 text-sm">Thanh toán an toàn, tiện lợi</Text>
                        </View>

                        {/* Disclaimer */ }
                        <View className="bg-blue-50 p-4 rounded-lg mb-8">
                            <Text className="text-gray-700 text-sm">
                                Vui lòng kiểm tra kỹ thông tin trước khi tiếp tục.
                            </Text>
                        </View>
                    </View>


                    {/* Bottom Button */ }
                    <View className="flex-row justify-between items-end border-t border-gray-200 p-4">
                        <View className="flex-1">
                            <Text className="text-sm text-gray-500 mb-2">Chọn tài khoản giao dịch</Text>
                            <TouchableOpacity
                                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                                onPress={ handleShowSelectedBank }
                            >
                                { selectedCard && (
                                    <View className="p-4">
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row items-center">
                                                <Image
                                                    source={ { uri: selectedCard.logoBanking } }
                                                    className="w-12 h-12 rounded-lg mr-3"
                                                    resizeMode="contain"
                                                />
                                                <View>
                                                    {/* <Text className="font-bold text-gray-800">{ selectedCard.bankbin }</Text> */ }
                                                    <Text className="text-black text-sm">{ selectedCard.STK }</Text>
                                                </View>
                                            </View>
                                            <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
                                        </View>
                                    </View>
                                ) }
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            className={ `bg-black p-6 ml-2 rounded-xl items-center ${ loading ? 'opacity-70' : '' }` }
                            onPress={ handleContinue }
                            disabled={ loading }
                        >
                            <Text className="text-white font-bold text-lg">
                                { loading ? 'Đang xử lý...' : 'Chuyển tiền' }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>


            <Modal
                visible={ isVisible }
                transparent={ true }
                animationType="slide"
                onRequestClose={ handleShowSelectedBank }
            >
                <View className="flex-1 bg-black/70 justify-end">
                    <View className="bg-white rounded-t-3xl p-4 max-h-[70%]">
                        <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-xl font-bold">Chọn tài khoản</Text>
                            <TouchableOpacity onPress={ () => setIsVisible( false ) }>
                                <Ionicons name="close-circle" size={ 28 } color="#666" />
                            </TouchableOpacity>
                        </View>
                        <ScrollView className="max-h-[500px]">
                            { listBankingCard.map( ( bank ) => (
                                <TouchableOpacity
                                    key={ bank.bankbin }
                                    className="flex-row items-center bg-white p-4 mb-3 rounded-xl border border-gray-100"
                                    style={ {
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.05,
                                        shadowRadius: 2,
                                        elevation: 1
                                    } }
                                    onPress={ () => handleSelectBank( bank ) }
                                >
                                    <Image
                                        source={ { uri: bank.logoBanking } }
                                        className="w-12 h-12 rounded-lg"
                                        resizeMode="contain"
                                    />
                                    <View className="ml-4 flex-1">
                                        <Text className="text-base font-medium">{ bank.name }</Text>
                                        <Text className="text-gray-500 text-sm mt-1">
                                            { bank.bankName }
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={ 20 } color="#1c40f2" />
                                </TouchableOpacity>
                            ) ) }
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    );
}







// import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
// import { View, Text, TouchableOpacity, StatusBar, Image, ScrollView, Modal } from "react-native";
// import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
// import { useCallback, useState } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import mockMyBankCard from "@/assets/banking-card.json"
// import AppHeaderInfo from "@/components/header/App.headerInfo";
// import { decodeEMVCo } from "@/utils/decodeEMVCode";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { formatCurrencyVND } from "@/utils/format";

// export default function ConfirmPayment ()
// {
//     const params = useLocalSearchParams();
//     const data = decodeEMVCo( params.data as string );
//     console.log( "data", data );
//     const [ isVisible, setIsVisible ] = useState( false );
//     const [ loading, setLoading ] = useState( false );
//     const [ selectedCard, setSelectedCard ] = useState<any>( null );
//     const listBankingCard = mockMyBankCard;

//     // Load selected card from AsyncStorage
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
//                     }
//                 } catch ( error )
//                 {
//                     console.error( "Lỗi khi lấy thẻ từ AsyncStorage:", error );
//                 }
//             };

//             loadSelectedCard();
//         }, [] )
//     );
//     // --------------------------------- END ------------------------------------- //

//     // Handle back button
//     const handleShowSelectedBank = () =>
//     {
//         setIsVisible( !isVisible );
//     };
//     // --------------------------------- END ------------------------------------- //

//     // Handle select bank
//     const handleSelectBank = ( bank: any ) =>
//     {
//         setIsVisible( false );
//         setSelectedCard( bank );
//     };
//     // --------------------------------- END ------------------------------------- //

//     // Handle continue button
//     const handleContinue = () =>
//     {
//         setLoading( true );
//         setTimeout( () =>
//         {
//             router.push( {
//                 pathname: "/payment/open-bank",
//                 params: { url: selectedCard.deeplink, data: JSON.stringify( data ) },
//             } );
//         }, 300 );
//     };
//     // --------------------------------- END ------------------------------------- //

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//             {/* Main Content */ }
//             <SafeAreaView className="flex-1 bg-black">
//                 <AppHeaderInfo title="Xác nhận thanh toán" onPress={ () => router.back() } />
//                 {/* Transaction Card */ }
//                 <View className="bg-slate-50 flex-1">
//                     <View className="flex-1 px-6 py-4 justify-center">
//                         <View className="bg-white rounded-xl border border-gray-300 shadow-md p-5 mb-6">
//                             <View className="items-center mb-4">
//                                 <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
//                                     <FontAwesome name="bank" size={ 30 } color="#1c40f2" />
//                                 </View>
//                                 <Text className="text-lg font-medium">Thông tin giao dịch</Text>
//                             </View>

//                             <View className="border-t border-dashed border-gray-400 w-full" />

//                             <View className="pt-4 gap-4">
//                                 <View className="flex-row justify-between">
//                                     <Text className="text-gray-500">Tài khoản thụ hưởng</Text>
//                                     <Text className="font-medium">{ data.STK }</Text>
//                                 </View>
//                                 <View className="border-t border-gray-100 w-full" />
//                                 <View className="flex-row justify-between">
//                                     <Text className="text-gray-500 text-md">Ngân hàng thụ hưởng</Text>
//                                     <Text className="font-medium">Nam Á Bank</Text>
//                                 </View>
//                                 <View className="border-t border-gray-100 w-full" />
//                                 <View className="flex-row justify-between">
//                                     <Text className="text-gray-500">Số tiền</Text>
//                                     <Text className="font-medium text-blue-600">
//                                         { formatCurrencyVND( data.amount ) }
//                                     </Text>
//                                 </View>
//                                 <View className="border-t border-gray-100 w-full" />
//                                 <View className="flex-row justify-between">
//                                     <Text className="text-gray-500">Nội dung</Text>
//                                     <Text className={ `${ data.content ? 'font-medium' : 'text-gray-500' }` }>{ data.content ? data.content : '-' }</Text>
//                                 </View>
//                             </View>
//                         </View>

//                         {/* Logo AutoPay */ }
//                         <View className="items-center mb-6">
//                             <Text className="text-xl text-black font-bold">⛛ AutoPAY</Text>
//                             <Text className="text-gray-500 text-sm">Thanh toán an toàn, tiện lợi</Text>
//                         </View>

//                         {/* Disclaimer */ }
//                         <View className="bg-blue-50 p-4 rounded-lg mb-8">
//                             <Text className="text-gray-700 text-sm">
//                                 Vui lòng kiểm tra kỹ thông tin trước khi tiếp tục.
//                             </Text>
//                         </View>
//                     </View>


//                     {/* Bottom Button */ }
//                     <View className="flex-row justify-between items-end border-t border-gray-200 p-4">
//                         <View className="flex-1">
//                             <Text className="text-sm text-gray-500 mb-2">Chọn tài khoản giao dịch</Text>
//                             <TouchableOpacity
//                                 className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
//                                 onPress={ handleShowSelectedBank }
//                             >
//                                 { selectedCard && (
//                                     <View className="p-4">
//                                         <View className="flex-row justify-between items-center">
//                                             <View className="flex-row items-center">
//                                                 <Image
//                                                     source={ { uri: selectedCard.logoBanking } }
//                                                     className="w-12 h-12 rounded-lg mr-3"
//                                                     resizeMode="contain"
//                                                 />
//                                                 <View>
//                                                     <Text className="font-bold text-gray-800 flex-1">{ selectedCard.bankName }</Text>
//                                                     <Text className="text-gray-500 text-sm">{ selectedCard.STK }</Text>
//                                                 </View>
//                                             </View>
//                                             <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
//                                         </View>
//                                     </View>
//                                 ) }
//                             </TouchableOpacity>
//                         </View>
//                         <TouchableOpacity
//                             className={ `bg-black p-6 ml-2 rounded-xl items-center ${ loading ? 'opacity-70' : '' }` }
//                             onPress={ handleContinue }
//                             disabled={ loading }
//                         >
//                             <Text className="text-white font-bold text-lg">
//                                 { loading ? 'Đang xử lý...' : 'Chuyển tiền' }
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//             </SafeAreaView>


//             <Modal
//                 visible={ isVisible }
//                 transparent={ true }
//                 animationType="slide"
//                 onRequestClose={ handleShowSelectedBank }
//             >
//                 <View className="flex-1 bg-black/70 justify-end">
//                     <View className="bg-white rounded-t-3xl p-4 max-h-[70%]">
//                         <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
//                         <View className="flex-row justify-between items-center mb-4">
//                             <Text className="text-xl font-bold">Chọn tài khoản</Text>
//                             <TouchableOpacity onPress={ () => setIsVisible( false ) }>
//                                 <Ionicons name="close-circle" size={ 28 } color="#666" />
//                             </TouchableOpacity>
//                         </View>
//                         <ScrollView className="max-h-[500px]">
//                             { listBankingCard.map( ( bank ) => (
//                                 <TouchableOpacity
//                                     key={ bank.bankbin }
//                                     className="flex-row items-center bg-white p-4 mb-3 rounded-xl border border-gray-100"
//                                     style={ {
//                                         shadowColor: '#000',
//                                         shadowOffset: { width: 0, height: 1 },
//                                         shadowOpacity: 0.05,
//                                         shadowRadius: 2,
//                                         elevation: 1
//                                     } }
//                                     onPress={ () => handleSelectBank( bank ) }
//                                 >
//                                     <Image
//                                         source={ { uri: bank.logoBanking } }
//                                         className="w-12 h-12 rounded-lg"
//                                         resizeMode="contain"
//                                     />
//                                     <View className="ml-4 flex-1">
//                                         <Text className="text-base font-medium">{ bank.name }</Text>
//                                         <Text className="text-gray-500 text-sm mt-1">
//                                             { bank.bankName }
//                                         </Text>
//                                     </View>
//                                     <Ionicons name="chevron-forward" size={ 20 } color="#1c40f2" />
//                                 </TouchableOpacity>
//                             ) ) }
//                         </ScrollView>
//                     </View>
//                 </View>
//             </Modal>
//         </>
//     );
// }

