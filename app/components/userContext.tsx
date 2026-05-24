import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/components/firebase";
import { useCookies } from "~/components/cookies";
import { CurrentSession } from "~/components/constants";

export class Users {
    static readonly COLLECTION = "players";
    static readonly POINTS = "points";
    static readonly WAGERS = "wagers";
    static readonly WINS = "wins";
    static readonly IS_ADMIN = "isAdmin";
    static readonly PASSWORD = "password";
}

export interface User {
    name: string;
    points: number;
    wagers: number;
    wins: number;
    password: string;
    isAdmin: boolean;
}


type UserContextType = {
    user: User | null;
    balance: number;
    loading: boolean;
};

const UserContext = createContext<UserContextType>({ user: null, balance: 0, loading: true });

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
                userData.name = doc.id;
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

    return (
        <UserContext.Provider value={{ user, balance, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
