"use client";
import { useUser } from "../components/userContext";
import { useEffect, useRef, useState } from "react";
import { type ActiveQuest, QuestsConst, type QuestLibraryEntry } from "../tools/database/questsdb";
import { refillActiveQuests, setQuestTaken, setQuestCompleted, verifyQuest } from "./questsManager";
import { Timestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface _leanActiveQuest extends Omit<ActiveQuest, "dateCreated" | "takenDate" | "completedDate"> {
    dateCreated: number;
    takenDate?: number;
    completedDate?:number;
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

    const handleQuestTaken = async (questId: string) => {
        if (user == null) return;
        await setQuestTaken(questId, user.id);
        router.refresh();
    };

    const handleQuestCompleted = async (questId: string) => {
        if (user == null) return;
        if (!confirm("Are you sure you compelted this quest?")) return;
        await setQuestCompleted(questId, user.id);
        router.refresh();
    };

    const handleQuestVerify = async (questId: string) => {
        if (user == null) return;
        if (!confirm("Are you sure you verified this quest?")) return;
        await verifyQuest(questId, user.id);
        
        router.refresh();
    };

    useEffect(() => {
        if (quests.length < QuestsConst.MIN_QUESTS_ACTIVE) {
            if (questLibrary.length === 0) return;

            const hasQuestsToRefill = questLibrary.some(q => !questIds.has(q.id!));
            if (hasQuestsToRefill) _refillActiveQuests();
        }
    }, [questIds]);

    if (user == null) return <></>;

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
                    <p style={{display: typeof _quest.takenBy != "undefined" &&typeof _quest.completedDate != "undefined" ? "block" : "none"}}>{ typeof _quest.completedDate != "undefined" ? "Completed by" : "Taken by"}: {_quest.takenBy ?? "none"}</p>
                    <br></br>
                    <button className="button" onClick={()=>handleQuestTaken(_quest.id!)} style={{display: typeof _quest.takenBy == "undefined" ? "block" : "none"}}>Start Quest</button>
                    <button className="button" onClick={()=>handleQuestCompleted(_quest.id!)} style={{display: typeof _quest.takenBy == "undefined" ||typeof _quest.completedDate != "undefined" ? "none" : "block"}}>Complete Quest</button>
                    <button className="button" onClick={()=>{handleQuestVerify(_quest.id!)}} style={{display: typeof _quest.isCompleted != "undefined" && _quest.isCompleted ? "block" : "none"}}>Verify Quest</button>
                </div>
            ))}
        </div>
    );
}
