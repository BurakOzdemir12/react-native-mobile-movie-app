import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "@/services/appwrite";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const loggedInUser = await getCurrentUser();
            setUser(loggedInUser);
            setLoading(false);
        };
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loginUser, registerUser, logoutUser }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
