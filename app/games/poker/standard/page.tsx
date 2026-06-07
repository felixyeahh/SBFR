"use client";
import {  Players } from "./standardPoker";
import { useStandardPoker, GamePhase } from "./standardPokerContext";

export default function PokerStandardPage() {
    const { isStarted, setIsStarted, pot, ante, setAnte, phase } = useStandardPoker();

    let _phase = "";
    switch (phase) {
        case GamePhase.PREFLOP:
            _phase = "Preflop";
            break;
        case GamePhase.FLOP:
            _phase = "Flop";
            break;
        case GamePhase.TURN:
            _phase = "Turn";
            break;
        case GamePhase.RIVER:
            _phase = "River";
            break;
        case GamePhase.SHOWDOWN:
            _phase = "Showdown";
            break;
    }

    return <>
        <div className="table-info">
            <p className="ante text-glow">Ante: $<input className="ante text-glow" value={ante} onChange={e => setAnte(Number(e.target.value))} /></p>
            <p className="pot text-glow">Pot: ${pot}</p>
            <p className="phase text-glow">{_phase}</p>
        </div>

        <div className="players-container">
            <Players />
        </div>

        {isStarted ? null : <button className="button" onClick={() => setIsStarted(true)}>Start Game</button>}
    </>
}