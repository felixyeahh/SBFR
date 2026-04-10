import { getAllWagers } from "~/components/firebase";
import { useEffect, useState } from "react";
import type { Wager } from "~/components/constants";

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
    const [wagers, setWagers] = useState<Wager[]>([]);

    useEffect(() => {
        const getWagers = async () => {
            setWagers(await getAllWagers());
        }
        getWagers();
    }, []);
    
    wagers.forEach((wager) => {
        if (wager.id === undefined) {
            wagers.splice(wagers.indexOf(wager), 1);
        }
    });

    return (
        <div className="WagerBox">
            {wagers.map((wager) => (
                <div key={wager.id} >
                    <p>"{wager.betName}"</p>
                    <p>Bet: ${wager.bet}</p>
                    <p>Players: {wager.players.join(", ")}</p>
                    <p>Date Created: {_DateConverter(wager.date_created)}</p>
                    <p>Status: {wager.finished ? "Finished" : "Not Finished"}</p>
                    <label htmlFor="winner">Winner:</label>
                    <select name="winner" id="winner">
                        {wager.players.map((player) => (
                            <option key={player} value={player} onChange={(e) => {console.log(e.target)}}>{player}</option>
                        ))}
                    </select>
                    <button onClick={(e) => {console.log(e.target)}}>✔</button>
                    <br></br>
                    <br></br>
                </div>
            ))}
        </div>
    )
}