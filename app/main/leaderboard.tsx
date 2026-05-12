
export function Leaderboard({users}: {users: [string, number][]}) {
    const _users = users.slice(0, 10);

    return (
        <div id="leaderboard" className="leaderboard">
            <h1>Leaderboard:</h1>
            <div className="table">
                {_users.map(([userId, points], index) => (
                    <p className="leaderboard-item" key={userId}>{index + 1}. {userId}: {points}</p>
                ))}
            </div>
            {
                users.length > 10 ? (
                    <p onClick={() => { window.location.href = "/leaderboard"}} className="leaderboard-item">See More...</p>
                ) : null
            }
        </div>
    )
}
