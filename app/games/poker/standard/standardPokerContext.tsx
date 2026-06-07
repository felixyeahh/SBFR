"use client";
import { createContext, useContext, useEffect, useState } from "react";

export enum GamePhase {
    PREFLOP = 0,
    FLOP = 1,
    TURN = 2,
    RIVER = 3,
    SHOWDOWN = 4
}

type StandardPokerContextType = {
    isStarted: boolean;
    setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
    players: Player[];
    setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
    ante: number;
    setAnte: React.Dispatch<React.SetStateAction<number>>;
    currentPlayerIndex: number;
    setCurrentPlayerIndex: React.Dispatch<React.SetStateAction<number>>;
    phase: GamePhase;
    setPhase: React.Dispatch<React.SetStateAction<GamePhase>>;
    pot: number;
    setPot: React.Dispatch<React.SetStateAction<number>>;
    currentBet: number;
    setCurrentBet: React.Dispatch<React.SetStateAction<number>>;
    wasRaised: boolean;
    setWasRaised: React.Dispatch<React.SetStateAction<boolean>>;
    foldedPlayerCount: number,
    updatePlayer: <K extends keyof Player>(key: K, value: Player[K]) => void;
    resetEverythingOtherThanPlayers: () => void;
};

export interface Player {
    id: string;
    name: string;
    chips: number;
    folded: boolean;
}

const StandardPokerContext = createContext<StandardPokerContextType | null>(null);

export function StandardPokerProvider({ children }: { children: React.ReactNode }) {
    const [isStarted, setIsStarted] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]);
    const [ante, setAnte] = useState<number>(0);
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
    const [phase, setPhase] = useState<GamePhase>(GamePhase.PREFLOP);
    const [pot, setPot] = useState<number>(0);
    const [currentBet, setCurrentBet] = useState<number>(0);
    const [wasRaised, setWasRaised] = useState<boolean>(false);
    const [foldedPlayerCount, setFoldedPlayerCount] = useState<number>(0);

    const resetEverythingOtherThanPlayers = () => {
        setCurrentPlayerIndex(0);
        setPhase(GamePhase.PREFLOP);
        setPot(0);
        setCurrentBet(0);
        setWasRaised(false);
        setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, folded: false })));
        setIsStarted(false);
        setFoldedPlayerCount(0);
    }

    function updatePlayer<K extends keyof Player>(key: K, value: Player[K]) {
        setPlayers(prevPlayers => {
            const newPlayers = [...prevPlayers];
            newPlayers[currentPlayerIndex][key] = value;
            return newPlayers;
        });
    }

    function awardWinner (winningPlayerIndex?: number) {
        let index = winningPlayerIndex ?? currentPlayerIndex;
        updatePlayer("chips", players[index]?.chips + pot);
        setPot(0);
        resetEverythingOtherThanPlayers();
    }

    useEffect(() => {
        if (isStarted) {
            setPlayers(prevPlayers => prevPlayers.map(player => ({ ...player, chips: player.chips - ante })));
            setPot(ante * players.length);
        }
    }, [isStarted]);

    useEffect(() => {
        setFoldedPlayerCount(players.filter(player => player.folded).length);
    }, [players]);

    useEffect(() => {
        if (foldedPlayerCount >= players.length - 1 && isStarted) {
            awardWinner();
        }
    }, [foldedPlayerCount]);

    useEffect(() => {
        console.log(phase);
        if (phase >= GamePhase.SHOWDOWN) {
            awardWinner();
        }
    }, [phase])

    return (
        <StandardPokerContext.Provider value={{ 
            isStarted,
            setIsStarted,
            players,
            setPlayers,
            ante,
            setAnte,
            currentPlayerIndex,
            setCurrentPlayerIndex,
            phase,
            setPhase,
            pot,
            setPot,
            currentBet,
            setCurrentBet,
            wasRaised,
            setWasRaised, 
            foldedPlayerCount,
            updatePlayer,
            resetEverythingOtherThanPlayers,
        }}>
            {children}
        </StandardPokerContext.Provider>
    );
}

export const useStandardPoker = () => {
    const context = useContext(StandardPokerContext);
    if (context === null) {
        throw new Error("useStandardPoker must be used within a StandardPokerProvider");
    }
    return context;
};
