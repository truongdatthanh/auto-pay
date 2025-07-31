// import { useState } from "react";
// import { Image, Keyboard, Modal, ScrollView, StatusBar, Text, TouchableOpacity, View, Platform, SafeAreaView, TextInput } from "react-native";
// import Feather from '@expo/vector-icons/Feather';
// import { router } from "expo-router";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import Animated, { FadeInDown } from 'react-native-reanimated';
// import AppHeaderInfo from "@/components/header/App.headerInfo";

// export default function Profile ()
// {
//     const [ isVisible, setIsVisible ] = useState( false );
//     const [ fullName, setFullName ] = useState( 'Truong Thanh Dat' );
//     const [ email, setEmail ] = useState( 'abc@gmail.com' );
//     const [ cccd, setCccd ] = useState( '1234512124' );
//     const [ dateOfBirth, setDateOfBirth ] = useState( '06/12/2003' );
//     const [ address, setAddress ] = useState( 'Quan 9' );
//     const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );
//     const [ gen, setGen ] = useState( 'Nam' );
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
//             <SafeAreaView className="flex-1">
//                 <AppHeaderInfo title="Thông Tin Cá Nhân" onPress={ () => router.back() }
//                     rightComponent={
//                         <TouchableOpacity
//                             onPress={ () => setIsVisible( true ) }
//                             className="p-2 bg-white/20 rounded-full h-10 w-10 items-center justify-center"
//                         >
//                             <Feather name="edit-2" size={ 16 } color="white" />
//                         </TouchableOpacity> }
//                 />
//                 <ScrollView className="flex-1" showsVerticalScrollIndicator={ false }>
//                     {/* Ảnh đại diện */ }
//                     <Animated.View
//                         entering={ FadeInDown.duration( 600 ) }
//                         className="mx-4 mt-4"
//                     >
//                         <View className="items-center p-4 pb-4">
//                             <View className="relative">
//                                 <Image
//                                     source={ require( '@/assets/images/500.jpg' ) }
//                                     className="h-24 w-24 rounded-full border-4 border-black"
//                                     resizeMode="cover"
//                                 />
//                                 <TouchableOpacity
//                                     className="absolute bottom-0 right-0 bg-[#1c40f2] p-2 rounded-full border-2 border-white"
//                                     onPress={ () => alert( 'Chức năng thay đổi ảnh đại diện' ) }
//                                 >
//                                     <Feather name="camera" size={ 14 } color="white" />
//                                 </TouchableOpacity>
//                             </View>
//                             <Text className="text-xl font-bold mt-3 text-gray-800">{ fullName }</Text>
//                             <Text className="text-gray-500">{ email }</Text>
//                         </View>
//                     </Animated.View>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Thông tin cá nhân */ }
//                     <Animated.View
//                         entering={ FadeInDown.delay( 200 ).duration( 600 ) }
//                         className="mx-4 mt-4 bg-white rounded-lg shadow-md overflow-hidden"
//                     >
//                         <View className="p-4 border-b border-gray-100">
//                             <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
//                         </View>

//                         <View className="p-4">
//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <FontAwesome5 name="id-card" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Căn cước công dân</Text>
//                                     <Text className="text-gray-800 font-medium">{ cccd }</Text>
//                                 </View>
//                             </View>

//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <FontAwesome5 name="calendar-alt" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Ngày cấp</Text>
//                                     <Text className="text-gray-800 font-medium">{ dateOfIssue }</Text>
//                                 </View>
//                             </View>

//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <FontAwesome5 name="birthday-cake" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Ngày sinh</Text>
//                                     <Text className="text-gray-800 font-medium">{ dateOfBirth }</Text>
//                                 </View>
//                             </View>

//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <Ionicons name="male-female" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Giới tính</Text>
//                                     <Text className="text-gray-800 font-medium">{ gen }</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </Animated.View>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Thông tin liên hệ */ }
//                     <Animated.View
//                         entering={ FadeInDown.delay( 400 ).duration( 600 ) }
//                         className="mx-4 mt-4 bg-white rounded-lg shadow-md overflow-hidden"
//                     >
//                         <View className="p-4 border-b border-gray-100">
//                             <Text className="text-lg font-bold text-gray-800">Thông tin liên hệ</Text>
//                         </View>

//                         <View className="p-4">
//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <Ionicons name="call" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Số điện thoại</Text>
//                                     <Text className="text-gray-800 font-medium">{ phoneNumber }</Text>
//                                 </View>
//                             </View>

//                             <View className="flex-row mb-4">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <Ionicons name="mail" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Email</Text>
//                                     <Text className="text-gray-800 font-medium">{ email }</Text>
//                                 </View>
//                             </View>

//                             <View className="flex-row">
//                                 <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
//                                     <Ionicons name="location" size={ 16 } color="#1c40f2" />
//                                 </View>
//                                 <View className="flex-1">
//                                     <Text className="text-gray-500 text-sm">Địa chỉ</Text>
//                                     <Text className="text-gray-800 font-medium">{ address }</Text>
//                                 </View>
//                             </View>
//                         </View>
//                     </Animated.View>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Thay đổi mật khẩu */ }
//                     <Animated.View
//                         entering={ FadeInDown.delay( 600 ).duration( 600 ) }
//                         className="mx-4 mt-4 mb-8 bg-white rounded-lg shadow-md overflow-hidden"
//                     >
//                         <View className="p-4 border-b border-gray-100">
//                             <Text className="text-lg font-bold text-gray-800">Bảo mật</Text>
//                         </View>

//                         <TouchableOpacity
//                             onPress={ () => router.replace( '/user/change-password' ) }
//                             className="flex-row items-center p-4 active:bg-gray-50"
//                         >
//                             <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-3">
//                                 <MaterialIcons name="lock" size={ 16 } color="#ef4444" />
//                             </View>
//                             <View className="flex-1">
//                                 <Text className="text-gray-800 font-medium">Thay đổi mật khẩu</Text>
//                                 <Text className="text-gray-500 text-sm">Cập nhật mật khẩu mới</Text>
//                             </View>
//                             <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                         </TouchableOpacity>
//                     </Animated.View>
//                     {/* -----------------------------------------End----------------------------------------- */ }

//                     {/* Edit Profile Modal */ }
//                     <Modal
//                         animationType="slide"
//                         visible={ isVisible }
//                         transparent={ true }
//                         onRequestClose={ () => setIsVisible( false ) }
//                         onDismiss={ () => Keyboard.dismiss() }
//                         statusBarTranslucent
//                     >
//                         <View className="flex-1 justify-end bg-black/40">
//                             <Animated.View
//                                 entering={ FadeInDown.duration( 300 ) }
//                                 className="bg-white rounded-t-3xl pt-6 pb-4 px-6"

//                             >
//                                 <View className="flex-row items-center justify-between mb-6">
//                                     <Text className="text-xl font-bold text-gray-800">Cập nhật thông tin</Text>
//                                     <TouchableOpacity onPress={ () => setIsVisible( false ) }>
//                                         <Ionicons name="close-circle" size={ 28 } color="#9ca3af" />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <ScrollView showsVerticalScrollIndicator={ false }>
//                                     <View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Họ tên"
//                                                 value={ fullName }
//                                                 onChangeText={ setFullName }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Email"
//                                                 value={ email }
//                                                 onChangeText={ setEmail }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Căn cước công dân"
//                                                 value={ cccd }
//                                                 onChangeText={ setCccd }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Ngày cấp"
//                                                 value={ dateOfIssue }
//                                                 onChangeText={ setDateOfIssue }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Địa chỉ"
//                                                 value={ address }
//                                                 onChangeText={ setAddress }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Số điện thoại"
//                                                 value={ phoneNumber }
//                                                 onChangeText={ setPhoneNumber }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Giới tính"
//                                                 value={ gen }
//                                                 onChangeText={ setGen }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                         <View>
//                                             <TextInput
//                                                 placeholder="Ngày sinh"
//                                                 value={ dateOfBirth }
//                                                 onChangeText={ setDateOfBirth }
//                                                 className="border-b border-gray-500"
//                                             />
//                                         </View>
//                                     </View>

//                                     <TouchableOpacity
//                                         onPress={ handleUpdate }
//                                         className="bg-[#1c40f2] mt-8 py-4 rounded-xl"
//                                     >
//                                         <Text className="text-white text-center font-semibold">Cập nhật thông tin</Text>
//                                     </TouchableOpacity>
//                                 </ScrollView>
//                             </Animated.View>
//                         </View>
//                     </Modal>
//                 </ScrollView>
//             </SafeAreaView>
//         </>
//     );
// }


import React, { useState, useCallback, useMemo } from "react";
import
    {
        Image,
        Keyboard,
        Modal,
        ScrollView,
        StatusBar,
        Text,
        TouchableOpacity,
        View,
        SafeAreaView,
        TextInput,
        Alert,
        KeyboardAvoidingView,
        Platform,
        ActivityIndicator,
        KeyboardTypeOptions
    } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Animated, { FadeInDown } from 'react-native-reanimated';
import AppHeaderInfo from "@/components/header/App.headerInfo";

// Types and Interfaces
interface UserProfile
{
    fullName: string;
    email: string;
    cccd: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
    gender: 'Nam' | 'Nữ' | 'Khác';
    dateOfIssue: string;
}

interface ValidationErrors
{
    [ key: string ]: string | undefined;
    fullName?: string;
    email?: string;
    cccd?: string;
    phoneNumber?: string;
}

interface FormValidationResult
{
    errors: ValidationErrors;
    isValid: boolean;
}

interface InfoItemProps
{
    icon: React.ReactNode;
    label: string;
    value: string;
    iconBgColor?: string;
    iconColor?: string;
}

interface FormInputProps
{
    label: string;
    value: string;
    onChangeText: ( text: string ) => void;
    placeholder: string;
    error?: string;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
}

interface LoadingOverlayProps
{
    visible: boolean;
}

// Constants
const COLORS = {
    primary: '#1c40f2',
    secondary: '#3b82f6',
    success: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        300: '#d1d5db',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#4b5563',
        700: '#374151',
        800: '#1f2937',
        900: '#111827'
    }
} as const;

// Validation functions
const validateEmail = ( email: string ): boolean =>
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test( email );
};

const validatePhone = ( phone: string ): boolean =>
{
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test( phone.replace( /\s/g, '' ) );
};

const validateCCCD = ( cccd: string ): boolean =>
{
    const cccdRegex = /^[0-9]{12}$/;
    return cccdRegex.test( cccd );
};

// Custom hook for form validation
const useFormValidation = ( formData: UserProfile ): FormValidationResult =>
{
    return useMemo( () =>
    {
        const errors: ValidationErrors = {};

        if ( !formData.fullName.trim() )
        {
            errors.fullName = 'Họ tên không được để trống';
        } else if ( formData.fullName.trim().length < 2 )
        {
            errors.fullName = 'Họ tên phải có ít nhất 2 ký tự';
        }

        if ( !validateEmail( formData.email ) )
        {
            errors.email = 'Email không hợp lệ';
        }

        if ( !validateCCCD( formData.cccd ) )
        {
            errors.cccd = 'Số CCCD phải có đúng 12 chữ số';
        }

        if ( !validatePhone( formData.phoneNumber ) )
        {
            errors.phoneNumber = 'Số điện thoại phải có 10-11 chữ số';
        }

        return {
            errors,
            isValid: Object.keys( errors ).length === 0
        };
    }, [ formData ] );
};

// Reusable components
const InfoItem: React.FC<InfoItemProps> = React.memo( ( {
    icon,
    label,
    value,
    iconBgColor = 'bg-blue-50',
    iconColor = COLORS.primary
} ) => (
    <View className="flex-row mb-4 last:mb-0">
        <View className={ `w-10 h-10 rounded-full ${ iconBgColor } items-center justify-center mr-3` }>
            { icon }
        </View>
        <View className="flex-1">
            <Text className="text-gray-500 text-sm">{ label }</Text>
            <Text className="text-gray-800 font-medium" numberOfLines={ 2 }>{ value }</Text>
        </View>
    </View>
) );

const FormInput: React.FC<FormInputProps> = React.memo( ( {
    label,
    value,
    onChangeText,
    placeholder,
    error,
    keyboardType = 'default',
    multiline = false
} ) => (
    <View className="mb-4">
        <Text className="text-gray-700 text-sm font-medium mb-2">{ label }</Text>
        <TextInput
            placeholder={ placeholder }
            value={ value }
            onChangeText={ onChangeText }
            keyboardType={ keyboardType }
            multiline={ multiline }
            className={ `p-3 border rounded-lg text-gray-800 ${ error ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500` }
            placeholderTextColor={ COLORS.gray[ 400 ] }
            numberOfLines={ multiline ? 3 : 1 }
        />
        { error && (
            <Text className="text-red-500 text-xs mt-1">{ error }</Text>
        ) }
    </View>
) );

const LoadingOverlay: React.FC<LoadingOverlayProps> = React.memo( ( { visible } ) =>
{
    if ( !visible ) return null;

    return (
        <View className="absolute inset-0 bg-black/50 items-center justify-center z-50">
            <View className="bg-white p-6 rounded-lg items-center">
                <ActivityIndicator size="large" color={ COLORS.primary } />
                <Text className="mt-2 text-gray-600">Đang cập nhật...</Text>
            </View>
        </View>
    );
} );

const Profile: React.FC = () =>
{
    // State management
    const [ isVisible, setIsVisible ] = useState<boolean>( false );
    const [ isLoading, setIsLoading ] = useState<boolean>( false );
    const [ formData, setFormData ] = useState<UserProfile>( {
        fullName: 'Truong Thanh Dat',
        email: 'abc@gmail.com',
        cccd: '123451212345',
        dateOfBirth: '06/12/2003',
        address: 'Quận 9, TP.HCM',
        phoneNumber: '0943369278',
        gender: 'Nam',
        dateOfIssue: '09/12/2003'
    } );

    // Form validation
    const { errors, isValid } = useFormValidation( formData );

    // Handlers
    const handleInputChange = useCallback( <K extends keyof UserProfile> (
        field: K,
        value: UserProfile[ K ]
    ) =>
    {
        setFormData( prev => ( {
            ...prev,
            [ field ]: value
        } ) );
    }, [] );

    const handleUpdate = useCallback( async (): Promise<void> =>
    {
        if ( !isValid )
        {
            Alert.alert(
                'Lỗi xác thực',
                'Vui lòng kiểm tra lại thông tin đã nhập',
                [ { text: 'OK' } ]
            );
            return;
        }

        try
        {
            setIsLoading( true );

            // Simulate API call
            await new Promise<void>( resolve => setTimeout( resolve, 1500 ) );

            setIsVisible( false );
            Alert.alert(
                'Thành công',
                'Cập nhật thông tin thành công!',
                [ { text: 'OK' } ]
            );
        } catch ( error )
        {
            console.error( 'Update profile error:', error );
            Alert.alert(
                'Lỗi',
                'Có lỗi xảy ra khi cập nhật thông tin. Vui lòng thử lại.',
                [ { text: 'OK' } ]
            );
        } finally
        {
            setIsLoading( false );
        }
    }, [ formData, isValid ] );

    const handleImagePicker = useCallback( (): void =>
    {
        Alert.alert(
            'Thay đổi ảnh đại diện',
            'Chọn nguồn ảnh',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Chụp ảnh', onPress: () => console.log( 'Camera' ) },
                { text: 'Thư viện', onPress: () => console.log( 'Gallery' ) }
            ]
        );
    }, [] );

    const handleModalClose = useCallback( (): void =>
    {
        setIsVisible( false );
        Keyboard.dismiss();
    }, [] );

    const personalInfo = useMemo( () => [
        {
            icon: <FontAwesome5 name="id-card" size={ 16 } color={ COLORS.primary } />,
            label: 'Căn cước công dân',
            value: formData.cccd
        },
        {
            icon: <FontAwesome5 name="calendar-alt" size={ 16 } color={ COLORS.primary } />,
            label: 'Ngày cấp',
            value: formData.dateOfIssue
        },
        {
            icon: <FontAwesome5 name="birthday-cake" size={ 16 } color={ COLORS.primary } />,
            label: 'Ngày sinh',
            value: formData.dateOfBirth
        },
        {
            icon: <Ionicons name="male-female" size={ 16 } color={ COLORS.primary } />,
            label: 'Giới tính',
            value: formData.gender
        }
    ], [ formData ] );

    const contactInfo = useMemo( () => [
        {
            icon: <Ionicons name="call" size={ 16 } color={ COLORS.primary } />,
            label: 'Số điện thoại',
            value: formData.phoneNumber
        },
        {
            icon: <Ionicons name="mail" size={ 16 } color={ COLORS.primary } />,
            label: 'Email',
            value: formData.email
        },
        {
            icon: <Ionicons name="location" size={ 16 } color={ COLORS.primary } />,
            label: 'Địa chỉ',
            value: formData.address
        }
    ], [ formData ] );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
            <SafeAreaView className="flex-1 bg-gray-50">
                <AppHeaderInfo
                    title="Thông Tin Cá Nhân"
                    onPress={ () => router.back() }
                    rightComponent={
                        <TouchableOpacity
                            onPress={ () => setIsVisible( true ) }
                            className="p-2 bg-white/20 rounded-full h-10 w-10 items-center justify-center"
                            activeOpacity={ 0.7 }
                        >
                            <Feather name="edit-2" size={ 16 } color="white" />
                        </TouchableOpacity>
                    }
                />

                <ScrollView
                    className="flex-1"
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={ { paddingBottom: 20 } }
                >
                    {/* Profile Header */ }
                    <Animated.View
                        entering={ FadeInDown.duration( 600 ) }
                        className="mx-4 mt-4"
                    >
                        <View className="items-center p-6 bg-white rounded-2xl shadow-sm">
                            <View className="relative mb-4">
                                <Image
                                    source={ require( '@/assets/images/500.jpg' ) }
                                    className="h-28 w-28 rounded-full border-4 border-white shadow-lg"
                                    resizeMode="cover"
                                />
                                <TouchableOpacity
                                    className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full border-3 border-white shadow-lg"
                                    onPress={ handleImagePicker }
                                    activeOpacity={ 0.8 }
                                >
                                    <Feather name="camera" size={ 16 } color="white" />
                                </TouchableOpacity>
                            </View>
                            <Text className="text-2xl font-bold text-gray-800 mb-1">
                                { formData.fullName }
                            </Text>
                            <Text className="text-gray-500 text-base">{ formData.email }</Text>
                        </View>
                    </Animated.View>

                    {/* Personal Information */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 200 ).duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
                        </View>
                        <View className="p-4">
                            { personalInfo.map( ( item, index ) => (
                                <InfoItem key={ `personal-${ index }` } { ...item } />
                            ) ) }
                        </View>
                    </Animated.View>

                    {/* Contact Information */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 400 ).duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Thông tin liên hệ</Text>
                        </View>
                        <View className="p-4">
                            { contactInfo.map( ( item, index ) => (
                                <InfoItem key={ `contact-${ index }` } { ...item } />
                            ) ) }
                        </View>
                    </Animated.View>

                    {/* Security Section */ }
                    <Animated.View
                        entering={ FadeInDown.delay( 600 ).duration( 600 ) }
                        className="mx-4 mt-4 bg-white rounded-2xl shadow-sm overflow-hidden"
                    >
                        <View className="p-4 border-b border-gray-100">
                            <Text className="text-lg font-bold text-gray-800">Bảo mật</Text>
                        </View>
                        <TouchableOpacity
                            onPress={ () => router.push( '/user/change-password' ) }
                            className="flex-row items-center p-4 active:bg-gray-50"
                            activeOpacity={ 0.7 }
                        >
                            <View className="w-10 h-10 rounded-full bg-red-50 items-center justify-center mr-3">
                                <MaterialIcons name="lock" size={ 16 } color={ COLORS.danger } />
                            </View>
                            <View className="flex-1">
                                <Text className="text-gray-800 font-medium">Thay đổi mật khẩu</Text>
                                <Text className="text-gray-500 text-sm">Cập nhật mật khẩu mới</Text>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={ 24 } color={ COLORS.gray[ 400 ] } />
                        </TouchableOpacity>
                    </Animated.View>
                </ScrollView>

                {/* Edit Profile Modal */ }
                <Modal
                    animationType="slide"
                    visible={ isVisible }
                    transparent={ true }
                    onRequestClose={ handleModalClose }
                    statusBarTranslucent
                >
                    <KeyboardAvoidingView
                        behavior={ Platform.OS === 'ios' ? 'padding' : 'height' }
                        className="flex-1"
                    >
                        <View className="flex-1 justify-end bg-black/50">
                            <Animated.View
                                entering={ FadeInDown.duration( 300 ) }
                                className="bg-white rounded-t-3xl max-h-[85%]"
                            >
                                {/* Modal Header */ }
                                <View className="flex-row items-center justify-between p-6 border-b border-gray-100">
                                    <Text className="text-xl font-bold text-gray-800">
                                        Cập nhật thông tin
                                    </Text>
                                    <TouchableOpacity
                                        onPress={ handleModalClose }
                                        className="p-2 rounded-full bg-gray-100"
                                        activeOpacity={ 0.7 }
                                    >
                                        <Ionicons name="close" size={ 20 } color={ COLORS.gray[ 600 ] } />
                                    </TouchableOpacity>
                                </View>

                                {/* Form Content */ }
                                <ScrollView
                                    className="px-6 py-4"
                                    showsVerticalScrollIndicator={ false }
                                    keyboardShouldPersistTaps="handled"
                                >
                                    <FormInput
                                        label="Họ và tên"
                                        value={ formData.fullName }
                                        onChangeText={ ( value ) => handleInputChange( 'fullName', value ) }
                                        placeholder="Nhập họ và tên"
                                        error={ errors.fullName }
                                    />

                                    <FormInput
                                        label="Email"
                                        value={ formData.email }
                                        onChangeText={ ( value ) => handleInputChange( 'email', value ) }
                                        placeholder="Nhập địa chỉ email"
                                        keyboardType="email-address"
                                        error={ errors.email }
                                    />

                                    <FormInput
                                        label="Số CCCD"
                                        value={ formData.cccd }
                                        onChangeText={ ( value ) => handleInputChange( 'cccd', value ) }
                                        placeholder="Nhập số căn cước công dân"
                                        keyboardType="numeric"
                                        error={ errors.cccd }
                                    />

                                    <FormInput
                                        label="Ngày cấp"
                                        value={ formData.dateOfIssue }
                                        onChangeText={ ( value ) => handleInputChange( 'dateOfIssue', value ) }
                                        placeholder="DD/MM/YYYY"
                                    />

                                    <FormInput
                                        label="Số điện thoại"
                                        value={ formData.phoneNumber }
                                        onChangeText={ ( value ) => handleInputChange( 'phoneNumber', value ) }
                                        placeholder="Nhập số điện thoại"
                                        keyboardType="phone-pad"
                                        error={ errors.phoneNumber }
                                    />

                                    <FormInput
                                        label="Giới tính"
                                        value={ formData.gender }
                                        onChangeText={ ( value ) => handleInputChange( 'gender', value as 'Nam' | 'Nữ' | 'Khác' ) }
                                        placeholder="Nam/Nữ/Khác"
                                    />

                                    <FormInput
                                        label="Ngày sinh"
                                        value={ formData.dateOfBirth }
                                        onChangeText={ ( value ) => handleInputChange( 'dateOfBirth', value ) }
                                        placeholder="DD/MM/YYYY"
                                    />

                                    <FormInput
                                        label="Địa chỉ"
                                        value={ formData.address }
                                        onChangeText={ ( value ) => handleInputChange( 'address', value ) }
                                        placeholder="Nhập địa chỉ"
                                        multiline
                                    />

                                    {/* Action Buttons */ }
                                    <View className="flex-row gap-3 mt-6 mb-4">
                                        <TouchableOpacity
                                            onPress={ handleModalClose }
                                            className="flex-1 py-4 bg-gray-100 rounded-xl"
                                            activeOpacity={ 0.7 }
                                            disabled={ isLoading }
                                        >
                                            <Text className="text-gray-700 text-center font-semibold">
                                                Hủy
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={ handleUpdate }
                                            disabled={ !isValid || isLoading }
                                            className={ `flex-1 py-4 rounded-xl ${ isValid && !isLoading
                                                    ? 'bg-blue-600'
                                                    : 'bg-gray-300'
                                                }` }
                                            activeOpacity={ 0.8 }
                                        >
                                            { isLoading ? (
                                                <ActivityIndicator color="white" />
                                            ) : (
                                                <Text className="text-white text-center font-semibold">
                                                    Cập nhật
                                                </Text>
                                            ) }
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </Animated.View>
                        </View>
                    </KeyboardAvoidingView>
                    <LoadingOverlay visible={ isLoading } />
                </Modal>
            </SafeAreaView>
        </>
    );
};

export default Profile;