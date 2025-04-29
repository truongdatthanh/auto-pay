import { SceneMap } from "react-native-tab-view"
import QRScanner from "./QR-scanner"
import DisplayQR from "./DisplayQR"
import CustomTabView from "@/components/TabView"

export default function HomeQR ()
{
    const routes = [
        { key: 'first', title: "Quét QR" },//tilte này là header của tabview
        { key: 'second', title: "QR của tôi" }
    ]

    const renderScene = SceneMap( {
        first: QRScanner,
        second: DisplayQR
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
        />
    )
}


