
export function Leaderboard({users}: {users: [string, number][]}) {

    return (
        <div id="Leaderboard" className="Leaderboard">
            <h1 className="leaderboard-h1">Leaderboard:</h1>
            <div className="table">
                {users.map(([userId, points], index) => (
                    <p key={userId}>{index + 1}. {userId}: {points}</p>
                ))}
            </div>
        </div>
    )
}
