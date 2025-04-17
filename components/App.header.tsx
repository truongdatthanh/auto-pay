import { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function AppHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePress = () => {
    router.push("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView className="bg-blue-500">
        <View className="flex-row items-center justify-between p-4">
          <TouchableOpacity onPress={handlePress} className="flex-row items-center">
            <MaterialIcons name="payment" size={24} color="white" />
            <Text className="text-white ml-1">AutoPayment</Text>
          </TouchableOpacity>

          <View>
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
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
