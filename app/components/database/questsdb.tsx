import { db, Database } from "./database";
import type { Firestore } from "firebase/firestore";

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
    id: string;
    questRarity: QuestRarity;
    description: string;
    reward: number;
    punishment: number;
}

export interface QuestArchiveEntry extends ActiveQuest {
    isVerified: boolean;
    isDenied: boolean;
    verifiedBy?: string;
    verifiedDate?: Date;
}

export const questsDb = new Database<ActiveQuest>(db, ActiveQuests.COLLECTION);
export const questLibraryDb = new Database<QuestLibraryEntry>(db, "questLibrary");
export const questArchiveDb = new Database<QuestArchiveEntry>(db, "questArchive");
