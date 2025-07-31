import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Keyboard, Pressable, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword, validateTerms } from '@/utils/validation';
import LoginInput from "@/components/input/LoginInput";

export default function Register ()
{
    const router = useRouter();
    const [ fullName, setFullName ] = useState( "Dat" );
    const [ email, setEmail ] = useState( "truongdatzzz612@gmail.com" );
    const [ password, setPassword ] = useState( "Dat20032003" );
    const [ confirmPassword, setConfirmPassword ] = useState( "Dat20032003" );
    const [ checked, setChecked ] = useState( true );
    const [ keyboardVisible, setKeyboardVisible ] = useState( false );
    const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

    // Error states
    const [ fullNameError, setFullNameError ] = useState<string | null>( null );
    const [ emailError, setEmailError ] = useState<string | null>( null );
    const [ passwordError, setPasswordError ] = useState<string | null>( null );
    const [ confirmPasswordError, setConfirmPasswordError ] = useState<string | null>( null );
    const [ termsError, setTermsError ] = useState<string | null>( null );
    const [ isSubmitting, setIsSubmitting ] = useState( false );

    const scrollToTop = () =>
    {
        scrollViewRef.current?.scrollToPosition( 0, 0, true );
    };

    useEffect( () =>
    {
        const keyboardDidShowListener = Keyboard.addListener( "keyboardDidShow", () =>
        {
            setKeyboardVisible( true );
        } );
        const keyboardDidHideListener = Keyboard.addListener( "keyboardDidHide", () =>
        {
            setKeyboardVisible( false );
        } );

        return () =>
        {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, [] );


    // Handle input changes with error clearing
    const handleFullNameChange = ( text: string ) =>
    {
        setFullName( text );
        if ( fullNameError )
        {
            setFullNameError( null );
        }
    };

    const handleEmailChange = ( text: string ) =>
    {
        setEmail( text );
        if ( emailError )
        {
            setEmailError( null );
        }
    };

    const handlePasswordChange = ( text: string ) =>
    {
        setPassword( text );
        if ( passwordError )
        {
            setPasswordError( null );
        }
        // Clear confirm password error if it exists and passwords now match
        if ( confirmPasswordError && text === confirmPassword )
        {
            setConfirmPasswordError( null );
        }
    };

    const handleConfirmPasswordChange = ( text: string ) =>
    {
        setConfirmPassword( text );
        if ( confirmPasswordError )
        {
            setConfirmPasswordError( null );
        }
    };

    const handleSubmit = async () =>
    {
        // Validate all fields
        const fullNameValidationError = validateFullName( fullName );
        const emailValidationError = validateEmail( email );
        const passwordValidationError = validatePassword( password );
        const confirmPasswordValidationError = validateConfirmPassword( confirmPassword, password );
        const termsValidationError = validateTerms( checked );

        // Set all errors
        setFullNameError( fullNameValidationError );
        setEmailError( emailValidationError );
        setPasswordError( passwordValidationError );
        setConfirmPasswordError( confirmPasswordValidationError );
        setTermsError( termsValidationError );

        // If any validation fails, stop submission
        if ( fullNameValidationError || emailValidationError || passwordValidationError ||
            confirmPasswordValidationError || termsValidationError )
        {
            // Scroll to top to show errors
            scrollToTop();
            return;
        }

        setIsSubmitting( true );

        try
        {
            // Simulate API call
            await new Promise( resolve => setTimeout( resolve, 1000 ) );

            Alert.alert(
                'Đăng ký thành công!',
                'Vui lòng kiểm tra email để xác thực tài khoản.',
                [
                    {
                        text: 'OK',
                        onPress: () => router.push( "/auth/pin" )
                    }
                ]
            );
        } catch ( error )
        {
            Alert.alert( 'Lỗi', 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.' );
        } finally
        {
            setIsSubmitting( false );
        }
    };

    const handleBackToLogin = () =>
    {
        router.back();
    };

    const handleSetChecked = () =>
    {
        setChecked( !checked );
        if ( termsError )
        {
            setTermsError( null );
        }
    };

    const handleSignUpWithPhoneNumber = () =>
    {
        router.push( "/auth/phone-number" );
    };

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                <SafeAreaView className="flex-1 bg-[#cbd5e1] gap-8">
                    <View className="px-5">
                        <TouchableOpacity
                            onPress={ handleBackToLogin }
                            className="absolute top-4 left-3 z-10"
                            disabled={ isSubmitting }
                        >
                            <Ionicons name="return-up-back" size={ 40 } color="black" />
                        </TouchableOpacity>

                        {/* Title */ }
                        <View className="mt-20">
                            <Text className="text-3xl text-[#000000] font-bold">ĐĂNG KÝ</Text>
                            <Text className="pt-2 text-5xl font-bold text-[#000000]">TÀI KHOẢN</Text>
                        </View>
                    </View>
                    <KeyboardAwareScrollView
                        ref={ scrollViewRef }
                        enableOnAndroid
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ { flexGrow: 1 } }
                        keyboardDismissMode="interactive"
                        keyboardOpeningTime={ 250 }
                        className="px-5 flex-1 pt-8 rounded-t-3xl bg-[#f1f5f9]"
                    >
                        {/* Form đăng ký với Error Layout Cố Định */ }
                        <View>
                            {/* Full Name Input */ }
                            <View className="mb-2">
                                <View className="h-20 mb-2">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/user-black.png" ) }
                                        placeholder='Họ tên...'
                                        onChangeText={ handleFullNameChange }
                                        value={ fullName }
                                    />
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { fullNameError && (
                                            <Text className="text-red-400 text-sm">
                                                * { fullNameError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>

                                {/* Email Input */ }
                                <View className="h-20 mb-2">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/mail-black.png" ) }
                                        placeholder='Email...'
                                        onChangeText={ handleEmailChange }
                                        value={ email }
                                    />
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { emailError && (
                                            <Text className="text-red-400 text-sm">
                                                * { emailError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>

                                {/* Password Input */ }
                                <View className="h-20 mb-2">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/unlock-black.png" ) }
                                        placeholder='Mật khẩu...'
                                        showPasswordToggle
                                        secureTextEntry
                                        onChangeText={ handlePasswordChange }
                                        value={ password }
                                    />
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { passwordError && (
                                            <Text className="text-red-400 text-sm">
                                                * { passwordError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>

                                {/* Confirm Password Input */ }
                                <View className="h-20">
                                    <LoginInput
                                        iconSource={ require( "@/assets/images/unlock-black.png" ) }
                                        placeholder='Xác nhận mật khẩu...'
                                        showPasswordToggle
                                        secureTextEntry
                                        onChangeText={ handleConfirmPasswordChange }
                                        value={ confirmPassword }
                                    />
                                    <View className="h-5 mt-1 ml-1 justify-center">
                                        { confirmPasswordError && (
                                            <Text className="text-red-400 text-sm">
                                                * { confirmPasswordError }
                                            </Text>
                                        ) }
                                    </View>
                                </View>
                            </View>


                            {/* Terms and Conditions */ }
                            <View className="mb-6 ml-2">
                                <View className="flex-row items-center">
                                    <Pressable
                                        onPress={ handleSetChecked }
                                        className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? "bg-black" : "bg-white"
                                            }` }
                                    >
                                        { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
                                    </Pressable>
                                    <Text className="text-gray-500 flex-1">
                                        Tôi đồng ý với mọi{ " " }
                                        <Link
                                            href="/auth/term"
                                            className="text-black underline font-medium"
                                        >
                                            Chính sách & điều khoản
                                        </Link>
                                    </Text>
                                </View>
                                <View className="h-5 mt-1 ml-8 justify-center">
                                    { termsError && (
                                        <Text className="text-red-400 text-sm">
                                            { termsError }
                                        </Text>
                                    ) }
                                </View>
                            </View>

                            {/* Submit Button */ }
                            <View className="px-4 pb-4 gap-2">
                                <TouchableOpacity
                                    onPress={ handleSubmit }
                                    className="bg-black rounded-3xl"
                                    activeOpacity={ 0.8 }
                                >
                                    <View className="py-4">
                                        { isSubmitting ? <ActivityIndicator className="text-white" /> : <Text className="text-white font-semibold ml-2 text-center">Đăng ký</Text> }
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    className="self-center p-2"
                                    onPress={ handleSignUpWithPhoneNumber }
                                    disabled={ isSubmitting }
                                >
                                    <Text className="text-gray-500 text-center font-bold">
                                        Sử Dụng Số Điện Thoại
                                    </Text>
                                </TouchableOpacity>

                                <View className="flex-row items-center justify-center">
                                    <Text className="text-center text-gray-500">
                                        Bạn đã có tài khoản?{ " " }
                                    </Text>
                                    <Link
                                        href="/auth/login"
                                        className="text-black font-bold text-lg p-1"
                                    >
                                        Đăng nhập
                                    </Link>
                                </View>
                            </View>
                        </View>
                    </KeyboardAwareScrollView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </>
    );
}













// import FloatingInputs from "@/components/input/FloatingInput";
// import { Ionicons } from "@expo/vector-icons";
// import { Link, useRouter } from "expo-router";
// import { useEffect, useRef, useState } from "react";
// import { BackHandler, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TouchableOpacity, TouchableWithoutFeedback, View, } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// export default function Register ()
// {
//     const router = useRouter();
//     const [ fullName, setFullName ] = useState( "" );
//     const [ email, setEmail ] = useState( "" );
//     const [ password, setPassword ] = useState( "" );
//     const [ confirmPassword, setConfirmPassword ] = useState( "" );
//     const [ checked, setChecked ] = useState( false );
//     const [ keyboardVisible, setKeyboardVisible ] = useState( false );
//     const scrollViewRef = useRef<KeyboardAwareScrollView | null>( null );

//     const scrollToTop = () =>
//     {
//         scrollViewRef.current?.scrollToPosition( 0, 0, true );
//     };

//     useEffect( () =>
//     {
//         const keyboardDidShowListener = Keyboard.addListener( "keyboardDidShow", () =>
//         {
//             setKeyboardVisible( true );
//         } );
//         const keyboardDidHideListener = Keyboard.addListener( "keyboardDidHide", () =>
//         {
//             setKeyboardVisible( false );
//         } );

//         return () =>
//         {
//             keyboardDidHideListener.remove();
//             keyboardDidShowListener.remove();
//         };
//     }, [] );

//     const handleSubmit = () =>
//     {
//         router.push( "/auth/pin" );
//     };

//     const handleBackToLogin = () =>
//     {
//         router.back();
//     };

//     const handleSetChecked = () =>
//     {
//         setChecked( !checked );
//     };

//     const handleSignUpWithPhoneNumber = () =>
//     {
//         router.push( "/auth/phone-number" );
//     };

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//             <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
//                 <SafeAreaView className="flex-1 bg-black">
//                     <KeyboardAwareScrollView
//                         ref={ scrollToTop }
//                         enableOnAndroid
//                         keyboardShouldPersistTaps="handled"
//                         showsVerticalScrollIndicator={ false }
//                         contentContainerStyle={ { flexGrow: 1 } }
//                         keyboardDismissMode="interactive"
//                         keyboardOpeningTime={ 250 }
//                     >
//                         <View className="flex-1 px-4 pb-5">
//                             {/* Back button */ }
//                             <TouchableOpacity
//                                 onPress={ handleBackToLogin }
//                                 className="absolute top-4 left-3 z-10"
//                             >
//                                 <Ionicons name="return-up-back" size={ 40 } color="white" />
//                             </TouchableOpacity>

//                             {/* Title */ }
//                             <View className="mt-20">
//                                 <Text className="text-3xl text-white font-bold">ĐĂNG KÝ</Text>
//                                 <Text className="pt-4 text-5xl font-bold text-white">TÀI KHOẢN</Text>
//                             </View>

//                             {/* Form đăng ký */ }
//                             <View className="mt-12 gap-2">
//                                 <FloatingInputs
//                                     label="Họ tên"
//                                     value={ fullName }
//                                     onChangeText={ setFullName }
//                                     containerClassName="mb-4"
//                                     inputClassName="h-12"
//                                     placeholder="Họ tên..."
//                                     selectionColor="white"
//                                 />
//                                 <FloatingInputs
//                                     label="Email"
//                                     value={ email }
//                                     onChangeText={ setEmail }
//                                     containerClassName="mb-4"
//                                     inputClassName="h-12"
//                                     keyboardType="email-address"
//                                     autoCapitalize="none"
//                                     placeholder="Email..."
//                                     selectionColor="white"
//                                 />
//                                 <FloatingInputs
//                                     label="Mật khẩu"
//                                     value={ password }
//                                     onChangeText={ setPassword }
//                                     secureTextEntry={ true }
//                                     showPasswordToggle={ true }
//                                     containerClassName="mb-4"
//                                     inputClassName="h-12"
//                                     placeholder="Mật khẩu..."
//                                     selectionColor="white"
//                                 />
//                                 <FloatingInputs
//                                     label="Xác nhận mật khẩu"
//                                     value={ confirmPassword }
//                                     onChangeText={ setConfirmPassword }
//                                     secureTextEntry={ true }
//                                     showPasswordToggle={ true }
//                                     containerClassName="mb-4"
//                                     inputClassName="h-12"
//                                     placeholder="Xác nhận mật khẩu..."
//                                     selectionColor="white"
//                                 />
//                                 <View className="flex-row my-2 mb-6 items-center">
//                                     <Pressable
//                                         onPress={ handleSetChecked }
//                                         className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? "bg-[#1c40f2]" : "bg-white"
//                                             }` }
//                                     >
//                                         { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
//                                     </Pressable>
//                                     <Text className="text-gray-400">Tôi đồng ý với mọi </Text>
//                                     <Link
//                                         href="/auth/term"
//                                         className="text-white underline font-medium"
//                                     >
//                                         Chính sách & điều khoản
//                                     </Link>
//                                 </View>
//                                 <View className="px-4 pb-4 align-bottom">
//                                     <TouchableOpacity
//                                         className="mt-2 border-2 border-white rounded-xl justify-center items-center self-center w-[300px] py-4"
//                                         onPress={ handleSubmit }
//                                     >
//                                         <Text className="text-white font-semibold text-base">Đăng Ký</Text>
//                                     </TouchableOpacity>
//                                     <TouchableOpacity
//                                         className="mt-3 justify-center"
//                                         onPress={ handleSignUpWithPhoneNumber }
//                                     >
//                                         <Text className="text-gray-400 text-center font-bold text-base">
//                                             Sử Dụng Số Điện Thoại
//                                         </Text>
//                                     </TouchableOpacity>
//                                     <View className="p-4 flex-row items-center justify-center">
//                                         <Text className="text-center text-gray-400">
//                                             Bạn đã có tài khoản?{ " " }
//                                         </Text>
//                                         <Link
//                                             href="/auth/login"
//                                             className="text-white font-bold text-lg"
//                                         >
//                                             Đăng nhập
//                                         </Link>
//                                     </View>
//                                 </View>
//                             </View>
//                         </View>
//                     </KeyboardAwareScrollView >
//                 </SafeAreaView>
//             </TouchableWithoutFeedback>
//         </>
//     );
// }



// import LoginInput from "@/components/input/LoginInput";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useRef, useState } from "react";
// import { Modal, ModalProps, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

// interface RegisterModalProp extends ModalProps
// {
//     visible?: boolean,
//     onRequestClose: () => void
// }
// export default function RegisterModal ( { visible = false, onRequestClose }: RegisterModalProp )
// {
//     const [ fullName, setFullName ] = useState( "" );
//     const [ email, setEmail ] = useState( "" );
//     const [ password, setPassword ] = useState( "" );
//     const [ confirmPassword, setConfirmPassword ] = useState( "" );
//     const [ checked, setChecked ] = useState( false );
//     const scrollViewRef = useRef<ScrollView | null>( null );


//     const handleSetChecked = () =>
//     {
//         setChecked( !checked );
//     };

//     return (
//         <>
//             <Modal visible={ visible }
//                 transparent
//                 animationType="slide"
//                 onRequestClose={ onRequestClose }>
//                 <>
//                     <View className="flex-1 bg-black/70 justify-end">
//                         <View className="bg-white rounded-t-3xl p-5 h-[80%]">
//                             <Text className="text-black font-bold text-3xl self-center">Đăng Ký</Text>
//                             <ScrollView
//                                 ref={ scrollViewRef }
//                                 keyboardShouldPersistTaps="handled"
//                                 showsVerticalScrollIndicator={ false }
//                                 contentContainerStyle={ { flexGrow: 1 } }
//                             >
//                                 <View >
//                                     <View className="gap-6 mb-3 mt-10">
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/user-black.png" ) }
//                                             placeholder='Họ và tên...'
//                                             onChangeText={ setFullName }
//                                             value={ fullName }
//                                         />
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/mail-black.png" ) }
//                                             placeholder='Email...'
//                                             onChangeText={ setEmail }
//                                             value={ email }
//                                         />
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/unlock-black.png" ) }
//                                             placeholder='Mật khẩu...'
//                                             showPasswordToggle
//                                             secureTextEntry
//                                             onChangeText={ setPassword }
//                                             value={ password }
//                                         />
//                                         <LoginInput
//                                             iconSource={ require( "@/assets/images/unlock-black.png" ) }
//                                             placeholder='Xác nhận mật khẩu...'
//                                             showPasswordToggle
//                                             secureTextEntry
//                                             onChangeText={ setConfirmPassword }
//                                             value={ confirmPassword }
//                                         />
//                                     </View>


//                                     {/* Checkbox điều khoản */ }
//                                     <View className="flex-row items-center ml-8 mb-24">
//                                         <Pressable
//                                             onPress={ handleSetChecked }
//                                             className={ `w-6 h-6 mr-3 rounded border-2 justify-center items-center ${ checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
//                                                 }` }
//                                         >
//                                             { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
//                                         </Pressable>
//                                         <View className="flex-row flex-wrap flex-1">
//                                             <Text className="text-gray-600">Tôi đồng ý với </Text>
//                                             <TouchableOpacity>
//                                                 <Text className="text-blue-600 font-medium underline">
//                                                     Chính sách & Điều khoản
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>

//                                     <TouchableOpacity onPress={ () => void ( 0 ) } className="px-4 border rounded-3xl w-full self-center">
//                                         <View className="flex-row items-center justify-center py-4">
//                                             <MaterialIcons name="login" size={ 20 } color="black" />
//                                             <Text className="text-black font-semibold ml-2">Đăng ký</Text>
//                                         </View>
//                                     </TouchableOpacity>

//                                     <View className="border-t border-gray-200 my-6" />

//                                     <View className="flex-row justify-center">
//                                         <Text className="text-gray-500">Bạn chưa có tài khoản?</Text>
//                                         <TouchableOpacity onPress={ () => void ( 0 ) }>
//                                             <Text className="text-blue-500 font-bold ml-1">Đăng ký ngay</Text>
//                                         </TouchableOpacity>
//                                     </View>
//                                 </View>
//                             </ScrollView>
//                         </View>
//                     </View>
//                 </>
//             </Modal >
//         </>
//     )
// }
