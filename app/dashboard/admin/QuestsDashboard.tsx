"use client";
import { useUser } from "@/app/components/userContext";
import NewQuestForLibraryMenu from "./NewQuestForLibraryMenu";
import { nukeQuests } from "./questActions";

export default function QuestsDashboard() {
    const { user, isAdmin } = useUser();

    if (typeof user === "undefined" || !isAdmin) return <></>

    const _nukeQuests = async (type: "active" | "library" | "archive") => {
        if (!confirm(`Are you sure you want to nuke all ${type} quests?`)) return;
        const res = await nukeQuests(type);
        if (res) return alert("Nuked successfully");
        alert("Something went wrong");
    }

    return <>
        <div>
            <NewQuestForLibraryMenu />
            <button className="nuke-button" onClick={() => _nukeQuests("active")}>Nuke Active Quests</button>
            <button className="nuke-button" onClick={() => _nukeQuests("library")}>Nuke Library Quests</button>
            <button className="nuke-button" onClick={() => _nukeQuests("archive")}>Nuke Archive Quests</button>
        </div>
    </>
}