import { Timestamp } from "firebase/firestore";
import { type ActiveQuest, questsDb, questArchiveDb, QuestsConst, type QuestLibraryEntry, type QuestArchiveEntry } from "../tools/database/questsdb";
import { randomUUID, shuffle } from "../tools/utils";

async function _makeNewQuest(quest: QuestLibraryEntry) {
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

    return newQuest;
}

async function _refillSomeQuests(activeQuests: ActiveQuest[], availableToRefill: QuestLibraryEntry[], minActive: number) {
    const activeQuestIds = new Set(activeQuests.map(quest => quest.lib_id));
    const newQuests: ActiveQuest[] = [];

    for (let i = 0; i < availableToRefill.length; i++) {
        if (activeQuests.length >= minActive) {
            break;
        }

        const quest = availableToRefill[i];

        if (!quest.id || activeQuestIds.has(quest.id)) {
            continue;
        }
        
        const newQuestRes = await _makeNewQuest(quest);
        activeQuests.push(newQuestRes);
        activeQuestIds.add(newQuestRes.lib_id);
        newQuests.push(newQuestRes);
    }

    return { quests: activeQuests, questIds: activeQuestIds, newQuests: newQuests };
}

function _pickRarity() {
    const random = Math.random();
    if (random < 0.1) return QuestsConst.RARITY_LEGENDARY;
    else return QuestsConst.RARITY_EPIC;
}

export async function refillActiveQuests(quests: ActiveQuest[], questLibrary: QuestLibraryEntry[], questIds: Set<string>) {
    const commonQuests = quests.filter(quest => quest.questRarity == QuestsConst.RARITY_COMMON);
    const commonQuestsAvailable = questLibrary.filter(quest => quest.questRarity == QuestsConst.RARITY_COMMON);

    let activeQuests = [...quests];
    let activeQuestIds = new Set(questIds);

    if (commonQuests.length < QuestsConst.MIN_QUESTS_ACTIVE - QuestsConst.MAX_RARE_QUESTS && commonQuestsAvailable.length > commonQuests.length) {
        const res = await _refillSomeQuests(activeQuests, commonQuestsAvailable, QuestsConst.MIN_QUESTS_ACTIVE-1);
        activeQuests = res.quests;
        activeQuestIds = res.questIds;
        commonQuests.push(...res.newQuests);
    }

    if (activeQuests.length >= QuestsConst.MIN_QUESTS_ACTIVE || activeQuests.length - commonQuests.length > QuestsConst.MAX_RARE_QUESTS) return;

    const randomRarity = _pickRarity();
    let rareQuestsAvailable;

    switch (randomRarity) {
        case QuestsConst.RARITY_EPIC: 
            rareQuestsAvailable = questLibrary.filter(quest => quest.questRarity == QuestsConst.RARITY_EPIC && !questIds.has(quest.id!));
            break;
        case QuestsConst.RARITY_LEGENDARY: 
            rareQuestsAvailable = questLibrary.filter(quest => quest.questRarity == QuestsConst.RARITY_LEGENDARY && !questIds.has(quest.id!));
            break;
    }
    
    const randomRareQuest = shuffle(rareQuestsAvailable)[0];

    if (randomRareQuest) {
        const newQuestRes = await _makeNewQuest(randomRareQuest);
        activeQuests.push(newQuestRes);
        activeQuestIds.add(newQuestRes.lib_id);
    }

    return { quests: activeQuests, questIds: activeQuestIds };
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