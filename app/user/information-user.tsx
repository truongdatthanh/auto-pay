
import { useState } from "react";
import { Image, Keyboard, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import InputField from "@/components/InputField";
import InfoText from "@/components/InfoText";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function UserInformation ()
{
    const [ isVisible, setIsVisible ] = useState( false );
    const [ fullName, setFullName ] = useState( 'Truong Thanh Dat' );
    const [ email, setEmail ] = useState( 'abc@gmail.com' );
    const [ cccd, setCccd ] = useState( '1234512124' );
    const [ dateOfBirth, setDateOfBirth ] = useState( '06/12/2003' );
    const [ address, setAddress ] = useState( 'Quan 9' );
    const [ phoneNumber, setPhoneNumber ] = useState( '0943369278' );
    const [ gen, setGen ] = useState( 'Name' );
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

        <ScrollView className="flex-1 bg-white">
            <View className="flex-row items-center justify-center my-4">
                <Image source={ require( '../../assets/images/500.jpg' ) } className="h-28 w-28 rounded-full" />
            </View>
            <View className="p-6 m-2 bg-gray-200 rounded-3xl">
                <InfoText className="text-md font-semibold" label="Họ tên" value={ fullName } />
                <InfoText className="text-md font-semibold" label="Email" value={ email } />
                <InfoText className="text-md font-semibold" label="CCCD" value={ cccd } />
                <InfoText className="text-md font-semibold" label="Ngày cấp" value={ dateOfIssue } />
                <InfoText className="text-md font-semibold" label="Địa chỉ" value={ address } />
                <InfoText className="text-md font-semibold" label="Số điện thoại" value={ phoneNumber } />
                <InfoText className="text-md font-semibold" label="Giới tính" value={ gen } />
                <InfoText className="text-md font-semibold" label="Ngày sinh" value={ dateOfBirth } />
            </View>

            <View className="m-2">
                <TouchableOpacity onPress={ () => setIsVisible( !isVisible ) } className="px-6 flex-row items-center justify-between bg-white p-4 border-2 border-gray-300 rounded-full">
                    <Text className="text-md font-semibold">Cập nhật thông tin cá nhân</Text>
                    <Feather name="edit" size={ 24 } color="black" />
                </TouchableOpacity>
            </View>

            <View className="m-2">
                <TouchableOpacity onPress={ () => router.replace( '/user/change-password' ) } className="px-6 flex-row items-center justify-between bg-white p-4 border-2 border-gray-300 rounded-full">
                    <Text className="text-md font-semibold">Thay đổi mật khẩu</Text>
                    <MaterialIcons name="password" size={ 24 } color="black" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={ isVisible }
                transparent={ true }
                onRequestClose={ () => setIsVisible( !isVisible ) }
                className="justify-center items-center bg-white mt-20"
                onDismiss={ () => Keyboard.dismiss() }
            >
                <View className="flex-1 justify-center items-center bg-black/40">
                    <ScrollView
                        contentContainerStyle={ { flexGrow: 1, justifyContent: "center", alignItems: "center" } }
                        className="w-full px-4"
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
                            <View className="flex-row items-center justify-between mb-4">
                                <Text className="text-lg font-semibold">Cập nhật thông tin cá nhân</Text>
                                <TouchableOpacity onPress={ () => setIsVisible( false ) }>
                                    <Ionicons name="close" size={ 30 } color="black" />
                                </TouchableOpacity>
                            </View>
                            <View className="gap-4">
                                <InputField label="Họ tên" value={ fullName } onChangeText={ setFullName } placeholder={ fullName } />
                                <InputField label="Email" value={ email } onChangeText={ setEmail } placeholder={ email } />
                                <InputField label="CCCD" value={ cccd } onChangeText={ setCccd } placeholder={ cccd } />
                                <InputField label="Ngày cấp" value={ dateOfIssue } onChangeText={ setDateOfIssue } placeholder={ dateOfIssue } />
                                <InputField label="Địa chỉ" value={ address } onChangeText={ setAddress } placeholder={ address } />
                                <InputField label="Số điện thoại" value={ phoneNumber } onChangeText={ setPhoneNumber } placeholder={ phoneNumber } />
                                <InputField label="Giới tính" value={ gen } onChangeText={ setGen } placeholder={ gen } />
                                <InputField label="Ngày sinh" value={ dateOfBirth } onChangeText={ setDateOfBirth } placeholder={ dateOfBirth } />
                            </View>
                            <TouchableOpacity
                                onPress={ handleUpdate }
                                className="bg-blue-500 mt-6 py-4 rounded-xl"
                            >
                                <Text className="text-white text-center font-semibold">Cập nhật</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </ScrollView>
    );
}

