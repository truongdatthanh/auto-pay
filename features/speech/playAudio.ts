import { Audio } from 'expo-av';
import { audioMap } from './audioMap';

export const playAudioSequence = async ( words: string[] ) =>
{
    const playNext = async ( index: number ) =>
    {
        if ( index >= words.length ) return;

        const source = audioMap[ words[ index ] ];
        if ( !source )
        {
            console.warn( 'Không tìm thấy file cho:', words[ index ] );
            return playNext( index + 1 );
        }

        const { sound } = await Audio.Sound.createAsync( source );
        await sound.setRateAsync( 1.0, true );


        sound.setOnPlaybackStatusUpdate( ( status ) =>
        {
            if ( status.isLoaded && status.didJustFinish )
            {
                sound.unloadAsync();
                playNext( index + 1 );
            }
        } );

        await sound.playAsync();
    };

    playNext( 0 );
};
