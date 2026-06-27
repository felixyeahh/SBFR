import { pokerDb } from "@/app/tools/database/poker";
import { PokerSession, Player } from "@/app/tools/database/poker";

export default async function updatePlayer(session_id: string, player_index: number, newPlayer: Player) {
    const session = await pokerDb.read(session_id);
    if (!session) return false;
    session.players[player_index] = newPlayer;
    try {
        await pokerDb.set(session);
    } catch {
        return false;
    }
    return true;
}
