import { useUser } from "~/components/userContext";
import { useEffect, useState } from "react";
import DefaultHeader from "~/components/defaultheader";
import { type ActiveQuest, questsDb, QuestsConst, questLibraryDb, type QuestLibraryEntry } from "~/components/database/questsdb";

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
            setQuestIds(new Set<string>(retrievedQuests.map((quest) => quest.id)));
        }
    }

    const getQuestLibrary = async () => {
        const retrievedQuestLibrary = await questLibraryDb.getAll();
        if (retrievedQuestLibrary) {
            setQuestLibrary(shuffle(retrievedQuestLibrary));
        }
    }

    const refillActiveQuests = async () => {
        for (
            let i = 0;
            (i < QuestsConst.MIN_QUESTS_ACTIVE - quests.length) && (i < (questLibrary.length - quests.length));
            i++
        ) {
            const quest = questLibrary[i];

            if (questIds.has(quest.id)) continue;

            await questsDb.add({
                id: quest.id,
                questName: quest.questName,
                description: quest.description,
                reward: quest.reward,
                questRarity: quest.questRarity,
                isTaken: false,
                isCompleted: false,
                dateCreated: new Date(),
            });

            questIds.add(quest.id);
        }
    }

    const archiveQuests = async () => {
        
    }

    useEffect(() => {
        getQuests();
    }, []);

    if (quests.length < QuestsConst.MIN_QUESTS_ACTIVE) {
        useEffect(() => {
            getQuestLibrary();
        }, []);

        if (questLibrary.length > quests.length) {
            useEffect(() => {
                refillActiveQuests()
            }, []);
        }
    }
        return (
            <div className="page">
                <DefaultHeader user={user} loading={loading} balance={balance} title="Quests For ℛετα𝔯δˢ" backbutton/>
        
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
