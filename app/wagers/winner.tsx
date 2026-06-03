import { userdb } from "~/tools/database/userdb";
import { wagerdb, Wagers } from "~/tools/database/wagerdb";
import { Users } from "~/tools/userContext";

export async function WinnerReward(winner: string, bet: number, wager_id: string) {
    const user = await userdb.read(winner);
    try {
        await userdb.updateField(winner, Users.POINTS, user.points + bet);
        await userdb.updateField(winner, Users.WINS, user.wins + 1);

        await wagerdb.updateField(wager_id, Wagers.WINNER, winner);
        await wagerdb.updateField(wager_id, Wagers.FINISHED, true);
        await wagerdb.updateField(wager_id, Wagers.DATE_FINISHED, new Date());
    } catch (error) {
        throw new Error(error as string);
    }
    return true;
}
