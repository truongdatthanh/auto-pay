
import { useState } from 'react';
import { View, Text, useWindowDimensions, StyleSheet } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import QRScanner from '../(tabs)/qr/scanner-qr';
import DisplayQR from '../(tabs)/qr/display';

const FirstRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#ff4081' } ] }>
        <Text>Trang 1</Text>
    </View>
);

const SecondRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] }>
        <Text>Trang 2</Text>
    </View>
);
const ThirdRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] }>
        <Text>Trang 3</Text>
    </View>
);
const FourRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] }>
        <Text>Trang 4</Text>
    </View>
);
const FiveRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] }>
        <Text>Trang 5</Text>
    </View>
);
const SixRoute = () => (
    <View style={ [ styles.scene, { backgroundColor: '#673ab7' } ] }>
        <Text>Trang 6</Text>
    </View>
);

export default function MyTabView ()
{
    const layout = useWindowDimensions();

    const [ index, setIndex ] = useState( 0 );
    console.log(index)
    const [ routes ] = useState( [
        { key: 'page1', title: 'Trang 1' },
        { key: 'page2', title: 'Trang 2' },
        { key: 'page3', title: 'Trang 3' },
        { key: 'page4', title: 'Trang 4' },
        { key: 'page5', title: 'Trang 5' },
        { key: 'page6', title: 'Trang 6' },
    ] );

    const renderScene = SceneMap( {
        page1: FirstRoute,
        page2: SecondRoute,
        page3: ThirdRoute,
        page4: FourRoute,
        page5: FiveRoute,
        page6: SixRoute,
    } );

    return (
        <TabView
            navigationState={ { index, routes } }
            renderScene={ renderScene }
            onIndexChange={ setIndex }
            initialLayout={ { width: layout.width } }
            renderTabBar={ props => (
                <TabBar
                    { ...props }
                    scrollEnabled={true}
                    indicatorStyle={ { backgroundColor: 'white' } }
                    style={ { backgroundColor: '#6200ee' } }
                    tabStyle={ { width: 200 } }
                />
            ) }
        />
    );
}

const styles = StyleSheet.create( {
    scene: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );
