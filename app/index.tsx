// app/index.tsx
import { Redirect } from 'expo-router';

export default function Index() {
  // Ví dụ: luôn điều hướng về /login
  return <Redirect href="/auth/login" />;
}
