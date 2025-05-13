
// import { useState } from "react";
// import { Image, Keyboard, Modal, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
// import Feather from '@expo/vector-icons/Feather';
// import InputField from "@/components/InputField";
// import InfoText from "@/components/InfoText";
// import { router } from "expo-router";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Seperate from "@/components/Seperate";

// export default function Profile ()
// {
//     const [ isVisible, setIsVisible ] = useState( false );
//     const [ fullName, setFullName ] = useState( 'Truong Thanh Dat' );
//     const [ email, setEmail ] = useState( 'abc@gmail.com' );
//     const [ cccd, setCccd ] = useState( '1234512124' );
//     const [ dateOfBirth, setDateOfBirth ] = useState( '06/12/2003' );
//     const [ address, setAddress ] = useState( 'Quan 9' );
//     const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );
//     const [ gen, setGen ] = useState( 'Name' );
//     const [ dateOfIssue, setDateOfIssue ] = useState( '09/12/2003' );

//     const handleUpdate = async () =>
//     {
//         setFullName( fullName );
//         setEmail( email );
//         setCccd( cccd );
//         setDateOfIssue( dateOfIssue );
//         setAddress( address );
//         setPhoneNumber( phoneNumber );
//         setGen( gen );
//         setDateOfBirth( dateOfBirth );
//         setIsVisible( false );
//         alert( 'Cập nhật thông tin thành công' );
//     }

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//             <ScrollView className="flex-1 bg-[#1c40f2]">
//                 <View className="p-6 m-2 bg-gray-200 rounded-3xl relative mt-20">
//                     <View className="flex-row items-center justify-center my-4 absolute -top-20 left-0 right-0">
//                         <Image source={ require( '../../../assets/images/500.jpg' ) } className="h-28 w-28 rounded-full border-4 border-white shadow-md" resizeMode="cover" />
//                     </View>
//                     <TouchableOpacity onPress={ () => setIsVisible( !isVisible ) } className="absolute right-5 top-5 h-10 w-10 bg-white justify-center items-center rounded-lg">
//                         <Feather name="edit" size={ 24 } color="#1c40f2" />
//                     </TouchableOpacity>
//                     <View className="mt-10">
//                         <InfoText className="text-md font-semibold" label="Họ tên" value={ fullName } />
//                         <InfoText className="text-md font-semibold" label="Email" value={ email } />
//                         <InfoText className="text-md font-semibold" label="CCCD" value={ cccd } />
//                         <InfoText className="text-md font-semibold" label="Ngày cấp" value={ dateOfIssue } />
//                         <InfoText className="text-md font-semibold" label="Địa chỉ" value={ address } />
//                         <InfoText className="text-md font-semibold" label="Số điện thoại" value={ phoneNumber } />
//                         <InfoText className="text-md font-semibold" label="Giới tính" value={ gen } />
//                         <InfoText className="text-md font-semibold" label="Ngày sinh" value={ dateOfBirth } />
//                     </View>
//                 </View>
//                 <View className="m-2">
//                     <TouchableOpacity onPress={ () => router.replace( '/user/change-password' ) } className="px-6 flex-row items-center justify-between bg-white p-4 border-2 border-gray-300 rounded-full">
//                         <Text className="text-md font-semibold">Thay đổi mật khẩu</Text>
//                         <MaterialIcons name="password" size={ 24 } color="black" />
//                     </TouchableOpacity>
//                 </View>
//                 <Modal
//                     animationType="slide"
//                     visible={ isVisible }
//                     transparent={ true }
//                     onRequestClose={ () => setIsVisible( !isVisible ) }
//                     className="justify-center items-center bg-white mt-20"
//                     onDismiss={ () => Keyboard.dismiss() }
//                 >
//                     <View className="flex-1 justify-center items-center bg-black/40">
//                         <ScrollView
//                             contentContainerStyle={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
//                             className="w-full px-4"
//                             keyboardShouldPersistTaps="handled"
//                         >
//                             <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
//                                 <View className="flex-row items-center justify-between mb-4">
//                                     <Text className="text-lg font-semibold">Cập nhật thông tin cá nhân</Text>
//                                     <TouchableOpacity onPress={ () => setIsVisible( false ) }>
//                                         <Ionicons name="close" size={ 30 } color="black" />
//                                     </TouchableOpacity>
//                                 </View>
//                                 <View className="gap-4">
//                                     <InputField label="Họ tên" value={ fullName } onChangeText={ setFullName } placeholder={ fullName } />
//                                     <InputField label="Email" value={ email } onChangeText={ setEmail } placeholder={ email } />
//                                     <InputField label="CCCD" value={ cccd } onChangeText={ setCccd } placeholder={ cccd } />
//                                     <InputField label="Ngày cấp" value={ dateOfIssue } onChangeText={ setDateOfIssue } placeholder={ dateOfIssue } />
//                                     <InputField label="Địa chỉ" value={ address } onChangeText={ setAddress } placeholder={ address } />
//                                     <InputField label="Số điện thoại" value={ phoneNumber } onChangeText={ setPhoneNumber } placeholder={ phoneNumber } />
//                                     <InputField label="Giới tính" value={ gen } onChangeText={ setGen } placeholder={ gen } />
//                                     <InputField label="Ngày sinh" value={ dateOfBirth } onChangeText={ setDateOfBirth } placeholder={ dateOfBirth } />
//                                 </View>
//                                 <TouchableOpacity
//                                     onPress={ handleUpdate }
//                                     className="bg-blue-500 mt-6 py-4 rounded-xl"
//                                 >
//                                     <Text className="text-white text-center font-semibold">Cập nhật</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </ScrollView>
//                     </View>
//                 </Modal>
//             </ScrollView>
//         </>
//     );
// }

import { useState } from "react";
import { Image, Keyboard, Modal, ScrollView, StatusBar, Text, TouchableOpacity, View, Platform, SafeAreaView } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import InputField from "@/components/InputField";
import InfoText from "@/components/InfoText";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import FloatingInputs from "@/app/test/floatinglabel";
import AppHeaderInfo from "@/components/App.headerInfo";

export default function Profile ()
{
    const [ isVisible, setIsVisible ] = useState( false );
    const [ fullName, setFullName ] = useState( 'Truong Thanh Dat' );
    const [ email, setEmail ] = useState( 'abc@gmail.com' );
    const [ cccd, setCccd ] = useState( '1234512124' );
    const [ dateOfBirth, setDateOfBirth ] = useState( '06/12/2003' );
    const [ address, setAddress ] = useState( 'Quan 9' );
    const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );
    const [ gen, setGen ] = useState( 'Nam' );
    const [ dateOfIssue, setDateOfIssue ] = useState( '09/12/2003' );

    const handleUpdate = async () =>
    {
        setFullName( fullName );
        setEmail( email );
        setCccd( cccd );
        setDateOfIssue( dateOfIssue );
        setAddress( address );
        setPhoneNumber( phoneNumber );
        setGen( gen );
        setDateOfBirth( dateOfBirth );
        setIsVisible( false );
        alert( 'Cập nhật thông tin thành công' );
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1">
                <AppHeaderInfo title="Thông Tin Cá Nhân" onPress={ () => router.back() }
                    rightComponent={
                        <TouchableOpacity
                            onPress={ () => setIsVisible( true ) }
                            className="bg-white/20 p-2 rounded-full"
                        >
                            <Feather name="edit-2" size={ 20 } color="white" />
                        </TouchableOpacity> }
                />
                <ScrollView className="flex-1" showsVerticalScrollIndicator={ false }>
                    {/* Ảnh đại diện */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        <View className="items-center p-4 pb-4">
                            <View className="relative">
                                <Image
                                    source={ require( '../../../assets/images/500.jpg' ) }
                                    className="h-24 w-24 rounded-full border-4 border-white"
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    className="absolute bottom-0 right-0 bg-[#1c40f2] p-2 rounded-full border-2 border-white"
                                    onPress={ () => alert( 'Chức năng thay đổi ảnh đại diện' ) }
                                >
                                    <Feather name="camera" size={ 14 } color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text className="text-xl font-bold mt-3 text-gray-800">{ fullName }</Text>
                            <Text className="text-gray-500">{ email }</Text>
                        </View>
                    </Animated.View>
                    {/* -----------------------------------------End----------------------------------------- */}   

                    {/* Thông tin cá nhân */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 200 ).duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
                        </View>

                        <View className="p-4">
                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <FontAwesome5 name="id-card" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">CCCD</Text>
                                    <Text className="text-gray-800 font-medium">{ cccd }</Text>
                                </View>
                            </View>

                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <FontAwesome5 name="calendar-alt" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Ngày cấp</Text>
                                    <Text className="text-gray-800 font-medium">{ dateOfIssue }</Text>
                                </View>
                            </View>

                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <FontAwesome5 name="birthday-cake" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Ngày sinh</Text>
                                    <Text className="text-gray-800 font-medium">{ dateOfBirth }</Text>
                                </View>
                            </View>

                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <Ionicons name="male-female" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Giới tính</Text>
                                    <Text className="text-gray-800 font-medium">{ gen }</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                    {/* -----------------------------------------End----------------------------------------- */}

                    {/* Thông tin liên hệ */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 400 ).duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Thông tin liên hệ</Text>
                        </View>

                        <View className="p-4">
                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <Ionicons name="call" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Số điện thoại</Text>
                                    <Text className="text-gray-800 font-medium">{ phoneNumber }</Text>
                                </View>
                            </View>

                            <View className="flex-row mb-4">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <Ionicons name="mail" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Email</Text>
                                    <Text className="text-gray-800 font-medium">{ email }</Text>
                                </View>
                            </View>

                            <View className="flex-row">
                                <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                                    <Ionicons name="location" size={ 16 } color="#1c40f2" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-gray-500 text-sm">Địa chỉ</Text>
                                    <Text className="text-gray-800 font-medium">{ address }</Text>
                                </View>
                            </View>
                        </View>
                    </Animated.View>
                    {/* -----------------------------------------End----------------------------------------- */}

                    {/* Thay đổi mật khẩu */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 600 ).duration( 600 ) }
                        className="mx-4 mt-4 mb-8 bg-white rounded-2xl shadow-md overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Bảo mật</Text>
                        </View>

                        <TouchableOpacity
                            onPress={ () => router.replace( '/user/change-password' ) }
                            className="flex-row items-center p-4 active:bg-gray-50"
                        >
                            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-3">
                                <MaterialIcons name="lock" size={ 16 } color="#ef4444" />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-medium">Thay đổi mật khẩu</Text>
                                <Text className="text-gray-500 text-sm">Cập nhật mật khẩu mới</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
                        </TouchableOpacity>
                    </Animated.View>
                    {/* -----------------------------------------End----------------------------------------- */}

                    {/* Edit Profile Modal */ }
                    <Modal
                        animationType="slide"
                        visible={ isVisible }
                        transparent={ true }
                        onRequestClose={ () => setIsVisible( false ) }
                        onDismiss={ () => Keyboard.dismiss() }
                    >
                        <View className="flex-1 justify-end bg-black/40">
                            <TouchableOpacity
                                className="absolute top-0 left-0 right-0 bottom-0"
                                activeOpacity={ 1 }
                                onPress={ () => setIsVisible( false ) }
                            />

                            <Animated.View
                                entering={ FadeInDown.duration( 300 ) }
                                className="bg-white rounded-t-3xl pt-6 pb-8 px-6"
                                style={ { maxHeight: '90%' } }
                            >
                                <View className="w-16 h-1 bg-gray-300 rounded-full self-center mb-6" />

                                <View className="flex-row items-center justify-between mb-6">
                                    <Text className="text-xl font-bold text-gray-800">Cập nhật thông tin</Text>
                                    <TouchableOpacity onPress={ () => setIsVisible( false ) }>
                                        <Ionicons name="close-circle" size={ 28 } color="#9ca3af" />
                                    </TouchableOpacity>
                                </View>

                                <ScrollView showsVerticalScrollIndicator={ false }>
                                    <View className="mb-6 items-center">
                                        <View className="relative">
                                            <Image
                                                source={ require( '../../../assets/images/500.jpg' ) }
                                                className="h-24 w-24 rounded-full border-2 border-gray-200"
                                                resizeMode="cover"
                                            />
                                            <TouchableOpacity
                                                className="absolute bottom-0 right-0 bg-[#1c40f2] p-2 rounded-full border-2 border-white"
                                                onPress={ () => alert( 'Chức năng thay đổi ảnh đại diện' ) }
                                            >
                                                <Feather name="camera" size={ 14 } color="white" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text className="text-sm text-gray-500 mt-2">Nhấn vào biểu tượng camera để thay đổi ảnh</Text>
                                    </View>

                                    <View className="space-y-4 gap-4">
                                        <FloatingInputs label="Họ tên" value={ fullName } onChangeText={ setFullName } placeholder="Nhập họ tên" />
                                        <FloatingInputs label="Email" value={ email } onChangeText={ setEmail } placeholder="Nhập email" />
                                        <FloatingInputs label="CCCD" value={ cccd } onChangeText={ setCccd } placeholder="Nhập CCCD" />
                                        <FloatingInputs label="Ngày cấp" value={ dateOfIssue } onChangeText={ setDateOfIssue } placeholder="Nhập ngày cấp" />
                                        <FloatingInputs label="Địa chỉ" value={ address } onChangeText={ setAddress } placeholder="Nhập địa chỉ" />
                                        <FloatingInputs label="Số điện thoại" value={ phoneNumber } onChangeText={ setPhoneNumber } placeholder="Nhập số điện thoại" />
                                        <FloatingInputs label="Giới tính" value={ gen } onChangeText={ setGen } placeholder="Nhập giới tính" />
                                        <FloatingInputs label="Ngày sinh" value={ dateOfBirth } onChangeText={ setDateOfBirth } placeholder="Nhập ngày sinh" />
                                    </View>

                                    <TouchableOpacity
                                        onPress={ handleUpdate }
                                        className="bg-[#1c40f2] mt-8 py-4 rounded-xl"
                                    >
                                        <Text className="text-white text-center font-semibold">Cập nhật thông tin</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </Animated.View>
                        </View>
                    </Modal>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}