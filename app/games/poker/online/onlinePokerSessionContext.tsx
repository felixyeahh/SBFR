"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/tools/database/database";
import { useCookies } from "@/app/tools/cookies";
import { CurrentSession } from "@/app/tools/constants";
import { PokerConst, PokerSession, Player } from "@/app/tools/database/poker";
import { useUser } from "@/app/components/userContext";

type OnlinePokerSessionContextType = {
    sessionId: string | undefined;
    isOwner: boolean;
    players: Player[];
    loading: boolean;
};

const OnlinePokerSessionContext = createContext<OnlinePokerSessionContextType | null>(null);

export function OnlinePokerSessionProvider({ children }: { children: React.ReactNode }) {
    const {user}= useUser();
    const [loading, setLoading] = useState(true);
    const [sessionId, setSessionId] = useCookies(CurrentSession.POKER);
    const [players, setPlayers] = useState<Player[]>([]);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if (sessionId == "") {  }
        if (!sessionId) {
            setPlayers([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, PokerConst.COLLECTION, sessionId), (doc) => {
            if (doc.exists()) {
                const session = doc.data() as PokerSession;
                session.id = doc.id;
                setPlayers(session.players);
                setIsOwner(session.owner.user_id == user?.id);
            } else {
                setPlayers([]);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [sessionId]);

    return (
        <OnlinePokerSessionContext.Provider value={{ sessionId, players, loading, isOwner }}>
            {children}
        </OnlinePokerSessionContext.Provider>
    );
}

export const useOnlinePokerSession = () => {
    const session = useContext(OnlinePokerSessionContext);
    if (!session) throw new Error("useOnlinePokerSession must be used within OnlinePokerSessionProvider");
    return session;
}
