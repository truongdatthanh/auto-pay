import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

export function useAppReady ()
{
    const [ isReady, setIsReady ] = useState( false );

    useEffect( () =>
    {
        const prepare = async () =>
        {
            await new Promise( ( resolve ) => setTimeout( resolve, 2000 ) ); // mock loading
            await SplashScreen.hideAsync();
            setIsReady( true );
        };
        prepare();
    }, [] );

    return isReady;
}