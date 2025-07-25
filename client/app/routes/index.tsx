import { Navigate } from 'react-router';
import type { Route } from '../+types/root';
import { use } from 'react';
import { useAuth } from '@/provider/AuthContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub" },
    { name: "description", content: "Welcome to TaskHub!" },
  ];
}

const MainPage = () => {
  const {isAuthenticated} = useAuth();
  return !isAuthenticated ? <Navigate to="/auth/sign-in" /> : <Navigate to="/pages/home" />;
}

export default MainPage