import { MiniLeaderboard } from "./MiniLeaderboard";
import { NewWagerCreationGrid } from "./NewWagerGrid";
import { userdb } from "../tools/database/userdb";
import DefaultHeader from "../components/DefaultHeader";
import { Navigation } from "./Navigation";

export default async function MainPage() {
    const users = await userdb.getAll();

    return (
        <div className="page">
            <DefaultHeader />

            <div className="main-grid" style={{ display: "grid" }}>

                <MiniLeaderboard users={users} maxLength={5} />
                <NewWagerCreationGrid users={users.map((user) => [user.id, user.points])}/>

                <Navigation />
            </div>

        </div>
    );
}
