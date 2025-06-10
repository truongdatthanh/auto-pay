import { useState } from "react";
import { ImageBackground, Pressable, Text, View } from "react-native";
import LoginModal from "./login";
import RegisterModal from "./register";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TestModal ()
{
    const [ visibleLogin, setVisibleLogin ] = useState( false );
    const [ visibleRegister, setVisibleRegister ] = useState( false );

    const handleShowLoginModal = () =>
    {

        setVisibleLogin( !visibleLogin );
    }

    const handleShowRegisterModal = () =>
    {

        setVisibleRegister( !visibleRegister );
    }

    return (
        <>
            <ImageBackground
                source={ require( "@/assets/images/bg-img-1.jpg" ) }
                className="flex-1"
            >
                <SafeAreaView className="flex-1 relative">
                    {/* <View className="flex-1 relative"> */ }
                    <View className="flex-1 justify-center items-center">
                        <Text className="text-white text-4xl font-semibold text-center break-words whitespace-normal">
                            Chào mừng đã đến với Auto PAY!!!
                        </Text>
                        <Text className="text-white text-base mt-4">
                            Tiện lợi - Nhanh chóng - Bảo mật
                        </Text>
                    </View>

                    {/* tabbar */ }
                    <View className="justify-end">
                        <View className="flex-row justify-around">
                            <View className="p-4 w-[50%]">
                                <Pressable onPress={ handleShowLoginModal } className="self-center py-4 px-8">
                                    <Text className="text-white font-bold">
                                        Đăng nhập
                                    </Text>
                                </Pressable>
                            </View>
                            <View className="p-4 bg-white w-[50%]" style={ { borderTopLeftRadius: 50 } }>
                                <Pressable onPress={ handleShowRegisterModal } className=" py-4 px-8 self-center">
                                    <Text className="text-black font-bold">
                                        Đăng ký
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {/* --------------------------------------------------------------------------------------------------------------------------- */ }
                    <LoginModal isVisible={ visibleLogin } onRequestClose={ handleShowLoginModal } />
                    <RegisterModal isVisible={ visibleRegister } onRequestClose={ handleShowRegisterModal } />
                    {/* </View> */ }
                </SafeAreaView>
            </ImageBackground>
        </>
    );
}