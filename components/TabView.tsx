import { useCallback, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneRendererProps } from 'react-native-tab-view';

type Route = {
    key: string;
    title: string;
};

interface CustomTabViewProps
{
    routes: Route[];
    renderScene: ( props: SceneRendererProps & { route: Route } ) => React.ReactNode | null;
    tabBarColor?: string;
    indicatorColor?: string;
    indicatorHeight?: number;
    indicatorBorder?: number;
    activeColor?: string;
    inActiveColor?: string;
    isScrollEnable?: boolean;
    initialIndex?: number; // Thêm prop mới
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
    initialIndex = 0,
}: CustomTabViewProps )
{
    const layout = useWindowDimensions();
    // Khởi tạo index trực tiếp từ initialIndex
    const [ index, setIndex ] = useState( initialIndex );

    // Cập nhật index khi initialIndex thay đổi
    useEffect( () =>
    {
        setIndex( initialIndex );
    }, [ initialIndex ] );

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
                    indicatorStyle={ {
                        backgroundColor: indicatorColor,
                        height: indicatorHeight,
                        borderRadius: indicatorBorder
                    } }
                    style={ { backgroundColor: tabBarColor } }
                    activeColor={ activeColor }
                    inactiveColor={ inActiveColor }
                />
            ) }
        />
    );
}

