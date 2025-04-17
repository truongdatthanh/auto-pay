import { View, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path } from 'react-native-svg';

export default function CustomTabBar({ state, descriptors, navigation }) {
  const router = useRouter();

  return (
    <View className="absolute bottom-0 w-full items-center">
      {/* Background SVG curve */}
      <Svg width="100%" height="80" viewBox="0 0 375 80">
        <Path
          fill="#ffffff"
          d="M0,0 H125 C150,40 225,40 250,0 H375 V80 H0 Z"
        />
      </Svg>

      {/* Tab Bar */}
      <View className="absolute bottom-0 w-full flex-row justify-around items-center bg-white pt-2 pb-6 rounded-t-3xl shadow-lg">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const onPress = () => {
            if (route.name === 'Middle') return;
            const event = navigation.emit({ type: 'tabPress', target: route.key });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              onPress={onPress}
              className="items-center justify-center px-4"
            >
              <Ionicons
                name={route.name === 'Home' ? 'home' : 'settings'}
                size={24}
                color={isFocused ? '#007bff' : '#aaa'}
              />
              <Text className={`text-xs ${isFocused ? 'text-blue-500' : 'text-gray-400'}`}>
                {route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Floating Middle Button */}
      <TouchableOpacity
        onPress={() => router.push('/add')}
        className="absolute -top-6 bg-blue-500 w-16 h-16 rounded-full items-center justify-center shadow-lg z-10"
      >
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
