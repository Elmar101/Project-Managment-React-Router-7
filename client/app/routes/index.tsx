import { Navigate } from 'react-router';
import type { Route } from '../+types/root';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TaskHub" },
    { name: "description", content: "Welcome to TaskHub!" },
  ];
}
const isLogined = false; // Replace with actual authentication logic
const MainPage = () => {
  return !isLogined ? <Navigate to="/auth/sign-in" /> : <Navigate to="/pages/home" />;
}

export default MainPage