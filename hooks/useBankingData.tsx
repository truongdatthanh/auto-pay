import { IBanking } from "@/interface/IBanking";
import { useCallback, useEffect, useState } from "react";

export const useBankingData = () =>
{
    const [ listBanking, setListBanking ] = useState<IBanking[]>( [] );
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState<string>( '' );

    useEffect( () =>
    {
        let isCancelled = false;

        const fetchBanks = async () =>
        {
            setLoading( true );
            setError( '' );

            try
            {
                const response = await fetch( 'https://api.vietqr.io/v2/banks' );
                console.log("loggggggggggggggggggggggg")

                if ( !response.ok )
                {
                    throw new Error( `HTTP ${ response.status }: ${ response.statusText }` );
                }

                const result = await response.json();

                if ( !isCancelled )
                {
                    if ( result.code === "00" && Array.isArray( result.data ) )
                    {
                        setListBanking( result.data );
                    } else
                    {
                        throw new Error( 'Dữ liệu API không đúng định dạng' );
                    }
                }

            } catch ( err )
            {
                if ( !isCancelled )
                {
                    const errorMessage = err instanceof Error ? err.message : 'Lỗi không xác định';
                    setError( errorMessage );
                    console.error( 'Banking API Error:', err );
                }
            } finally
            {
                if ( !isCancelled )
                {
                    setLoading( false );
                }
            }
        };

        fetchBanks();

        return () =>
        {
            isCancelled = true;
        };
    }, [] );


    return { listBanking, loading, error };
};