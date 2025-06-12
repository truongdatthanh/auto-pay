import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ActivityIndicator, Image, Keyboard, Modal, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Text, FlatList, KeyboardAvoidingView, Platform, TextInput as RNTextInput, ScrollView } from "react-native";
import mockMyBankCard from "@/assets/banking-card.json"
import Loading from "@/components/loading/Loading";
import { IBanking } from "@/interface/IBanking";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { decodeEMVCo } from "@/utils/decodeEMVCode";
import { useBankingData } from "@/hooks/useBankingData";
import { formatCurrency, parseCurrency, removeVietnameseTonesAndSpaces } from "@/utils/format";
import AppHeaderInfo from "@/components/header/App.headerInfo";


export default function Transfer ()
{
    const MAX_VALUE = 1_000_000_000;
    const params = useLocalSearchParams();
    const data = params.data ? decodeEMVCo( params.data as string ) : null
    const myBankCard = mockMyBankCard;
    const [ loading, setLoading ] = useState( false );
    const [ amount, setAmount ] = useState<string | undefined>( data?.amount );
    const [ isVisibleModal, setIsVisibleModal ] = useState( false );
    const [ accountNumber, setAccountNumber ] = useState( data?.STK );
    const [ selectedBanking, setSelectedBanking ] = useState<IBanking>();
    const [ searchQueryBank, setSearchQueryBank ] = useState( '' );
    const [ accountName, setAccountName ] = useState( '' );
    const [ content, setContent ] = useState( '' );
    const [ error, setError ] = useState( "" );
    const [ loadingIndicator, setLoadingIndicator ] = useState( false );
    const { listBanking, loading: bankingLoading, error: bankingError } = useBankingData();
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );
    const [ suggestionAmount, setSuggestionAmount ] = useState<number[]>();
    const amountInputRef = useRef<RNTextInput>( null );

    //Lấy data
    useEffect( () =>
    {
        if ( data && listBanking?.length > 0 )
        {
            try
            {
                const selectedBank = listBanking.find( ( item ) => item.bin === data.bin );
                if ( selectedBank )
                {
                    console.log( "selected transfer: ", selectedBank )
                    setSelectedBanking( selectedBank );
                }
            } catch ( error )
            {
                console.error( 'Error selecting bank:', error );
                setError( 'Không thể khởi tạo ngân hàng' );
            }
        }
    }, [ data?.bin, listBanking ] );
    // --------------------------------- END ------------------------------------- //

    //Loading nhẹ để kiểm tra tên chủ tài khoản
    useEffect( () =>
    {
        if ( selectedBanking && accountNumber && accountNumber.length >= 8 )
        {
            const timeoutId = setTimeout( checkAccountOwner, 500 ); // Debounce
            return () => clearTimeout( timeoutId );
        } else
        {
            setAccountName( '' );
            setError( '' );
        }
    }, [ selectedBanking, accountNumber ] );
    // --------------------------------- END ------------------------------------- //

    //hàm xử lý gợi ý số tiền
    const suggestAmount = useCallback( ( amount: string ) =>
    {
        if ( !amount ) return [];

        const numericAmount = parseInt( parseCurrency( amount ) );
        if ( isNaN( numericAmount ) || numericAmount <= 0 ) return [];

        const suggestions = [];
        let base = 0;

        if ( numericAmount < 1000 )
        {
            const result = numericAmount.toString().replace( /0/g, "" );
            console.log( "result: ", result );
            base = Number( result ) * 1000;
        } else
        {
            base = numericAmount;
        }


        // Tạo 4 mức gợi ý với multiplier: 1, 10, 100, 1000
        for ( let index = 0; index < 4; index++ )
        {
            if ( numericAmount < MAX_VALUE )
            {
                console.log( "numericAmount: ", numericAmount );
                console.log( "base: ", base );
                // Tạo multiplier theo cấp số nhân 10: 1, 10, 100, 1000
                const multiplier = Math.pow( 10, index ); // 10^0=1, 10^1=10, 10^2=100, 10^3=1000
                const amountSuggest = base * multiplier;

                // Kiểm tra không vượt quá MAX_VALUE
                if ( amountSuggest < MAX_VALUE )
                {
                    suggestions.push( amountSuggest );
                }
            }
        }

        const filtered = suggestions.filter( item => item !== numericAmount );

        return filtered;
    }, [] );

    // --------------------------------- END ------------------------------------- //

    useEffect( () =>
    {
        try
        {
            if ( amount )
            {
                const suggestions = suggestAmount( amount );
                setSuggestionAmount( suggestions )
            } else
            {
                console.log( "Không có dữ liệu amount" );
                setSuggestionAmount( undefined )
            }
        } catch ( e )
        {
            console.error( "Lỗi khi tạo gợi ý:", e );
        }
    }, [ amount, suggestAmount ] );
    // --------------------------------- END ------------------------------------- //

    // Hàm xử lý chọn gợi ý số tiền - Banking UX
    const handleSelectSuggestionAmount = ( selectedAmount: number ) =>
    {
        setAmount( selectedAmount.toString() );

        // Thêm một chút delay để user thấy được feedback
        setTimeout( () =>
        {
            Keyboard.dismiss();
            // Blur input để hoàn thành việc nhập
            amountInputRef.current?.blur();
        }, 150 );

        // Haptic feedback (nếu có expo-haptics)
        // import * as Haptics from 'expo-haptics';
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    //Kiểm tra tên chủ tài khoản
    const checkAccountOwner = useCallback( async () =>
    {
        if ( !selectedBanking || !accountNumber ) return;

        setError( '' );
        setLoadingIndicator( true );

        try
        {
            const result = await new Promise<{ success: boolean; name?: string }>( ( resolve ) =>
            {
                setTimeout( () =>
                {
                    const item = myBankCard.find(
                        ( item ) => item.STK === accountNumber && item.bankbin === selectedBanking.bin
                    );

                    if ( item )
                    {
                        resolve( { success: true, name: item.name } );
                    } else
                    {
                        resolve( { success: false } );
                    }
                }, 1000 );
            } );

            if ( result.success && result.name )
            {
                setAccountName( result.name );
                setError( '' );
            } else
            {
                setAccountName( '' );
                setError( 'Không tìm thấy tài khoản thụ hưởng' );
            }
        } catch ( error )
        {
            console.error( 'Account validation error:', error );
            setError( 'Lỗi kiểm tra tài khoản. Vui lòng thử lại' );
        } finally
        {
            setLoadingIndicator( false );
        }
    }, [ selectedBanking, accountNumber, myBankCard ] );
    // --------------------------------- END ------------------------------------- //

    //Fake loading
    useEffect( () =>
    {
        setLoading( true );
        const timer = setTimeout( () =>
        {
            setLoading( false );
        }, 1000 );
        return () => clearTimeout( timer );
    }, [] );
    // --------------------------------- END ------------------------------------- //

    //Hàm show modal selectedCard
    const handleShowModal = () =>
    {
        setIsVisibleModal( !isVisibleModal );
    };
    // --------------------------------- END ------------------------------------- //

    //Hàm chọn thẻ ngân hàng
    const handleSelectBank = ( item: IBanking ) =>
    {
        setSelectedBanking( item );
        setIsVisibleModal( false );
    }
    // --------------------------------- END ------------------------------------- //

    //Hàm sử lý sự kiện submit sau khi đã điền đủ thông tin
    const handleSubmit = () =>
    {
        if ( !selectedBanking )
        {
            alert( "Vui lòng chọn ngân hàng" );
            return;
        }

        if ( !accountNumber )
        {
            alert( "Vui lòng nhập số tài khoản" );
            return;
        }

        // if ( !accountName )
        // {
        //     alert( "Vui lòng nhập tên chủ tài khoản" );
        //     return;
        // }

        if ( !amount )
        {
            alert( "Vui lòng nhập số tiền" );
            return;
        }

        console.log( "content: transfer", content )

        const data = {
            accountNumber: accountNumber,
            bankBin: selectedBanking?.bin,
            amount: parseInt( amount ),
            addInfo: content,
            bankName: selectedBanking?.name
        };

        router.push( {
            pathname: "/payment/confirm-payment",
            params: {
                data: JSON.stringify( data ),
            },
        } );
    }
    // --------------------------------- END ------------------------------------- //

    // Sử dụng useMemo để tối ưu filter
    const filteredBanking = useMemo( () =>
    {
        if ( !searchQueryBank ) return listBanking;

        const searchTerm = removeVietnameseTonesAndSpaces( searchQueryBank.toLowerCase().trim() );

        return listBanking.filter( item =>
        {
            const nameNoTones = removeVietnameseTonesAndSpaces( item.name.toLowerCase() );
            const shortNameNoTones = removeVietnameseTonesAndSpaces( item.shortName?.toLowerCase() || '' );
            const short_nameNoTones = removeVietnameseTonesAndSpaces( item.short_name?.toLowerCase() || '' );
            const codeNoTones = removeVietnameseTonesAndSpaces( item.code?.toLowerCase() || '' );

            return nameNoTones.includes( searchTerm ) ||
                shortNameNoTones.includes( searchTerm ) ||
                short_nameNoTones.includes( searchTerm ) ||
                codeNoTones.includes( searchTerm );
        } );
    }, [ listBanking, searchQueryBank ] );
    // --------------------------------- END ------------------------------------- //


    //Loading && Error
    if ( loading || bankingLoading )
    {
        return <Loading message="Vui lòng chờ..." />;
    }

    if ( bankingError )
    {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-red-500 text-center mb-4">{ bankingError }</Text>
                <TouchableOpacity onPress={ () => window.location.reload() }>
                    <Text className="text-blue-500">Thử lại</Text>
                </TouchableOpacity>
            </View>
        );
    }
    // --------------------------------- END ------------------------------------- //

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-black" >
                <AppHeaderInfo
                    title="Chuyển tiền"
                    onPress={ () => router.back() }
                    rightComponent={       
                            <TouchableOpacity onPress={ () => router.push( '/(tabs)/home' ) } className="p-2">
                                <Entypo name="dots-three-vertical" size={ 18 } color="white" />
                            </TouchableOpacity>                     
                    } />
                {/* Main Content */ }
                <KeyboardAwareScrollView
                    ref={ scrollViewRef }
                    enableOnAndroid
                    keyboardShouldPersistTaps="always"
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={ { flexGrow: 1 } }
                    // keyboardDismissMode="interactive" - chỉ IOS
                    keyboardOpeningTime={ 250 }
                    className="bg-slate-50 flex-1"
                >
                    <View className="mx-4 mt-6 bg-white p-4 rounded-xl overflow-hidden shadow-md border border-gray-200">
                        <Text className="text-center text-sm text-gray-500 mb-1">
                            Nhập số tiền
                        </Text>
                        <TextInput
                            ref={ amountInputRef }
                            placeholder="0"
                            keyboardType="number-pad"
                            value={ formatCurrency( amount || '' ) }
                            onChangeText={ ( text ) => setAmount( text ) }
                            autoFocus
                            placeholderTextColor="#A0AEC0"
                            selectionColor={ "#1c40f2" }
                            className="text-center text-4xl font-extrabold text-[#1c40f2]"
                        />
                        <Text className="text-center text-lg text-gray-600 mt-2">
                            VND
                        </Text>
                        { Array.isArray( suggestionAmount ) && suggestionAmount.length > 0 && (
                            <>
                                <Text className="text-center text-xs text-gray-400 mb-3">
                                    Gợi ý số tiền
                                </Text>
                                <ScrollView
                                    horizontal
                                    showsHorizontalScrollIndicator={ false }
                                    contentContainerStyle={ { paddingHorizontal: 16 } }
                                    keyboardShouldPersistTaps="always" // Quan trọng: cho phép tap khi keyboard active
                                    className="mb-2"
                                >
                                    <View className="flex-row gap-3">
                                        { suggestionAmount.map( ( item, index ) => (
                                            <TouchableOpacity
                                                key={ index }
                                                onPress={ () => handleSelectSuggestionAmount( item ) }
                                                className="bg-blue-50 border border-blue-200 px-4 py-2 rounded-full active:bg-blue-100 active:scale-95 min-w-[120px]"
                                                activeOpacity={ 0.8 }
                                                style={ {
                                                    shadowColor: '#1c40f2',
                                                    shadowOffset: { width: 0, height: 1 },
                                                    shadowOpacity: 0.1,
                                                    shadowRadius: 2,
                                                    elevation: 2,
                                                } }
                                            >
                                                <Text className="text-[#1c40f2] text-sm font-medium text-center">
                                                    { item.toLocaleString( "vi-VN" ) } VND
                                                </Text>
                                            </TouchableOpacity>
                                        ) ) }
                                    </View>
                                </ScrollView>
                            </>
                        ) }

                        <View className="border-t border-dashed w-[50%] border-gray-400 my-4 self-center" />
                        <TextInput
                            placeholder="Thêm ghi chú cho giao dịch..."
                            value={ content }
                            onChangeText={ setContent }
                            multiline={ true }
                            numberOfLines={ 4 }
                            textAlignVertical="top"
                            maxLength={ 100 }
                            placeholderTextColor="#A0AEC0"
                            className="text-center text-sm text-gray-400"
                        />
                    </View>
                    <View className="p-4 mx-4 mt-6 bg-white rounded-xl overflow-hidden gap-4 shadow-md border border-gray-200">
                        <View className="my-2">
                            <Text className="text-lg font-bold">Tài khoản thụ hưởng</Text>
                        </View>
                        <View className="border-t border-dashed border-gray-400 w-full" />

                        <View>
                            <Text className="text-sm text-gray-800 mb-2">Ngân hàng</Text>
                            <TouchableOpacity className="flex-row h-14 justify-between items-center border border-gray-200 p-2 rounded-xl" onPress={ handleShowModal }>
                                { selectedBanking ? (
                                    <View className="flex-row items-center flex-1">
                                        <Image source={ { uri: selectedBanking.logo } } className="w-12 h-12" resizeMode="contain" />
                                        <Text numberOfLines={ 1 } ellipsizeMode="tail" className=" flex-wrap flex-1 ">{ selectedBanking.name }</Text>
                                    </View>
                                ) : (
                                    <View className="flex-row items-center gap-2">
                                        <MaterialCommunityIcons name="bank" size={ 18 } color="#6b7280" />
                                        <Text className="text-gray-500">Chọn ngân hàng</Text>
                                    </View>
                                ) }
                                <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
                            </TouchableOpacity>
                        </View>


                        <View>
                            <Text className="text-sm text-gray-800 mb-2">Số tài khoản / thẻ</Text>
                            <View className="flex-row items-center h-14 border border-gray-300 rounded-lg p-2 gap-2">
                                <Ionicons name="card-sharp" size={ 18 } color="#6b7280" />
                                <TextInput
                                    className="h-14 flex-1"
                                    placeholder="Nhập số tài khoản / thẻ..."
                                    keyboardType="number-pad"
                                    value={ accountNumber }
                                    onChangeText={ setAccountNumber }
                                    placeholderTextColor="#6b7280"
                                />
                                { accountName && <Ionicons name="checkmark-circle" size={ 24 } color="green" /> }
                            </View>
                            { loadingIndicator && !accountName && (
                                <View className="flex-row items-center mt-2">
                                    <ActivityIndicator size="small" color="#1c40f2" />
                                    <Text className="ml-2 text-gray-500 text-sm">Đang kiểm tra tài khoản...</Text>
                                </View>
                            ) }
                            { error && (
                                <Text className="text-red-500 text-sm mt-2">{ error }</Text>
                            ) }

                        </View>

                        { accountName && (
                            <View className="disabled">
                                <Text className="text-sm text-gray-800 mb-2">Tên chủ tài khoản</Text>
                                <View className="flex-row bg-gray-100 items-center h-14 border border-gray-300 rounded-lg p-2 gap-2">
                                    <Ionicons name="person-sharp" size={ 18 } color="#A0AEC0" />
                                    <Text className="flex-1 text-gray-500">{ accountName.toUpperCase() }</Text>
                                </View>
                            </View>
                        ) }
                    </View>

                    <TouchableOpacity className="p-4 rounded-xl bg-white shadow-md border border-gray-200 w-[300px] self-center m-4 mt-6" onPress={ handleSubmit }>
                        <Text className="text-[#1c40f2] font-bold text-center">Chuyển tiền</Text>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>

                {/* onRequestClode dung de handle viec an nut back tren device */ }
                <Modal
                    visible={ isVisibleModal }
                    transparent={ true }
                    animationType="slide"
                    onRequestClose={ handleShowModal }
                >
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        {/* <View className="flex-1 bg-black/70 justify-end"> */ }
                        <KeyboardAvoidingView
                            className="flex-1 bg-black/70 justify-end"
                            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                            keyboardVerticalOffset={ Platform.OS === 'ios' ? 0 : 20 }
                        >
                            <View className="bg-white rounded-t-3xl p-4 overflow-hidden min-h-[70%] max-h-[70%]">
                                <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
                                <View className="justify-center items-center mb-4">
                                    <Text className="font-bold text-xl">Thông tin ngân hàng</Text>
                                    <TouchableOpacity className="absolute top-0 right-4" onPress={ handleShowModal }>
                                        <Ionicons name="close-outline" size={ 24 } color="gray" />
                                    </TouchableOpacity>
                                </View>
                                <View className="p-2">
                                    <TextInput
                                        className="border rounded-full pl-6"
                                        placeholder="Tìm kiếm ngân hàng..."
                                        value={ searchQueryBank }
                                        onChangeText={ setSearchQueryBank }
                                    />
                                </View>

                                <FlatList
                                    data={ filteredBanking }
                                    keyExtractor={ ( item ) => item.id.toString() }
                                    renderItem={ ( { item } ) => (
                                        <TouchableOpacity
                                            key={ item.id }
                                            className={ `border-b border-gray-200 rounded-xl p-2 ${ selectedBanking?.id === item.id ? "bg-blue-50" : "" }` }
                                            onPress={ () => handleSelectBank( item ) }
                                        >
                                            <View className="flex-row items-center justify-between">
                                                <View className="flex-row items-center flex-1">
                                                    <Image
                                                        source={ { uri: item.logo } }
                                                        className="w-12 h-12 mr-4"
                                                        resizeMode="contain"
                                                    />
                                                    <Text className="text-sm flex-1">{ item.name }</Text>
                                                </View>
                                                { selectedBanking?.id === item.id && (
                                                    <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
                                                ) }
                                            </View>
                                        </TouchableOpacity>
                                    ) }
                                    initialNumToRender={ 10 }
                                    maxToRenderPerBatch={ 10 }
                                    windowSize={ 10 }
                                    getItemLayout={ ( data, index ) => (
                                        { length: 60, offset: 60 * index, index }
                                    ) }
                                />
                            </View>
                        </KeyboardAvoidingView>
                        {/* </View> */ }
                    </TouchableWithoutFeedback>
                </Modal >
            </SafeAreaView>

        </>
    );
}





// import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import { router, useLocalSearchParams } from "expo-router";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import { ActivityIndicator, Image, Keyboard, Modal, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Text, FlatList, KeyboardAvoidingView, Platform } from "react-native";
// import mockMyBankCard from "@/assets/banking-card.json"
// import Loading from "@/components/loading/Loading";
// import { IBanking } from "@/interface/IBanking";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import { decodeEMVCo } from "@/utils/decodeEMVCode";
// import { useBankingData } from "@/hooks/useBankingData";
// import { formatCurrency, parseCurrency, removeVietnameseTonesAndSpaces } from "@/utils/format";


// export default function Transfer ()
// {
//     const MAX_VALUE = 1_000_000_000;
//     const params = useLocalSearchParams();
//     const data = params.data ? decodeEMVCo( params.data as string ) : null
//     const myBankCard = mockMyBankCard;
//     const [ loading, setLoading ] = useState( false );
//     const [ amount, setAmount ] = useState<string | undefined>( data?.amount );
//     const [ isVisibleModal, setIsVisibleModal ] = useState( false );
//     const [ accountNumber, setAccountNumber ] = useState( data?.STK );
//     const [ selectedBanking, setSelectedBanking ] = useState<IBanking>();
//     const [ searchQueryBank, setSearchQueryBank ] = useState( '' );
//     const [ accountName, setAccountName ] = useState( '' );
//     const [ content, setContent ] = useState( '' );
//     const [ error, setError ] = useState( "" );
//     const [ loadingIndicator, setLoadingIndicator ] = useState( false );
//     const { listBanking, loading: bankingLoading, error: bankingError } = useBankingData();
//     const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );
//     const [ suggestionAmount, setSuggestionAmount ] = useState<number[]>();

//     //Lấy data
//     useEffect( () =>
//     {
//         if ( data && listBanking?.length > 0 )
//         {
//             try
//             {
//                 const selectedBank = listBanking.find( ( item ) => item.bin === data.bin );
//                 if ( selectedBank )
//                 {
//                     console.log( "selected transfer: ", selectedBank )
//                     setSelectedBanking( selectedBank );
//                 }
//             } catch ( error )
//             {
//                 console.error( 'Error selecting bank:', error );
//                 setError( 'Không thể khởi tạo ngân hàng' );
//             }
//         }
//     }, [ data?.bin, listBanking ] );
//     // --------------------------------- END ------------------------------------- //

//     //Loading nhẹ để kiểm tra tên chủ tài khoản
//     useEffect( () =>
//     {
//         if ( selectedBanking && accountNumber && accountNumber.length >= 8 )
//         {
//             const timeoutId = setTimeout( checkAccountOwner, 500 ); // Debounce
//             return () => clearTimeout( timeoutId );
//         } else
//         {
//             setAccountName( '' );
//             setError( '' );
//         }
//     }, [ selectedBanking, accountNumber ] );
//     // --------------------------------- END ------------------------------------- //

//     //hàm xử lý gợi ý số tiền
//     const suggestAmount = useCallback( ( amount: string ) =>
//     {
//         if ( !amount ) return [];

//         const numericAmount = parseInt( parseCurrency( amount ) );
//         if ( isNaN( numericAmount ) || numericAmount <= 0 ) return [];

//         const suggestions = [];
//         let base = 0;

//         if ( numericAmount < 1000 )
//         {
//             const result = numericAmount.toString().replace( /0/g, "" );
//             console.log( "result: ", result );
//             base = Number( result ) * 1000;
//         } else
//         {
//             base = numericAmount;
//         }


//         // Tạo 4 mức gợi ý với multiplier: 1, 10, 100, 1000
//         for ( let index = 0; index < 4; index++ )
//         {
//             if ( numericAmount < MAX_VALUE )
//             {
//                 console.log( "numericAmount: ", numericAmount );
//                 console.log( "base: ", base );
//                 // Tạo multiplier theo cấp số nhân 10: 1, 10, 100, 1000
//                 const multiplier = Math.pow( 10, index ); // 10^0=1, 10^1=10, 10^2=100, 10^3=1000
//                 const amountSuggest = base * multiplier;

//                 // Kiểm tra không vượt quá MAX_VALUE
//                 if ( amountSuggest < MAX_VALUE )
//                 {
//                     suggestions.push( amountSuggest );
//                 }
//             }
//         }

//         const filtered = suggestions.filter( item => item !== numericAmount );

//         return filtered;
//     }, [] );

//     // --------------------------------- END ------------------------------------- //

//     useEffect( () =>
//     {
//         try
//         {
//             if ( amount )
//             {
//                 const suggestions = suggestAmount( amount );
//                 setSuggestionAmount( suggestions )
//             } else
//             {
//                 console.log( "Không có dữ liệu amount" );
//                 setSuggestionAmount( undefined )
//             }
//         } catch ( e )
//         {
//             console.error( "Lỗi khi tạo gợi ý:", e );
//         }
//     }, [ amount, suggestAmount ] );
//     // --------------------------------- END ------------------------------------- //


//     //Kiểm tra tên chủ tài khoản
//     const checkAccountOwner = useCallback( async () =>
//     {
//         if ( !selectedBanking || !accountNumber ) return;

//         setError( '' );
//         setLoadingIndicator( true );

//         try
//         {
//             const result = await new Promise<{ success: boolean; name?: string }>( ( resolve ) =>
//             {
//                 setTimeout( () =>
//                 {
//                     const item = myBankCard.find(
//                         ( item ) => item.STK === accountNumber && item.bankbin === selectedBanking.bin
//                     );

//                     if ( item )
//                     {
//                         resolve( { success: true, name: item.name } );
//                     } else
//                     {
//                         resolve( { success: false } );
//                     }
//                 }, 1000 );
//             } );

//             if ( result.success && result.name )
//             {
//                 setAccountName( result.name );
//                 setError( '' );
//             } else
//             {
//                 setAccountName( '' );
//                 setError( 'Không tìm thấy tài khoản thụ hưởng' );
//             }
//         } catch ( error )
//         {
//             console.error( 'Account validation error:', error );
//             setError( 'Lỗi kiểm tra tài khoản. Vui lòng thử lại' );
//         } finally
//         {
//             setLoadingIndicator( false );
//         }
//     }, [ selectedBanking, accountNumber, myBankCard ] );
//     // --------------------------------- END ------------------------------------- //

//     //Fake loading
//     useEffect( () =>
//     {
//         setLoading( true );
//         const timer = setTimeout( () =>
//         {
//             setLoading( false );
//         }, 1000 );
//         return () => clearTimeout( timer );
//     }, [] );
//     // --------------------------------- END ------------------------------------- //

//     //Hàm show modal selectedCard
//     const handleShowModal = () =>
//     {
//         setIsVisibleModal( !isVisibleModal );
//     };
//     // --------------------------------- END ------------------------------------- //

//     //Hàm chọn thẻ ngân hàng
//     const handleSelectBank = ( item: IBanking ) =>
//     {
//         setSelectedBanking( item );
//         setIsVisibleModal( false );
//     }
//     // --------------------------------- END ------------------------------------- //

//     //Hàm sử lý sự kiện submit sau khi đã điền đủ thông tin
//     const handleSubmit = () =>
//     {
//         if ( !selectedBanking )
//         {
//             alert( "Vui lòng chọn ngân hàng" );
//             return;
//         }

//         if ( !accountNumber )
//         {
//             alert( "Vui lòng nhập số tài khoản" );
//             return;
//         }

//         // if ( !accountName )
//         // {
//         //     alert( "Vui lòng nhập tên chủ tài khoản" );
//         //     return;
//         // }

//         if ( !amount )
//         {
//             alert( "Vui lòng nhập số tiền" );
//             return;
//         }

//         console.log( "content: transfer", content )

//         const data = {
//             accountNumber: accountNumber,
//             bankBin: selectedBanking?.bin,
//             amount: parseInt( amount ),
//             addInfo: content,
//             bankName: selectedBanking?.name
//         };

//         router.push( {
//             pathname: "/payment/confirm-payment",
//             params: {
//                 data: JSON.stringify( data ),
//             },
//         } );
//     }
//     // --------------------------------- END ------------------------------------- //

//     // Sử dụng useMemo để tối ưu filter
//     const filteredBanking = useMemo( () =>
//     {
//         if ( !searchQueryBank ) return listBanking;

//         const searchTerm = removeVietnameseTonesAndSpaces( searchQueryBank.toLowerCase().trim() );

//         return listBanking.filter( item =>
//         {
//             const nameNoTones = removeVietnameseTonesAndSpaces( item.name.toLowerCase() );
//             const shortNameNoTones = removeVietnameseTonesAndSpaces( item.shortName?.toLowerCase() || '' );
//             const short_nameNoTones = removeVietnameseTonesAndSpaces( item.short_name?.toLowerCase() || '' );
//             const codeNoTones = removeVietnameseTonesAndSpaces( item.code?.toLowerCase() || '' );

//             return nameNoTones.includes( searchTerm ) ||
//                 shortNameNoTones.includes( searchTerm ) ||
//                 short_nameNoTones.includes( searchTerm ) ||
//                 codeNoTones.includes( searchTerm );
//         } );
//     }, [ listBanking, searchQueryBank ] );
//     // --------------------------------- END ------------------------------------- //


//     //Loading && Error
//     if ( loading || bankingLoading )
//     {
//         return <Loading message="Vui lòng chờ..." />;
//     }

//     if ( bankingError )
//     {
//         return (
//             <View className="flex-1 justify-center items-center">
//                 <Text className="text-red-500 text-center mb-4">{ bankingError }</Text>
//                 <TouchableOpacity onPress={ () => window.location.reload() }>
//                     <Text className="text-blue-500">Thử lại</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
//     // --------------------------------- END ------------------------------------- //

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

//             <SafeAreaView className="flex-1 bg-black" >
//                 <View className="flex-row items-center justify-between p-4">
//                     <View className="flex-row items-center gap-2 w-[25%]">
//                         <TouchableOpacity onPress={ () => router.back() } className="p-2 bg-white/20 rounded-full">
//                             <Ionicons name="arrow-back-outline" size={ 18 } color="white" />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={ () => router.replace( '/(tabs)/qr/scanner-qr' ) } className="p-2">
//                             <Image source={ require( '@/assets/images/qr.png' ) } className="w-8 h-8" />
//                         </TouchableOpacity>
//                     </View>
//                     <View className="flex-1 items-center">
//                         <Text className="text-lg text-white font-bold">Chuyển tiền</Text>
//                     </View>
//                     <View className="w-[25%] items-end">
//                         <TouchableOpacity onPress={ () => router.push( '/(tabs)/home' ) } className="p-2">
//                             <Entypo name="dots-three-vertical" size={ 18 } color="white" />
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//                 {/* Main Content */ }
//                 <KeyboardAwareScrollView
//                     ref={ scrollViewRef }
//                     enableOnAndroid
//                     keyboardShouldPersistTaps="always"
//                     showsVerticalScrollIndicator={ false }
//                     contentContainerStyle={ { flexGrow: 1 } }
//                     // keyboardDismissMode="interactive" - chỉ IOS
//                     keyboardOpeningTime={ 250 }
//                     className="bg-slate-50 flex-1"
//                 >

//                         <View className="mx-4 mt-6 bg-white p-4 rounded-xl overflow-hidden shadow-md border border-gray-200">
//                             <Text className="text-center text-sm text-gray-500 mb-1">
//                                 Nhập số tiền
//                             </Text>
//                             <TextInput
//                                 placeholder="0"
//                                 keyboardType="number-pad"
//                                 value={ formatCurrency( amount || '' ) }
//                                 onChangeText={ ( text ) => setAmount( text ) }
//                                 autoFocus
//                                 placeholderTextColor="#A0AEC0"
//                                 selectionColor={ "#1c40f2" }
//                                 className="text-center text-4xl font-extrabold text-[#1c40f2]"
//                             />
//                             <Text className="text-center text-lg text-gray-600 mt-2">
//                                 VND
//                             </Text>
//                             { Array.isArray( suggestionAmount ) && suggestionAmount.length > 0 && (
//                                 <>
//                                     <Text className="text-center text-xs text-gray-400 mb-3">
//                                         Gợi ý số tiền
//                                     </Text>
//                                     <FlatList
//                                         data={ suggestionAmount }
//                                         horizontal
//                                         keyExtractor={ ( item, index ) => index.toString() }
//                                         showsHorizontalScrollIndicator={ false }
//                                         contentContainerStyle={ { paddingHorizontal: 8 } }
//                                         ItemSeparatorComponent={ () => <View style={ { width: 8 } } /> }
//                                         renderItem={ ( { item } ) => (
//                                             <TouchableOpacity
//                                                 onPress={ () => setAmount( item.toString() ) }
//                                                 className="bg-blue-50 border border-blue-200 px-3 py-2 rounded-full"
//                                             >
//                                                 <Text className="text-[#1c40f2] text-sm font-medium">
//                                                     { item.toLocaleString( "vi-VN" ) } VND
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         ) }
//                                     />
//                                 </>
//                             ) }
//                             <View className="border-t border-dashed w-[50%] border-gray-400 my-4 self-center" />
//                             <TextInput
//                                 placeholder="Thêm ghi chú cho giao dịch..."
//                                 value={ content }
//                                 onChangeText={ setContent }
//                                 multiline={ true }
//                                 numberOfLines={ 4 }
//                                 textAlignVertical="top"
//                                 maxLength={ 100 }
//                                 placeholderTextColor="#A0AEC0"
//                                 className="text-center text-sm text-gray-400"
//                             />
//                         </View>
//                         <View className="p-4 mx-4 mt-6 bg-white rounded-xl overflow-hidden gap-4 shadow-md border border-gray-200">
//                             <View className="my-2">
//                                 <Text className="text-lg font-bold">Tài khoản thụ hưởng</Text>
//                             </View>
//                             <View className="border-t border-dashed border-gray-400 w-full" />

//                             <View>
//                                 <Text className="text-sm text-gray-800 mb-2">Ngân hàng</Text>
//                                 <TouchableOpacity className="flex-row h-14 justify-between items-center border border-gray-200 p-2 rounded-xl" onPress={ handleShowModal }>
//                                     { selectedBanking ? (
//                                         <View className="flex-row items-center flex-1">
//                                             <Image source={ { uri: selectedBanking.logo } } className="w-12 h-12" resizeMode="contain" />
//                                             <Text numberOfLines={ 1 } ellipsizeMode="tail" className=" flex-wrap flex-1 ">{ selectedBanking.name }</Text>
//                                         </View>
//                                     ) : (
//                                         <View className="flex-row items-center gap-2">
//                                             <MaterialCommunityIcons name="bank" size={ 18 } color="#6b7280" />
//                                             <Text className="text-gray-500">Chọn ngân hàng</Text>
//                                         </View>
//                                     ) }
//                                     <MaterialIcons name="keyboard-arrow-down" size={ 24 } color="#1c40f2" />
//                                 </TouchableOpacity>
//                             </View>


//                             <View>
//                                 <Text className="text-sm text-gray-800 mb-2">Số tài khoản / thẻ</Text>
//                                 <View className="flex-row items-center h-14 border border-gray-300 rounded-lg p-2 gap-2">
//                                     <Ionicons name="card-sharp" size={ 18 } color="#6b7280" />
//                                     <TextInput
//                                         className="h-14 flex-1"
//                                         placeholder="Nhập số tài khoản / thẻ..."
//                                         keyboardType="number-pad"
//                                         value={ accountNumber }
//                                         onChangeText={ setAccountNumber }
//                                         placeholderTextColor="#6b7280"
//                                     />
//                                     { accountName && <Ionicons name="checkmark-circle" size={ 24 } color="green" /> }
//                                 </View>
//                                 { loadingIndicator && !accountName && (
//                                     <View className="flex-row items-center mt-2">
//                                         <ActivityIndicator size="small" color="#1c40f2" />
//                                         <Text className="ml-2 text-gray-500 text-sm">Đang kiểm tra tài khoản...</Text>
//                                     </View>
//                                 ) }
//                                 { error && (
//                                     <Text className="text-red-500 text-sm mt-2">{ error }</Text>
//                                 ) }

//                             </View>

//                             { accountName && (
//                                 <View className="disabled">
//                                     <Text className="text-sm text-gray-800 mb-2">Tên chủ tài khoản</Text>
//                                     <View className="flex-row bg-gray-100 items-center h-14 border border-gray-300 rounded-lg p-2 gap-2">
//                                         <Ionicons name="person-sharp" size={ 18 } color="#A0AEC0" />
//                                         <Text className="flex-1 text-gray-500">{ accountName.toUpperCase() }</Text>
//                                     </View>
//                                 </View>
//                             ) }
//                         </View>

//                         <TouchableOpacity className="p-4 rounded-xl bg-white shadow-md border border-gray-200 w-[300px] self-center m-4 mt-6" onPress={ handleSubmit }>
//                             <Text className="text-[#1c40f2] font-bold text-center">Chuyển tiền</Text>
//                         </TouchableOpacity>

//                 </KeyboardAwareScrollView>

//                 {/* onRequestClode dung de handle viec an nut back tren device */ }
//                 <Modal
//                     visible={ isVisibleModal }
//                     transparent={ true }
//                     animationType="slide"
//                     onRequestClose={ handleShowModal }
//                 >
//                     <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
//                         {/* <View className="flex-1 bg-black/70 justify-end"> */ }
//                         <KeyboardAvoidingView
//                             className="flex-1 bg-black/70 justify-end"
//                             behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
//                             keyboardVerticalOffset={ Platform.OS === 'ios' ? 0 : 20 }
//                         >
//                             <View className="bg-white rounded-t-3xl p-4 overflow-hidden min-h-[70%] max-h-[70%]">
//                                 <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
//                                 <View className="justify-center items-center mb-4">
//                                     <Text className="font-bold text-xl">Thông tin ngân hàng</Text>
//                                     <TouchableOpacity className="absolute top-0 right-4" onPress={ handleShowModal }>
//                                         <Ionicons name="close-outline" size={ 24 } color="gray" />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View className="p-2">
//                                     <TextInput
//                                         className="border rounded-full pl-6"
//                                         placeholder="Tìm kiếm ngân hàng..."
//                                         value={ searchQueryBank }
//                                         onChangeText={ setSearchQueryBank }
//                                     />
//                                 </View>

//                                 <FlatList
//                                     data={ filteredBanking }
//                                     keyExtractor={ ( item ) => item.id.toString() }
//                                     keyboardShouldPersistTaps="always"
//                                     renderItem={ ( { item } ) => (
//                                         <TouchableOpacity
//                                             key={ item.id }
//                                             className={ `border-b border-gray-200 rounded-xl p-2 ${ selectedBanking?.id === item.id ? "bg-blue-50" : "" }` }
//                                             onPress={ () => handleSelectBank( item ) }
//                                         >
//                                             <View className="flex-row items-center justify-between">
//                                                 <View className="flex-row items-center flex-1">
//                                                     <Image
//                                                         source={ { uri: item.logo } }
//                                                         className="w-12 h-12 mr-4"
//                                                         resizeMode="contain"
//                                                     />
//                                                     <Text className="text-sm flex-1">{ item.name }</Text>
//                                                 </View>
//                                                 { selectedBanking?.id === item.id && (
//                                                     <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
//                                                 ) }
//                                             </View>
//                                         </TouchableOpacity>
//                                     ) }
//                                     initialNumToRender={ 10 }
//                                     maxToRenderPerBatch={ 10 }
//                                     windowSize={ 10 }
//                                     getItemLayout={ ( data, index ) => (
//                                         { length: 60, offset: 60 * index, index }
//                                     ) }
//                                 />
//                             </View>
//                         </KeyboardAvoidingView>
//                         {/* </View> */ }
//                     </TouchableWithoutFeedback>
//                 </Modal >
//             </SafeAreaView>

//         </>
//     );
// }

