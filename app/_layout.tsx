import { Slot, useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function RootLayout() {
  const router = useRouter();
  const isLoggedIn = false; 

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace('/login');
    }
  }, []);

  return <Slot />;
}