
export function Leaderboard({users}: {users: [string, number][]}) {

    return (
        <div id="leaderboard" className="leaderboard">
            <h1>Leaderboard:</h1>
            <div className="table">
                {users.map(([userId, points], index) => (
                    <p className="leaderboard-item" key={userId}>{index + 1}. {userId}: {points}</p>
                ))}
            </div>
        </div>
    )
}
