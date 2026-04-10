
export type leaderboardType = { [key: string]: number }

export function Leaderboard({ leaderboard }: { leaderboard: leaderboardType}) {
    return (
        <div id="Leaderboard" className="Leaderboard">
            <h1 className="leaderboard-h1">Leaderboard:</h1>
            <div className="table">
                {Object.entries(leaderboard).sort((a, b) => b[1] - a[1]).map(([userId, points], index) => (
                    <p key={userId}>{index + 1}. {userId}: {points}</p>
                ))}
            </div>
        </div>
    )
}
