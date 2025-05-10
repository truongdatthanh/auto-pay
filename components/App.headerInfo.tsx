
// import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import Ionicons from '@expo/vector-icons/Ionicons';

import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { Platform, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from "react-native";


// export default function AppHeaderInfo ( { title, onPress }: { title: string, onPress?: () => void } )
// {
//     return (
//         <>
//             <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
//             <SafeAreaView className="bg-[#1c40f2] pt-6">
//                 <View className="flex-row items-center justify-between bg-[#1c40f2] p-4">
//                     <TouchableOpacity onPress={ onPress }>
//                         <Ionicons name="arrow-back-outline" size={ 30 } color="white" />
//                     </TouchableOpacity>
//                     <View className="flex-1 items-center">
//                         <Text className="text-white font-bold text-lg">{ title }</Text>
//                     </View>

//                     {/* <Image
//                         source={ require( "../assets/images/500.jpg" ) }
//                         resizeMode="cover"
//                         className="w-12 h-12 rounded-full"
//                     /> */}
//                 </View>
//             </SafeAreaView>

//         </>
//     );
// }


export default function AppHeaderInfo ( {
    title,
    onPress,
    rightComponent,
}: {
    title: string;
    onPress?: () => void;
    rightComponent?: ReactNode;
} )
{
    return (
        <>
            <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
            <SafeAreaView className="bg-[#1c40f2] pt-6" style={ Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight } : {} }>
                <View className="flex-row items-center justify-between p-4">
                    <TouchableOpacity onPress={ onPress } className="p-2 bg-white/20 rounded-full">
                        <Ionicons name="arrow-back-outline" size={ 22 } color="white" />
                    </TouchableOpacity>

                    <View className="flex-1 items-center ">
                        <Text className="text-white font-bold text-lg">{ title }</Text>
                    </View>

                    {/* Render right component nếu có, ngược lại render View trống để giữ layout */ }
                    <View>
                        { rightComponent ?? <View style={ { width: 40 } } /> }
                    </View>
                </View>
            </SafeAreaView>
        </>
    );
}