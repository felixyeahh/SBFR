import { updateField, readUser, updateWager } from "~/components/firebase";
import { Wagers } from "~/components/constants";
import { Users } from "~/components/userContext";

export async function WinnerReward(winner: string, bet: number, wager_id: string) {
    const user = await readUser(winner);
    try {
        await updateField(winner, Users.POINTS, user.points + bet);
        await updateField(winner, Users.WINS, user.wins + 1);

        await updateWager(wager_id, Wagers.WINNER, winner);
        await updateWager(wager_id, Wagers.FINISHED, true);
        await updateWager(wager_id, Wagers.DATE_FINISHED, new Date());
    } catch (error) {
        throw new Error(error as string);
    }
    return true;
}
