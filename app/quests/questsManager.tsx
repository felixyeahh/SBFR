import { Timestamp } from "firebase/firestore";
import { type ActiveQuest, questsDb, QuestsConst, type QuestLibraryEntry } from "../tools/database/questsdb";
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
