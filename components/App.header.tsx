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

  const shakeAnim = useRef( new Animated.Value( 0 ) ).current;
  const startShake = () =>
  {
    Animated.sequence( [
      Animated.timing( shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      } ),
      Animated.timing( shakeAnim, {
        toValue: -1,
        duration: 100,
        useNativeDriver: true,
      } ),
      Animated.timing( shakeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      } ),
      Animated.timing( shakeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      } ),
    ] ).start();
  };
  const rotate = shakeAnim.interpolate( {
    inputRange: [ -1, 1 ],
    outputRange: [ '-15deg', '15deg' ],
  } );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <SafeAreaView className="bg-[#1c40f2] pt-4">
        <View className="flex-row p-4 items-center justify-between ">
          <TouchableOpacity onPress={ handlePress }>
            <Text className="text-white text-xl ml-1">⛛ AUTOPAY</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={ handleNotification } className="flex-row items-center">
            <MaterialCommunityIcons name="bell" size={ 24 } color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

