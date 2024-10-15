'use client';
import {AuthProvider} from '@/context/authContext';

export default function AuthWrapper({children}) {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}
