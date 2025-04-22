import { Text, View } from "react-native";

interface InfoTextProps {
  label: string;
  value: string;
  className?: string;
}

export default function InfoText({ label, value, className }: InfoTextProps) {
  return (
    <View className="flex-row items-center justify-between mb-4 pb-2">
      <Text className={className}>{label}</Text>
      <Text className={className}>{value}</Text>
    </View>
  );
}

