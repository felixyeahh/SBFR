import { useUser } from "~/components/userContext";
import  {} from "~/components/firebase";
import { useEffect, useState } from "react";
import type { ActiveQuest } from "~/components/constants";

export function Quests() {
    const { user, balance, loading } = useUser();
    const [quests, setQuests] = useState<ActiveQuest[]>([]);

    useEffect(() => {
        const getQuests = async () => {
            // setQuests(await readQuest());
        }
        getQuests();
    }, []);

    return (
        <div className="page">
            <div className="header-main">
                <button className="button back" onClick={() => { window.location.href = "/" }}>&lt;</button>
                <h1 className="title">Quests For ℛετα𝔯δˢ</h1>
                <button className="button login" style={{ display: (user == null) ? "block" : "none" }} onClick={() => { window.location.href = "/login" }}>&gt; Login &lt;</button>
                <p className="balance" style={{ display: (user == null) ? "none" : "block" }}>Balance: ${loading ? '...' : balance}</p>
            </div>
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
