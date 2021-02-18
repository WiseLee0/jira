import { AuthProvider } from "auth/auth-context";
import { ReactNode } from "react";

export const AppProvider = ({ children }: { children: ReactNode }) => {
    return <AuthProvider>
        {children}
    </AuthProvider>
}