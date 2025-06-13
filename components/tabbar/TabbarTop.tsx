import { useRef, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function TabbarTop ( props: any )
{
  const { tabs, onTabChange } = props;
  const [ activeIndex, setActiveIndex ] = useState( 0 );
  const flatListRef = useRef<FlatList>( null );

  const handleTabPress = ( index: number, tab: string ) =>
  {
    setActiveIndex( index );
    onTabChange( tab );

    // Scroll để đưa tab vào giữa màn hình
    flatListRef.current?.scrollToIndex( {
      index,
      animated: true,
      viewPosition: 0.5, // 0.5 = giữa, 0 = trái, 1 = phải
    } );
  };

  return (
    <View className="bg-white shadow-md border-b border-gray-200">
      <FlatList
        ref={ flatListRef }
        data={ tabs }
        horizontal
        keyExtractor={ ( item, index ) => `${ item }-${ index }` }
        contentContainerStyle={ { paddingHorizontal: 16, paddingVertical: 12 } }
        showsHorizontalScrollIndicator={ false }
        renderItem={ ( { item, index } ) => (
          <Pressable
            key={ item }
            className={ `rounded-full px-4 py-2 mr-4 ${ activeIndex === index ? "bg-black" : "bg-gray-200"
              }` }
            onPress={ () => handleTabPress( index, item ) }
          >
            <Text
              className={ `text-sm ${ activeIndex === index
                  ? "text-white font-semibold"
                  : "text-gray-700"
                }` }
            >
              { item }
            </Text>
          </Pressable>
        ) }
      />
    </View>
  );
}



// import { useRef, useState } from "react";
// import { Animated, Dimensions, Pressable, Text, View } from "react-native";

// export default function TabbarTop ( props: any )
// {
//   const { tabs, onTabChange } = props;
//   const [ activeIndex, setActiveIndex ] = useState( 0 );
//   const screenWidth = Dimensions.get( 'window' ).width;
//   const tabWidth = screenWidth / tabs.length;
//   const animatedValue = useRef( new Animated.Value( 0 ) ).current;

//   const handleTabPress = ( index: number, tab: string ) =>
//   {
//     setActiveIndex( index );
//     onTabChange( tab );//Đây là callback của component cha

//     Animated.spring( animatedValue, {
//       toValue: index * tabWidth,
//       useNativeDriver: true,
//     } ).start();
//   };

//   return (
//     <View className="bg-white relative shadow-md border-b border-gray-200">
//       {/* Tab Bar */ }
//       <View className="flex-row justify-around ">
//         { tabs.map( ( tab: string, index: number ) => (
//           <Pressable
//             key={ tab }
//             className="flex-1 items-center p-4"
//             onPress={ () => handleTabPress( index, tab ) }
//           >
//             <Text
//               className={ `text-base ${ activeIndex === index ? 'text-blue-500 font-bold' : 'text-gray-500' }` }
//             >
//               { tab }
//             </Text>
//           </Pressable>
//         ) ) }
//       </View>

//       {/* Đường line trượt bên dưới */ }
//       <Animated.View
//         className="absolute -bottom-0.5 h-1 bg-blue-500 rounded-full"
//         style={ {
//           width: tabWidth,
//           transform: [ { translateX: animatedValue } ],
//         } }
//       />
//     </View>
//   );
// }
