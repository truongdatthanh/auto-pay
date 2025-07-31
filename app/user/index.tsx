
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, Octicons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { IUser } from '@/interface/IUser';
import SettingButton from '@/components/button/SettingButton';
import * as SecureStore from "expo-secure-store";

export default function UserHome ()
{
  const avatar = require( '@/assets/images/500.jpg' );
  const [ user, setUser ] = useState<IUser>();
  const [ isVisible, setIsVisible ] = useState( false );
  const appVersion = 'v1.0.0';

  useEffect( () =>
  {
    const getUser = async () =>
    {
      const data = await SecureStore.getItemAsync( 'user' );
      console.log( "user in user: ", data )
      if ( !data ) return router.replace( '/(modals)' );
      setUser( JSON.parse( data ) );
    };
    getUser();
  }, [] );

  const handleLogout = async () =>
  {
    // await SecureStore.deleteItemAsync( 'user' );
    router.replace( '/(modals)' );
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View className='flex-1'>
        <ScrollView className="flex-1 bg-gray-100" contentContainerStyle={ { paddingBottom: 30 } } showsVerticalScrollIndicator={ false }>
          <LinearGradient colors={ [ "#041838", "#525252" ] } start={ { x: 0, y: 0 } } end={ { x: 0, y: 1 } } className="pt-16 pb-8 rounded-b-3xl">
            <TouchableOpacity className="absolute top-12 left-4 p-2 bg-white/20 rounded-full z-10" onPress={ () => router.back() }>
              <Ionicons name="arrow-back-outline" size={ 22 } color="white" />
            </TouchableOpacity>

            <Animated.View entering={ FadeIn.duration( 600 ) } className="items-center px-4">
              <View className="border-4 border-white rounded-full">
                <Image source={ avatar } className="h-24 w-24 rounded-full" />
              </View>
              <Text className="text-xl font-bold text-white mt-3">{ user?.fullName }</Text>
              <Text className="text-sm text-white/80">{ user?.email }</Text>
            </Animated.View>
          </LinearGradient>

          <Animated.View entering={ FadeInDown.duration( 600 ).delay( 200 ) } className="mx-4 -mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <View className="p-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
            </View>
            <SettingButton
              icon={ <FontAwesome5 name="user-alt" size={ 16 } color="#1c40f2" /> }
              iconBg="bg-blue-100"
              label="Thông tin cá nhân"
              desc="Xem và cập nhật thông tin cá nhân của bạn"
              onPress={ () => router.push( '/user/profile' ) }
            />
          </Animated.View>

          <Animated.View entering={ FadeInDown.duration( 600 ).delay( 300 ) } className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <View className="p-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800">Cài đặt</Text>
            </View>
            <SettingButton
              icon={ <Ionicons name="settings" size={ 18 } color="#4b5563" /> }
              iconBg="bg-gray-100"
              label="Cài đặt hệ thống"
              desc="Tùy chỉnh giao diện và thông báo"
              onPress={ () => router.push( '/user/system-setting' ) }
            />
            <SettingButton
              icon={ <Ionicons name="finger-print" size={ 18 } color="#8b5cf6" /> }
              iconBg="bg-purple-100"
              label="Cài đặt sinh trắc học"
              desc="Bảo mật tài khoản bằng vân tay hoặc Face ID"
              onPress={ () => router.push( '/user/biometric' ) }
            />
            <SettingButton
              icon={ <Octicons name="versions" size={ 18 } color="#10b981" /> }
              iconBg="bg-green-100"
              label="Kiểm tra phiên bản app"
              desc={ `Phiên bản hiện tại: ${ appVersion }` }
              onPress={ () => setIsVisible( true ) }
            />
          </Animated.View>

          <Animated.View entering={ FadeInDown.duration( 600 ).delay( 400 ) } className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden">
            <View className="p-4 border-b border-gray-100">
              <Text className="text-lg font-bold text-gray-800">Hỗ trợ</Text>
            </View>
            <SettingButton
              icon={ <FontAwesome name="phone" size={ 18 } color="#ef4444" /> }
              iconBg="bg-red-100"
              label="Liên hệ với chúng tôi"
              desc="Thông tin liên hệ và hỗ trợ"
              onPress={ () => router.push( '/user/contact' ) }
            />
            <SettingButton
              icon={ <AntDesign name="questioncircleo" size={ 18 } color="#f59e0b" /> }
              iconBg="bg-amber-100"
              label="Báo cáo vấn đề"
              desc="Gửi báo cáo lỗi hoặc đề xuất cải tiến"
              onPress={ () => router.push( '/user/report-problem' ) }
            />
          </Animated.View>

          <Animated.View entering={ FadeInDown.duration( 600 ).delay( 500 ) } className="mx-4 mt-5">
            <TouchableOpacity onPress={ handleLogout } className="bg-white border border-red-500 rounded-xl overflow-hidden">
              <View className="flex-row items-center justify-center p-4">
                <Feather name="log-out" size={ 18 } color="#ef4444" />
                <Text className="text-red-500 font-semibold ml-2">Đăng xuất</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          <Text className="text-center text-gray-500 text-xs mt-6">AutoPAY • Phiên bản { appVersion }</Text>

          <Modal animationType="fade" visible={ isVisible } transparent onRequestClose={ () => setIsVisible( false ) }>
            <View className="flex-1 justify-center items-center bg-black/50">
              <Animated.View entering={ FadeIn.duration( 300 ) } className="bg-white m-5 p-6 rounded-2xl w-[85%] shadow-xl">
                <View className="items-center mb-4">
                  <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-3">
                    <Octicons name="versions" size={ 28 } color="#1c40f2" />
                  </View>
                  <Text className="text-xl font-bold text-gray-800">Thông tin phiên bản</Text>
                </View>

                <View className="bg-gray-50 p-4 rounded-xl mb-4">
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-500">Phiên bản hiện tại:</Text>
                    <Text className="font-semibold text-gray-800">{ appVersion }</Text>
                  </View>
                  <View className="flex-row justify-between">
                    <Text className="text-gray-500">Phiên bản mới nhất:</Text>
                    <Text className="font-semibold text-gray-800">{ appVersion }</Text>
                  </View>
                </View>

                <Text className="text-center text-gray-600 mb-4">Ứng dụng của bạn đã được cập nhật lên phiên bản mới nhất.</Text>
                <TouchableOpacity onPress={ () => setIsVisible( false ) } className="bg-blue-500 py-4 rounded-xl">
                  <Text className="text-white text-center font-semibold">Đóng</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </Modal>
        </ScrollView >
      </View>
    </>
  );
}








//#region base
// import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StatusBar, SafeAreaView, Platform } from 'react-native';
// import { router } from 'expo-router';
// import { useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import Octicons from '@expo/vector-icons/Octicons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';
// import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';
// import { IUser } from '@/interface/IUser';


// export default function UserHome ()
// {
//     const avatar = '@/assets/images/500.jpg';
//     const [ user, setUser ] = useState<IUser>();
//     const [ isVisible, setIsVisible ] = useState( false );
//     const appVersion = 'v1.0.0';

//     useEffect( () =>
//     {
//         const getUser = async () =>
//         {
//             const user = await AsyncStorage.getItem( 'user' );
//             if ( !user )
//             {
//                 router.replace( '/auth/login' );
//             }
//             setUser( JSON.parse( user || '{}' ) );
//         };
//         getUser();
//     }, [] );

//     const handleLogout = async () =>
//     {
//         try
//         {
//             await AsyncStorage.removeItem( 'user' );
//             router.replace( '/auth/login' );
//         } catch ( error )
//         {
//             console.error( 'Error logging out:', error );
//         }
//     };

//     return (
//         <>
//             <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
//             <ScrollView
//                 className="flex-1 bg-gray-100"
//                 contentContainerStyle={ { paddingBottom: 30 } }
//                 showsVerticalScrollIndicator={ false }
//             >
//                 <LinearGradient
//                     colors={ [ '#1c40f2', '#3b5fe2' ] }
//                     start={ { x: 0, y: 0 } }
//                     end={ { x: 1, y: 1 } }
//                     className="pt-16 pb-8 rounded-b-3xl"
//                 >
//                     <TouchableOpacity
//                         className="absolute top-12 left-4 p-2 bg-white/20 rounded-full z-10"
//                         onPress={ () => router.back() }
//                     >
//                         <Ionicons name="arrow-back-outline" size={ 22 } color="white" />
//                     </TouchableOpacity>

//                     <Animated.View
//                         entering={ FadeIn.duration( 600 ) }
//                         className="items-center px-4"
//                     >
//                         <View className="border-4 border-white rounded-full">
//                             <Image source={ require( avatar ) } className="h-24 w-24 rounded-full" />
//                         </View>
//                         <Text className="text-xl font-bold text-white mt-3">{ user?.fullName }</Text>
//                         <Text className="text-sm text-white/80">{ user?.email }</Text>
//                     </Animated.View>
//                 </LinearGradient>

//                 {/* Thông tin cá nhân */ }
//                 <Animated.View
//                     entering={ FadeInDown.duration( 600 ).delay( 200 ) }
//                     className="mx-4 -mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
//                 >
//                     <View className="p-4 border-b border-gray-100">
//                         <Text className="text-lg font-bold text-gray-800">Thông tin cá nhân</Text>
//                     </View>

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => router.push( '/(tabs)/user/profile' ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center mr-3">
//                             <FontAwesome5 name="user-alt" size={ 16 } color="#1c40f2" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Thông tin cá nhân</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Xem và cập nhật thông tin cá nhân của bạn</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>
//                 </Animated.View>
//                 {/* -----------------------------------------End----------------------------------------- */ }

//                 {/*Cài đặt */ }
//                 <Animated.View
//                     entering={ FadeInDown.duration( 600 ).delay( 300 ) }
//                     className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
//                 >
//                     <View className="p-4 border-b border-gray-100">
//                         <Text className="text-lg font-bold text-gray-800">Cài đặt</Text>
//                     </View>

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => router.push( '/user/system-setting' ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-3">
//                             <Ionicons name="settings" size={ 18 } color="#4b5563" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Cài đặt hệ thống</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Tùy chỉnh giao diện và thông báo</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>

//                     <View className="h-[1px] bg-gray-100 mx-4" />

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => router.push( '/user/biometric' ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center mr-3">
//                             <Ionicons name="finger-print" size={ 18 } color="#8b5cf6" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Cài đặt sinh trắc học</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Bảo mật tài khoản bằng vân tay hoặc Face ID</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>

//                     <View className="h-[1px] bg-gray-100 mx-4" />

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => setIsVisible( true ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center mr-3">
//                             <Octicons name="versions" size={ 18 } color="#10b981" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Kiểm tra phiên bản app</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Phiên bản hiện tại: { appVersion }</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>
//                 </Animated.View>
//                 {/* -----------------------------------------End----------------------------------------- */ }

//                 {/* Hỗ trợ */ }
//                 <Animated.View
//                     entering={ FadeInDown.duration( 600 ).delay( 400 ) }
//                     className="mx-4 mt-5 bg-white rounded-xl shadow-sm overflow-hidden"
//                 >
//                     <View className="p-4 border-b border-gray-100">
//                         <Text className="text-lg font-bold text-gray-800">Hỗ trợ</Text>
//                     </View>

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => router.push( '/user/report-problem' ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-amber-100 items-center justify-center mr-3">
//                             <AntDesign name="questioncircleo" size={ 18 } color="#f59e0b" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Báo cáo vấn đề</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Gửi báo cáo lỗi hoặc đề xuất cải tiến</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>

//                     <View className="h-[1px] bg-gray-100 mx-4"></View>

//                     <TouchableOpacity
//                         className="flex-row items-center p-4 active:bg-gray-50"
//                         onPress={ () => router.push( '/user/contact' ) }
//                     >
//                         <View className="w-10 h-10 rounded-full bg-red-100 items-center justify-center mr-3">
//                             <FontAwesome name="phone" size={ 18 } color="#ef4444" />
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-base font-medium text-gray-800">Liên hệ với chúng tôi</Text>
//                             <Text className="text-xs text-gray-500 mt-1">Thông tin liên hệ và hỗ trợ</Text>
//                         </View>
//                         <MaterialIcons name="keyboard-arrow-right" size={ 24 } color="#9ca3af" />
//                     </TouchableOpacity>
//                 </Animated.View>
//                 {/* -----------------------------------------End----------------------------------------- */ }

//                 {/* Logout Button */ }
//                 <Animated.View
//                     entering={ FadeInDown.duration( 600 ).delay( 500 ) }
//                     className="mx-4 mt-5"
//                 >
//                     <TouchableOpacity
//                         onPress={ handleLogout }
//                         className="bg-white border border-red-500 rounded-xl overflow-hidden"
//                     >
//                         <View className="flex-row items-center justify-center p-4">
//                             <Feather name="log-out" size={ 18 } color="#ef4444" />
//                             <Text className="text-red-500 font-semibold ml-2">Đăng xuất</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </Animated.View>

//                 <Text className="text-center text-gray-500 text-xs mt-6">
//                     AutoPAY • Phiên bản { appVersion }
//                 </Text>

//                 {/* Version Check Modal */ }
//                 <Modal
//                     animationType="fade"
//                     visible={ isVisible }
//                     transparent={ true }
//                     onRequestClose={ () => setIsVisible( false ) }
//                 >
//                     <View className="flex-1 justify-center items-center bg-black/50">
//                         <Animated.View
//                             entering={ FadeIn.duration( 300 ) }
//                             className="bg-white m-5 p-6 rounded-2xl w-[85%] shadow-xl"
//                         >
//                             <View className="items-center mb-4">
//                                 <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center mb-3">
//                                     <Octicons name="versions" size={ 28 } color="#1c40f2" />
//                                 </View>
//                                 <Text className="text-xl font-bold text-gray-800">Thông tin phiên bản</Text>
//                             </View>

//                             <View className="bg-gray-50 p-4 rounded-xl mb-4">
//                                 <View className="flex-row justify-between mb-2">
//                                     <Text className="text-gray-500">Phiên bản hiện tại:</Text>
//                                     <Text className="font-semibold text-gray-800">{ appVersion }</Text>
//                                 </View>
//                                 <View className="flex-row justify-between">
//                                     <Text className="text-gray-500">Phiên bản mới nhất:</Text>
//                                     <Text className="font-semibold text-gray-800">{ appVersion }</Text>
//                                 </View>
//                             </View>

//                             <Text className="text-center text-gray-600 mb-4">
//                                 Ứng dụng của bạn đã được cập nhật lên phiên bản mới nhất.
//                             </Text>

//                             <TouchableOpacity
//                                 onPress={ () => setIsVisible( false ) }
//                                 className="bg-blue-500 py-4 rounded-xl"
//                             >
//                                 <Text className="text-white text-center font-semibold">Đóng</Text>
//                             </TouchableOpacity>
//                         </Animated.View>
//                     </View>
//                 </Modal>
//             </ScrollView>
//         </>
//     );
// }
//#endregion
