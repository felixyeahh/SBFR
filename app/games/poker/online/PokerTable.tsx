"use client";
import { pokerPhaseToString } from "@/app/tools/utils";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";
import type { PokerSession, Player } from "@/app/tools/database/poker";
import { Players } from "./Players";
import { dealCards } from "./createNewSession";
import { useUser } from "@/app/components/userContext";

function StartGame({sessionId}: {sessionId: string}) {
    const {user} = useUser();
    if (user === null) return <></>;
    return <button className="button" onClick={()=>{dealCards(sessionId, user)}}>Start Game</button>
}

export default function PokerTable() {
    const { sessionId, players, community, phase, pot, ante, isOngoing, isOwner} = useOnlinePokerSession();
    
    if (!sessionId) return <></>;

    return <div className="poker-table">
        <div className="control-panel">{!isOngoing && isOwner ? <StartGame sessionId={sessionId} /> : ""}</div>
        <div className="table-info">
            <p className="ante text-glow">Ante: $<input className="ante text-glow" value={ante} onChange={() => {}} /></p>
            <p className="pot text-glow">Pot: ${pot}</p>
            <p className="phase text-glow">{pokerPhaseToString(phase)}</p>
        </div>
        <div className="community">
            {community.map((card, i) => (
                <p key={i}>{card.rank} {card.suit}</p>
            ))}
        </div>
        <Players/>
    </div>
}