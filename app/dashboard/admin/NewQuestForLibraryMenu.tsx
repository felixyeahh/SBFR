"use client";
import { useState } from "react";
import { createNewLibraryQuest } from "./questActions";
import { QuestLibraryEntry, QuestRarity} from "@/app/tools/database/questsdb";
import { randomUUID } from "@/app/tools/utils";

export default function NewQuestForLibraryMenu() {
    const [questName, setQuestName] = useState("Bring me lettuce");
    const [description, setDescription] = useState("Deliver lettuce to a user.");
    const [reward, setReward] = useState(0);
    const [punishment, setPunishment] = useState(0);
    const [questRarity, setQuestRarity] = useState<QuestRarity>("Common");

    function cleanUp() {
        setQuestName("Bring me lettuce");
        setReward(0);
        setPunishment(0);
        setQuestRarity("Common");
        setDescription("Deliver lettuce to a user.");
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const newQuest: QuestLibraryEntry = {
            id: randomUUID(),
            questName: questName,
            description: description,
            reward: reward,
            questRarity: questRarity,
            punishment: punishment
        }

        console.log(newQuest);

        await createNewLibraryQuest(newQuest);
        cleanUp();
        
    }

    return <div className="NewQuestForLibraryMenu">
        <p className="title-quests">New Library Quest Creation:</p>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <p className="quests-label"> Quest Name: <input type="text" placeholder="Quest Name" value={questName} onChange={(e) => setQuestName(e.target.value)} /></p>
            <p className="quests-label"> Description: <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /></p>
            <p className="quests-label"> Reward: <input type="number" placeholder="Reward" value={reward} onChange={(e) => setReward(Number(e.target.value))} /></p>
            <p className="quests-label"> Punishment: <input type="number" placeholder="Punishment" value={punishment} onChange={(e) => setPunishment(Number(e.target.value))} /></p>
            <div id="rarityDropdown" className="">
                <p> Rarity: <select value={questRarity} onChange={(e) => setQuestRarity(e.target.value as QuestRarity)}>
                    <option value="Common">Common</option>
                    <option value="Epic">Epic</option>
                    <option value="Legendary">Legendary</option>
                </select></p>
            </div>
            <button type="submit" className="button">Create Quest</button>
        </form>
    </div>
}