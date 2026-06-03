import { db, Database, type DatabaseEntry } from "./database";

export class QuestsConst {
    static readonly ACTIVE_QUESTS_COLLECTION = "activeQuests";
    static readonly QUEST_LIBRARY_COLLECTION = "questLibrary";
    static readonly QUEST_ARCHIVE_COLLECTION = "questArchive";
    static readonly MIN_QUESTS_ACTIVE = 3;
}

export type QuestRarity = "Common" | "Epic" | "Legendary";

export interface ActiveQuest extends DatabaseEntry {
    lib_id: string;
    questName: string;
    description: string;
    reward: number;
    questRarity: QuestRarity;
    isTaken: boolean;
    isCompleted: boolean;
    dateCreated: Date;
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

export const questsDb = new Database<ActiveQuest>(db, QuestsConst.ACTIVE_QUESTS_COLLECTION);
export const questLibraryDb = new Database<QuestLibraryEntry>(db, QuestsConst.QUEST_LIBRARY_COLLECTION);
export const questArchiveDb = new Database<QuestArchiveEntry>(db, QuestsConst.QUEST_ARCHIVE_COLLECTION);
