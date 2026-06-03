import { useUser } from "~/tools/userContext";
import { useEffect, useState } from "react";
import DefaultHeader from "~/tools/DefaultHeader";
import { type ActiveQuest, questsDb, QuestsConst, questLibraryDb, type QuestLibraryEntry } from "~/tools/database/questsdb";

function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function Quests() {
    const { user, balance, loading } = useUser();
    const [quests, setQuests] = useState<ActiveQuest[]>([]);
    const [ questLibrary, setQuestLibrary ] = useState<QuestLibraryEntry[]>([]);

    const [questIds, setQuestIds] = useState<Set<string>>(new Set<string>());

    const getQuests = async () => {
        const retrievedQuests = await questsDb.getAll();
        if (retrievedQuests) {
            setQuests(retrievedQuests);
            setQuestIds(new Set<string>(retrievedQuests.map((quest) => quest.lib_id)));
        }
    }

    const getQuestLibrary = async () => {
        const retrievedQuestLibrary = await questLibraryDb.getAll();
        if (retrievedQuestLibrary) {
            setQuestLibrary(shuffle(retrievedQuestLibrary));
        }
    }

    const refillActiveQuests = async () => {
        const updatedQuests = [...quests];
        const updatedQuestIds = new Set(questIds);
        let hasChanges = false;

        for (let i = 0; i < questLibrary.length; i++) {
            if (updatedQuests.length >= QuestsConst.MIN_QUESTS_ACTIVE) {
                break;
            }

            const quest = questLibrary[i];
            if (updatedQuestIds.has(quest.id!)) {
                continue;
            }

            console.log("refilling quest:", quest.questName); 

            const newQuest: ActiveQuest = {
                id: String(globalThis.crypto.randomUUID()),
                lib_id: quest.id!,
                questName: quest.questName,
                description: quest.description,
                reward: quest.reward,
                questRarity: quest.questRarity,
                isTaken: false,
                isCompleted: false,
                dateCreated: new Date(),
            };

            await questsDb.set(newQuest);
            updatedQuests.push(newQuest);
            updatedQuestIds.add(quest.id!);
            hasChanges = true;
        }

        if (hasChanges) {
            setQuests(updatedQuests);
            setQuestIds(updatedQuestIds);
        }
    };

    useEffect(() => {
        getQuests();
    }, []);
    
    useEffect(() => {
        if (quests.length < QuestsConst.MIN_QUESTS_ACTIVE) {
            if (questLibrary.length === 0) {
                getQuestLibrary();
            } else {
                const hasQuestsToRefill = questLibrary.some(q => !questIds.has(q.id!));
                if (hasQuestsToRefill) {
                    refillActiveQuests();
                }
            }
        }
    }, [quests, questLibrary, questIds]);

    console.log(quests);

    return (
        <div className="page">
            <DefaultHeader title="Quests For ℛετα𝔯δˢ" backbutton/>
    
            <div className="quests-container" style={{ display: (user == null) ? "none" : "grid" }}>
                {quests.map((_quest) => (
                    <div key={_quest.id} className="quest">
                        <h2>{_quest.questName}</h2>
                        <p>{_quest.description}</p>
                        <button>Start Quest</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
