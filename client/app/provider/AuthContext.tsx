import type { IUser } from "@/types";
import { createContext, useContext, useEffect, useMemo, useState, type FC, type ReactNode } from "react";

interface IAuthContext {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (user: IUser) => Promise<void>;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

interface IAuthProviderProps {
    children: ReactNode;
}

interface IAuthProviderState {
    user: IUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
    const [state, setState] = useState<IAuthProviderState>({
        user: null,
        isAuthenticated: false,
        isLoading: false,
    });

    const login = async (email: string, password: string) => {
        // Implement login logic here
        console.log("Logging in with", { email, password });
    };

    const logout = async () => {
        // Implement logout logic here
    };

    const register = async (user: IUser) => {
        console.log("Registering user", user);
        // Implement registration logic here
    };

    useEffect(() => {
        // Check authentication status on mount
        setState((prev) => ({ ...prev, isLoading: false }));
    }, []);

    const value = useMemo(() => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        login,
        logout,
        register,
    }), [state]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};