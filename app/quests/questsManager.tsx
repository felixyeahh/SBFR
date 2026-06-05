import { Timestamp } from "firebase/firestore";
import { type ActiveQuest, questsDb, questArchiveDb, QuestsConst, type QuestLibraryEntry, type QuestArchiveEntry } from "../tools/database/questsdb";
import { randomUUID } from "../tools/utils";

export async function refillActiveQuests(quests: ActiveQuest[], questLibrary: QuestLibraryEntry[], questIds: Set<string>) {
    const updatedQuests = [...quests];
    const updatedQuestIds = new Set(questIds);

    for (let i = 0; i < questLibrary.length; i++) {
        if (updatedQuests.length >= QuestsConst.MIN_QUESTS_ACTIVE) {
            break;
        }

        const quest = questLibrary[i];

        if (!quest.id || updatedQuestIds.has(quest.id)) {
            continue;
        }
        console.log("refilling quest:", quest.questName);

        const newQuest: ActiveQuest = {
            id: randomUUID(),
            lib_id: quest.id!,
            questName: quest.questName,
            description: quest.description,
            reward: quest.reward,
            punishment: quest.punishment,
            questRarity: quest.questRarity,
            isTaken: false,
            isCompleted: false,
            dateCreated: Timestamp.now(),
        };

        await questsDb.set(newQuest);
        updatedQuests.push(newQuest);
        updatedQuestIds.add(newQuest.lib_id);
    }
    return;
}

export async function setQuestTaken(questId: string, username: string) {
    const quest = await questsDb.read(questId);
    if (quest) {
        quest.isTaken = true;
        quest.takenBy = username;
        quest.takenDate = Timestamp.now();
        await questsDb.set(quest);
        return true;
    }
    return false;
}

export async function setQuestCompleted(questId: string, username: string) {
    const quest = await questsDb.read(questId);
    if (quest && typeof quest.takenBy != "undefined" && !quest.isCompleted) {
        quest.isCompleted = true;
        quest.completedDate = Timestamp.now();
        await questsDb.set(quest);
        return true;
    }
    return false;
}

export async function verifyQuest(questId: string, verifyingUserId: string) {
    const quest = await questsDb.read(questId);

    if (quest == null) return false;

    if (quest.takenBy == verifyingUserId) {
        alert("You can't verify your own quest :D");
        return false;
    }

    const archivedQuest: QuestArchiveEntry = {
        ...quest,
        isVerified: true,
        isDenied: false,
        isFailed: false,
        verifiedDate: Timestamp.now(),
        verifiedBy: verifyingUserId,
    }

    await questArchiveDb.set(archivedQuest);
    await questsDb.delete(questId);
    return true;
}