"use client";
import { pokerPhaseToString } from "@/app/tools/utils";
import {  Players } from "./standardPoker";
import { useStandardPoker } from "./standardPokerContext";
import { PokerPhase } from "@/app/tools/database/poker";

export default function PokerStandardPage() {
    const { isStarted, setIsStarted, pot, ante, setAnte, phase } = useStandardPoker();


    return <>
        <div className="table-info">
            <p className="ante text-glow">Ante: $<input className="ante text-glow" value={ante} onChange={e => setAnte(Number(e.target.value))} /></p>
            <p className="pot text-glow">Pot: ${pot}</p>
            <p className="phase text-glow">{pokerPhaseToString(phase)}</p>
        </div>

        <div className="players-container">
            <Players />
        </div>

        {isStarted ? null : <button className="button" onClick={() => setIsStarted(true)}>Start Game</button>}
    </>
}