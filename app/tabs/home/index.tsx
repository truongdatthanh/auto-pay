import { View, Text } from 'react-native';
;

export default function Home ()
{
  return (
    <View className="flex-1 bg-white px-6 py-8">
      <Text className="text-lg font-semibold">Home</Text>
      <Text className="text-sm text-gray-500">Welcome to the home screen!</Text>
    </View>
  );
}

