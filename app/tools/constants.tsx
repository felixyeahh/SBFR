
export enum Users {
    COLLECTION = "players",
    POINTS = "points",
    WAGERS = "wagers",
    WINS = "wins",
    IS_ADMIN = "isAdmin",
    PASSWORD = "password"
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

export enum CurrentSession {
    COLLECTION = "currentSession",
    USERNAME = "username",
    SESSION_ID = "session_id",
}

export enum ActiveQuests {
    COLLECTION = "activeQuests",
    QUEST_NAME = "questName",
    QUEST_RARITY = "questRarity",
    IS_TAKEN = "isTaken",
    IS_COMPLETED = "isCompleted",
    TAKEN_DATE = "takenDate",
    TAKEN_BY = "takenBy",
    COMPLETED_BY = "completedBy"
}

export type QuestRarity = "Common" | "Epic" | "Legendary";
