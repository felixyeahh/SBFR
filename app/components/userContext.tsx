import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/components/firebase";
import { useCookies } from "~/components/cookies";
import { CurrentSession, Users, type User } from "~/components/constants";

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

        // Setup real-time listener to automatically fetch user data and balance
        const unsubscribe = onSnapshot(doc(db, Users.COLLECTION, currentSession), (doc) => {
            if (doc.exists()) {
                const userData = doc.data() as User;
                // Keep the name property populated
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
