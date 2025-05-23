
import { useState } from 'react';
import { Portal, FAB } from 'react-native-paper';

const SpeedDialFAB = () =>
{
    const [ open, setOpen ] = useState( false );

    return (
        <Portal>
            <FAB.Group
                open={ open }
                visible
                icon={ open ? 'close' : 'plus' }
                actions={ [
                    { icon: 'pencil', label: 'Chỉnh sửa', onPress: () => console.log( 'Edit' ) },
                    { icon: 'delete', label: 'Xóa', onPress: () => console.log( 'Delete' ) },
                    { icon: 'share-variant', label: 'Chia sẻ', onPress: () => console.log( 'Share' ) },
                ] }
                onStateChange={ ( { open } ) => setOpen( open ) }
            />
        </Portal>
    );
};

export default SpeedDialFAB;

// import { useState } from 'react';
// import { Portal, FAB } from 'react-native-paper';
// import { StyleSheet, Pressable } from 'react-native';
// import { BlurView } from 'expo-blur';

// const SpeedDialFAB = () =>
// {
//     const [ open, setOpen ] = useState( false );

//     return (
//         <Portal>
//             {/* Blur overlay khi mở FAB */ }
//             { open && (
//                 <Pressable
//                     onPress={ () => setOpen( false ) }
//                     style={ StyleSheet.absoluteFill }
//                 >
//                     <BlurView intensity={ 30 } tint="dark" style={ StyleSheet.absoluteFill } />
//                 </Pressable>
//             ) }

//             {/* FAB Group */ }
//             <FAB.Group
//                 open={ open }
//                 visible
//                 icon={ open ? 'close' : 'plus' }
//                 actions={ [
//                     { icon: 'pencil', label: 'Chỉnh sửa', onPress: () => console.log( 'Edit' ) },
//                     { icon: 'delete', label: 'Xóa', onPress: () => console.log( 'Delete' ) },
//                     { icon: 'share-variant', label: 'Chia sẻ', onPress: () => console.log( 'Share' ) },
//                 ] }
//                 onStateChange={ ( { open } ) => setOpen( open ) }
//                 style={ {
//                     position: 'absolute',
//                     bottom: 16,
//                     right: 16,
//                     zIndex: 2,
//                 } }
//             />
//         </Portal>
//     );
// };

// export default SpeedDialFAB;
