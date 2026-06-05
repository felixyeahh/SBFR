"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { type Wager } from "../tools/database/wagerdb";
import { rewardWagerWinner, cancelWager } from "./winnerHandling";
import { useUser } from "../components/userContext";
import { Timestamp } from "firebase/firestore";

interface _leanWager extends Omit<Wager, "date_created" | "date_finished"> {
    date_created: number;
    date_finished?: number;
}

export function WagersGrid({wagers}: {wagers: _leanWager[]}) {
    const [winner, setWinner] = useState<string>("");
    const { user, isAdmin } = useUser();
    const router = useRouter();

    const _WinnerReward = async (wager: _leanWager) => {
        if (!winner) return alert("Please select a winner first.");

        await rewardWagerWinner(winner, wager.bet, wager.id as string);
        router.refresh();
    }

    const _CancelWager = async (wager: Wager) => {
        await cancelWager(wager, isAdmin);
        router.refresh();
    }

    let validWagers = wagers.filter(wager => wager.id !== undefined);
    validWagers = validWagers.sort((a, b) => b.date_created - a.date_created);


    return (
        <div className="wager-grid">
            {validWagers.map((wager) => (
                <div key={wager.id} className="wager-card">
                    <div className={"wager-field title " + (wager.finished ? "" : "active")}>
                        <button className="cancel-wager" style={{ display: (wager.finished) ? "none" : "block" }} onClick={() => _CancelWager({...wager, date_created: Timestamp.fromMillis(wager.date_created), date_finished: wager.date_finished ? Timestamp.fromMillis(wager.date_finished) : undefined})}>✗</button><p>"{wager.betName}"</p>
                    </div> 
                    <p className="wager-field bet">Bet: ${wager.bet}</p>
                    <p className="wager-field players">Players: {wager.players.join(", ")}</p>
                    <p className="wager-field">Date Created: {new Date(wager.date_created).toLocaleString()}</p>
                    {wager.finished ? (
                        <p className="wager-field winner">Winner: {wager.winner || "Unknown"}</p>
                    ) : (
                        <>
                            <label className="wager-field" htmlFor={`winner-${wager.id}`}>Winner:
                                <select name="winner" id={`winner-${wager.id}`} onChange={(e) => { setWinner(e.target.value) }}>
                                    <option value="">Select a winner</option>
                                    {wager.players.map((player) => (
                                        <option key={player} value={player}>{player}</option>
                                    ))}
                                </select> </label>
                            <button className="wager-field winner-button" onClick={() => _WinnerReward(wager)} style={{ display: (user == null) ? "none" : "block" }}>✔</button>
                        </>
                    )}
                    <br></br>
                    <br></br>
                </div>
            ))}
        </div>
    )
}