import { db } from "../components/firebase";
import { Users } from "../components/constants";
import { useState, useEffect } from "react";
import { OnSubmitHandler } from "~/main/onSubmitHandler";

type leaderboardType = { [key: string]: number }

function Leaderboard({ leaderboard }: { leaderboard: leaderboardType }) {
    return (
        <div id="Leaderboard" className="Leaderboard">
            <h1>Leaderboard:</h1>
            {Object.entries(leaderboard).sort((a, b) => b[1] - a[1]).map(([userId, points], index) => (
                <p key={userId}>{index + 1}. {userId}: {points}</p>
            ))}
        </div>
    )
}

export function Main({ leaderboard }: { leaderboard: leaderboardType }) {
    return (
        <div className="main">
            <h1>Sports Betting For Retards</h1>
            <form id="NewWager" onSubmit={(event) => {OnSubmitHandler(event)}}>
                <div id="Table" className="Table">
                    {Object.entries(leaderboard).map(([userId, points], index) => (
                        <div id={userId} className="Input">
                            <p>{userId}</p> <input type="checkbox" />
                        </div>
                    ))}
                </div>
                <div id="Bet" className="Bet">
                    <p>Bet: </p><input type="number" value="0" />
                </div>
                <input type="submit" value="Submit Wager" className="Submit" />
            </form>

            <Leaderboard leaderboard={leaderboard} />
        </div>
    );
}
