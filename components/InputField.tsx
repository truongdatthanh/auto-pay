import { Text, TextInput, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function InputField({ label, value, onChangeText, placeholder }: InputFieldProps) {
  return (
    <View>
      <Text className="mb-1">{label}</Text>
      <TextInput
        className="border border-gray-400 px-4 py-3 rounded-full"
        placeholder={placeholder || label}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
