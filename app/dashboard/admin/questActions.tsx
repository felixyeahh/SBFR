import { type QuestLibraryEntry, questLibraryDb, questsDb, questArchiveDb } from "@/app/tools/database/questsdb";

export async function createNewLibraryQuest(quest: QuestLibraryEntry){
    await questLibraryDb.add(quest);
    alert("The quest has been created");
}

export async function nukeQuests(type: "active" | "library" | "archive") {
    let _db;
    switch (type) {
        case "active":
            _db = questsDb;
            break;
        case "library":
            _db = questLibraryDb;
            break;
        case "archive":
            _db = questArchiveDb;
            break;
        default:
            return false;
    }

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
