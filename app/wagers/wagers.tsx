import { getAllWagers } from "~/components/firebase";
import { useEffect, useState } from "react";
import type { Wager } from "~/components/constants";
import { WinnerReward } from "./winner";

function _DateConverter(date: any) {
    const newDate = new Date((date as any).seconds * 1000);
    const month = String(newDate.getMonth());
    const day = String(newDate.getDate());
    const year = String(newDate.getFullYear());
    const hours = String(newDate.getHours());
    const minutes = String(newDate.getMinutes());
    const seconds = String(newDate.getSeconds());

    let fdate = `${month}/${day}/${year}, ${hours}:${minutes}:${seconds}`;
    return fdate;
}
    

export function Wagers() {
    const [winner, setWinner] = useState<string>("");
    const [wagers, setWagers] = useState<Wager[]>([]);

    useEffect(() => {
        const getWagers = async () => {
            setWagers(await getAllWagers());
        }
        getWagers();
    }, []);

    const _WinnerReward = async (wager: Wager) => {
        if (!winner) {
            alert("Please select a winner first.");
            return;
        }

        console.log(wager, winner);

        await WinnerReward(winner, wager.bet, wager.id as string);
        
        setWagers(prevWagers => prevWagers.map(w => {
            if (w.id === wager.id) {
                return { ...w, finished: true, winner: winner };
            }
            return w;
        }));
    }
    
    const validWagers = wagers.filter(wager => wager.id !== undefined);

    return (
        <div id="page-wagers">
            <div className="header-wagers">
                <button onClick={() => window.location.href="/"}className="btn-back">&lt;</button>
                <h1 className="title-wagers">Wagers</h1>
                <p className="balance">Balance: $TODO</p>
            </div>

            <div className="wager-grid">
                {validWagers.map((wager) => (
                    <div key={wager.id} className="wager-card">
                        <p className={"wager-field title " + (wager.finished ? "" : "active")}>"{wager.betName}"</p>
                        <p className="wager-field bet">Bet: ${wager.bet}</p>
                        <p className="wager-field players">Players: {wager.players.join(", ")}</p>
                        <p className="wager-field">Date Created: {_DateConverter(wager.date_created)}</p>
                    {wager.finished ? (
                        <p className="wager-field winner">Winner: {wager.winner || "Unknown"}</p>
                    ) : (
                        <>
                            <label className="wager-field" htmlFor={`winner-${wager.id}`}>Winner:
                            <select name="winner" id={`winner-${wager.id}`} onChange={(e) => {setWinner(e.target.value)}}>
                                <option value="">Select a winner</option>
                                {wager.players.map((player) => (
                                    <option key={player} value={player}>{player}</option>
                                ))}
                            </select> </label>
                            <button className="wager-field winner-button" onClick={() => _WinnerReward(wager)}>✔</button>
                        </>
                    )}
                        <br></br>
                        <br></br>
                    </div>
                ))}
            </div>
        </div>
    )
}