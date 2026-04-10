import { useState, useContext } from "react";
import { OnSubmitHandler, OnSubmitPopupComponent, onSubmitContext } from "~/main/onSubmitHandler";
import { Users } from "~/components/constants";
import { readUser } from "~/components/firebase";
import { Leaderboard } from "./leaderboard";
import type { leaderboardType } from "./leaderboard";
import { Checkbox } from "./checkbox";

export function Main({ leaderboard }: { leaderboard: leaderboardType }) {
    const [bet, setBet] = useState(0);
    const {isOpen, setIsOpen} = useContext(onSubmitContext);

    return (
        <div className="page">
            <h1 className="title">Sports Betting For Retards</h1>

            <Leaderboard leaderboard={leaderboard} />

            <div className="new-wager">
                <h1 className="new-wager-h1">New Wager:</h1>

                <form id="NewWager" key={"NewWager"} onSubmit={(event) => {OnSubmitHandler(event, isOpen, setIsOpen) }}>

                    <div id="names" className="names">
                        {Object.entries(leaderboard).map(([userId, points], index) => (
                            <Checkbox key={userId} label={userId} />
                        ))}
                    </div>

                    <div id="Bet" className="bet">
                        <p>Bet: </p><input type="number" value={bet} onChange={(event) => setBet(Number(event.target.value))} />
                    </div>

                    <input type="submit" key={"submit-btn"} value="Submit Wager" disabled={false} className="submit" />
                </form>
            </div>

            <OnSubmitPopupComponent open={isOpen} onClose={() => {setIsOpen(false)}} onSubmit={(event) => {console.log(event.target)}} />
        </div>
    );
}
