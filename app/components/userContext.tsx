"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../tools/database/database";
import { useCookies } from "../tools/cookies";
import { CurrentSession, Users, type User } from "../tools/constants";

type UserContextType = {
    user: User | null;
    balance: number;
    loading: boolean;
    isAdmin: boolean;
};

const UserContext = createContext<UserContextType>({ user: null, balance: 0, loading: true, isAdmin: false });

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentSession] = useCookies(CurrentSession.COLLECTION);

    useEffect(() => {
        if (!currentSession) {
            setUser(null);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, Users.COLLECTION, currentSession), (doc) => {
            if (doc.exists()) {
                const userData = doc.data() as User;
                userData.id = doc.id;
                setUser(userData);
            } else {
                setUser(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [currentSession]);

    const balance = user?.points || 0;
    const isAdmin = user?.isAdmin || false;

    return (
        <UserContext.Provider value={{ user, balance, loading, isAdmin }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
