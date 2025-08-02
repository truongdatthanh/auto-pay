import { BlurView } from 'expo-blur';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export default function TabbarBottom ( { state, descriptors, navigation }: BottomTabBarProps )
{
    return (
        <View style={ { position: 'absolute', left: 0, right: 0, bottom: 0, height: 60 } }>
            {/* <BlurView intensity={ 100 } tint="light" style={ { ...StyleSheet.absoluteFillObject } } /> */ }
            <BlurView
                intensity={ 40 }
                tint="light"
                style={ [ StyleSheet.absoluteFillObject, {
                    borderTopWidth: 0.5,
                    borderTopColor: 'rgba(0, 0, 0, 0.1)', // Màu viền mờ
                    overflow: 'hidden', // Tránh viền bị cắt
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                } ] }
            />
            <View style={ { flexDirection: 'row', justifyContent: 'space-around', height: '100%' } }>
                { state.routes.map( ( route, index ) =>
                {
                    const { options } = descriptors[ route.key ];
                    const isFocused = state.index === index;

                    const onPress = () =>
                    {
                        if ( !isFocused ) navigation.navigate( route.name );
                    };

                    const icon = options.tabBarIcon
                        ? options.tabBarIcon( { focused: isFocused, color: '', size: 24 } )
                        : null;

                    return (
                        <TouchableOpacity
                            key={ route.key }
                            onPress={ onPress }
                            style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }
                        >
                            { icon }
                        </TouchableOpacity>
                    );
                } ) }
            </View>
        </View>
    );
}
