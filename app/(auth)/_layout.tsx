import { Stack } from 'expo-router';
import '../../global.css';


export default function RootLayout ()
{
  return (
    //initialRouteName='login' tra ve man hin dang nhap
      <Stack initialRouteName='login' screenOptions={ { headerShown: false } } />
  )
}