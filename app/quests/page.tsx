import { questsDb, type ActiveQuest, questLibraryDb, type QuestLibraryEntry } from "../tools/database/questsdb";
import Quests from "./quests";
import { shuffle } from "../tools/utils";

export default async function QuestsPage() {
    const retrievedQuests = await questsDb.getAll();
    const questLibrary = shuffle(await questLibraryDb.getAll());

    return (
        <div className="page" style={{display: "flex", alignItems: "center"}}>
            <Quests quests={retrievedQuests.map((quest) => {
                return {
                    ...quest,
                    dateCreated: quest.dateCreated.toMillis(),
                    takenDate: quest.takenDate ? quest.takenDate.toMillis() : undefined,
                }
            })} questLibrary={questLibrary}/>
        </div>
    )
}