"use client";
import { type MouseEvent, useState } from "react";
import { userdb } from "../tools/database/userdb";
import { useUser } from "../components/userContext";
import { type User } from "../tools/constants";
import Link from "next/link";

export function MiniLeaderboard({users, maxLength = 10}: {users: User[], maxLength?: number}) {
    const _users = users.slice(0, maxLength).sort((a,b)=> b.points - a.points);
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
                {_users.map((user, index) => (
                    <div className="leaderboard-item" id={user.id} key={user.id}>
                        <p>{index + 1}. {user.id}: {user.points} </p> 
                        <input id={`${user.id}points`} className="gift points" style={{display: "none"}}></input>
                        <button id={`${user.id}gift`} className="gift" style={{display: "block"}} onClick={_gift}>🎁</button>
                    </div>
                ))}
            </div>
            {
                users.length > maxLength ? (
                    <Link href="/leaderboard" className="leaderboard-item">See More...</Link>
                ) : null
            }
        </div>
    )
}
