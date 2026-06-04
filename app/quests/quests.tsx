"use client"; // TODO
import { useUser } from "../tools/userContext";
import { useEffect, useState } from "react";
import { type ActiveQuest, questsDb, QuestsConst, type QuestLibraryEntry } from "../tools/database/questsdb";
import { refillActiveQuests } from "./questsManager";
import { Timestamp } from "firebase/firestore";

interface _leanActiveQuest extends Omit<ActiveQuest, "dateCreated" | "takenDate"> {
    dateCreated: number;
    takenDate?: number;
}

export default function Quests({quests, questLibrary}: {quests: _leanActiveQuest[], questLibrary: QuestLibraryEntry[]}) {
    const { user } = useUser();

    const [questIds, setQuestIds] = useState<Set<string>>(new Set<string>(quests.map((quest) => quest.lib_id)));

    const _refillActiveQuests = async () => {
        await refillActiveQuests(quests.map((quest) => {
            return {
                ...quest,
                dateCreated: Timestamp.fromMillis(quest.dateCreated),
                takenDate: quest.takenDate ? Timestamp.fromMillis(quest.takenDate) : undefined,
            } as ActiveQuest;
        }), questLibrary, questIds);

    };

    useEffect(() => {
        if (quests.length < QuestsConst.MIN_QUESTS_ACTIVE) {
            if (questLibrary.length === 0) return;

            const hasQuestsToRefill = questLibrary.some(q => !questIds.has(q.id!));
            if (hasQuestsToRefill) _refillActiveQuests();
        }
    }, [quests, questLibrary, questIds]);

    console.log(quests);

    return (    
        <div className="quests-container" style={{ display: (user == null) ? "none" : "grid" }}>
            {quests.map((_quest) => (
                <div key={_quest.id} className="quest">
                    <h2>{_quest.questName}</h2>
                    <p>{_quest.description}</p>
                    <button>Start Quest</button>
                </div>
            ))}
        </div>
    );
}
