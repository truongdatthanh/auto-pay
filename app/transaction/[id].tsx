import { router, useLocalSearchParams } from "expo-router";
import { Alert, BackHandler, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, ImageBackground } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/loading/Loading";
import { useTabBarStore } from "@/store/useTabbarStore";
import { useFabStore } from "@/store/useFABStore";
import { formatCurrencyWithCode, formatDayMonthYear } from "@/utils/format";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCardStore } from "@/store/useCardStore";
import AccountInfo from "@/components/card/AccountInfo";
import InfoText from "@/components/card/InfoText";
import AppHeaderInfo from "@/components/header/App.headerInfo";

export default function Transaction ()
{
    const selectedCard = useCardStore( state => state.selectedCard );
    const { id } = useLocalSearchParams();
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ note, setNote ] = useState( "" );
    const [ showFullContent, setShowFullContent ] = useState( false );
    const [ isLoading, setIsLoading ] = useState( true );
    const scrollViewRef = useRef<ScrollView>( null );
    const currentDate = new Date();

    // Memoize transaction data để tránh tính toán lại không cần thiết
    const data = useMemo( () =>
    {
        if ( !selectedCard?.transactionHistory ) return null;
        return selectedCard.transactionHistory.find( item => item.transactionId === id );
    }, [ id, selectedCard ] );

    console.log( "data transactionID: ", data )

    const setTabBarVisible = useTabBarStore( state => state.setTabBarVisible );
    const setVisible = useFabStore( ( state ) => state.setVisible );

    useFocusEffect(
        useCallback( () =>
        {
            // ẩn khi vào màn hình
            setVisible( false );
            setTabBarVisible( false );
            return () =>
            {
                setTabBarVisible( true );
                setVisible( true );
            }// hiện lại khi rời màn hình
        }, [ setTabBarVisible, setVisible ] )
    );

    useEffect( () =>
    {
        setIsLoading( true );
        const timer = setTimeout( () =>
        {
            setIsLoading( false );
        }, 1000 );

        return () => clearTimeout( timer );
    }, [ id ] );
    // ---------------------------------- END ------------------------------------- //

    // Hàm xử lý sự kiện back bằng phím vật lý
    useEffect( () =>
    {
        const backAction = () =>
        {
            router.push( '/(tabs)/history' );
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, [] );
    // ---------------------------------- END ------------------------------------- //


    // Hàm xử lý hiện modal
    const handleAddNote = useCallback( () =>
    {
        setModalVisible( true );
    }, [] );
    // ---------------------------------- END ------------------------------------- //

    //Hàm xử lý cập nhật ghi chú
    const handleUpdateNote = useCallback( () =>
    {
        const trimmedNote = note.trim();
        if ( trimmedNote === "" )
        {
            Alert.alert( "Thông báo", "Vui lòng nhập ghi chú!" );
            return;
        }

        Alert.alert( "Thông báo", "Cập nhật ghi chú thành công!", [
            {
                text: "Đồng ý",
                onPress: () => setModalVisible( false ),
            }
        ] );
    }, [ note ] );
    // ---------------------------------- END ------------------------------------- //

    // Hàm xử lý shareQR
    const handleShare = useCallback( () =>
    {
        Alert.alert( "Thông báo", "Đã sao chép thông tin giao dịch vào bộ nhớ tạm!" );
    }, [] );
    // ---------------------------------- END ------------------------------------- //

    // Hàm xử lý báo cáo vấn đề
    const handleReport = useCallback( () =>
    {
        Alert.alert(
            "Báo cáo giao dịch",
            "Bạn muốn báo cáo vấn đề với giao dịch này?",
            [
                {
                    text: "Hủy",
                    style: "cancel"
                },
                {
                    text: "Báo cáo",
                    onPress: () => Alert.alert( "Thông báo", "Đã gửi báo cáo thành công!" )
                }
            ]
        );
    }, [] );
    // ---------------------------------- END ------------------------------------- //



    // Hiển thị màn hình loading
    if ( isLoading )
    {
        return <Loading message="Đang tải thông tin giao dịch...." />;
    }

    if ( !data )
    {
        return (
            <View className="flex-1 items-center justify-center bg-slate-50 px-6">
                <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
                <Ionicons name="alert-circle-outline" size={ 60 } color="#cbd5e1" />
                <Text className="text-xl font-bold text-slate-700 mt-4">Không tìm thấy dữ liệu</Text>
                <Text className="text-slate-500 text-center mt-2">Giao dịch này không tồn tại hoặc đã bị xóa</Text>
                <TouchableOpacity
                    className="mt-6 bg-blue-500 px-6 py-3 rounded-full"
                    onPress={ () => router.push( '/(tabs)/history' ) }
                >
                    <Text className="text-white font-medium">Quay lại lịch sử</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <>
           
            <SafeAreaView className="flex-1 bg-[#041838]" >
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />


                <AppHeaderInfo title="Kết Quả Giao Dịch" onPress={ () => router.replace( "/(tabs)/home" ) } />
                <LinearGradient
                    colors={ [ '#041838', '#64748b' ] }
                    locations={ [ 0, 0.1 ] }
                    className="flex-1"
                    start={ { x: 0, y: 0 } }
                    end={ { x: 0, y: 1 } }
                >
                    <ScrollView className="flex-1">
                        <View className="bg-white pb-10 m-4 rounded-xl relative mt-10">
                            <View className="absolute -top-8 self-center bg-white rounded-full p-1">
                                <Image source={ require( "@/assets/images/check-mark.png" ) } className="w-14 h-14" resizeMode="contain" />
                            </View>
                            <View className="justify-center items-center mt-10 gap-2">
                                <Text className="font-semibold">Giao dịch thành công</Text>
                                <Text className={ `${ data.amount > 0 ? "text-green-500" : "text-red-500" } font-bold text-2xl` }>
                                    { data.amount > 0 && "+" }{ formatCurrencyWithCode( data.amount ) }
                                </Text>
                            </View>

                            <Seperate />

                            <View className="px-4 gap-4">
                                <InfoText
                                    label="Mã giao dịch"
                                    containerClassName="flex-row justify-between items-center"
                                    value={ data.transactionId }
                                    labelClassName="text-sm text-gray-500"
                                    valueClassName="text-sm text-black font-semibold"
                                />
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm text-slate-500">Thời gian thanh toán</Text>
                                    <View className="flex-row items-center gap-1">
                                        <Text className="text-sm text-black font-semibold">{ data.time }</Text>
                                        <Text className="text-sm text-black font-semibold">-</Text>
                                        <Text className="text-sm text-black font-semibold">{ formatDayMonthYear( data.date ) }</Text>
                                    </View>
                                </View>
                                <InfoText
                                    label="Số thẻ/TK"
                                    containerClassName="flex-row justify-between items-center"
                                    value={ selectedCard?.STK }
                                    labelClassName="text-sm text-gray-500"
                                    valueClassName="text-sm text-black font-semibold"
                                />
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm text-slate-500">Ngân hàng</Text>
                                    <View className="flex-row items-center gap-1">
                                        {/* <View className="w-7 h-7 border items-center border-gray-200 rounded-full"> */ }
                                        <Image source={ { uri: selectedCard?.logoBanking } } className="w-6 h-6 rounded-full border border-gray-200" resizeMode="contain" />
                                        {/* </View> */ }

                                        <Text className="text-sm text-black font-semibold">{ selectedCard?.bankName }</Text>
                                    </View>
                                </View>
                            </View>

                            <Seperate />

                            <View className="px-4 gap-4">
                                <InfoText
                                    label={ data.amount > 0 ? "Người gửi" : "Người nhận" }
                                    containerClassName="flex-row justify-between items-center"
                                    value={ data.amount > 0 ? data.senderName : data.receiverName }
                                    labelClassName="text-sm text-gray-500"
                                    valueClassName="text-sm text-black font-semibold"
                                />
                                <InfoText
                                    label="Số thẻ/TK"
                                    containerClassName="flex-row justify-between items-center"
                                    value={ data.amount > 0 ? data.senderSTK : data.receiverSTK }
                                    labelClassName="text-sm text-gray-500"
                                    valueClassName="text-sm text-black font-semibold"
                                />
                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm text-slate-500">Ngân hàng</Text>
                                    <View className="flex-row items-center gap-1">
                                        <Image source={ { uri: data.amount > 0 ? data.senderBankLogo : data.receiverBankLogo } } className="w-6 h-6 rounded-full border border-gray-200" resizeMode="contain" />
                                        <Text className="text-sm text-black font-semibold">{ data.amount > 0 ? data.senderBankName : data.receiverBankName }</Text>
                                    </View>
                                </View>
                                <View className="flex-row justify-between items-start">
                                    <Text className="text-sm text-gray-500 w-[30%]">Tin nhắn</Text>
                                    <Text className="text-sm text-black font-semibold text-right w-[70%]">
                                        { data.description }
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className="bg-white mx-4 rounded-xl">
                            <View className="px-4 py-2" >
                                <Text className="text-base font-semibold text-slate-700 mb-3">Thông tin giao dịch</Text>
                                <View className="flex-row flex-wrap">
                                    <InfoText
                                        containerClassName="w-1/2 mb-4"
                                        label="Loại giao dịch: "
                                        labelClassName="text-slate-500 text-sm mb-1"
                                        value={ data.type }
                                        valueClassName="text-sm text-black font-semibold"
                                    />
                                    <InfoText
                                        containerClassName="w-1/2 mb-4"
                                        label="Mã đơn: "
                                        labelClassName="text-slate-500 text-sm mb-1"
                                        valueClassName="text-sm text-black font-semibold"
                                    />
                                    <InfoText
                                        containerClassName="w-1/2 mb-4"
                                        label="Điểm bán: "
                                        labelClassName="text-slate-500 text-sm mb-1"
                                        valueClassName="text-sm text-black font-semibold"
                                    />
                                    <InfoText
                                        containerClassName="w-1/2 mb-4"
                                        label="Sản phẩm: "
                                        labelClassName="text-slate-500 text-sm mb-1"
                                        valueClassName="text-sm text-black font-semibold"
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </LinearGradient>
            </SafeAreaView >
        </>
    );
}

const Seperate = () =>
{
    return (
        <>
            <View className="relative mx-4 my-4">
                {/* Left half circle */ }
                <View className="w-4 h-4 bg-[#64748b] rounded-full absolute -left-6 top-1/2 -translate-y-2" />
                {/* Dashed line */ }
                <View className="border-t-2 border-dashed border-slate-500" />
                {/* Right half circle */ }
                <View className="w-4 h-4 bg-[#64748b] rounded-full absolute -right-6 top-1/2 -translate-y-2" />
            </View></>
    );
}


//  return (
//         <>
//             <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//             <SafeAreaView className="flex-1 bg-black">
//                 <Animated.View className="flex-1 " entering={ FadeIn.duration( 400 ) }>
//                     <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />
                  
//                     <LinearGradient
//                         colors={ data.amount < 0 ? [ '#ef4444', '#b91c1c' ] : [ '#10b981', '#047857' ] }
//                         className="pt-8 pb-8 rounded-b-3xl"
//                         start={ { x: 0, y: 0 } }
//                         end={ { x: 1, y: 1 } }
//                     >
                     
//                         <View className="flex-row items-center justify-between px-4">
//                             <TouchableOpacity
//                                 className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
//                                 onPress={ () => router.back() }
//                             >
//                                 <Ionicons name="arrow-back" size={ 24 } color="white" />
//                             </TouchableOpacity>
//                             <Text className="text-lg font-semibold text-white">Chi tiết giao dịch</Text>
//                             <TouchableOpacity
//                                 className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
//                                 onPress={ handleShare }
//                             >
//                                 <Ionicons name="share-outline" size={ 24 } color="white" />
//                             </TouchableOpacity>
//                         </View>

//                         <Animated.View
//                             entering={ FadeInDown.delay( 300 ).duration( 500 ) }
//                             className="items-center mt-5"
//                         >
//                             <Text className="text-white/80 text-sm mb-1">
//                                 { data.amount < 0 ? 'Chi tiêu' : 'Nhận vào' }
//                             </Text>
//                             <Text className="text-3xl font-bold text-white mb-2">
//                                 { formatCurrencyWithCode( Math.abs( data.amount ) ) }
//                             </Text>
//                             <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full">
//                                 <Ionicons name={ data.amount < 0 ? "arrow-up" : "arrow-down" } size={ 14 } color="white" />
//                                 <Text className="text-white text-xs ml-1">
//                                     { data.amount < 0 ? 'Đã thanh toán' : 'Đã nhận' }
//                                 </Text>
//                             </View>
//                         </Animated.View>
//                     </LinearGradient>
                  

                  
//                     <ScrollView
//                         ref={ scrollViewRef }
//                         className="flex-1 bg-slate-50"
//                         showsVerticalScrollIndicator={ false }
//                         contentContainerStyle={ { paddingHorizontal: 16, paddingBottom: 30 } }

//                     >
                        
//                         <Animated.View entering={ FadeInUp.delay( 200 ).duration( 500 ) } className="bg-white rounded-lg mt-4 px-4 py-2 shadow-md border border-gray-200">
//                             <InfoText
//                                 label="Mã giao dịch"
//                                 containerClassName="flex-row justify-between items-center py-2"
//                                 value={ data.transactionId }
//                                 labelClassName="text-sm text-gray-500"
//                                 valueClassName="text-sm text-black font-semibold"
//                             />

//                             <View className="h-[1px] bg-slate-100 my-2" />

//                             <InfoText
//                                 label="Thời gian tạo"
//                                 containerClassName="flex-row justify-between items-center py-2"
//                                 value={ formatDayMonthYear( currentDate ) }
//                                 labelClassName="text-sm text-gray-500"
//                                 valueClassName="text-sm text-black font-semibold"
//                             />

//                             <View className="h-[1px] bg-slate-100 my-2" />

//                             <View className="flex-row justify-between items-center py-2">
//                                 <Text className="text-sm text-slate-500">Thời gian thanh toán</Text>
//                                 <View className="flex-row items-center gap-1">
//                                     <Text className="text-sm text-black font-semibold">{ data.time }</Text>
//                                     <View className="border-l border-gray-500 h-6" />
//                                     <Text className="text-sm text-black font-semibold">{ formatDayMonthYear( data.date ) }</Text>
//                                 </View>
//                             </View>
//                         </Animated.View>
                       

                     
//                         { data.amount > 0 ? (
//                             <>
                             
//                                 <Animated.View entering={ FadeInUp.delay( 300 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200" >
//                                     <AccountInfo
//                                         title="Tài khoản thụ hưởng"
//                                         accountHolder={ selectedCard?.name }
//                                         accountNumber={ selectedCard?.STK }
//                                         bankName={ selectedCard?.bankName }
//                                         logo={ selectedCard?.logoBanking }
//                                     />
//                                 </Animated.View>

                             

                              
//                                 <Animated.View entering={ FadeInUp.delay( 400 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200">
//                                     <AccountInfo
//                                         title="Tài khoản giao dịch"
//                                         accountHolder={ data.senderName }
//                                         accountNumber={ data.senderSTK }
//                                         bankName={ data.senderBankName }
//                                         logo={ data.senderBankLogo }
//                                     />

//                                     <View className="h-[1px] bg-slate-100 my-3" />

//                                     <View className="mt-1">
//                                         <Text className="text-slate-500 text-sm mb-2">Nội dung chuyển khoản</Text>
//                                         <View className="bg-blue-50 rounded-lg p-3">
//                                             <Text className="text-slate-700 leading-5" numberOfLines={ showFullContent ? undefined : 2 }>
//                                                 { data.description }
//                                             </Text>
//                                             { data.description && data.description.length > 80 && (
//                                                 <TouchableOpacity className="mt-2" onPress={ () => setShowFullContent( !showFullContent ) }>
//                                                     <Text className="text-blue-500 text-sm">
//                                                         { showFullContent ? "Thu gọn" : "Xem thêm" }
//                                                     </Text>
//                                                 </TouchableOpacity>
//                                             ) }
//                                         </View>
//                                     </View>
//                                 </Animated.View>
                               
//                             </>

//                         ) : (
//                             <>
//                                 <Animated.View entering={ FadeInUp.delay( 400 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200">
//                                     <AccountInfo title="Tài khoản giao dịch"
//                                         accountHolder={ selectedCard?.name }
//                                         accountNumber={ selectedCard?.STK }
//                                         bankName={ selectedCard?.bankName }
//                                         logo={ selectedCard?.logoBanking }
//                                     />
//                                     <View className="h-[1px] bg-slate-100 my-3" />

//                                     <View className="mt-1">
//                                         <Text className="text-slate-500 text-sm mb-2">Nội dung chuyển khoản</Text>
//                                         <View className="bg-blue-50 rounded-lg p-3">
//                                             <Text className="text-slate-700 leading-5" numberOfLines={ showFullContent ? undefined : 2 }>
//                                                 { data.description }
//                                             </Text>
//                                             { data.description && data.description.length > 80 && (
//                                                 <TouchableOpacity className="mt-2" onPress={ () => setShowFullContent( !showFullContent ) }>
//                                                     <Text className="text-blue-500 text-sm">
//                                                         { showFullContent ? "Thu gọn" : "Xem thêm" }
//                                                     </Text>
//                                                 </TouchableOpacity>
//                                             ) }
//                                         </View>
//                                     </View>
//                                 </Animated.View>

//                                 <Animated.View entering={ FadeInUp.delay( 300 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200" >
//                                     <AccountInfo
//                                         title="Tài khoản thụ hưởng"
//                                         accountHolder={ data.receiverName }
//                                         accountNumber={ data.receiverSTK }
//                                         logo={ data.receiverBankLogo }
//                                         bankName={ data.receiverBankName }
//                                     />
//                                 </Animated.View>
//                             </>
//                         ) }



                        
//                         <Animated.View entering={ FadeInUp.delay( 500 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200" >
//                             <Text className="text-base font-semibold text-slate-700 mb-3">Thông tin giao dịch</Text>
//                             <View className="flex-row flex-wrap">
//                                 <InfoText
//                                     containerClassName="w-1/2 mb-4"
//                                     label="Loại giao dịch: "
//                                     labelClassName="text-slate-500 text-sm mb-1"
//                                     value={ data.type }
//                                     valueClassName="text-sm text-black font-semibold"
//                                 />
//                                 <InfoText
//                                     containerClassName="w-1/2 mb-4"
//                                     label="Mã đơn: "
//                                     labelClassName="text-slate-500 text-sm mb-1"
//                                     valueClassName="text-sm text-black font-semibold"
//                                 />
//                                 <InfoText
//                                     containerClassName="w-1/2 mb-4"
//                                     label="Điểm bán: "
//                                     labelClassName="text-slate-500 text-sm mb-1"
//                                     valueClassName="text-sm text-black font-semibold"
//                                 />
//                                 <InfoText
//                                     containerClassName="w-1/2 mb-4"
//                                     label="Sản phẩm: "
//                                     labelClassName="text-slate-500 text-sm mb-1"
//                                     valueClassName="text-sm text-black font-semibold"
//                                 />
//                             </View>
//                         </Animated.View>

                      
//                         <Animated.View entering={ FadeInUp.delay( 600 ).duration( 500 ) } className="bg-white rounded-lg mt-4 p-4 shadow-md border border-gray-200" >
//                             <View className="flex-row justify-between items-center mb-3">
//                                 <View className="flex-row items-center">
//                                     <MaterialIcons name="note-alt" size={ 18 } color="#64748b" />
//                                     <Text className="text-slate-500 ml-2">Ghi chú cho giao dịch</Text>
//                                 </View>
//                                 <TouchableOpacity className="bg-blue-500 px-2.5 py-1.5 rounded-full flex-row items-center" onPress={ handleAddNote } >
//                                     <FontAwesome6 name="pen" size={ 12 } color="white" />
//                                     <Text className="text-white text-xs ml-1">Cập nhật</Text>
//                                 </TouchableOpacity>
//                             </View>

//                             <View className="bg-blue-50 rounded-lg p-3">
//                                 { note ? (
//                                     <Text className="text-slate-700">{ note }</Text>
//                                 ) : (
//                                     <Text className="text-slate-400 italic">
//                                         Hiện chưa có ghi chú cho giao dịch này
//                                     </Text>
//                                 ) }
//                             </View>
//                         </Animated.View>

//                         <TouchableOpacity className="flex-row items-center justify-center mt-6 mb-2" onPress={ handleReport }>
//                             <MaterialIcons name="report-problem" size={ 16 } color="#64748b" />
//                             <Text className="text-slate-500 ml-2 text-sm">Báo cáo vấn đề với giao dịch này</Text>
//                         </TouchableOpacity>
//                     </ScrollView>

//                     <Modal
//                         transparent={ true }
//                         visible={ modalVisible }
//                         onRequestClose={ () => setModalVisible( false ) }
//                         statusBarTranslucent={ true }
//                         animationType="slide"
//                     >
//                         <BlurView intensity={ 100 } tint="dark" className="flex-1">
//                             <View className="flex-1 justify-end">
//                                 <View className="bg-white rounded-t-3xl p-5">
//                                     <View className="flex-row justify-between items-center">
//                                         <Text className="text-lg font-semibold text-slate-800">Cập nhật ghi chú</Text>
//                                         <TouchableOpacity
//                                             className="p-2 rounded-full"
//                                             onPress={ () => setModalVisible( false ) }
//                                         >
//                                             <Ionicons name="close" size={ 24 } color="#64748b" />
//                                         </TouchableOpacity>
//                                     </View>

//                                     <View className="h-[1px] bg-slate-100 my-4" />

//                                     <View className="bg-slate-100 rounded-xl p-3 min-h-[120px] mb-4">
//                                         <TextInput
//                                             className="text-slate-700 text-base"
//                                             placeholder="Nhập ghi chú cho giao dịch này..."
//                                             placeholderTextColor="#94a3b8"
//                                             value={ note }
//                                             onChangeText={ setNote }
//                                             multiline
//                                             autoFocus
//                                         />
//                                     </View>

//                                     <TouchableOpacity
//                                         className="bg-blue-500 rounded-full p-4"
//                                         onPress={ handleUpdateNote }
//                                     >
//                                         <Text className="text-white text-center font-semibold">Cập nhật</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </BlurView>
//                     </Modal>
//                 </Animated.View>
//             </SafeAreaView>
//         </>
//     );