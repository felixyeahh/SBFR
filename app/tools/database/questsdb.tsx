import { Timestamp } from "firebase/firestore";
import { db, Database, type DatabaseEntry } from "./database";

export class QuestsConst {
    static readonly ACTIVE_QUESTS_COLLECTION = "activeQuests";
    static readonly QUEST_LIBRARY_COLLECTION = "questLibrary";
    static readonly QUEST_ARCHIVE_COLLECTION = "questArchive";
    static readonly MIN_QUESTS_ACTIVE = 4;
    static readonly MAX_RARE_QUESTS = 1;

    static readonly RARITY_COMMON = "Common";
    static readonly RARITY_RARE = "Rare";
    static readonly RARITY_EPIC = "Epic";
    static readonly RARITY_LEGENDARY = "Legendary";
}

export type QuestRarity = "Common" | "Rare" | "Epic" | "Legendary";

export interface QuestLibraryEntry extends DatabaseEntry {
    questName: string;
    description: string;
    questRarity: QuestRarity;
    reward: number;
    punishment: number;
}

export interface ActiveQuest extends QuestLibraryEntry {
    lib_id: string;
    isTaken: boolean;
    isCompleted: boolean;
    dateCreated: Timestamp;
    takenDate?: Timestamp;
    takenBy?: string;
    completedDate?: Timestamp;
}

export interface QuestArchiveEntry extends ActiveQuest {
    isVerified: boolean;
    isDenied: boolean;
    isFailed: boolean;
    verifiedBy?: string;
    verifiedDate?: Timestamp;
}

export const questsDb = new Database<ActiveQuest>(db, QuestsConst.ACTIVE_QUESTS_COLLECTION);
export const questLibraryDb = new Database<QuestLibraryEntry>(db, QuestsConst.QUEST_LIBRARY_COLLECTION);
export const questArchiveDb = new Database<QuestArchiveEntry>(db, QuestsConst.QUEST_ARCHIVE_COLLECTION);
