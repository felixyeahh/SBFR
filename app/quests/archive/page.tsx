import { questArchiveDb } from "@/app/tools/database/questsdb";

export default async function QuestsArchivePage() {
    const quests = await questArchiveDb.getAll();
    return (
        <div className="quests-archive-container">
            {quests.sort((a, b) => b.dateCreated.toMillis() - a.dateCreated.toMillis()).map((quest) => {
                return (
                    <div key={quest.id} className="quest">
                        <h1 className={quest.questRarity}>{quest.questName}</h1>
                        <p>{quest.description}</p>
                        <p>Reward: {quest.reward}</p>
                        <p>Punishment: {quest.punishment}</p>
                        <p>Rarity: {quest.questRarity}</p>
                        <p>Created: {quest.dateCreated?.toDate().toLocaleString()}</p>
                        <p>Taken: {quest.takenDate?.toDate().toLocaleString()}</p>
                        <p>Completed: {quest.completedDate?.toDate().toLocaleString()}</p>
                        <p>Verified: {quest.verifiedDate?.toDate().toLocaleString()}</p>
                        <p>Attempted by: {quest.takenBy}</p>
                        <p>Verified By: {quest.verifiedBy}</p>
                    </div>
                )
            })}
        </div>
    )
}