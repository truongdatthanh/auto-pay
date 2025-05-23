import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Keyboard, Modal, ScrollView, StatusBar, TextInput, Touchable, TouchableOpacity, TouchableWithoutFeedback, View, Text } from "react-native";
import mockBanking from "../assets/banking.json"
import mockMyBankCard from "../assets/banking-card.json"
import Loading from "@/components/Loading";
import { convertEMVCode } from "@/utils/encodeEMVCode";
import { IBanking } from "@/interface/IBankingTransaction";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";



export default function Transfer ()
{
    const myBankCard = mockMyBankCard;
    const listBanking = mockBanking;
    const [ loading, setLoading ] = useState( false );
    const [ amount, setAmount ] = useState( '20000' );
    const [ isVisibleModal, setIsVisibleModal ] = useState( false );
    const [ selectedBanking, setSelectedBanking ] = useState<IBanking>();
    const [ accountNumber, setAccountNumber ] = useState( '246134029400001' );
    const [ searchQueryBank, setSearchQueryBank ] = useState( '' );
    const [ accountName, setAccountName ] = useState( '' );
    const [ content, setContent ] = useState( 'hello ửold' );
    const [ error, setError ] = useState( "" );
    const [ loadingIndicator, setLoadingIndicator ] = useState( false );
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

    const scrollToTop = () =>
    {
        scrollViewRef.current?.scrollToPosition( 0, 0, true );
    };

    useEffect( () =>
    {
        const keyboardDidHideListener = Keyboard.addListener( "keyboardDidHide", () =>
        {
            if ( selectedBanking && accountNumber )
            {
                checkAccountOwner();
            }
        } );

        return () =>
        {
            keyboardDidHideListener.remove();
        };
    }, [ accountNumber ] );

    useEffect( () =>
    {
        if ( selectedBanking && accountNumber )
        {
            checkAccountOwner();
        }
    }, [ selectedBanking ] );
    const checkAccountOwner = async () =>
    {
        setError( "" );
        setLoadingIndicator( true );
        try
        {
            const item = myBankCard.find( ( item ) => item.STK === accountNumber && item.bankbin === selectedBanking?.bin );
            if ( item )
            {
                setTimeout( () =>
                {
                    setLoadingIndicator( false );
                    setAccountName( item.name );
                }, 1000 );
                setError( "" );
                return;
            } else
            {
                setAccountName( '' );
                setTimeout( () =>
                {
                    setLoadingIndicator( false );
                    setError( "Không tìm thấy ngân hàng thụ hưởng." );
                }, 1000 );
            }
        } catch ( error )
        {
            alert( "Đã có lỗi xảy ra khi tra cứu." );
            console.error( error );
        } finally
        {
            setTimeout( () =>
            {
                setLoadingIndicator( false );
            }, 2000 );
        }
    };


    useEffect( () =>
    {
        setLoading( true );
        setTimeout( () =>
        {
            setLoading( false );
        }, 1000 );
    }, [] );

    const handleShowModal = () =>
    {
        setIsVisibleModal( !isVisibleModal );
    };

    const handleSelectBank = ( item: IBanking ) =>
    {
        setSelectedBanking( item );
        setIsVisibleModal( false );
    }

    if ( loading )
    {
        return <Loading message="Vui lòng chờ..." />;
    }

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

        if ( !accountName )
        {
            alert( "Vui lòng nhập tên chủ tài khoản" );
            return;
        }

        if ( !amount )
        {
            alert( "Vui lòng nhập số tiền" );
            return;
        }

        const data = convertEMVCode( {
            accountNumber: accountNumber,
            bankBin: selectedBanking?.bin,
            amount: parseInt( amount ),
            addInfo: content,
        } );

        router.push( {
            pathname: "/confirm-payment",
            params: {
                data: data,
            },
        } );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className="flex-1 bg-black" >
                    <View className="flex-row items-center justify-between p-4">
                        <View className="flex-row items-center gap-2 w-[25%]">
                            <TouchableOpacity onPress={ () => router.back() } className="p-2 bg-white/20 rounded-full">
                                <Ionicons name="arrow-back-outline" size={ 18 } color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={ () => router.replace( '/(tabs)/qr/scanner-qr' ) } className="p-2">
                                <Image source={ require( '../assets/images/qr.png' ) } className="w-8 h-8" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-1 items-center">
                            <Text className="text-lg text-white font-bold">Chuyển tiền</Text>
                        </View>
                        <View className="w-[25%] items-end">
                            <TouchableOpacity onPress={ () => router.push( '/(tabs)' ) } className="p-2">
                                <Entypo name="dots-three-vertical" size={ 18 } color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Main Content */ }
                    <KeyboardAwareScrollView
                        ref={ scrollToTop }
                        enableOnAndroid
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ { flexGrow: 1 } }
                        keyboardDismissMode="interactive"
                        keyboardOpeningTime={ 250 }
                        className="bg-slate-50"
                    >
                        <View className="mx-4 mt-6 bg-white p-4 rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <Text className="text-center text-sm text-gray-500 mb-1">
                                Nhập số tiền
                            </Text>

                            <TextInput
                                placeholder="0"
                                keyboardType="number-pad"
                                value={ amount }
                                onChangeText={ ( text ) => setAmount( text ) }
                                autoFocus
                                placeholderTextColor="#A0AEC0"
                                selectionColor={ "#1c40f2" }
                                className="text-center text-4xl font-extrabold text-[#1c40f2]"
                            />
                            <Text className="text-center text-lg text-gray-600 mt-2">
                                VND
                            </Text>
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
                        <View className="flex-1 bg-black/70 justify-end">
                            <View className="bg-white rounded-t-3xl p-4 overflow-hidden max-h-[70%]">
                                <View className="self-center w-24 h-1.5 bg-gray-300 rounded-full mb-4" />
                                <View className="justify-center items-center mb-4">
                                    <Text className="font-bold text-xl">Thông tin ngân hàng</Text>
                                    <TouchableOpacity className="absolute top-0 right-4" onPress={ handleShowModal }>
                                        <Ionicons name="close-outline" size={ 24 } color="gray" />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView className="max-h-[500px]">
                                    <View className="p-2">
                                        <TextInput
                                            className="border rounded-full pl-6"
                                            placeholder="Tìm kiếm ngân hàng..."
                                            value={ searchQueryBank }
                                            onChangeText={ setSearchQueryBank }
                                        />
                                    </View>
                                    { listBanking.map( ( item ) => (
                                        <TouchableOpacity key={ item.id } className={ `border-b border-gray-200 rounded-xl p-2  ${ selectedBanking?.id === item.id ? "bg-blue-50" : "" }` } onPress={ () => handleSelectBank( item ) }>
                                            <View className="flex-row items-center justify-between">
                                                <View className="flex-row items-center flex-1">
                                                    <Image source={ { uri: item.logo } } className="w-12 h-12 mr-4" resizeMode="contain" />
                                                    <Text className="text-sm flex-1">{ item.name }</Text>
                                                </View>
                                                { selectedBanking?.id === item.id && (
                                                    <Ionicons name="checkmark-circle" size={ 24 } color="#1c40f2" />
                                                ) }
                                            </View>
                                        </TouchableOpacity>
                                    ) ) }
                                </ScrollView>
                            </View>
                        </View>
                    </Modal >
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}
