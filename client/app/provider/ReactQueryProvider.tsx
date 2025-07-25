import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider >
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}

export default ReactQueryProvider;