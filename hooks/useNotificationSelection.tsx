import { useState } from "react";


export const useNotificationSelection = () =>
{
    const [ isSelectionMode, setIsSelectionMode ] = useState( false );
    const [ selectedItems, setSelectedItems ] = useState<Set<string>>( new Set() );

    const toggleSelection = ( itemId: string ) =>
    {
        setSelectedItems( prev =>
        {
            const newSet = new Set( prev );
            if ( newSet.has( itemId ) )
            {
                newSet.delete( itemId );
            } else
            {
                newSet.add( itemId );
            }
            return newSet;
        } );
    };

    const selectAll = ( allIds: string[] ) =>
    {
        setSelectedItems( new Set( allIds ) );
    };

    const exitSelectionMode = () =>
    {
        setIsSelectionMode( false );
        setSelectedItems( new Set() );
    };

    const enterSelectionMode = ( itemId: string ) =>
    {
        setIsSelectionMode( true );
        setSelectedItems( new Set( [ itemId ] ) );
    };

    return {
        isSelectionMode,
        selectedItems,
        toggleSelection,
        selectAll,
        exitSelectionMode,
        enterSelectionMode,
    };
};