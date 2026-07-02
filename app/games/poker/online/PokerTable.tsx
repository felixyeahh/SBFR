"use client";
import { pokerPhaseToString } from "@/app/tools/utils";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";
import { Card, PokerConst, PokerPhase, pokerDb } from "@/app/tools/database/poker";
import { Players } from "./Players";
import { useUser } from "@/app/components/userContext";
import { dealCards } from "./sessionManagers";
import { motion } from "motion/react";
import { useEffect } from "react";

function StartGame({sessionId}: {sessionId: string}) {
    const {user} = useUser();
    if (user === null) return <></>;
    const startGame = async () => {
        await pokerDb.updateField(sessionId, PokerConst.IS_STARTED, true);
        await dealCards(sessionId);
    }
    return <button className="button" onClick={startGame}>Start Game</button>
}

function CommunityCards({phase, community}: {phase: PokerPhase, community: Card[]}) {
    let numCardsToShow: number;

    switch (phase) {
        case PokerPhase.PREFLOP:
            numCardsToShow = 0;
            break;
        case PokerPhase.FLOP:
            numCardsToShow = 3;
            break;
        case PokerPhase.TURN:
            numCardsToShow = 4;
            break;
        case PokerPhase.RIVER:
            numCardsToShow = 5;
            break;
        default:
            return <></>;
    }

    return community.slice(0, numCardsToShow).map((card, i) => (<p key={i}>{card.rank} {card.suit}</p>))
}

function Showdown() {
    const {sessionId} = useOnlinePokerSession();

    useEffect(() => {
        setTimeout(async () => {
            if (!sessionId) return;
            await pokerDb.updateField(sessionId, PokerConst.PHASE, PokerPhase.PREFLOP);
            await pokerDb.updateField(sessionId, PokerConst.IS_STARTED, false);
        }, 4000);
    }, []);

    return <motion.div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }} animate={{
        rotate: 360,
        transition: {
            duration: 3,
        }
    }}>
        <p>Winner: somebody</p>
        <p>A straight flush of the toilet on the street</p>
        <p>4 princes of nigerian suit</p>
        <p>Money won: $-3</p>
    </motion.div>
}

export default function PokerTable() {
    const { sessionId, community, phase, pot, ante, isStarted, isOwner} = useOnlinePokerSession();
    
    if (!sessionId) return <></>;
    if (phase === PokerPhase.SHOWDOWN) return <Showdown />

    return <div className="poker-table">
        <div className="control-panel">{!isStarted && isOwner ? <StartGame sessionId={sessionId} /> : ""}</div>
        <div className="table-info">
            <p className="ante text-glow">Ante: $<input className="ante text-glow" value={ante} onChange={() => {}} /></p>
            <p className="pot text-glow">Pot: ${pot}</p>
            <p className="phase text-glow">{pokerPhaseToString(phase)}</p>
        </div>
        <div className="community">
            <CommunityCards phase={phase} community={community} />
        </div>
        <Players/>
    </div>
}