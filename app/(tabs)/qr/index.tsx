import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useCallback } from "react";
import QRScanner from "./scanner-qr";
import MyQR from "./my-qr";
import CustomTabView from "@/components/tabbar/TabView";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeQR ()
{
    const { tabIndex } = useLocalSearchParams();
    const [ index, setIndex ] = useState( 0 );

    // Cập nhật lại index mỗi khi screen được focus
    useFocusEffect(
        useCallback( () =>
        {
            const i = Number( tabIndex );
            if ( !isNaN( i ) )
            {
                setIndex( i );
            } else
            {
                setIndex( 0 );
            }
        }, [ tabIndex ] )
    );

    const routes = [
        { key: "scan", title: "Quét QR" },
        { key: "myqr", title: "QR của tôi" },
    ];

    const renderScene = ( { route }: any ) =>
    {
        switch ( route.key )
        {
            case "scan":
                return index === 0 ? <QRScanner /> : null; // để tránh camera chạy ngầm
            case "myqr":
                return <MyQR />;
            default:
                return null;
        }
    };

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