import CustomTabView from "@/components/tab/TabView";
import QRScanner from "./scanner-qr";
import MyQR from "./my-qr";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";


export default function HomeQR ()
{
    const { tabIndex } = useLocalSearchParams();
    const [ index, setIndex ] = useState<number | null>( null ); // ban đầu chưa render gì cả

    useFocusEffect(
        useCallback( () =>
        {
            const i = Number( tabIndex );
            setIndex( !isNaN( i ) ? i : 0 );
        }, [ tabIndex ] )
    );

    const routes = [
        { key: "scan", title: "Quét QR" },
        { key: "myqr", title: "QR của tôi" },
    ];

    const renderScene = ( { route }: any ) =>
    {
        if ( index === null ) return null; // tránh render khi chưa xác định tab
        switch ( route.key )
        {
            case "scan":
                return index === 0 ? <QRScanner /> : null;
            case "myqr":
                return index === 1 ? <MyQR /> : null;
            default:
                return null;
        }
    };

    if ( index === null ) return null; // hoặc Loading

    return (
        <CustomTabView
            routes={ routes }
            renderScene={ renderScene }
            tabBarColor="black"
            indicatorColor="#FFFFFF"
            indicatorHeight={ 5 }
            indicatorBorder={ 8 }
            inActiveColor="#FF6F20"
            index={ index }
            onIndexChange={ setIndex }
        />
    );
}
