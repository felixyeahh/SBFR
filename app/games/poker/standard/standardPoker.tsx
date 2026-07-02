"use client";
import { useEffect } from "react";
import { useStandardPoker, type Player } from "./standardPokerContext";

export function Players () {
    const { players, currentPlayerIndex, isStarted, updatePlayer } = useStandardPoker();

    return <>
        <SetupPoker />

        {[...Array(players.length)].map((_, i) => {
            return (
                <div key={i} className={`player ${players[i].folded ? "folded" : ""}`}>
                    <div className="player-name">
                        <input className={isStarted ? "" : "text-flicker"} placeholder={`Player ${i + 1}`} onChange={e => {
                            updatePlayer("name", e.target.value);
                        }} />
                    </div>
                    <p className="player-chips">${players[i]?.chips}</p>
                    {isStarted && currentPlayerIndex === i ? <ActionForActivePlayer />: null}
            </div>
        )})}
    </>
}

export function ActionForActivePlayer () {
    const { 
        players, 
        currentPlayerIndex, 
        setCurrentPlayerIndex, 
        currentBet, 
        setCurrentBet, 
        updatePlayer,
        wasRaised,
        setWasRaised,
        setPhase,
    } = useStandardPoker();

    function nextPlayer () {
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
        return setCurrentPlayerIndex(newIndex);
    }
    return (
        <>
            <button className="button fold" onClick={()=> {updatePlayer("folded", true); nextPlayer();}} disabled={players[currentPlayerIndex].folded}>Fold</button>
            <button className="button check" onClick={()=> {nextPlayer();}} disabled={players[currentPlayerIndex].folded}>{currentBet == 0 ? "Check" : "Call"}</button>
            <button className="button bet" onClick={()=>{setCurrentBet(1); nextPlayer();}} disabled={players[currentPlayerIndex].folded || currentBet > 0}>Bet</button>
            <button className="button raise" onClick={()=>{}} disabled={players[currentPlayerIndex].folded || currentBet === 0}>Raise</button>
        </>
    )
}

export function SetupPoker () {
    const defaultChipNumber = 1000;
    const { setAnte, setPlayers } = useStandardPoker();
    let playerCount: number = 0;

    const promptedPlayerCount = () => {
        const _playerCount = 4//Number(prompt("How many players?"));
        if (isNaN(_playerCount) || _playerCount < 2 || _playerCount > 10) {
            alert("Please enter a valid number of players.");
            promptedPlayerCount();
            return;
        }
        playerCount = _playerCount;
    }

    const promptedAnte = () => {
        const ante = 10 //Number(prompt("What is the ante?"));
        if (isNaN(ante) || ante < 0 || ante > 1000) {
            alert("Please enter a valid ante.");
            promptedAnte();
            return;
        }
        setAnte(ante);
    }

    useEffect(() => {
        promptedPlayerCount();
        promptedAnte();
    }, []);

    useEffect(() => {
        const _players: Player[] = [];
        for (let i = 0; i < playerCount; i++) {
            _players.push({ id: i.toString(), name: `Player ${i + 1}`, chips: defaultChipNumber, folded: false });
        }
        setPlayers(_players);
    }, [playerCount]);

    return <></>
}