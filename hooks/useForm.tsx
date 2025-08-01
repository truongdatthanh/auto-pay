import { useState } from "react";

export default function useForm<T extends object> ( initialValues: T )
{
    const [ values, setValues ] = useState<T>( initialValues );

    const handleChange = ( field: keyof T, value: string ) =>
    {
        setValues( prev => ( { ...prev, [ field ]: value } ) );
    };

    return { values, setValues, handleChange };
}