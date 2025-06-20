import FloatingInputs from "@/components/input/FloatingInput";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

interface LoginModalProps
{
    isVisible?: boolean;
    onRequestClose?: () => void;
}

export default function LoginModal ( {
    isVisible = false,
    onRequestClose,
}: LoginModalProps )
{
    const scrollViewRef = useRef<ScrollView | null>( null );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );

    useEffect( () =>
    {
        if ( isVisible && scrollViewRef.current )
        {
            scrollViewRef.current.scrollTo( { y: 0, animated: false } );
        }
    }, [ isVisible ] );

    const handleLogin = () =>
    {
        router.replace( "/(tabs)/home" );
    };

    const handleForgotPassword = () =>
    {
        router.push( "/auth/forgot-password" );
    };

    return (
        <Modal
            isVisible={ isVisible }
            onSwipeComplete={ onRequestClose }
            swipeDirection="down"
            backdropOpacity={ 0 }
            onBackdropPress={ onRequestClose }
            style={ { justifyContent: "flex-end", margin: 0 } }
        >
            <View className="flex-1 justify-end relative">
                {/* <TouchableOpacity className="absolute left-4 top-10 bg-white p-3 rounded-full" onPress={ onRequestClose }>
                    <Ionicons name="chevron-back" size={ 24 } color="black" />
                     <Text className="font-semibold text-black">Quay lại</Text>
                </TouchableOpacity> */}
                <View className="bg-white p-5 h-[70%]" style={ { borderTopLeftRadius: 50, borderTopRightRadius: 50 } }>
                    <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-2" />
                    <Text className="text-black font-bold text-3xl self-center mt-4">Đăng nhập tại đây!</Text>
                    <ScrollView
                        ref={ scrollViewRef }
                        keyboardShouldPersistTaps="handled"
                        showsVerticalScrollIndicator={ false }
                        contentContainerStyle={ { flexGrow: 1 } }
                    >
                        <View className="mt-10">
                            <View className="gap-6 mb-4">
                                <FloatingInputs
                                    label="Email"
                                    onChangeText={ setEmail }
                                    value={ email }
                                    placeholder="Nhập email"
                                    labelClassName="bg-white"
                                />
                                <FloatingInputs
                                    showPasswordToggle
                                    label="Mật khẩu"
                                    onChangeText={ setPassword }
                                    value={ password }
                                    placeholder="Nhập mật khẩu"
                                    labelClassName="bg-white"
                                />
                            </View>
                            <View className="mb-4">
                                <TouchableOpacity className="self-end" onPress={ handleForgotPassword }>
                                    <Text className="text-sm font-semibold">Quên mật khẩu?</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={ handleLogin } className="px-4 bg-black rounded-3xl w-full self-center">
                                <View className="flex-row items-center justify-center py-4">
                                    <MaterialIcons name="login" size={ 20 } color="white" />
                                    <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View >
        </Modal >
    );
}


//#region base
// import FloatingInputs from "@/components/input/FloatingInput";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { useRef, useState } from "react";
// import { Modal, ModalProps, ScrollView, Text, TouchableOpacity, View } from "react-native";


// interface LoginModalProps extends ModalProps
// {
//     isVisible?: boolean;
//     onRequestClose?: () => void
// }

// export default function LoginModal ( { isVisible = false, onRequestClose }: LoginModalProps )
// {
//     const scrollViewRef = useRef<ScrollView | null>( null );
//     const [ email, setEmail ] = useState( "" );
//     const [ password, setPassword ] = useState( "" );
//     const handleLogin = () =>
//     {
//         router.replace( "/(tabs)/home" );
//     }

//     const handleForgotPassword = () =>
//     {
//         router.push( "/auth/forgot-password" )
//     }
//     return (
//         <>
//             <Modal
//                 visible={ isVisible }
//                 onRequestClose={ onRequestClose }
//                 transparent
//                 animationType="slide"
//             >
//                 <View className="flex-1 justify-end relative">
//                     <TouchableOpacity className="absolute left-4 top-10 bg-white p-3 rounded-full" onPress={ onRequestClose }>
//                         <Ionicons name="chevron-back" size={ 24 } color="black" />
//                         {/* <Text className="font-semibold text-black">Quay lại</Text> */ }
//                     </TouchableOpacity>
//                     <View className="bg-white p-5 h-[70%]" style={ { borderTopLeftRadius: 50, borderTopRightRadius: 50 } }>
//                         <Text className="text-black font-bold text-3xl self-center mt-4">Đăng nhập tại đây!</Text>
//                         <ScrollView
//                             ref={ scrollViewRef }
//                             keyboardShouldPersistTaps="handled"
//                             showsVerticalScrollIndicator={ false }
//                             contentContainerStyle={ { flexGrow: 1 } }
//                         >
//                             <View className="mt-10">
//                                 <View className="gap-6 mb-4">
//                                     <FloatingInputs
//                                         label="Email"
//                                         onChangeText={ setEmail }
//                                         value={ email }
//                                         placeholder="Nhập email"
//                                         labelClassName="bg-white"
//                                     />
//                                     <FloatingInputs
//                                         showPasswordToggle
//                                         label="Mật khẩu"
//                                         onChangeText={ setPassword }
//                                         value={ password }
//                                         placeholder="Nhập mật khẩu"
//                                         labelClassName="bg-white"
//                                     />
//                                 </View>
//                                 <View className="mb-4">
//                                     <TouchableOpacity className="self-end" onPress={ handleForgotPassword }>
//                                         <Text className="text-sm font-semibold">Quên mật khẩu?</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                                 <TouchableOpacity onPress={ handleLogin } className="px-4 bg-black rounded-3xl w-full self-center">
//                                     <View className="flex-row items-center justify-center py-4">
//                                         <MaterialIcons name="login" size={ 20 } color="white" />
//                                         <Text className="text-white font-semibold ml-2">Đăng nhập</Text>
//                                     </View>
//                                 </TouchableOpacity>
//                             </View>
//                         </ScrollView>
//                     </View>
//                 </View >
//             </Modal >
//         </>
//     );
// }
//#endregion