import { useState, useContext, useEffect, type FormEvent } from "react";
import { OnSubmitHandler, OnSubmitPopupComponent, onSubmitContext } from "~/main/onSubmitHandler";
import { Leaderboard } from "./leaderboard";
import { Users } from "~/components/constants";
import { readUser } from "~/components/firebase";
import { Checkbox } from "./checkbox";

export function Main() {
    const [bet, setBet] = useState(0);
    const [betName, setBetName] = useState("Default Wager");
    const {isOpen, setIsOpen} = useContext(onSubmitContext);
    const [isChecked, setIsChecked] = useState([false, false, false]);

    const [users, setUsers] = useState<[string, number][]>([]);

    const fetchUsers = async () => {
        const promises = Users.USERS.map(async (user) => {
            const data = await readUser(user);  
            return [user, data.points] as [string, number];
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
        await OnSubmitHandler(event, isOpen, setIsOpen, bet, betName);
        _cleanUp();
        await fetchUsers(); 
    }

    useEffect(() => {        
        fetchUsers();
    }, []);

    return (
        <div className="page">
            <h1 className="title">Sports Betting For Retards</h1>

            <Leaderboard users={users}/>

            <div className="new-wager">
                <h1 className="new-wager-h1">New Wager:</h1>

                <form id="NewWager" key={"NewWager"} onSubmit={_onSubmit}>

                    <div id="names" className="names">
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

                    <div id="Bet" className="bet">
                        <p>Bet: </p><input type="number" value={bet} onChange={(event) => setBet(Number(event.target.value))} />
                    </div>
                    <input type="text" key={"betName"} value={betName} onChange={(event) => setBetName(event.target.value)} />
                    <input type="submit" key={"submit-btn"} value="Submit Wager" className="liquid-button" onClick={() => {console.log("clicked")}} />
                </form>
            </div>

            <OnSubmitPopupComponent open={isOpen} onClose={() => {setIsOpen(false)}} onSubmit={(event) => {console.log(event.target)}} />
        </div>
    );
}
