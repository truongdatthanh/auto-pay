import { Text, View } from "react-native";

interface InfoTextProps
{
  label?: string;
  value?: string;
  containerClassName?: string;
  labelClassName?: string;
  valueClassName?: string
}

export default function InfoText ( { label, value ="-", containerClassName, labelClassName, valueClassName }: InfoTextProps )
{
  return (
    <View className={ containerClassName }>
      <Text className={ labelClassName }>{ label }</Text>
      <Text className={ valueClassName }>{ value }</Text>
    </View>
  );
}
