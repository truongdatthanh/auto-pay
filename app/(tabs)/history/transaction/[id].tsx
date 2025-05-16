import { router, useLocalSearchParams } from "expo-router";
import { Alert, BackHandler, Image, Modal, ScrollView, Text, TextInput, TouchableOpacity, View, StatusBar, ActivityIndicator } from "react-native";
import { formatCurrencyVND } from "@/utils/formatCurrencyVND";
import { formatDate } from "@/utils/formatDate";
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useEffect, useState, useRef, useCallback } from "react";
import Animated, { FadeIn, FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import Loading from "@/components/Loading";


interface ITransaction
{
    transactionId: string;
    date: string;
    amount: number;
    description: string;
    senderName: string;
    senderSTK: string;
    receiverSTK: string;
}

interface IBankingTransaction
{
    id: string;
    STK: string;
    deeplink: string;
    name: string;
    logoBanking: string;
    bankName: string;
    transactionHistory: ITransaction[];
}


export default function Transaction ()
{
    const { id } = useLocalSearchParams();
    const currentDate = new Date();
    const [ modalVisible, setModalVisible ] = useState( false );
    const [ note, setNote ] = useState( "" );
    const [ showFullContent, setShowFullContent ] = useState( false );
    const scrollViewRef = useRef( null );
    const [ currentCard, setCurrentCard ] = useState<IBankingTransaction | null>( null );
    const [ isLoading, setIsLoading ] = useState( true );

    // Lấy dữ liệu và thêm thời gian loading 2 giây
    useFocusEffect(
        useCallback( () =>
        {
            let timer: NodeJS.Timeout;
            setIsLoading( true );

            const fetchSelectedCard = async () =>
            {
                try
                {
                    const card = await AsyncStorage.getItem( 'selectedCard' );
                    if ( card )
                    {
                        setCurrentCard( JSON.parse( card ) );
                    }

                    // Đặt thời gian loading 2 giây
                    timer = setTimeout( () =>
                    {
                        setIsLoading( false );
                    }, 500 );
                } catch ( error )
                {
                    console.error( "Error fetching card data:", error );
                    setIsLoading( false );
                }
            };

            fetchSelectedCard();

            return () =>
            {
                clearTimeout( timer );
            };
        }, [] )
    );

    const data = currentCard?.transactionHistory.find( ( item ) => item.transactionId === id );

    const handleAddNote = () =>
    {
        setModalVisible( true );
    };

    const handleUpdateNote = () =>
    {
        if ( note.trim() === "" )
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
    };

    const handleShare = () =>
    {
        Alert.alert( "Thông báo", "Đã sao chép thông tin giao dịch vào bộ nhớ tạm!" );
    };

    const handleReport = () =>
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
    };

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
        <Animated.View className="flex-1 bg-slate-50" entering={ FadeIn.duration( 400 ) }>
            <StatusBar barStyle="light-content" backgroundColor='transparent' translucent />

            {/* Header */ }
            <LinearGradient
                colors={ data.amount < 0 ? [ '#ef4444', '#b91c1c' ] : [ '#10b981', '#047857' ] }
                className="pt-12 pb-8 rounded-b-3xl"
                start={ { x: 0, y: 0 } }
                end={ { x: 1, y: 1 } }
            >
                {/* title */ }
                <View className="flex-row items-center justify-between px-4">
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={ () => router.push( '/(tabs)/history' ) }
                    >
                        <Ionicons name="arrow-back" size={ 24 } color="white" />
                    </TouchableOpacity>

                    <Text className="text-lg font-semibold text-white">Chi tiết giao dịch</Text>

                    <TouchableOpacity
                        className="w-10 h-10 rounded-full bg-white/20 items-center justify-center"
                        onPress={ handleShare }
                    >
                        <Ionicons name="share-outline" size={ 24 } color="white" />
                    </TouchableOpacity>
                </View>
                {/* -----------------------------------------End----------------------------------------- */ }

                <Animated.View
                    entering={ FadeInDown.delay( 300 ).duration( 500 ) }
                    className="items-center mt-5"
                >
                    <Text className="text-white/80 text-sm mb-1">
                        { data.amount < 0 ? 'Chi tiêu' : 'Nhận vào' }
                    </Text>
                    <Text className="text-3xl font-bold text-white mb-2">
                        { formatCurrencyVND( Math.abs( data.amount ) ) }
                    </Text>
                    <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full">
                        <Ionicons name={ data.amount < 0 ? "arrow-up" : "arrow-down" } size={ 14 } color="white" />
                        <Text className="text-white text-xs ml-1">
                            { data.amount < 0 ? 'Đã thanh toán' : 'Đã nhận' }
                        </Text>
                    </View>
                </Animated.View>
            </LinearGradient>

            <ScrollView
                ref={ scrollViewRef }
                className="flex-1"
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={ { paddingHorizontal: 16, paddingBottom: 30 } }
            >
                {/* Transaction ID and Date */ }
                <Animated.View entering={ FadeInUp.delay( 200 ).duration( 500 ) } className="bg-white rounded-2xl mt-4 p-4 shadow-sm">
                    <View className="flex-row justify-between items-center py-2">
                        <View className="flex-row items-center">
                            <MaterialIcons name="receipt-long" size={ 18 } color="#64748b" />
                            <Text className="text-slate-500 ml-2">Mã giao dịch</Text>
                        </View>
                        <Text className="text-slate-700 font-medium">{ data.transactionId }</Text>
                    </View>

                    <View className="h-[1px] bg-slate-100 my-2" />

                    <View className="flex-row justify-between items-center py-2">
                        <View className="flex-row items-center">
                            <MaterialIcons name="access-time" size={ 18 } color="#64748b" />
                            <Text className="text-slate-500 ml-2">Thời gian tạo</Text>
                        </View>
                        <Text className="text-slate-700 font-medium">{ formatDate( currentDate ) }</Text>
                    </View>

                    <View className="h-[1px] bg-slate-100 my-2" />

                    <View className="flex-row justify-between items-center py-2">
                        <View className="flex-row items-center">
                            <MaterialIcons name="event" size={ 18 } color="#64748b" />
                            <Text className="text-slate-500 ml-2">Thời gian thanh toán</Text>
                        </View>
                        <Text className="text-slate-700 font-medium">{ formatDate( data.date ) }</Text>
                    </View>
                </Animated.View>

                {/* Beneficiary Account */ }
                <Animated.View entering={ FadeInUp.delay( 300 ).duration( 500 ) } className="bg-white rounded-2xl mt-4 p-4 shadow-sm" >
                    <Text className="text-base font-semibold text-slate-700 mb-3">Tài khoản thụ hưởng</Text>

                    <View className="flex-row items-center">
                        <Image
                            source={ { uri: currentCard?.logoBanking } }
                            className="w-10 h-10 rounded-lg bg-slate-50"
                            resizeMode="contain"
                        />
                        <View className="ml-3 flex-1">
                            <Text className="text-slate-700 font-semibold text-base">{ currentCard?.name?.toUpperCase() }</Text>
                            <View className="flex-row items-center">
                                <Text className="text-blue-500">{ currentCard?.STK }</Text>
                                <TouchableOpacity className="ml-1.5 p-0.5">
                                    <MaterialIcons name="content-copy" size={ 14 } color="#3b82f6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Source Account */ }
                <Animated.View entering={ FadeInUp.delay( 400 ).duration( 500 ) } className="bg-white rounded-2xl mt-4 p-4 shadow-sm">
                    <Text className="text-base font-semibold text-slate-700 mb-3">Tài khoản giao dịch</Text>

                    <View className="flex-row items-center">
                        <Image source={ { uri: currentCard?.logoBanking } } className="w-10 h-10 rounded-lg bg-slate-50" resizeMode="contain" />
                        <View className="ml-3 flex-1">
                            <Text className="text-slate-700 font-semibold text-base">Nguyễn Văn A</Text>
                            <View className="flex-row items-center">
                                <Text className="text-blue-500">123456789</Text>
                                <TouchableOpacity className="ml-1.5 p-0.5">
                                    <MaterialIcons name="content-copy" size={ 14 } color="#3b82f6" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View className="h-[1px] bg-slate-100 my-3" />

                    <View className="mt-1">
                        <Text className="text-slate-500 text-sm mb-2">Nội dung chuyển khoản</Text>
                        <View className="bg-slate-50 rounded-lg p-3">
                            <Text className="text-slate-700 leading-5" numberOfLines={ showFullContent ? undefined : 2 }>
                                { data.description }
                            </Text>
                            { data.description && data.description.length > 80 && (
                                <TouchableOpacity className="mt-2" onPress={ () => setShowFullContent( !showFullContent ) }>
                                    <Text className="text-blue-500 text-sm">
                                        { showFullContent ? "Thu gọn" : "Xem thêm" }
                                    </Text>
                                </TouchableOpacity>
                            ) }
                        </View>
                    </View>
                </Animated.View>

                {/* Transaction Details */ }
                <Animated.View entering={ FadeInUp.delay( 500 ).duration( 500 ) } className="bg-white rounded-2xl mt-4 p-4 shadow-sm" >
                    <Text className="text-base font-semibold text-slate-700 mb-3">Thông tin giao dịch</Text>

                    <View className="flex-row flex-wrap">
                        <View className="w-1/2 mb-4">
                            <Text className="text-slate-500 text-sm mb-1">Loại giao dịch</Text>
                            <Text className="text-slate-700 font-medium">
                                { data.amount < 0 ? 'Chuyển tiền' : 'Nhận tiền' }
                            </Text>
                        </View>

                        <View className="w-1/2 mb-4">
                            <Text className="text-slate-500 text-sm mb-1">Mã đơn</Text>
                            <Text className="text-slate-700 font-medium">-</Text>
                        </View>

                        <View className="w-1/2 mb-4">
                            <Text className="text-slate-500 text-sm mb-1">Điểm bán</Text>
                            <Text className="text-slate-700 font-medium">-</Text>
                        </View>

                        <View className="w-1/2 mb-4">
                            <Text className="text-slate-500 text-sm mb-1">Sản phẩm</Text>
                            <Text className="text-slate-700 font-medium">-</Text>
                        </View>
                    </View>
                </Animated.View>

                {/* Transaction Note */ }
                <Animated.View entering={ FadeInUp.delay( 600 ).duration( 500 ) } className="bg-white rounded-2xl mt-4 p-4 shadow-sm" >
                    <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center">
                            <MaterialIcons name="note-alt" size={ 18 } color="#64748b" />
                            <Text className="text-slate-500 ml-2">Ghi chú cho giao dịch</Text>
                        </View>
                        <TouchableOpacity className="bg-blue-500 px-2.5 py-1.5 rounded-full flex-row items-center" onPress={ handleAddNote } >
                            <FontAwesome6 name="pen" size={ 12 } color="white" />
                            <Text className="text-white text-xs ml-1">Cập nhật</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="bg-slate-50 rounded-lg p-3">
                        { note ? (
                            <Text className="text-slate-700">{ note }</Text>
                        ) : (
                            <Text className="text-slate-400 italic">
                                Hiện chưa có ghi chú cho giao dịch này
                            </Text>
                        ) }
                    </View>
                </Animated.View>

                {/* Report Issue Button */ }
                <TouchableOpacity className="flex-row items-center justify-center mt-6 mb-2" onPress={ handleReport }>
                    <MaterialIcons name="report-problem" size={ 16 } color="#64748b" />
                    <Text className="text-slate-500 ml-2 text-sm">Báo cáo vấn đề với giao dịch này</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Note Modal */ }
            <Modal
                transparent={ true }
                visible={ modalVisible }
                onRequestClose={ () => setModalVisible( false ) }
                statusBarTranslucent={ true }
                animationType="slide"
            >
                <BlurView intensity={ 20 } className="flex-1">
                    <View className="flex-1 justify-end">
                        <View className="bg-white rounded-t-3xl p-5">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-lg font-semibold text-slate-800">Cập nhật ghi chú</Text>
                                <TouchableOpacity
                                    className="p-2 rounded-full"
                                    onPress={ () => setModalVisible( false ) }
                                >
                                    <Ionicons name="close" size={ 24 } color="#64748b" />
                                </TouchableOpacity>
                            </View>

                            <View className="h-[1px] bg-slate-100 my-4" />

                            <View className="bg-slate-50 rounded-xl p-3 min-h-[120px] mb-4">
                                <TextInput
                                    className="text-slate-700 text-base"
                                    placeholder="Nhập ghi chú cho giao
                                     dịch này..."
                                    placeholderTextColor="#94a3b8"
                                    value={ note }
                                    onChangeText={ setNote }
                                    multiline
                                    autoFocus
                                />
                            </View>

                            <TouchableOpacity
                                className="bg-blue-500 rounded-full p-4"
                                onPress={ handleUpdateNote }
                            >
                                <Text className="text-white text-center font-semibold">Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </BlurView>
            </Modal>
        </Animated.View>
    );
}



