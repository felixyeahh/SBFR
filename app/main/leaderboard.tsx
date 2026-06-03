import { type MouseEvent, useState } from "react";
import { userdb } from "~/components/database/userdb";
import { useUser } from "~/components/userContext";

export function MiniLeaderboard({users, maxLength = 10}: {users: [string, number][], maxLength?: number}) {
    const _users = users.slice(0, maxLength);
    const [giftedPoints, setGiftedPoints] = useState<number>(0);
    const {user, balance} = useUser();

    if (user == null) return;

    const _gift = async (e: MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const input = button.previousElementSibling as HTMLInputElement;
        const parent = button.parentElement as HTMLDivElement;

        if (button.textContent == "📥") {
            if (giftedPoints > 0) {
                const receiver = await userdb.read(parent.id);
                await userdb.updateField(parent.id, "points", receiver.points+giftedPoints);
                await userdb.updateField(user.id, "points", balance-giftedPoints);
            }
            button.textContent = "🎁";
            input.value = "0";
            setGiftedPoints(0);
            return input.style.display = "none";
        }

        input.style.display = "block"
        input.focus();

        input.onchange = async () => {
            const val = parseInt(input.value);
            if (!val) {
                return input.style.display = "none";
            }
            setGiftedPoints(val);
            button.textContent = "📥";
        }
    }
    

    return (
        <div id="leaderboard" className="leaderboard">
            <h1>Leaderboard:</h1>
            <div className="table">
                {_users.map(([userId, points], index) => (
                    <div className="leaderboard-item" id={userId}>
                        <p>{index + 1}. {userId}: {points} </p> 
                        <input id={userId + "points"} className="gift points" style={{display: "none"}}></input>
                        <button id={userId + "gift"} className="gift" style={{display: "block"}} onClick={_gift}>🎁</button>
                    </div>
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
