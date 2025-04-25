
import { Link, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, StatusBar, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';



export default function Register ()
{
    const router = useRouter();
    const [ fullName, setFullName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ checked, setChecked ] = useState( false );
    const [isVisible, setIsVisible] = useState(true);

    const handleSubmit = () =>
    {
        // if ( password !== confirmPassword )
        // {
        //     alert( 'Mat khau khong khop' );
        //     return;
        // }

        // const user = {
        //     fullName,
        //     email,
        //     password,
        // };

        // router.push( {
        //     pathname: '/login',
        //     params: user,
        // } );

       router.push( '/(auth)/pinInput' );
    }

    const handleBackToLogin = () =>
    {
        router.back();
    }

    const handleSetChecked = () =>
    {
        setChecked( !checked );
    }

    const handleSeenPassword = () =>
    {
        setIsVisible( !isVisible );
    }

    const handleSignUpWithPhoneNumber = () =>
    {
        router.push( '/(auth)/withPhoneNumber' );
    }

    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <SafeAreaView className="flex-1">
                <View className="flex-1 bg-white px-4">
                    <TouchableOpacity onPress={ handleBackToLogin } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={35} color="#1c40f2" />
                    </TouchableOpacity>
                    <View className="mt-16">
                        <Text className="text-3xl text-[#1c40f2] font-bold">ĐĂNG KÝ</Text>
                        <Text className="pt-4 text-5xl font-bold text-[#1c40f2]">TÀI KHOẢN</Text>
                    </View>
                    <View className='mt-4'>
                        <View>
                            <Text className='mb-2 font-semibold'>Họ tên</Text>
                            <TextInput
                            className="mb-2 h-16 pl-8 border border-gray-500 rounded-full bg-white"
                            placeholder="Họ tên..."                             
                            value={ fullName }
                            onChangeText={ setFullName }
                        />
                        </View>
                        <View>
                            <Text className="mb-2 font-semibold">Email</Text>
                            <TextInput
                            className="mb-2 h-16 pl-8 border border-gray-500 rounded-full bg-white"
                            placeholder="Email..."                               
                            keyboardType="email-address"
                            value={ email }
                                onChangeText={ setEmail }
                            />
                        </View>
                        <View className='mb-2'>
                            <Text className="mb-2 font-semibold">Mật khẩu</Text>
                            <View className="h-16 px-8 border border-gray-500 rounded-full bg-white flex-row items-center justify-between">
                                <TextInput
                                placeholder="Mật khẩu..."
                                secureTextEntry={ isVisible }
                                value={ password }
                                    onChangeText={ setPassword }
                                />
                                <TouchableOpacity onPress={ handleSeenPassword }>
                                    <Ionicons name={isVisible ? "eye" : "eye-off"} size={24} color="gray" />
                                </TouchableOpacity>
                            </View>
                         
                        </View>
                        <View>
                            <Text className="mb-2 font-semibold">Xác nhận mật khẩu</Text>
                            <TextInput
                            className="mb-2 h-16 pl-8 border border-gray-500 rounded-full bg-white"
                            placeholder="Xác nhận mật khẩu..."
                            secureTextEntry
                            value={ confirmPassword }
                                onChangeText={ setConfirmPassword }
                            />
                        </View>
                        <View className="flex-row my-4 items-center">
                            <Pressable
                                onPress={ () => handleSetChecked }
                                className={`w-6 h-6 mr-2 rounded border-2 border-gray-500 justify-center items-center ${
                                checked ? 'bg-blue-500' : 'bg-white'
                                }`}
                            >
                                {checked && <Ionicons name="checkmark" size={16} color="white" />}
                            </Pressable>
                            <Text>Tôi đồng ý với mọi </Text>
                            <Link className='text-[#1c40f2] underline font-medium' href={ "/term" }>Chính sách & điều khoản</Link>
                        </View>
                        <TouchableOpacity
                            className="mt-2 bg-[#1c40f2] rounded-full h-16 justify-center w-full"
                            onPress={ handleSubmit }
                        >
                            <Text className="text-white text-center font-bold text-md">Đăng Ký</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mt-4 border-[1px] border-gray-400 rounded-full h-16 justify-center w-full"
                            onPress={ handleSignUpWithPhoneNumber }
                        >
                            <Text className="text-gray-500 text-center font-bold text-md">Sử Dụng Số Điện Thoại</Text>
                        </TouchableOpacity>
                    </View>
                    <View className="p-4 flex-row items-center justify-center">
                        <Text className="text-center text-base">Bạn đã có tài khoản? </Text>
                        <Link href="/login" className="text-[#1c40f2] font-bold text-lg">Đăng nhập</Link>
                    </View>
                </View>
        </SafeAreaView>
      </>
    );
}


// import React, { useState } from 'react';
// import { TextInput, Animated, View } from 'react-native';

// const FloatingLabelInput = ({ placeholder, value, setValue, ...props }) => {
//     const [isFocused, setIsFocused] = useState(false);
//     const [labelAnimated] = useState(new Animated.Value(value ? 1 : 0));

//     const handleFocus = () => {
//         setIsFocused(true);
//         Animated.timing(labelAnimated, {
//             toValue: 1,
//             duration: 200,
//             useNativeDriver: false,
//         }).start();
//     };

//     const handleBlur = () => {
//         setIsFocused(false);
//         if (!value) {
//             Animated.timing(labelAnimated, {
//                 toValue: 0,
//                 duration: 200,
//                 useNativeDriver: false,
//             }).start();
//         }
//     };

//     const labelStyle = {
//         position: 'absolute',
//         left: 16,
//         top: labelAnimated.interpolate({
//             inputRange: [0, 1],
//             outputRange: [16, -14], // Điều chỉnh vị trí khi focus
//         }),
//         fontSize: labelAnimated.interpolate({
//             inputRange: [0, 1],
//             outputRange: [16, 12], // Điều chỉnh kích thước khi focus
//         }),
//         color: '#888',
//     };

//     return (
//         <View style={{ position: 'relative', marginBottom: 20 }}>
//             <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>
//             <TextInput
//                 {...props}
//                 style={{
//                     paddingHorizontal: 16,
//                     paddingTop: 24, // Đảm bảo có đủ không gian cho label khi focus
//                     paddingBottom: 8,
//                     borderWidth: 1,
//                     borderColor: '#ccc',
//                     borderRadius: 8,
//                 }}
//                 value={value}
//                 onChangeText={setValue}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//             />
//         </View>
//     );
// };

// const MyForm = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     return (
//         <View style={{ padding: 20 }}>
//             <FloatingLabelInput placeholder="Full Name" value={fullName} setValue={setFullName} />
//             <FloatingLabelInput placeholder="Email" value={email} setValue={setEmail} keyboardType="email-address" />
//             <FloatingLabelInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
//             <FloatingLabelInput placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry />
//             {/* ... các phần khác của form */}
//         </View>
//     );
// };

// export default MyForm;




//Formik
// import { usePathname } from "expo-router";
// import { Formik } from "formik";
// import { Button, SafeAreaView, Text, TextInput, View } from "react-native";

// export default function Register ()
// {
//     const handleSubmit = ( values: any ) =>
//     {
//         console.log( 'fullName', values.fullName );
//         console.log( 'email', values.email );
//         console.log( 'password', values.password );
//         console.log( 'confirmPassword', values.confirmPassword );
//     };

//     const handleBlur = ( field: string ) =>
//     {
//         console.log( `Blurred ${ field }` );
//     }

//     const handleChange = ( field: string ) =>
//     {
//         return ( value: string ) =>
//         {
//             console.log( `Changed ${ field } to ${ value }` );
//         };
//     }

//     return (
//         <SafeAreaView className="flex-1 bg-white p-8 items-center justify-center">
//             <View className="p-8 items-center justify-center">
             
//                 <View className="mb-8">
//                     <Text className="text-3xl font-bold text-center text-gray-500">Sign up to your</Text>
//                     <Text className="text-3xl font-bold text-center text-gray-500">Account</Text>
//                 </View>
//                 <View className="w-full max-w-sm mx-auto space-y-4 mt-8">
//                     <Text className="text-center text-gray-500">Sign up to your Account</Text>
//                     <Formik
//                         initialValues={ {
//                             fullName: '',
//                             email: '',
//                             password: '',
//                             confirmPassword: ''
//                         } }
//                         onSubmit={ handleSubmit }
//                     >
//                         { ( { handleChange, handleBlur, handleSubmit, values } ) => (
//                             <View>
//                                 <TextInput
//                                     className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
//                                     placeholder="Full Name"
//                                     onChangeText={ handleChange( 'fullName' ) }
//                                     onBlur={ handleBlur( 'fullName' ) }
//                                     value={ values.fullName }
//                                 />
//                                 <TextInput
//                                     className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
//                                     placeholder="Email"
//                                     onChangeText={ handleChange( 'email' ) }
//                                     onBlur={ handleBlur( 'email' ) }
//                                     value={ values.email }
//                                 />
//                                 <TextInput
//                                     className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
//                                     placeholder="Password"
//                                     onChangeText={ handleChange( 'password' ) }
//                                     onBlur={ handleBlur( 'password' ) }
//                                     value={ values.password }
//                                     secureTextEntry
//                                 />
//                                 <TextInput
//                                     className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
//                                     placeholder="Confirm Password"
//                                     onChangeText={ handleChange( 'confirmPassword' ) }
//                                     onBlur={ handleBlur( 'confirmPassword' ) }
//                                     value={ values.confirmPassword }
//                                     secureTextEntry
//                                 />

//                                 <Button onPress={ handleSubmit } title="Submit" />
//                             </View>
//                         ) }
//                     </Formik>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// }
