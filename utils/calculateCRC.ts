export function crc16ccitt ( input: string ): string
{
    let crc = 0xFFFF;
    for ( let i = 0; i < input.length; i++ )
    {
        crc ^= input.charCodeAt( i ) << 8;
        for ( let j = 0; j < 8; j++ )
        {
            crc = ( crc & 0x8000 ) ? ( ( crc << 1 ) ^ 0x1021 ) : ( crc << 1 );
            crc &= 0xFFFF;
        }
    }
    return crc.toString( 16 ).toUpperCase().padStart( 4, '0' );
}