import { Timestamp } from "firebase/firestore";

export class Users {
    static readonly COLLECTION = "players";
    static readonly POINTS = "points";
    static readonly WAGERS = "wagers";
    static readonly WINS = "wins";
    static readonly IS_ADMIN = "isAdmin";
    static readonly PASSWORD = "password";
}

export interface User {
    id: string;
    points: number;
    wagers: number;
    wins: number;
    password: string;
    isAdmin: boolean;
}

export interface CurrentUserSession {
    username: string;
    session_id: string;
}

export class CurrentSession {
    static readonly COLLECTION = "currentSession";
    static readonly USERNAME = "username";
    static readonly SESSION_ID = "session_id";
}

export class ActiveQuests {
    static readonly COLLECTION = "activeQuests";
    static readonly QUEST_NAME = "questName";
    static readonly QUEST_RARITY = "questRarity";
    static readonly IS_TAKEN = "isTaken";
    static readonly IS_COMPLETED = "isCompleted";
    static readonly TAKEN_DATE = "takenDate";
    static readonly TAKEN_BY = "takenBy";
    static readonly COMPLETED_BY = "completedBy";
}
export type QuestRarity = "Common" | "Epic" | "Legendary";

export interface ActiveQuest {
    id: string;
    questName: string;
    description: string;
    reward: number;
    questRarity: QuestRarity;
    isTaken: boolean;
    isCompleted: boolean;
    takenDate?: Timestamp;
    takenBy?: string;
    completedBy?: string;
}

export interface QuestLibraryEntry {

}

export interface QuestArchiveEntry {

}
