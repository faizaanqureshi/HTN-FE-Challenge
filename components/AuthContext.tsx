"use client"

import { createContext, useState, useContext, SetStateAction, Dispatch } from "react";

type AuthContextType  = {
    isLoggedIn: boolean;
    login: (username: string, password: string) => boolean;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({children}: {children: any}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = (username: string, password: string) => {
        if (username === 'test@hackthenorth.com' && password === 'test') {
            setIsLoggedIn(true);
            return true;
        } else {
            return false;
        }
    }

    const logout = () => {
        setIsLoggedIn(false);
    }

    const contextValue: AuthContextType = {
        isLoggedIn,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}