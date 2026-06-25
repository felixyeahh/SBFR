import { useUser } from "@/app/components/userContext";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";

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
    const { players } = useOnlinePokerSession();
    const {user} = useUser()
    function nextPlayer () {
        /*
        let newIndex = currentPlayerIndex + 1;
        if (newIndex >= players.length ) {
            if (!wasRaised) {
                setPhase(prevPhase => prevPhase+1);
                setCurrentBet(0);
            } else {
                setWasRaised(false);
            }
            
            return setCurrentPlayerIndex(0);
        }
        while(players[newIndex].folded) {
            newIndex++;
        }
        return setCurrentPlayerIndex(newIndex);*/
    }

    function fold () {

    }

    function check () {
        
    }

    function bet () {
        
    }

    function raise () {
        
    }

    return (
        <>
            <button className="button fold" onClick={fold}>Fold</button>
            <button className="button check" onClick={check}>Check</button>
            <button className="button bet" onClick={bet}>Bet</button>
            <button className="button raise" onClick={raise}>Raise</button>
            <p className="hand">Your Hand: {players.find(p => p.user_id === user?.id)?.cards.map((card, i) => (<p key={i}>{card.rank} {card.suit}</p>))}</p>
        </>
    )
}