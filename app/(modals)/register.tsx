import FloatingInputs from "@/components/input/FloatingInput";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState, useEffect } from "react"; // Thêm useEffect
import
{ ModalProps, Pressable, ScrollView, Text, TouchableOpacity, View, PanResponder, Animated } from "react-native";
import Modal from "react-native-modal";

interface RegisterModalProp extends ModalProps
{
    isVisible?: boolean;
    onRequestClose: () => void;
}

export default function RegisterModal ( {
    isVisible = false,
    onRequestClose,
}: RegisterModalProp )
{
    const [ fullName, setFullName ] = useState( "" );
    const [ email, setEmail ] = useState( "" );
    const [ password, setPassword ] = useState( "" );
    const [ confirmPassword, setConfirmPassword ] = useState( "" );
    const [ checked, setChecked ] = useState( false );
    const scrollViewRef = useRef<ScrollView | null>( null );

    // Cuộn ScrollView về đầu khi modal mở
    useEffect( () =>
    {
        if ( isVisible && scrollViewRef.current )
        {
            scrollViewRef.current.scrollTo( { y: 0, animated: false } );
        }
    }, [ isVisible ] );

    // PanResponder từ code trước
    const panY = useRef( new Animated.Value( 0 ) ).current;
    const panResponder = useRef(
        PanResponder.create( {
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: ( _, gestureState ) =>
            {
                if ( gestureState.dy > 0 )
                {
                    panY.setValue( gestureState.dy );
                }
            },
            onPanResponderRelease: ( _, gestureState ) =>
            {
                if ( gestureState.dy > 150 )
                {
                    onRequestClose();
                }
                Animated.spring( panY, {
                    toValue: 0,
                    useNativeDriver: true,
                } ).start();
            },
        } )
    ).current;

    const handleSetChecked = () =>
    {
        setChecked( !checked );
    };

    const translateY = panY.interpolate( {
        inputRange: [ 0, 200 ],
        outputRange: [ 0, 200 ],
        extrapolate: "clamp",
    } );

    return (
        <Modal
            isVisible={ isVisible }
            onSwipeComplete={ onRequestClose }
            swipeDirection="down"
            backdropOpacity={ 0 }
            onBackdropPress={ onRequestClose }
            style={ { justifyContent: "flex-end", margin: 0 }
            }
        >
            <View

                style={ {
                    backgroundColor: "white",
                    padding: 20,
                    height: "80%",
                    borderTopLeftRadius: 50,
                    borderTopRightRadius: 50,
                } }
            >
                {/* <TouchableOpacity
                    className="absolute left-4 top-10 bg-white p-3 rounded-full"
                    onPress={ onRequestClose }
                >
                    <Ionicons name="chevron-back" size={ 24 } color="black" />
                </TouchableOpacity> */}
                <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-2" />
                <Text className="text-black font-bold text-3xl self-center mt-4 text-center break-words whitespace-normal">
                    Bắt đầu hành trình của bạn tại đây!
                </Text>
                <ScrollView
                    ref={ scrollViewRef }
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={ false }
                    contentContainerStyle={ { flexGrow: 1, paddingBottom: 20 } }
                >
                    <View className="mt-10">
                        <View className="gap-6 mb-4">
                            <FloatingInputs
                                label="Họ tên"
                                onChangeText={ setFullName }
                                value={ fullName }
                                placeholder="Nhập họ tên"
                                labelClassName="bg-white"
                            />
                            <FloatingInputs
                                label="Email"
                                onChangeText={ setEmail }
                                value={ email }
                                placeholder="Nhập email"
                                labelClassName="bg-white"
                            />
                            <FloatingInputs
                                showPasswordToggle
                                label="Mật khẩu"
                                onChangeText={ setPassword }
                                value={ password }
                                placeholder="Nhập mật khẩu"
                                labelClassName="bg-white"
                            />
                            <FloatingInputs
                                showPasswordToggle
                                label="Xác nhận mật khẩu"
                                onChangeText={ setConfirmPassword }
                                value={ confirmPassword }
                                placeholder="Xác nhận mật khẩu"
                                labelClassName="bg-white"
                            />
                        </View>

                        <View className="flex-row items-center ml-4 mb-4">
                            <Pressable
                                onPress={ handleSetChecked }
                                className={ `w-5 h-5 mr-1 rounded border-2 justify-center items-center ${ checked ? "bg-black" : "border-gray-400"
                                    }` }
                            >
                                { checked && <Ionicons name="checkmark" size={ 18 } color="white" /> }
                            </Pressable>
                            <View className="flex-row flex-wrap flex-1">
                                <Text className="text-gray-600">Tôi đồng ý với </Text>
                                <TouchableOpacity>
                                    <Text className="text-blue-600 font-medium underline">
                                        Chính sách & Điều khoản
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity
                            onPress={ () => void 0 }
                            className="px-4 bg-black rounded-3xl w-full self-center"
                        >
                            <View className="flex-row items-center justify-center py-4">
                                <MaterialIcons name="login" size={ 20 } color="white" />
                                <Text className="text-white font-semibold ml-2">Đăng ký</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal >
    );
}




// import FloatingInputs from "@/components/input/FloatingInput";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useRef, useState } from "react";
// import { Modal, ModalProps, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

// interface RegisterModalProp extends ModalProps
// {
//     isVisible?: boolean,
//     onRequestClose: () => void
// }
// export default function RegisterModal ( { isVisible = false, onRequestClose }: RegisterModalProp )
// {
//     const [ fullName, setFullName ] = useState( "" );
//     const [ email, setEmail ] = useState( "" );
//     const [ password, setPassword ] = useState( "" );
//     const [ confirmPassword, setConfirmPassword ] = useState( "" );
//     const [ checked, setChecked ] = useState( false );
//     const scrollViewRef = useRef<ScrollView | null>( null );

//     const handleSetChecked = () =>
//     {
//         setChecked( !checked );
//     };

//     return (
//         <>
//             <Modal
//                 visible={ isVisible }
//                 transparent
//                 animationType="slide"
//                 onRequestClose={ onRequestClose }>
//                 <>
//                     <View className="flex-1 justify-end relative">
//                         <TouchableOpacity className="absolute left-4 top-10 bg-white p-3 rounded-full" onPress={ onRequestClose }>
//                             <Ionicons name="chevron-back" size={ 24 } color="black" />
//                             {/* <Text className="font-semibold text-black">Quay lại</Text> */ }
//                         </TouchableOpacity>
//                         <View className="bg-white p-5 h-[80%]" style={ { borderTopLeftRadius: 50, borderTopRightRadius: 50 } }>
//                             <Text className="text-black font-bold text-3xl self-center mt-4 text-center break-words whitespace-normal">Bắt đầu hành trình của bạn tại đây!</Text>
//                             <ScrollView
//                                 ref={ scrollViewRef }
//                                 keyboardShouldPersistTaps="handled"
//                                 showsVerticalScrollIndicator={ false }
//                                 contentContainerStyle={ { flexGrow: 1 } }
//                             >
//                                 <View className="mt-10">
//                                     <View className="gap-6 mb-4">
//                                         <FloatingInputs
//                                             label="Họ tên"
//                                             onChangeText={ setFullName }
//                                             value={ fullName }
//                                             placeholder="Nhập họ tên"
//                                             labelClassName="bg-white"
//                                         />
//                                         <FloatingInputs
//                                             label="Email"
//                                             onChangeText={ setEmail }
//                                             value={ email }
//                                             placeholder="Nhập email"
//                                             labelClassName="bg-white"
//                                         />
//                                         <FloatingInputs
//                                             showPasswordToggle
//                                             label="Mật khẩu"
//                                             onChangeText={ setPassword }
//                                             value={ password }
//                                             placeholder="Nhập mật khẩu"
//                                             labelClassName="bg-white"
//                                         />
//                                         <FloatingInputs
//                                             showPasswordToggle
//                                             label="Xác nhận mật khẩu"
//                                             onChangeText={ setConfirmPassword }
//                                             value={ confirmPassword }
//                                             placeholder="Xác nhận mật khẩu"
//                                             labelClassName="bg-white"
//                                         />
//                                     </View>


//                                     {/* Checkbox điều khoản */ }
//                                     <View className="flex-row items-center ml-4 mb-4">
//                                         <Pressable
//                                             onPress={ handleSetChecked }
//                                             className={ `w-5 h-5 mr-1 rounded border-2 justify-center items-center ${ checked ? "bg-black" : "border-gray-400"
//                                                 }` }
//                                         >
//                                             { checked && <Ionicons name="checkmark" size={ 18 } color="white" /> }
//                                         </Pressable>
//                                         <View className="flex-row flex-wrap flex-1">
//                                             <Text className="text-gray-600">Tôi đồng ý với </Text>
//                                             <TouchableOpacity>
//                                                 <Text className="text-blue-600 font-medium underline">
//                                                     Chính sách & Điều khoản
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         </View>
//                                     </View>

//                                     <TouchableOpacity onPress={ () => void ( 0 ) } className="px-4 bg-black rounded-3xl w-full self-center">
//                                         <View className="flex-row items-center justify-center py-4">
//                                             <MaterialIcons name="login" size={ 20 } color="white" />
//                                             <Text className="text-white font-semibold ml-2">Đăng ký</Text>
//                                         </View>
//                                     </TouchableOpacity>
//                                 </View>
//                             </ScrollView>
//                         </View>
//                     </View>
//                 </>
//             </Modal >
//         </>
//     )
// }
