import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import AuthScreenWrapper from "@/components/auth/AuthScreenWrapper";
import InputBorder from "@/components/input/InputBorder";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function RegisterWithPhoneNumber ()
{
    const insets = useSafeAreaInsets();
    const [ phoneNumber, setPhoneNumber ] = useState<string>( '0943369278' );

    const handleSubmit = () =>
    {
        if ( phoneNumber.length < 10 )
        {
            alert( 'Số điện thoại không hợp lệ' );
            return;
        }
        router.push( { pathname: '/(auth)/verify-otp', params: { phoneNumber } } );
    }

    return (
        <>
            <AuthScreenWrapper>
                <View style={ { marginTop: insets.top } } className="p-4">
                    {/* Back button */ }
                    <TouchableOpacity onPress={ () => router.replace( "/(auth)/register" ) } className="p-2 bg-white/20 self-start rounded-full justify-center items-center">
                        <Ionicons name="arrow-back-outline" size={ 16 } color="white" />
                    </TouchableOpacity>
                    {/* -----------------------------------------End----------------------------------------- */ }

                    {/* Title */ }
                    <View className="mb-8 mt-4">
                        <View className="flex-row items-center">
                            <Text className="text-white text-[20px] font-bold mb-2 mr-2 leading-none">Kích hoạt dịch vụ</Text>
                            <Image source={ require( "@/assets/images/logo-autopay-cachdieu-white.png" ) } style={ { width: 120, height: 30 } } resizeMode="contain" />
                        </View>
                        <Text className="text-gray-200">cho số điện thoại của bạn</Text>
                    </View>
                    {/* -----------------------------------------End----------------------------------------- */ }
                    <InputBorder
                        label="Số điện thoại"
                        value={ phoneNumber }
                        onChangeText={ ( text ) => setPhoneNumber( text ) }
                        placeholder="Số điện thoại"
                    />
                    {/* Submit Button */ }
                    <TouchableOpacity
                        onPress={ handleSubmit }
                        className={ `mt-14 px-4 ${ phoneNumber.length < 10 ? "bg-gray-400" : "bg-black" } justify-center h-16 self-center w-[300px] rounded-3xl` }
                        disabled={ phoneNumber.length < 10 ? true : false }
                    >
                        <Text className="text-center text-white text-lg font-bold">
                            Gửi mã OTP
                        </Text>
                    </TouchableOpacity>
                </View>
            </AuthScreenWrapper>
        </>
    );
}