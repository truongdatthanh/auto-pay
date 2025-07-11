const unitWords = [ "", "nghin", "trieu", "ty" ];
const digitWords: Record<number, string> = {
    0: "khong",
    1: "mot",
    2: "hai",
    3: "ba",
    4: "bon",
    5: "nam",
    6: "sau",
    7: "bay",
    8: "tam",
    9: "chin",
};

function readThreeDigits ( n: number ): string[]
{
    //Floor dùng làm tròn xuống 4.9 => 4
    const tram = Math.floor( n / 100 );
    const chuc = Math.floor( ( n % 100 ) / 10 );
    const donvi = n % 10;

    console.log( `Trăm: ${ tram }, chục: ${ chuc }, đơn vị: ${ donvi }` );

    const words: string[] = [];

    if ( tram !== 0 )
    {
        console.log( "Push vào trăm: ", digitWords[ tram ] );
        words.push( digitWords[ tram ] );
        words.push( "trăm" );
    }

    if ( chuc !== 0 )
    {
        if ( chuc === 1 )
        {
            words.push( "muoii" );
        } else
        {
            console.log( "Push vào chục: ", digitWords[ chuc ] );
            words.push( digitWords[ chuc ] );
            words.push( "muoi" );
        }
    } else if ( donvi !== 0 && tram !== 0 )
    {
        words.push( "linh" );
    }

    if ( donvi !== 0 )
    {
        if ( chuc >= 1 )
        {
            if ( donvi === 1 )
            {
                words.push( "mot" );
            } else if ( donvi === 5 )
            {
                words.push( "lam" );
            } else
            {
                words.push( digitWords[ donvi ] );
            }
        } else
        {
            words.push( digitWords[ donvi ] );
        }
    }

    console.log( "word: ", words );
    return words;
}

// 123_456_789_0
export function convertNumberToWords ( amount: number ): string[]
{
    if ( amount === 0 ) return [ "khong", "dong" ];

    console.log( amount )

    const groups: number[] = [];
    let count = 0;
    while ( amount > 0 )
    {
        groups.unshift( amount % 1000 );
        console.log( `unshift lần ${ count }: ${ amount % 1000 }` );
        amount = Math.floor( amount / 1000 );
        console.log( `amount : ${ amount }` );
        count++;
        console.log( "Group unshift: ", groups )
    }

    const result: string[] = [];
    const groupCount = groups.length;
    console.log( "GroupLenght: ", groupCount );

    for ( let i = 0; i < groupCount; i++ )
    {
        const group = groups[ i ];
        const unitIndex = groupCount - 1 - i;

        console.log( `Đang xử lý group ${ i }: ${ group }, unitIndex: ${ unitIndex }` );

        // Kiểm tra xem có cần thêm "không trăm lẻ" không
        const needsZeroFiller =
            i > 0 && // Không phải nhóm đầu tiên
            group !== 0 && // Nhóm hiện tại không phải 0
            group < 100 && // Nhóm hiện tại < 100 (tức là không có hàng trăm)
            groups.slice( 0, i ).some( g => g !== 0 ); // Có nhóm khác 0 trước đó

        if ( group === 0 ) 
        {
            continue; // Bỏ qua nhóm 000
        }

        const groupWords = readThreeDigits( group );
        console.log( "Group words: ", groupWords );

        // Thêm "không trăm lẻ" nếu cần
        if ( needsZeroFiller )
        {
            console.log( "Thêm 'không trăm lẻ' cho group", group );
            result.push( "khong", "tram", "linh" );
        }

        // Thêm đơn vị (nghìn, triệu, tỷ) nếu có
        if ( unitWords[ unitIndex ] )
        {
            console.log( `UnitWord index = ${ unitIndex }: ${ unitWords[ unitIndex ] }` );
            groupWords.push( unitWords[ unitIndex ] );
        }

        result.push( ...groupWords );
        console.log( "result after add unit words: ", result );
    }

    result.push( "dong" );
    return result;
}
