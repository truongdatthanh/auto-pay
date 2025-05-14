import { Animated, Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRef } from "react";


export default function AppHeader ()
{
  const avatar = "../assets/images/500.jpg";
  const handlePress = () =>
  {
    router.push( "/(tabs)" );
  };

  const handleNotification = () =>
  {
    router.push( "/notificate" );
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView className="bg-[#1c40f2] pt-4">
        <View className="flex-row p-4 items-center justify-between ">
          <TouchableOpacity onPress={ handlePress }>
            <Text className="text-white text-xl ml-1">⛛ AUTOPAY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ handleNotification } className="flex-row items-center relative">
            <View className="">
              <MaterialCommunityIcons name="bell" size={ 20 } color="white" />
            </View>
            <View className="bg-red-500 h-4 w-4 rounded-full justify-center items-center absolute z-10 top-[-4] right-[-4]">
              <Text className="text-[6px] font-bold text-white">99+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

