import { type QuestLibraryEntry, questLibraryDb, questsDb } from "@/app/tools/database/questsdb";

export async function createNewLibraryQuest(quest: QuestLibraryEntry){
    await questLibraryDb.add(quest);
    alert("The quest has been created");
}

export async function nukeQuests(type: "active" | "library") {
    let _db;

    if (type === "active") _db = questsDb;
    else _db = questLibraryDb;

    try {
        const quests = await _db.getAll();
        quests.forEach(async (quest) => {
            if (quest.id == null) return;
            await _db.delete(quest.id);
        });
        return true;
    } catch (error) {
        console.error(`Error nuking ${type} quests:`, error);
        return false;
    }
}
