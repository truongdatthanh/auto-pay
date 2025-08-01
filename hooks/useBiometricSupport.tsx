import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export default function useBiometricSupport ()
{
    const [ isSupported, setIsSupported ] = useState( false );

    useEffect( () =>
    {
        let isMounted = true;
        const checkBiometricSupport = async () =>
        {
            try
            {
                const [ hasHardware, isEnrolled ] = await Promise.all( [
                    LocalAuthentication.hasHardwareAsync(),
                    LocalAuthentication.isEnrolledAsync()
                ] );
                if ( isMounted ) setIsSupported( hasHardware && isEnrolled );
            } catch ( error )
            {
                console.error( 'Thiết bị không hỗ trợ sinh trắc học:', error );
                if ( isMounted ) setIsSupported( false );
            }
        };
        checkBiometricSupport();
        return () =>
        {
            isMounted = false;
        };
    }, [] );

    return isSupported;
}
