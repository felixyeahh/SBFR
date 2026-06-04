import { userdb } from "../tools/database/userdb";
import { Wager, wagerdb, Wagers } from "../tools/database/wagerdb";
import { Users } from "../tools/constants";
import { Timestamp } from "firebase/firestore";

export async function rewardWagerWinner(winner: string, bet: number, wager_id: string) {
    const user = await userdb.read(winner);
    try {
        await userdb.updateField(winner, Users.POINTS, user.points + bet);
        await userdb.updateField(winner, Users.WINS, user.wins + 1);

        await wagerdb.updateField(wager_id, Wagers.WINNER, winner);
        await wagerdb.updateField(wager_id, Wagers.FINISHED, true);
        await wagerdb.updateField(wager_id, Wagers.DATE_FINISHED, Timestamp.now());
    } catch (error) {
        throw new Error(error as string);
    }
    return true;
}

export async function cancelWager(wager: Wager, isAdmin: boolean) {
    if (!isAdmin) return alert("You are not authorized to cancel this wager.");

    for (const player of wager.players) {
        const _player = await userdb.read(player);
        if (_player == null) continue;
        await userdb.updateField(player, Users.POINTS, _player.points + (wager.bet / wager.players.length));
    }
    await wagerdb.delete(wager.id as string);
}
