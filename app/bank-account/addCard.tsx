import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import mockBanking from '../../assets/banking.json';


export default function AddCard ()
{
    const [ banks, setBanks ] = useState( mockBanking );
    const [ selectedBank, setSelectedBank ] = useState( banks[ 0 ] );
    console.log( selectedBank );
    const [ accountNumber, setAccountNumber ] = useState( '' );
    const [ accountHolder, setAccountHolder ] = useState( '' );

    const handleSubmit = () =>
    {
        if ( !accountNumber || !accountHolder )
        {
            Alert.alert( 'Lỗi', 'Vui lòng nhập đầy đủ thông tin.' );
            return;
        }

        Alert.alert( 'Thành công', `Đã thêm thẻ ngân hàng:\n- Ngân hàng: ${ selectedBank }\n- Số TK: ${ accountNumber }\n- Chủ TK: ${ accountHolder }` );
    };

    return (
        <View className="flex-1 px-4 py-6">
            <Text className="text-2xl font-bold text-center mb-6">Thêm thẻ ngân hàng</Text>
            <Text className="mb-1">Chọn ngân hàng</Text>
            <View className="border rounded mb-4 bg-white">
                <Picker
                    selectedValue={ selectedBank }
                    onValueChange={ ( itemValue ) => setSelectedBank( itemValue ) }
                >
                    { banks.map( ( bank ) => (
                        <Picker.Item key={ bank.id } label={ bank.name } value={ bank.logo } />
                    ) ) }
                </Picker>
            </View>

            <Text className="mb-1">Số tài khoản</Text>
            <TextInput
                className="border rounded px-3 py-2 mb-4 bg-white"
                keyboardType="numeric"
                placeholder="Nhập số tài khoản"
                value={ accountNumber }
                onChangeText={ setAccountNumber }
            />

            <Text className="mb-1">Tên chủ tài khoản</Text>
            <TextInput
                className="border rounded px-3 py-2 mb-6 bg-white"
                placeholder="Nhập tên chủ tài khoản"
                value={ accountHolder }
                onChangeText={ setAccountHolder }
            />

            <TouchableOpacity
                className="bg-blue-500 py-3 rounded items-center"
                onPress={ handleSubmit }
            >
                <Text className="text-white font-semibold">Thêm thẻ</Text>
            </TouchableOpacity>
        </View>
    );
}
