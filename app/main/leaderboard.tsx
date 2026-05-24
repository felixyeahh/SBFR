
export function MiniLeaderboard({users, maxLength = 10}: {users: [string, number][], maxLength?: number}) {
    const _users = users.slice(0, maxLength);

    return (
        <div id="leaderboard" className="leaderboard">
            <h1>Leaderboard:</h1>
            <div className="table">
                {_users.map(([userId, points], index) => (
                    <p className="leaderboard-item" key={userId}>{index + 1}. {userId}: {points}</p>
                ))}
            </div>
            {
                users.length > maxLength ? (
                    <p onClick={() => { window.location.href = "/leaderboard"}} className="leaderboard-item">See More...</p>
                ) : null
            }
        </div>
    )
}
