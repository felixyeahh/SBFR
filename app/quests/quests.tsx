"use client";
import { useUser } from "../components/userContext";
import { useEffect, useRef, useState } from "react";
import { type ActiveQuest, QuestsConst, type QuestLibraryEntry } from "../tools/database/questsdb";
import { refillActiveQuests } from "./questsManager";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface _leanActiveQuest extends Omit<ActiveQuest, "dateCreated" | "takenDate"> {
    dateCreated: number;
    takenDate?: number;
}

export default function Quests({quests, questLibrary}: {quests: _leanActiveQuest[], questLibrary: QuestLibraryEntry[]}) {
    const { user } = useUser();
    const router = useRouter();

    const [questIds] = useState<Set<string>>(new Set<string>(quests.map((quest) => quest.lib_id)));
    const isRefilling = useRef(false);

    const _refillActiveQuests = async () => {
        if (isRefilling.current) return;
        isRefilling.current = true;

        try {
            await refillActiveQuests(quests.map((quest) => {
                return {
                    ...quest,
                    dateCreated: Timestamp.fromMillis(quest.dateCreated),
                    takenDate: quest.takenDate ? Timestamp.fromMillis(quest.takenDate) : undefined,
                } as ActiveQuest;
            }), questLibrary, questIds);

            router.refresh();
        } finally {
            isRefilling.current = false;
        }
    };

    useEffect(() => {
        if (quests.length < QuestsConst.MIN_QUESTS_ACTIVE) {
            if (questLibrary.length === 0) return;

            const hasQuestsToRefill = questLibrary.some(q => !questIds.has(q.id!));
            if (hasQuestsToRefill) _refillActiveQuests();
        }
    }, [questIds]);

    return (    
        <div className="quests-container" style={{ display: (user == null) ? "none" : "flex" }}>
            {quests.map((_quest) => (
                <div key={_quest.id} className="quest">
                    <h2 className={`${_quest.questRarity}`}>{_quest.questName}</h2>
                    <br></br>
                    <p>{_quest.description}</p>
                    <p>Rarity: {_quest.questRarity}</p>
                    <p>Reward: ${_quest.reward}</p>
                    <p>Punishment: ${_quest.punishment}</p>
                    <br></br>
                    <button className="button" onClick={()=>{}} style={{display: _quest.takenBy == null ? "block" : "none"}}>Start Quest</button>
                    <button className="button" onClick={()=>{}} style={{display: _quest.takenBy == null || _quest.completedBy != null ? "none" : "block"}}>Verify Quest</button>
                </div>
            ))}
        </div>
    );
}
