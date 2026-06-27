import { useUser } from "@/app/components/userContext";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";
import { pokerDb } from "@/app/tools/database/poker";
import updatePlayer from "./updatePlayer";
import PlayerActions from "./PlayerActions";

export function Players () {
    const {user} = useUser();
    const { players, loading } = useOnlinePokerSession();

    return <>
        {[...Array(players.length)].map((_, i) => {
            return (
                <div key={i} className={`player ${players[i].folded ? "folded" : ""}`}>
                    <div className="player-name">
                        <p> {players[i].user_id}</p>
                    </div>
                    <p className="player-chips">${players[i]?.chips}</p>
                    {players[i].user_id === user?.id ? <Actions /> : null}
            </div>
        )})}
    </>
}

export function Actions () {
    const { players, session } = useOnlinePokerSession();
    const {user} = useUser()

    if (!session || !user) return;

    const actions = new PlayerActions(session, user, pokerDb);

    let isActive = session.activePlayerIndex === players.findIndex(p => p.user_id === user?.id);

    if (!session.isStarted) isActive = false;

    if (!session.isStarted) {
        return (
            <p className="hand">Your Hand: {players.find(p => p.user_id === user?.id)?.cards.map((card, i) => (<div key={i}>{card.rank} {card.suit}</div>))}</p>
        )
    }

    return (
        <>
            {isActive ? (
                <>
                    <button className="button fold" onClick={actions.fold} >Fold</button>
                    <button className="button check" onClick={actions.check} style={{ display: session.currentBet > 0 ? "none" : "block"}}>Check</button>
                    <button className="button call" onClick={actions.call} style={{ display: session.currentBet > 0 ? "block" : "none"}}>?{session.currentBet}</button>
                    <button className="button bet" onClick={actions.bet}>Bet</button>
                    <button className="button raise" onClick={actions.raise}>Raise</button>
                </>
            ) : (
                null
            )}
            <p className="hand">Your Hand: {players.find(p => p.user_id === user?.id)?.cards.map((card, i) => (<div key={i}>{card.rank} {card.suit}</div>))}</p>
        </>
    )
}