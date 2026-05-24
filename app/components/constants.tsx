
export class Wagers {
    static readonly COLLECTION = "wagers";
    static readonly DATE_CREATED = "date_created";
    static readonly DATE_FINISHED = "date_finished";
    static readonly WINNER = "winner";
    static readonly BET = "bet";
    static readonly PLAYERS = "players";
    static readonly BET_NAME = "betName";
    static readonly FINISHED = "finished";
}

export interface Wager {
    id?: string;
    bet: number;
    betName: string;
    players: string[];
    date_created: Date;
    finished: boolean;
    winner?: string;
    date_finished?: Date;
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
    takenDate?: Date;
    takenBy?: string;
    completedBy?: string;
}

export interface QuestLibraryEntry {

}

export interface QuestArchiveEntry {

}
