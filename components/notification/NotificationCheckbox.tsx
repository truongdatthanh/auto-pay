import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface NotificationCheckboxProps
{
    itemId: string;
    isSelected: boolean;
    onToggle: ( itemId: string ) => void;
}

export default function NotificationCheckbox ( { itemId, isSelected, onToggle }: NotificationCheckboxProps )
{
    return (
        <>
            <TouchableOpacity
                onPress={ () => onToggle( itemId ) }
                className="w-6 h-6 mr-3 rounded border-2 border-gray-400 flex items-center justify-center"
                style={ {
                    backgroundColor: isSelected ? '#3B82F6' : 'transparent',
                    borderColor: isSelected ? '#3B82F6' : '#9CA3AF'
                } }
            >
                { isSelected && (
                    <MaterialIcons name="check" size={ 16 } color="white" />
                ) }
            </TouchableOpacity>
        </>
    );
}


