
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, useWindowDimensions, View } from 'react-native';
import { TabView, TabBar, SceneRendererProps, NavigationState } from 'react-native-tab-view';

type Route = {
    key: string;
    title: string;
};

interface CustomTabViewProps
{
    routes: Route[];
    renderScene: ( props: SceneRendererProps & { route: Route } ) => JSX.Element | null;
    tabBarColor?: string;
    indicatorColor?: string;
    indicatorHeight?: number;
    indicatorBorder?: number;
    activeColor?: string;
    inActiveColor?: string;
    isScrollEnable?: boolean;
}

export default function CustomTabView ( {
    routes,
    renderScene,
    tabBarColor = 'black',
    indicatorColor = 'white',
    indicatorHeight = 2,
    indicatorBorder = 10,
    activeColor = "white",
    inActiveColor = "gray",
    isScrollEnable = false,
}: CustomTabViewProps )
{
    const layout = useWindowDimensions();
    const [ index, setIndex ] = useState( 0 );

    useFocusEffect(
        useCallback( () =>
        {
            console.log("mounted")
            // Khi màn hình này được focus vào
            setIndex( 0 ); // reset về tab đầu tiên
        }, [] )
    );

    return (
        <TabView
            navigationState={ { index, routes } }
            renderScene={ renderScene }
            onIndexChange={ setIndex }
            initialLayout={ { width: layout.width } }
            renderTabBar={ props => (
                <TabBar
                    { ...props }
                    scrollEnabled={ isScrollEnable }
                    indicatorStyle={ { backgroundColor: indicatorColor, height: indicatorHeight, borderRadius: indicatorBorder } }
                    style={ { backgroundColor: tabBarColor } }
                    activeColor={ activeColor }
                    inactiveColor={ inActiveColor }
                />
            ) }
        />
    );
}

