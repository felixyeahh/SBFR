import Link from "next/link";
import { MiniLeaderboard } from "./MiniLeaderboard";
import { NewWagerCreationGrid } from "./NewWagerGrid";
import { userdb } from "../tools/database/userdb";
import DefaultHeader from "../tools/DefaultHeader";

export default async function MainPage() {
    const users = await userdb.getAll();

    return (
        <div className="page">
            <DefaultHeader />

            <div className="main-grid" style={{ display: "grid" }}>

                <MiniLeaderboard users={users} maxLength={5} />
                <NewWagerCreationGrid users={users.map((user, index) => [user.id, user.points])}/>

                <Link href="/wagers" className="button wagers">&gt; Wagers</Link>
                <Link href="/quests" className="button quests">&gt; Quests</Link>
            </div>

        </div>
    );
}
