import * as Network from 'expo-network';
import { Button } from 'react-native';
import * as Device from 'expo-device';
import * as Application from 'expo-application';

export default function NetWorkTest ()
{

    const networkState = Network.useNetworkState();// WIFI

    const handlePress = async () =>
    {
        const ip = await Network.getIpAddressAsync();
        const netWork = await Network.getNetworkStateAsync();
        const device = await Device.getDeviceTypeAsync();
        console.log( "----------------------------------------------------------------" )
        console.log( "Device: ", Device.productName )
        console.log("Application", Application.getAndroidId())
        console.log( "NetWork", netWork );
        console.log( "IP: ", ip )
        console.log( `Current network type: ${ networkState.type }` )
        console.log( "----------------------------------------------------------------" )
    }
    return (
        <>
            <Button title='Press to check NetWork' onPress={ handlePress } />
        </>
    );
}