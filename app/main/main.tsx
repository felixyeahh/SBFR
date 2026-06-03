import { useState, useContext, useEffect, type FormEvent } from "react";
import { useUser, type User } from "~/components/userContext";
import { OnSubmitHandler, OnSubmitPopupComponent, onSubmitContext } from "~/main/onSubmitHandler";
import DefaultHeader from "~/components/defaultheader";
import { MiniLeaderboard } from "./leaderboard";
import { userdb } from "~/components/database/userdb";
import { Checkbox } from "./checkbox";
import { type Wager } from "~/components/database/wagerdb";
import { ScrollRestoration } from "react-router";

export function Main() {
    const [bet, setBet] = useState(0);
    const [betName, setBetName] = useState("Default Wager");
    const [currentWager, setCurrentWager] = useState<Wager | null>(null);
    const [users, setUsers] = useState<[string, number][]>([]);    
    const [isChecked, setIsChecked] = useState(new Array(users.length).fill(false));
    const { isOpen, setIsOpen } = useContext(onSubmitContext);
    const { user, balance, loading } = useUser();

    const fetchUsers = async () => {
        const users = await userdb.getAll();

        users.sort((a, b) => b.points - a.points);
        setUsers(users.map((user) => [user.id, user.points]));
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
            <DefaultHeader user={user} loading={loading} balance={balance}/>

            <div className="main-grid" style={{ display: (user == null) ? "none" : "grid" }}>

                <MiniLeaderboard users={users} maxLength={5} />

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

            <ScrollRestoration />
        </div>
    );
}
