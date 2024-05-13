import React, { createContext, useState } from "react";
import * as auth from "../services/auth";

interface AuthContextData {
    loggedIn: boolean;
    user: object | null;
    logIn(): Promise<void>;
    logOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<object | null>(null);

    async function logIn() {
        const response = await auth.logIn();

        setUser(response.user);

        console.log(response);
    }

    function logOut() {
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ loggedIn: !!user, user: user, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;