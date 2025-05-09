export const decodeEMVCo = ( raw: string ) =>
{
    const result: Record<string, any> = {};

    // Hàm trích xuất giá trị từ tag
    const getValue = ( tag: string, data: string ) =>
    {
        let position = 0;
        while ( position < data.length )
        {
            const currentTag = data.substring( position, position + 2 );
            if ( currentTag === tag )
            {
                const lengthStr = data.substring( position + 2, position + 4 );
                const length = parseInt( lengthStr, 10 );
                return data.substring( position + 4, position + 4 + length );
            }

            // Nếu không phải tag cần tìm, nhảy đến tag tiếp theo
            const lengthStr = data.substring( position + 2, position + 4 );
            const length = parseInt( lengthStr, 10 );
            position += 4 + length;
        }
        return null;
    };

    // Decode các tag cơ bản
    result.payloadFormat = getValue( "00", raw );
    result.pointOfInitiation = getValue( "01", raw );

    // Thông tin merchant (tag 38)
    const merchantInfo = getValue( "38", raw );
    if ( merchantInfo )
    {
        // VietQR AID (A000000727)
        result.guid = getValue( "00", merchantInfo );

        // Thông tin tài khoản (tag 01 trong merchantInfo)
        const bankAccountInfo = getValue( "01", merchantInfo );
        if ( bankAccountInfo )
        {
            // BIN ngân hàng (tag 00 trong bankAccountInfo)
            result.bin = getValue( "00", bankAccountInfo );

            // Số tài khoản (tag 01 trong bankAccountInfo)
            result.STK = getValue( "01", bankAccountInfo );
        }

        // Phương thức chuyển khoản
        result.transferMethod = getValue( "02", merchantInfo );
    }

    // Thông tin giao dịch
    result.currency = getValue( "53", raw ); // 704 cho VND
    result.amount = getValue( "54", raw );
    result.countryCode = getValue( "58", raw );

    // Thông tin bổ sung (tag 62)
    const additionalInfo = getValue( "62", raw );
    if ( additionalInfo )
    {
        // Nội dung chuyển khoản (tag 08 trong additionalInfo)
        result.content = getValue( "08", additionalInfo );
    }

    return result;
};