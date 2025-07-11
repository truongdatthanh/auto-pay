import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, StatusBar, FlatList, Modal, Platform } from "react-native";
import mockDataBankingCard from "@/assets/banking-card.json";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { IBankingTransaction } from "@/interface/IBanking";
import { KeyboardAvoidingView } from "react-native";

type FormState = {
    accountNumber: string;
    bankBin: string;
    amount: string;
    content: string;
    bankName: string;
    accountName: string;
    bankLogo: string;
};

export default function CreateMyQR ()
{
    const data = mockDataBankingCard;
    const inputRef = useRef<TextInput>( null );
    const [ showSelectionBox, setShowSelectionBox ] = useState<boolean>( false );
    const [ searchText, setSearchText ] = useState( "" );

    useEffect( () =>
    {
        const hideSub = Keyboard.addListener( 'keyboardDidHide', () =>
        {

            inputRef.current?.blur();
            // Delay để tránh đóng selection box quá nhanh
            setTimeout( () =>
            {
                setShowSelectionBox( false );
            }, 150 );
        } );

        return () =>
        {
            hideSub.remove();
        };
    }, [] );

    const [ formData, setFormData ] = useState<FormState>( {
        accountNumber: "",
        bankBin: "",
        amount: "",
        content: "",
        bankName: "",
        accountName: "",
        bankLogo: "",
    } );

    const handleChange = ( field: keyof FormState, value: string ) =>
    {
        setFormData( prev => ( { ...prev, [ field ]: value } ) );
    };

    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

    // Hàm submit để tạo mã QR thanh toán
    const handleSubmit = () =>
    {
        if ( formData.amount === "" )
        {
            alert( "Vui lòng nhập số tiền" );
            return;
        }

        const qrData = {
            accountNumber: formData.accountNumber,
            amount: formData.amount,
            bin: formData.bankBin,
            content: formData.content,
            bankName: formData.bankName,
            bankLogo: formData.bankLogo,
            accountName: formData.accountName,
        };

        router.push( {
            pathname: "/qr/display",
            params: {
                data: JSON.stringify( qrData ),
            },
        } );
    };

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
        handleChange( "amount", numericValue );
    };

    // Hàm xử lý thay đổi text trong ô tìm kiếm
    const handleSearchChange = ( text: string ) =>
    {
        setSearchText( text );
        handleChange( "accountNumber", text );
        setShowSelectionBox( text.length > 0 );
    };

    // Lọc danh sách tài khoản theo từ khóa tìm kiếm
    const filteredCards = useMemo( () =>
    {
        if ( !searchText.trim() ) return data;
        const lowerSearchText = searchText.toLowerCase();
        return data.filter( card =>
            card.STK.toLowerCase().includes( lowerSearchText ) ||
            card.bankName.toLowerCase().includes( lowerSearchText ) ||
            card.name.toLowerCase().includes( lowerSearchText )
        );
    }, [ searchText, data ] );

    // Hàm chọn card từ selection box
    const handleSelectCard = ( card: IBankingTransaction ) =>
    {
        setSearchText( card.STK! );
        setFormData( prev => ( {
            ...prev,
            accountNumber: card.STK!,
            bankBin: card.bankbin!,
            bankName: card.bankName!,
            accountName: card.name!,
            bankLogo: card.logoBanking!,
        } ) );
        setShowSelectionBox( false );
        inputRef.current?.blur();
    };

    const handleShowSelectionBox = () =>
    {

        console.log( "So tai khoan duoc chon" )
        if ( searchText.length >= 0 )
        {
            setShowSelectionBox( true );
        }
    }

    // Xử lý khi focus ra khỏi input
    const handleInputBlur = () =>
    {

        // Delay để cho phép người dùng nhấn vào selection box
        setTimeout( () =>
        {
            setShowSelectionBox( false );
        }, 150 );
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ () =>
            {
                Keyboard.dismiss();
                console.log( "tapped" )
                setShowSelectionBox( false );
            } }>
                <KeyboardAwareScrollView
                    ref={ scrollViewRef }
                    enableOnAndroid
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={ { flexGrow: 1 } }
                    keyboardDismissMode="interactive"
                    keyboardOpeningTime={ 250 }
                    scrollEnabled={ !showSelectionBox } // Tắt scroll của KeyboardAwareScrollView khi selection box hiển thị
                >
                    {/* <View className="flex-1 justify-center"> */ }
                    <View className="flex-1 px-5 pt-6  bg-[#041838]">
                        {/* Số tài khoản */ }
                        <View className="mb-6 relative">
                            <Text className="text-white font-medium mb-2 ml-1">Số tài khoản</Text>
                            <View className="bg-white rounded-lg overflow-hidden border border-gray-300">
                                <View className="flex-row items-center px-4 py-2">
                                    <Image source={ require( "@/assets/images/bank-black.png" ) } className="w-7 h-7 mr-4" />
                                    <TextInput
                                        ref={ inputRef }
                                        className="flex-1 font-semibold text-md"
                                        placeholder="0000 0000 0000 000"
                                        value={ searchText }
                                        onChangeText={ handleSearchChange }
                                        onFocus={ handleShowSelectionBox }
                                        onBlur={ handleInputBlur }
                                    />
                                    {/* { searchText.length > 0 && (
                                            <TouchableOpacity
                                                onPress={ () =>
                                                {
                                                    setSearchText( "" );
                                                    setShowSelectionBox( false );
                                                    setFormData( prev => ( {
                                                        ...prev,
                                                        accountNumber: "",
                                                        bankBin: "",
                                                        bankName: "",
                                                        accountName: "",
                                                        bankLogo: "",
                                                    } ) );
                                                } }
                                            >
                                                <Ionicons name="close-circle" size={ 20 } color="#999" />
                                            </TouchableOpacity>
                                        ) } */}
                                </View>
                            </View>

                            {/* Selection Box với scroll riêng biệt */ }
                            { showSelectionBox && (
                                <View className="bg-white rounded-lg shadow-sm max-h-60 absolute z-10 top-full left-0 right-0">
                                    <ScrollView
                                        className="max-h-25"
                                        nestedScrollEnabled={ true }
                                        showsVerticalScrollIndicator={ true }
                                        keyboardShouldPersistTaps="handled"
                                        scrollEventThrottle={ 16 }
                                    >
                                        { data.map( ( card, index ) => (
                                            <TouchableOpacity
                                                key={ card.id }
                                                className={ `border-b border-gray-200 px-4 py-2 rounded-lg ${ formData.accountNumber === card.STK ? "bg-blue-50 border border-blue-200" : ""
                                                    }` }
                                                onPress={ () => handleSelectCard( card ) }
                                            >
                                                <View className="flex-row justify-between items-center">
                                                    <View className="flex-row items-center">
                                                        <Image
                                                            source={ { uri: card.logoBanking } }
                                                            className="w-12 h-12 rounded-full mr-3 bg-blue-50"
                                                            resizeMode="contain"
                                                        />
                                                        <View>
                                                            <Text className="text-black text-sm">{ card.STK }</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ) ) }
                                    </ScrollView>
                                </View>
                            ) }
                        </View>
                        {/* -----------------------------------------End----------------------------------------- */ }

                        <View className="mb-6">
                            <Text className="text-white font-medium mb-2 ml-1">Ngân hàng</Text>
                            <View className="bg-white rounded-lg overflow-hidden border border-gray-300">
                                <View className="flex-row items-center px-4 py-2">
                                    <Image source={ require( "@/assets/images/coin.png" ) } className="w-7 h-7 mr-4" />
                                    <TextInput
                                        className="flex-1 font-semibold text-md"
                                        placeholder="Nhập số tiền thanh toán"
                                        keyboardType="numeric"
                                        value={ formData.amount }
                                        onChangeText={ handleAmountChange }
                                    />
                                    <Text>VNĐ</Text>
                                </View>
                            </View>
                        </View>

                        {/* Tên chủ tài khoản */ }
                        { formData.accountNumber &&
                            <View className="mb-6">
                                <Text className="text-white font-medium mb-2 ml-1">Tên chủ tài khoản</Text>
                                <View className="bg-white rounded-lg overflow-hidden border border-gray-300">
                                    <View className="flex-row items-center px-4 py-4">
                                        <Image source={ require( "@/assets/images/user.png" ) } className="w-7 h-7 mr-4" />
                                        <Text className="text-gray-500 font-semibold text-md"> { formData.accountName.toUpperCase() }</Text>
                                    </View>
                                </View>
                            </View> }

                        {/* -----------------------------------------End----------------------------------------- */ }

                        {/* Số tiền */ }
                        <View className="mb-6">
                            <Text className="text-white font-medium mb-2 ml-1">Số tiền</Text>
                            <View className="bg-white rounded-lg overflow-hidden border border-gray-300">
                                <View className="flex-row items-center px-4 py-2">
                                    <Image source={ require( "@/assets/images/coin.png" ) } className="w-7 h-7 mr-4" />
                                    <TextInput
                                        className="flex-1 font-semibold text-md"
                                        placeholder="Nhập số tiền thanh toán"
                                        keyboardType="numeric"
                                        value={ formData.amount }
                                        onChangeText={ handleAmountChange }
                                    />
                                    <Text>VNĐ</Text>
                                </View>
                            </View>
                        </View>
                        {/* -----------------------------------------End----------------------------------------- */ }

                        {/* Nội dung */ }
                        <View className="mb-8">
                            <Text className="text-white font-medium mb-2 ml-1">Nội dung chuyển khoản</Text>
                            <View className="bg-white rounded-lg overflow-hidden  border border-gray-300">
                                <TextInput
                                    className="p-4 text-gray-800 text-base"
                                    placeholder="Nhập nội dung chuyển khoản"
                                    multiline={ true }
                                    numberOfLines={ 4 }
                                    textAlignVertical="top"
                                    maxLength={ 100 }
                                    value={ formData.content }
                                    onChangeText={ ( text ) => handleChange( "content", text ) }
                                    keyboardType="email-address"
                                    onFocus={ () => setShowSelectionBox( false ) }
                                />
                                <View className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex-row justify-end">
                                    <Text className="text-gray-500 text-xs">{ formData.content.length }/100</Text>
                                </View>
                            </View>
                        </View>
                        {/* -----------------------------------------End----------------------------------------- */ }

                        {/* Button Submit */ }
                        <TouchableOpacity
                            className={ `rounded-lg py-4 ${ formData.amount ? "bg-[#1c40f2]" : "bg-gray-300" }` }
                            onPress={ handleSubmit }
                            disabled={ !formData.amount }
                        >
                            <View className="flex-row justify-center items-center">
                                <Ionicons name="qr-code" size={ 20 } color="white" className="mr-2" />
                                <Text className="text-white font-bold text-base ml-2">Tạo mã QR</Text>
                            </View>
                        </TouchableOpacity>
                        {/* -----------------------------------------End----------------------------------------- */ }
                    </View>
                    {/* </View> */ }
                </KeyboardAwareScrollView>
            </TouchableWithoutFeedback >
        </>
    );
}


//#region base
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard, StatusBar } from "react-native";
// import mockDataBankingCard from "@/assets/banking-card.json";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { useCardStore } from "@/store/useCardStore";
// import { IBankingTransaction } from "@/interface/IBanking";


// type FormState = {
//     accountNumber: string;
//     bankBin: string;
//     amount: string;
//     content: string;
//     bankName: string;
//     accountName: string;
//     bankLogo: string;
// };

// export default function CreateMyQR ()
// {
//     const data = mockDataBankingCard;
//     const [ isFocused, setIsFocused ] = useState( false );
//     const inputRef = useRef<TextInput>( null );
//     const [ showSelectionBox, setShowSelectionBox ] = useState<boolean>( false );

//     useEffect( () =>
//     {
//         const hideSub = Keyboard.addListener( 'keyboardDidHide', () =>
//         {
//             setIsFocused( false );
//             inputRef.current?.blur();
//         } );

//         return () =>
//         {
//             hideSub.remove();
//         };
//     }, [] );

//     const [ formData, setFormData ] = useState<FormState>( {
//         accountNumber: "",
//         bankBin: "",
//         amount: "",
//         content: "",
//         bankName: "",
//         accountName: "",
//         bankLogo: "",
//     } );

//     const [ showCardSelector, setShowCardSelector ] = useState( false );
//     const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

//     const handleChange = ( field: keyof FormState, value: string ) =>
//     {
//         setFormData( prev => ( { ...prev, [ field ]: value } ) );
//     };

//     // Hàm submit để tạo mã QR thanh toán
//     const handleSubmit = () =>
//     {
//         if ( formData.amount === "" )
//         {
//             alert( "Vui lòng nhập số tiền" );
//             return;
//         }

//         const qrData = {
//             accountNumber: formData.accountNumber,
//             amount: formData.amount,
//             bin: formData.bankBin,
//             content: formData.content,
//             bankName: formData.bankName,
//             bankLogo: formData.bankLogo,
//             accountName: formData.accountName,
//         };

//         router.push( {
//             pathname: "/qr/display",
//             params: {
//                 data: JSON.stringify( qrData ),
//             },
//         } );
//     };
//     // ---------------------------------- END ------------------------------------- //

//     // Hàm chọn thẻ ngân hàng
//     // const handleSelectCard = useCallback( ( card: IBankingTransaction ) =>
//     // {
//     //     setSelectedCard( card );
//     //     setShowCardSelector( false );
//     // }, [ setSelectedCard ] );
//     // ---------------------------------- END ------------------------------------- //

//     const handleAmountChange = ( text: string ) =>
//     {
//         // Allow only numeric values and prevent negative or excessive amounts
//         const numericValue = text.replace( /[^0-9]/g, '' );
//         if ( numericValue && Number( numericValue ) > 1_000_000_000 )
//         {
//             // Example max limit: 1 billion VND
//             alert( 'Số tiền vượt quá giới hạn cho phép (1 tỷ VNĐ)' );
//             return;
//         }
//         handleChange( "amount", numericValue );
//     };


//     const handleShowSelectionBox = () =>
//     {
//         setShowSelectionBox( !showSelectionBox )
//     }

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//             <TouchableWithoutFeedback onPress={ () => Keyboard.dismiss() }>
//                 <KeyboardAwareScrollView
//                     ref={ scrollViewRef }
//                     enableOnAndroid
//                     keyboardShouldPersistTaps="handled"
//                     showsVerticalScrollIndicator={ false }
//                     contentContainerStyle={ { flexGrow: 1 } }
//                     keyboardDismissMode="interactive"
//                     keyboardOpeningTime={ 250 }
//                 >
//                     <View className="flex-1 bg-black">
//                         <View className="flex-1 bg-[#f8f8f8] rounded-t-[32px] px-5 pt-6">
//                             <View className="items-center my-4">
//                                 <Text className="text-4xl font-bold text-black italic">⛛ AUTOPAY </Text>
//                             </View>

//                             {/* Số tài khoản */ }
//                             <View className="mb-6">
//                                 <Text className="text-gray-700 font-medium mb-2 ml-1">Số tài khoản</Text>
//                                 <View>
//                                     <TextInput
//                                         ref={ inputRef }
//                                         placeholder="số tài khoản"
//                                         onFocus={ handleShowSelectionBox }
//                                         onBlur={ () => setShowSelectionBox( !showSelectionBox ) }
//                                     />
//                                 </View>
//                                 { showSelectionBox &&
//                                     <View className="bg-red-200">
//                                         <ScrollView className="max-h-[100px]">
//                                             { data.map( ( card, index ) => (
//                                                 <TouchableOpacity
//                                                     key={ card.id }
//                                                     className={ `border-b border-gray-200 p-4 rounded-lg ${ formData.accountNumber === card.STK ? "bg-blue-50 border border-blue-200" : ""
//                                                         }` }
//                                                 // onPress={ () => handleSelectCard( card ) }
//                                                 >
//                                                     <View className="flex-row justify-between items-center">
//                                                         <View className="flex-row items-center">
//                                                             <Image
//                                                                 source={ { uri: card.logoBanking } }
//                                                                 className="w-12 h-12 rounded-lg mr-3"
//                                                                 resizeMode="contain"
//                                                             />
//                                                             <View>
//                                                                 <Text className="font-medium text-gray-800">{ card.bankName }</Text>
//                                                                 <Text className="text-gray-500 text-sm mt-1">{ card.STK }</Text>
//                                                             </View>
//                                                         </View>
//                                                         { formData.accountNumber === card.STK && (
//                                                             <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
//                                                         ) }
//                                                     </View>
//                                                 </TouchableOpacity>
//                                             ) ) }
//                                         </ScrollView>
//                                     </View> }

//                             </View>
//                             {/* -----------------------------------------End----------------------------------------- */ }

//                             {/* Tên chủ tài khoản */ }
//                             <View className="mb-6 ">
//                                 <Text className="text-gray-700 font-medium mb-2 ml-1">Tên chủ tài khoản</Text>
//                                 <View className="bg-gray-300 rounded-lg overflow-hidden  border border-gray-500">
//                                     <View className="flex-row items-center px-4 py-4">
//                                         <Image source={ require( "@/assets/images/user.png" ) } className="w-7 h-7 mr-4" />
//                                         <Text className="text-gray-500 font-semibold text-md"> { formData.accountName.toUpperCase() }</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             {/* -----------------------------------------End----------------------------------------- */ }

//                             {/* Số tiền */ }
//                             <View className="mb-6">
//                                 <Text className="text-gray-700 font-medium mb-2 ml-1">Số tiền</Text>
//                                 <View className="bg-white rounded-lg overflow-hidden border border-gray-300">
//                                     <View className="flex-row items-center px-4 py-2">
//                                         <Image source={ require( "@/assets/images/coin.png" ) } className="w-7 h-7 mr-4" />
//                                         <TextInput
//                                             className="flex-1 font-semibold text-md"
//                                             placeholder="Nhập số tiền thanh toán"
//                                             keyboardType="numeric"
//                                             value={ formData.amount }
//                                             onChangeText={ handleAmountChange }
//                                             onFocus={ () => console.log( "dang focus so tien" ) }
//                                         />
//                                         <Text>VNĐ</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             {/* -----------------------------------------End----------------------------------------- */ }

//                             {/* Nội dung */ }
//                             <View className="mb-8">
//                                 <Text className="text-gray-700 font-medium mb-2 ml-1">Nội dung chuyển khoản</Text>
//                                 <View className="bg-white rounded-lg overflow-hidden  border border-gray-300">
//                                     <TextInput
//                                         className="p-4 text-gray-800 text-base"
//                                         placeholder="Nhập nội dung chuyển khoản"
//                                         multiline={ true }
//                                         numberOfLines={ 4 }
//                                         textAlignVertical="top"
//                                         maxLength={ 100 }
//                                         value={ formData.content }
//                                         onChangeText={ ( text ) => handleChange( "content", text ) }
//                                         keyboardType="email-address"
//                                     />
//                                     <View className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex-row justify-end">
//                                         <Text className="text-gray-500 text-xs">{ formData.content.length }/100</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             {/* -----------------------------------------End----------------------------------------- */ }

//                             {/* Button Submit */ }
//                             <TouchableOpacity
//                                 className={ `rounded-lg py-4 mb-8 ${ formData.amount ? "bg-[#1c40f2]" : "bg-gray-300" }` }
//                                 onPress={ handleSubmit }
//                                 disabled={ !formData.amount }
//                             >
//                                 <View className="flex-row justify-center items-center">
//                                     <Ionicons name="qr-code" size={ 20 } color="white" className="mr-2" />
//                                     <Text className="text-white font-bold text-base ml-2">Tạo mã QR</Text>
//                                 </View>
//                             </TouchableOpacity>
//                             {/* -----------------------------------------End----------------------------------------- */ }
//                         </View>
//                     </View>
//                 </KeyboardAwareScrollView>
//             </TouchableWithoutFeedback>
//         </>
//     );
// }
//#endregion