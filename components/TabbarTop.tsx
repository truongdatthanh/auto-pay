import { useRef, useState } from "react";
import { Animated, Dimensions, Pressable, Text, View } from "react-native";

export default function TabbarTop ( props: any )
{
  const { tabs, onTabChange } = props;
  const [ activeIndex, setActiveIndex ] = useState( 0 );
  const screenWidth = Dimensions.get( 'window' ).width;
  const tabWidth = screenWidth / tabs.length;
  const animatedValue = useRef( new Animated.Value( 0 ) ).current;

  const handleTabPress = ( index: number, tab: string ) =>
  {
    setActiveIndex( index );
    onTabChange( tab );//Đây là callback của component cha

    Animated.spring( animatedValue, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    } ).start();
  };

  return (
    <View className="bg-white relative">
      {/* Tab Bar */ }
      <View className="flex-row justify-around border-b border-gray-300 p-4">
        { tabs.map( ( tab: string, index: number ) => (
          <Pressable
            key={ tab }
            className="flex-1 items-center"
            onPress={ () => handleTabPress( index, tab ) }
          >
            <Text
              className={ `text-base ${ activeIndex === index ? 'text-blue-500 font-bold' : 'text-gray-500' }` }
            >
              { tab }
            </Text>
          </Pressable>
        ) ) }
      </View>

      {/* Đường line trượt bên dưới */ }
      <Animated.View
        className="absolute -bottom-0.5 h-1 bg-blue-500 rounded-full"
        style={ {
          width: tabWidth,
          transform: [ { translateX: animatedValue } ],
        } }
      />
    </View>
  );
}

