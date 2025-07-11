// import { View, Text, Switch, Alert } from 'react-native';
// import { useEffect, useState } from 'react';
// import * as LocalAuthentication from 'expo-local-authentication';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function SettingsScreen ()
// {
//   const [ biometricEnabled, setBiometricEnabled ] = useState( false );

//   useEffect( () =>
//   {
//     const loadBiometricSetting = async () =>
//     {
//       const value = await AsyncStorage.getItem( 'biometric_enabled' );
//       setBiometricEnabled( value === 'true' );
//     };
//     loadBiometricSetting();
//   }, [] );

//   const toggleBiometric = async () =>
//   {
//     if ( !biometricEnabled )
//     {
//       // Kiểm tra phần cứng và xác thực
//       const hasHardware = await LocalAuthentication.hasHardwareAsync();// Kiểm tra xem thiết bị có hỗ trợ sinh trắc học không
//       const isEnrolled = await LocalAuthentication.isEnrolledAsync();// Kiểm tra xem có sinh trắc học đã được cài đặt không

//       if ( !hasHardware || !isEnrolled )
//       {
//         Alert.alert( 'Thiết bị không hỗ trợ hoặc chưa cài đặt sinh trắc học' );
//         return;
//       }

//       const result = await LocalAuthentication.authenticateAsync( {
//         promptMessage: 'Xác thực sinh trắc học',
//       } );

//       if ( !result.success )
//       {
//         Alert.alert( 'Xác thực thất bại' );
//         return;
//       }

//       Alert.alert( 'Đã bật sinh trắc học' );
//       console.log( result );
//     } else
//     {
//       Alert.alert( 'Đã tắt sinh trắc học' );
//     }

//     const newValue = !biometricEnabled;
//     await AsyncStorage.setItem( 'biometric_enabled', newValue.toString() );
//     setBiometricEnabled( newValue );
//   };

//   return (
//     <View className="m-4 bg-white rounded-xl p-4 flex-row justify-between items-center">
//       <Text className="text-md font-semibold">Đăng nhập bằng sinh trắc học</Text>
//       <Switch value={ biometricEnabled } onValueChange={ toggleBiometric } />
//     </View>
//   );
// }

import { View, Text, Switch, Alert, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { useBiometricStore } from '@/store/useBiometricStore';

export default function SettingsScreen ()
{
  const { biometricEnabled, setBiometricEnabled, loadBiometricSetting, } = useBiometricStore();

  const [ isProcessing, setIsProcessing ] = useState( false );

  useEffect( () =>
  {
    loadBiometricSetting();
  }, [] );

  const handlePressToggle = async () =>
  {
    if ( isProcessing ) return; // tránh nhấn liên tục
    setIsProcessing( true );

    try
    {
      if ( !biometricEnabled )
      {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if ( !hasHardware || !isEnrolled )
        {
          Alert.alert( 'Thiết bị không hỗ trợ hoặc chưa cài đặt sinh trắc học' );
          return;
        }

        const result = await LocalAuthentication.authenticateAsync( {
          promptMessage: 'Xác thực sinh trắc học',
        } );

        if ( !result.success )
        {
          Alert.alert( 'Xác thực thất bại' );
          return;
        }

        Alert.alert( 'Đã bật sinh trắc học' );
        await setBiometricEnabled( true );
      } else
      {
        Alert.alert( 'Đã tắt sinh trắc học' );
        await setBiometricEnabled( false );
      }
    } catch ( e )
    {
      console.log( 'Toggle biometric error:', e );
      Alert.alert( 'Đã xảy ra lỗi khi xử lý sinh trắc học' );
    } finally
    {
      setIsProcessing( false );
    }
  };

  return (
    <View className="m-4 bg-white rounded-xl p-4 flex-row justify-between items-center">
      <Text className="text-md font-semibold">Đăng nhập bằng sinh trắc học</Text>

      <TouchableOpacity onPress={ handlePressToggle } activeOpacity={ 0.8 }>
        <Switch
          value={ biometricEnabled }
          onValueChange={ () => { } } // vô hiệu hoá xử lý mặc định
          disabled={ true } // ngăn Switch tự thay đổi màu trước
          trackColor={ { false: "#ccc", true: "#4ade80" } }
          thumbColor={ biometricEnabled ? "#22c55e" : "#f4f3f4" }
        />
      </TouchableOpacity>
    </View>
  );
}

