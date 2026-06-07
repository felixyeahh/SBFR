import { MiniLeaderboard } from "../MiniLeaderboard";
import { userdb } from "../../tools/database/userdb";

export default async function FullLeaderboard() {
    const users = await userdb.getAll();
    return <MiniLeaderboard users={users} maxLength={users.length} />
}
    