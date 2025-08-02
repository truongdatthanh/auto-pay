
import { View, Text, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Ionicons, FontAwesome5, Octicons, AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { IUser } from '@/interface/IUser';
import SettingButton from '@/components/button/SettingButton';
import * as SecureStore from "expo-secure-store";
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/useAuthStore';

export default function UserHome ()
{
  const avatar = require( '@/assets/images/500.jpg' );
  const [ user, setUser ] = useState<IUser>();
  const [ isVisible, setIsVisible ] = useState( false );
  const { logout } = useAuthStore();
  const appVersion = 'v1.0.0';

  useEffect( () =>
  {
    const getUser = async () =>
    {
      const data = await SecureStore.getItemAsync( 'user' );
      console.log( "user in user: ", data )
      if ( !data ) return router.replace( '/(auth)/login' );
      setUser( JSON.parse( data ) );
    };
    getUser();
  }, [] );

  const handleLogout = async () =>
  {
    await logout();
    router.replace( '/(auth)/login' );
  };

  return (
    <>
      <StatusBar style="light" translucent />
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
