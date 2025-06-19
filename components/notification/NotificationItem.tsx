import { TouchableOpacity, View } from 'react-native';
import { INotification } from '@/interface/INotification';
import NotificationCheckbox from './NotificationCheckbox';
import PromotionContent from './template/Promotion';
import WarningContent from './template/Warnning';
import SharedContent from './template/Shared';
import FluctuationContent from './template/Fluctuation';
import UnreadDot from './UnreadDot';

//Rebder ra cac item theo template
interface NotificationItemProps
{
    item: INotification;
    isSelectionMode: boolean;
    isSelected: boolean;
    onPress: ( itemId: string ) => void;
    onLongPress: ( itemId: string ) => void;
    onToggleSelection: ( itemId: string ) => void;
}

export default function NotificationItem ( { item, isSelectionMode, isSelected, onPress, onLongPress, onToggleSelection }: NotificationItemProps ) 
{
    const renderContent = () =>
    {
        switch ( item.type )
        {
            case "promotion":
                return <PromotionContent item={ item } />;
            case "warning":
                return <WarningContent item={ item } />;
            case "shared":
                return <SharedContent item={ item } />;
            case "fluctuation":
            default:
                return <FluctuationContent item={ item } />;
        }
    };

    const getContainerStyle = () =>
    {
        switch ( item.type )
        {
            case "promotion":
            case "warning":
                return `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center relative ${ item.unread ? 'bg-gray-800' : 'bg-black' }`;
            case "shared":
                return `p-4 mx-4 my-2 rounded-xl shadow-md flex-row items-center border-l-4 relative ${ item.unread ? 'bg-green-100 border-green-300' : 'bg-green-50 border-green-400'
                    }`;
            case "fluctuation":
            default:
                return "flex-row items-center mx-4";
        }
    };

    if ( item.type === "fluctuation" )
    {
        return (
            <View className="flex-row items-center mx-4">
                { isSelectionMode && (
                    <NotificationCheckbox
                        itemId={ item.id || '' }
                        isSelected={ isSelected }
                        onToggle={ onToggleSelection }
                    />
                ) }
                <TouchableOpacity
                    onPress={ () => onPress( item.id || '' ) }
                    onLongPress={ () => onLongPress( item.id || '' ) }
                    delayLongPress={ 300 }
                    className={ `flex-1 px-4 py-2 my-1.5 flex-row items-center relative bg-slate-100 border border-gray-200 rounded-lg ${ item.unread ? "bg-white shadow-lg" : ""
                        }` }
                >
                    <FluctuationContent item={ item } />
                    <UnreadDot
                        isUnread={ !!item.unread }
                        show={ !isSelectionMode }
                    />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={ () => onPress( item.id || '' ) }
            onLongPress={ () => onLongPress( item.id || '' ) }
            delayLongPress={ 500 }
            className={ getContainerStyle() }
        >
            { isSelectionMode && (
                <NotificationCheckbox
                    itemId={ item.id || '' }
                    isSelected={ isSelected }
                    onToggle={ onToggleSelection }
                />
            ) }

            { renderContent() }

            <UnreadDot
                isUnread={ !item.unread }
                show={ !isSelectionMode }
            />
        </TouchableOpacity>
    );
};

