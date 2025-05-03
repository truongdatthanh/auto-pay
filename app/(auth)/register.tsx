
// import { Link, usePathname, useRouter } from 'expo-router';
// import { useState } from 'react';
// import { Text, TextInput, TouchableOpacity, View, SafeAreaView, StatusBar, Pressable, ScrollView } from 'react-native';
// import Ionicons from '@expo/vector-icons/Ionicons';



// export default function Register ()
// {
//     const router = useRouter();
//     const [ fullName, setFullName ] = useState( '' );
//     const [ email, setEmail ] = useState( '' );
//     const [ password, setPassword ] = useState( '' );
//     const [ confirmPassword, setConfirmPassword ] = useState( '' );
//     const [ checked, setChecked ] = useState( false );
//     const [ isVisible, setIsVisible ] = useState( true );

//     const handleSubmit = () =>
//     {
//         // if ( password !== confirmPassword )
//         // {
//         //     alert( 'Mat khau khong khop' );
//         //     return;
//         // }

//         // const user = {
//         //     fullName,
//         //     email,
//         //     password,
//         // };

//         // router.push( {
//         //     pathname: '/login',
//         //     params: user,
//         // } );

//         router.push( '/(auth)/pinInput' );
//     }

//     const handleBackToLogin = () =>
//     {
//         router.back();
//     }

//     const handleSetChecked = () =>
//     {
//         setChecked( !checked );
//     }

//     const handleSeenPassword = () =>
//     {
//         setIsVisible( !isVisible );
//     }

//     const handleSignUpWithPhoneNumber = () =>
//     {
//         router.push( '/(auth)/withPhoneNumber' );
//     }

//     return (
//         <>
//             <StatusBar barStyle="dark-content" backgroundColor="white" />
//             <SafeAreaView className="flex-1">
//                 <ScrollView
//                     className="flex-1 bg-white px-4"
//                     showsVerticalScrollIndicator={false}
//                 >
//                     <TouchableOpacity onPress={ handleBackToLogin } className="absolute top-4 left-4">
//                         <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
//                     </TouchableOpacity>
//                     <View className="mt-16">
//                         <Text className="text-3xl text-[#1c40f2] font-bold">ĐĂNG KÝ</Text>
//                         <Text className="pt-4 text-5xl font-bold text-[#1c40f2]">TÀI KHOẢN</Text>
//                     </View>
//                     <View className='mt-4'>
//                         <View>
//                             <Text className='mb-2 font-semibold'>Họ tên</Text>
//                             <TextInput
//                                 className="mb-2 h-16 pl-8 border-b border-gray-500 rounded-full bg-white"
//                                 placeholder="Họ tên..."
//                                 value={ fullName }
//                                 onChangeText={ setFullName }
//                             />
//                         </View>
//                         <View>
//                             <Text className="mb-2 font-semibold">Email</Text>
//                             <TextInput
//                                 className="mb-2 h-16 pl-8 border border-gray-500 rounded-full bg-white"
//                                 placeholder="Email..."
//                                 keyboardType="email-address"
//                                 value={ email }
//                                 onChangeText={ setEmail }
//                             />
//                         </View>
//                         <View className='mb-2'>
//                             <Text className="mb-2 font-semibold">Mật khẩu</Text>
//                             <View className="h-16 px-8 border border-gray-500 rounded-full bg-white flex-row items-center justify-between">
//                                 <TextInput
//                                     placeholder="Mật khẩu..."
//                                     secureTextEntry={ isVisible }
//                                     value={ password }
//                                     onChangeText={ setPassword }
//                                 />
//                                 <TouchableOpacity onPress={ handleSeenPassword }>
//                                     <Ionicons name={ isVisible ? "eye" : "eye-off" } size={ 24 } color="gray" />
//                                 </TouchableOpacity>
//                             </View>

//                         </View>
//                         <View>
//                             <Text className="mb-2 font-semibold">Xác nhận mật khẩu</Text>
//                             <TextInput
//                                 className="mb-2 h-16 pl-8 border border-gray-500 rounded-full bg-white"
//                                 placeholder="Xác nhận mật khẩu..."
//                                 secureTextEntry
//                                 value={ confirmPassword }
//                                 onChangeText={ setConfirmPassword }
//                             />
//                         </View>
//                         <View className="flex-row my-2 mx-2 mb-6 items-center">
//                             <Pressable
//                                 onPress={ () => handleSetChecked() }
//                                 className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? 'bg-blue-500' : 'bg-white'
//                                     }` }
//                             >
//                                 { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
//                             </Pressable>
//                             <Text>Tôi đồng ý với mọi </Text>
//                             <Link className='text-[#1c40f2] underline font-medium' href={ "/term" }>Chính sách & điều khoản</Link>
//                         </View>
//                         <TouchableOpacity
//                             className="mt-2 bg-[#1c40f2] rounded-full h-16 justify-center w-full"
//                             onPress={ handleSubmit }
//                         >
//                             <Text className="text-white text-center font-bold text-md">Đăng Ký</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             className="mt-4 border-[1px] border-gray-400 rounded-full h-16 justify-center w-full"
//                             onPress={ handleSignUpWithPhoneNumber }
//                         >
//                             <Text className="text-gray-500 text-center font-bold text-md">Sử Dụng Số Điện Thoại</Text>
//                         </TouchableOpacity>
//                     </View>
//                     <View className="p-4 flex-row items-center justify-center">
//                         <Text className="text-center text-base">Bạn đã có tài khoản? </Text>
//                         <Link href="/login" className="text-[#1c40f2] font-bold text-lg">Đăng nhập</Link>
//                     </View>
//                 </ScrollView>
//             </SafeAreaView>
//         </>
//     );
// }



import { Link, usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, StatusBar, Pressable, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FloatingInput from '@/components/FloatingInput';



export default function Register ()
{
    const router = useRouter();
    const [ fullName, setFullName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ confirmPassword, setConfirmPassword ] = useState( '' );
    const [ checked, setChecked ] = useState( false );
    const [ isVisible, setIsVisible ] = useState( true );

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
                <ScrollView
                    className="flex-1 bg-white px-4"
                    showsVerticalScrollIndicator={ false }
                >
                    <TouchableOpacity onPress={ handleBackToLogin } className="absolute top-4 left-4">
                        <Ionicons name="return-up-back" size={ 35 } color="#1c40f2" />
                    </TouchableOpacity>
                    <View className="mt-16">
                        <Text className="text-3xl text-[#1c40f2] font-bold">ĐĂNG KÝ</Text>
                        <Text className="pt-4 text-5xl font-bold text-[#1c40f2]">TÀI KHOẢN</Text>
                    </View>
                    <View className='mt-4'>
                        <FloatingInput
                            label="Họ tên"
                            value={ fullName }
                            onChangeText={ setFullName }
                        />
                        <FloatingInput
                            label="Email"
                            value={ email }
                            onChangeText={ setEmail }
                            keyboardType="email-address"
                        />
                        <FloatingInput
                            label="Mật khẩu"
                            value={ password }
                            onChangeText={ setPassword }
                            secureTextEntry
                        />
                        <FloatingInput
                            label="Xác nhận mật khẩu"
                            value={ confirmPassword }
                            onChangeText={ setConfirmPassword }
                            secureTextEntry
                        />
                        <View className="flex-row my-2 mx-2 mb-6 items-center">
                            <Pressable
                                onPress={ () => handleSetChecked() }
                                className={ `w-6 h-6 mr-2 rounded border border-gray-500 justify-center items-center ${ checked ? 'bg-blue-500' : 'bg-white'
                                    }` }
                            >
                                { checked && <Ionicons name="checkmark" size={ 16 } color="white" /> }
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
                </ScrollView>
            </SafeAreaView>
        </>
    );
}


