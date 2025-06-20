import { Button } from "@/components/ui/button";
import { Link, Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Link to="/auth/sign-in">
        <Button className="bg-blue-500 text-white">Login</Button>
      </Link>
      <Link to="/auth/sign-up">
        <Button variant="outline" className="bg-blue-500 text-white">
          Sign Up
        </Button>
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
