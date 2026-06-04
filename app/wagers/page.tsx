import { WagersGrid } from "./wagers";
import { wagerdb, type Wager } from "../tools/database/wagerdb";

export default async function WagersPage() {
    const wagers = await wagerdb.getAll();

    return (
        <WagersGrid wagers={wagers.map(wager => {
            return {
                ...wager,
                date_created: wager.date_created.toMillis(),
                date_finished: wager.date_finished ? wager.date_finished.toMillis() : undefined,
            }
        })} />
    )
}
