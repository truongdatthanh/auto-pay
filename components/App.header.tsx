import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";


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
      <SafeAreaView className="bg-blue-500 pt-4">
        <View className="flex-row p-4 items-center justify-between ">
          <TouchableOpacity onPress={ handlePress }>
            <Text className="text-white text-xl ml-1">⛛ AUTOPAY</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={ handleUserProfile } className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={ 24 } color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

