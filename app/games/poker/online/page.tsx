import JoinPokerSessionMenu from "./JoinPokerSessionMenu";
import PokerTable from "./PokerTable";
import { pokerDb } from "@/app/tools/database/poker";

export default async function OnlinePokerPage() {
    const sessions = await pokerDb.getAll();

    return <>
        <JoinPokerSessionMenu sessions={sessions}/>
        <PokerTable />
    </>
}