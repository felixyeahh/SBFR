import { db, Database, type DatabaseEntry } from "./database";
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

export class QuestLibrary {
    static readonly COLLECTION = "questLibrary"
}

export class QuestArchive {
    static readonly COLLECTION = "questArchive"
}

export type QuestRarity = "Common" | "Epic" | "Legendary";

export interface ActiveQuest extends DatabaseEntry {
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

export interface QuestLibraryEntry extends DatabaseEntry {
    questName: string;
    description: string;
    questRarity: QuestRarity;
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
export const questLibraryDb = new Database<QuestLibraryEntry>(db, QuestLibrary.COLLECTION);
export const questArchiveDb = new Database<QuestArchiveEntry>(db, QuestArchive.COLLECTION);
