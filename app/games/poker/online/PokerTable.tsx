"use client";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";
import type { PokerSession, Player } from "@/app/tools/database/poker";

export default function PokerTable() {
    const { sessionId, players} = useOnlinePokerSession();
    
    if (!sessionId) return <></>;

    return <div className="poker-table">
        <div className="community">

        </div>
        <div className="players">
            {players.map((player) => (
                <div key={player.id} className="player">
                    <div className="player-name">{player.user_id}</div>
                    <div className="player-chips">{player.chips}</div>
                </div>
            ))}
        </div>
    </div>
}