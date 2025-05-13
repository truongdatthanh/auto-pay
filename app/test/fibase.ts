import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync ()
{
  if ( !Device.isDevice )
  {
    alert( 'Push Notifications chỉ hoạt động trên thiết bị thật.' );
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if ( existingStatus !== 'granted' )
  {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if ( finalStatus !== 'granted' )
  {
    alert( 'Không được cấp quyền gửi thông báo!' );
    return;
  }

  const token = ( await Notifications.getExpoPushTokenAsync() ).data;
  console.log( 'Expo Push Token:', token );

  if ( Platform.OS === 'android' )
  {
    Notifications.setNotificationChannelAsync( 'default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
    } );
  }
  return token;
}