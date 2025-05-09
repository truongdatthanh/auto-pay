import { SceneMap } from "react-native-tab-view"
import QRScanner from "./scanner-qr"
import CustomTabView from "@/components/TabView"
import MyQR from "@/app/my-qr"
import { useEffect, useState } from "react"
import { useLocalSearchParams } from "expo-router"

export default function HomeQR ()
{
    const { tabIndex } = useLocalSearchParams();
    // Khởi tạo initialIndex trực tiếp từ tabIndex nếu có
    const initialTabIndex = typeof tabIndex === 'string' && !isNaN( Number( tabIndex ) )
        ? Number( tabIndex )
        : 0;

    const [ index, setIndex ] = useState( initialTabIndex );

    // Cập nhật index khi tabIndex thay đổi
    useEffect( () =>
    {
        if ( !tabIndex )
        {
            setIndex( 0 );
        } else if ( typeof tabIndex === 'string' && !isNaN( Number( tabIndex ) ) )
        {
            setIndex( Number( tabIndex ) );
        }
    }, [ tabIndex ] );

    const routes = [
        { key: 'first', title: "Quét QR" },
        { key: 'second', title: "QR của tôi" }
    ]

    const renderScene = SceneMap( {
        first: QRScanner,
        second: MyQR
    } )

    return (
        <CustomTabView
            routes={ routes }
            renderScene={ renderScene }
            tabBarColor="#1c40f2"
            indicatorColor="#FFFFFF"
            indicatorHeight={ 5 }
            indicatorBorder={ 8 }
            inActiveColor="#FF6F20"
            initialIndex={ index }
        />
    )
}

