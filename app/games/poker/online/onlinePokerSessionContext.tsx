"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/app/tools/database/database";
import { useCookies } from "@/app/tools/cookies";
import { CurrentSession } from "@/app/tools/constants";
import { PokerConst, PokerSession, Player, Card, PokerPhase } from "@/app/tools/database/poker";
import { useUser } from "@/app/components/userContext";
import { generateDecks } from "../cardManagement";


type OnlinePokerSessionContextType = {
    sessionId: string | undefined;
    session: PokerSession | null;
    isOwner: boolean;
    players: Player[];
    loading: boolean;
    currentDeck: Card[];
    community: Card[];
    phase: PokerPhase;
    pot: number;
    ante: number;
    isStarted: boolean;
};

const OnlinePokerSessionContext = createContext<OnlinePokerSessionContextType | null>(null);

export function OnlinePokerSessionProvider({ children }: { children: React.ReactNode }) {
    const {user}= useUser();
    const [loading, setLoading] = useState(true);
    const [sessionId] = useCookies(CurrentSession.POKER);
    const [ante, setAnte] = useState(0);
    const [players, setPlayers] = useState<Player[]>([]);
    const [isOwner, setIsOwner] = useState(false);
    const [currentDeck, setCurrentDeck] = useState<Card[]>(generateDecks(1));
    const [community, setCommunity] = useState<Card[]>([]);
    const [currentBet, setCurrentBet] = useState(0);
    const [pot, setPot] = useState(0);
    const [activePlayerIndex, setActivePlayerIndex] = useState(0);
    const [phase, setPhase] = useState<PokerPhase>(PokerPhase.PREFLOP);
    const [wasRaised, setWasRaised] = useState(false);
    const [session, setSession] = useState<PokerSession | null>(null)
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        if (!sessionId) {
            setPlayers([]);
            setLoading(false);
            return;
        }

        const unsubscribe = onSnapshot(doc(db, PokerConst.COLLECTION, sessionId), (doc) => {
            if (doc.exists()) {
                const session = doc.data() as PokerSession;
                session.id = doc.id;
                setSession(session);
                setPlayers(session.players);
                setIsOwner(session.owner.user_id == user?.id);
                setAnte(session.ante);
                setCurrentDeck(session.deck);
                setCommunity(session.community);
                setPhase(session.phase);
                setPot(session.pot);
                setIsStarted(session.isStarted);
                setCurrentBet(session.currentBet);
                setActivePlayerIndex(session.activePlayerIndex);
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
        <OnlinePokerSessionContext.Provider value={
            { sessionId, 
                players, 
                loading, 
                isOwner, 
                currentDeck, 
                community, 
                phase, 
                pot, 
                ante, 
                session, 
                isStarted
            }}>
            {children}
        </OnlinePokerSessionContext.Provider>
    );
}

export const useOnlinePokerSession = () => {
    const session = useContext(OnlinePokerSessionContext);
    if (!session) throw new Error("useOnlinePokerSession must be used within OnlinePokerSessionProvider");
    return session;
}
