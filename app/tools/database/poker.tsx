import { Database, DatabaseEntry } from "./database";

export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  rank: Rank;
  suit: Suit;
}

export interface Player {
    id: number;
    user_id: string;
    chips: number;
    folded: boolean;
    cards: Card[];
    lastAction?: string;
}

export enum PokerPhase {
    PREFLOP,
    FLOP,
    TURN,
    RIVER,
    SHOWDOWN
}

export interface PokerSession extends DatabaseEntry {
    players: Player[];
    community: Card[];
    deck: Card[];
    phase: PokerPhase;
    pot: number;
    ante: number;
    owner: Player;
    activePlayerIndex: number;
    currentBet: number;
    wasRaised: boolean;
    isStarted: boolean;
}

export enum PokerConst {
    COLLECTION = "poker",
}

export class PokerSessionDatabase extends Database<PokerSession> {
    
}

import {db} from "./database";
export const pokerDb = new PokerSessionDatabase(db, PokerConst.COLLECTION);
