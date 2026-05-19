import { useState, useContext, useEffect, type FormEvent } from "react";
import { useUser } from "~/components/userContext";
import { OnSubmitHandler, OnSubmitPopupComponent, onSubmitContext } from "~/main/onSubmitHandler";
import { Leaderboard } from "./leaderboard";
import { readUser, getAllUsers } from "~/components/firebase";
import { Checkbox } from "./checkbox";
import { useCookies } from "~/components/cookies";
import { type User, type Wager, CurrentSession } from "~/components/constants";

export function Main() {
    const [bet, setBet] = useState(0);
    const [betName, setBetName] = useState("Default Wager");
    const [currentWager, setCurrentWager] = useState<Wager | null>(null);
    const [users, setUsers] = useState<[string, number][]>([]);    
    const [isChecked, setIsChecked] = useState(new Array(users.length).fill(false));
    const { isOpen, setIsOpen } = useContext(onSubmitContext);
    const { user, balance, loading } = useUser();

    const fetchUsers = async () => {
        const promises = (await getAllUsers()).map(async (user: User) => {
            const data = await readUser(user.name);
            return [user.name, data.points] as [string, number];
        });
        const fetchedUsers = await Promise.all(promises);

        fetchedUsers.sort((a, b) => b[1] - a[1]);
        setUsers(fetchedUsers);
    };


    const _cleanUp = () => {
        setBet(0);
        setBetName("Default Wager");
        setIsChecked([false, false, false]);
    }

    const _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        setCurrentWager(await OnSubmitHandler(event, isOpen, setIsOpen, bet, betName));
        _cleanUp();
        await fetchUsers();
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="page">
            <div className="header-main">
                <h1 className="title"> ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯δˢ</h1>
                <button className="button login" style={{ display: (user == null) ? "block" : "none" }} onClick={() => { window.location.href = "/login" }}>&gt; Login &lt;</button>
                <p className="balance" style={{ display: (user == null) ? "none" : "block" }}>Balance: ${loading ? "..." : balance}</p>
            </div>

            <div className="main-grid" style={{ display: (user == null) ? "none" : "grid" }}>

                <Leaderboard users={users} />

                <div className="new-wager-grid">
                    <h1 className="new-wager">New Wager:</h1>

                    <form id="NewWager" key={"NewWager"} className="new-wager-grid" onSubmit={_onSubmit}>

                        <div id="checkbox-container" className="checkbox-container">
                            {users.map(([userId, points], index) => (
                                <Checkbox
                                    key={userId}
                                    label={userId}
                                    checked={isChecked[index]}
                                    onChange={(event) => {
                                        const newChecked = [...isChecked];
                                        newChecked[index] = event.target.checked;
                                        setIsChecked(newChecked);
                                    }}
                                />
                            ))}
                        </div>

                        <p id="Bet" className="bet">Bet: <input type="number" value={bet} onChange={(event) => setBet(Number(event.target.value))} /></p>
                        <p className="bet-name">Bet Name: <input type="text" id="betName" key={"betName"} value={betName} onChange={(event) => setBetName(event.target.value)}/></p>
                        <input type="submit" id="submit-btn" key={"submit-btn"} value="Submit Wager" className="button submit" style={{ display: (user == null) ? "none" : "block" }}/>
                    </form>
                </div>

                <button className="button wagers" onClick={() => { window.location.href = "/wagers" }}>&gt; Wagers</button>
                <button className="button quests" onClick={() => { window.location.href = "/quests" }}>&gt; Quests</button>
                <OnSubmitPopupComponent
                    open={isOpen}
                    onClose={() => { setIsOpen(false) }}
                    onSubmit={() => { }}
                    wager={currentWager}
                />
            </div>
            <iframe className="hider" src="https://en.wikipedia.org/wiki/Recursive_Bayesian_estimation" style={{ display: (user == null) ? "block" : "none" }}></iframe>
        </div>
    );
}
