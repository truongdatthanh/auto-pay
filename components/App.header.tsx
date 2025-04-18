import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";


export default function AppHeader ()
{
  const avatar = "../assets/images/500.jpg";
  const handlePress = () =>
  {
    router.push( "/tabs/home" );
  };

  const handleUserProfile = () =>
  {
    router.push( "/infomation/info" );
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


{/* <View>
<TouchableOpacity onPress={toggleDropdown} className="flex-row items-center">
  <Text className="text-white mr-2">Tất cả</Text>
  <AntDesign name="caretdown" size={15} color="white" />
</TouchableOpacity>

{showDropdown && (
  <View className="absolute w-48 top-10 right-0 bg-white rounded-md shadow-lg p-2 z-10">
    <TouchableOpacity onPress={() => alert("Thông tin 1")}>
      <Text className="text-black py-1 px-2">Thông tin 1</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => alert("Thông tin 2")}>
      <Text className="text-black py-1 px-2">Thông tin 2</Text>
    </TouchableOpacity>
  </View>
)}
</View> */}