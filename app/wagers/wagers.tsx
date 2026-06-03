import { useEffect, useState } from "react";
import DefaultHeader from "~/components/defaultheader";
import { type Wager, wagerdb } from "~/components/database/wagerdb";
import { userdb } from "~/components/database/userdb";
import { WinnerReward } from "./winner";
import { useUser, Users } from "~/components/userContext";

export function Wagers() {
    const [winner, setWinner] = useState<string>("");
    const [wagers, setWagers] = useState<Wager[]>([]);
    const { user, balance, loading, isAdmin } = useUser();

    useEffect(() => {
        const getWagers = async () => {
            setWagers(await wagerdb.getAll());
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
    
    const _CancelWager = async (wager: Wager) => {
        if (!isAdmin) return alert("You are not authorized to cancel this wager.");

        for (const player of wager.players) {
            const _player = await userdb.read(player);
            if (_player == null) continue;
            await userdb.updateField(player, Users.POINTS, _player.points + (wager.bet / wager.players.length));
        }
        await wagerdb.delete(wager.id as string);
        setWagers(prevWagers => prevWagers.filter(w => w.id !== wager.id));
    }

    const validWagers = wagers.filter(wager => wager.id !== undefined);

    return (
        <div id="page-wagers">
            <DefaultHeader user={user} loading={loading} balance={balance} title="Wagers For ℛετα𝔯δˢ" backbutton/>

            <div className="wager-grid">
                {validWagers.map((wager) => (
                    <div key={wager.id} className="wager-card">
                        <div className={"wager-field title " + (wager.finished ? "" : "active")}>
                            <button className="cancel" style={{ display: (wager.finished) ? "none" : "block" }} onClick={() => _CancelWager(wager)}>✗</button><p>"{wager.betName}"</p>
                        </div> 
                        <p className="wager-field bet">Bet: ${wager.bet}</p>
                        <p className="wager-field players">Players: {wager.players.join(", ")}</p>
                        <p className="wager-field">Date Created: {(new Date((wager.date_created as any).seconds * 1000)).toLocaleString()}</p>
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
        </div>
    )
}