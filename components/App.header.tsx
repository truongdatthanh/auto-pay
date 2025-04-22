import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";


export default function AppHeader ()
{
  const avatar = "../assets/images/500.jpg";
  const handlePress = () =>
  {
    router.push( "/(tabs)" );
  };

  const handleUserProfile = () =>
  {
    router.push( "/user" );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView className="bg-blue-500">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={ handlePress } className="flex-row items-center">
            <Text className="text-white ml-1">⛛ AUTOPAY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ handleUserProfile } className="flex-row items-center">
            { avatar ? (
              <Image source={ require( avatar ) } resizeMode="cover" className="w-12 h-12 rounded-full" />
            ) : (
              <MaterialIcons name="account-circle" size={ 30 } color="white" />
            ) }
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

