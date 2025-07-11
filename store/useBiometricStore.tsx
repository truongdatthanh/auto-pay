import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type BiometricState = {
    biometricEnabled: boolean;
    setBiometricEnabled: ( value: boolean ) => void;
    loadBiometricSetting: () => Promise<void>;
};

export const useBiometricStore = create<BiometricState>( ( set ) => ( {
    biometricEnabled: false,

    setBiometricEnabled: async ( value: boolean ) =>
    {
        await AsyncStorage.setItem( 'biometricEnabled', JSON.stringify( value ) );
        set( { biometricEnabled: value } );
    },

    loadBiometricSetting: async () =>
    {
        const value = await AsyncStorage.getItem( 'biometricEnabled' );
        set( { biometricEnabled: value === 'true' } );
    },
} ) );