import { db } from "../components/firebase";
import { Users } from "../components/constants";
import { useState, useEffect } from "react";
import { OnSubmitHandler } from "~/components/onSubmitHandler";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState<{[key: string]: number}>({});
    console.warn("leaderboard");

    useEffect(() => {
        console.warn(".");
        db.collection(Users.COLLECTION).get().then(
            (snapshot) => {
                const newLeaderboard: {[key: string]: number} = {};
                snapshot.forEach((doc) => {
                    newLeaderboard[doc.id] = doc.data()[Users.POINTS];
                });
                setLeaderboard(newLeaderboard);
                console.log(leaderboard);
            }
        );
    }, []);

    return ( 
        <div id="Leaderboard" className="Leaderboard">
            <h1>Leaderboard:</h1>
            {Object.entries(leaderboard).map(([userId, points], index) => (
                <p key={userId}>{index+1}. {userId}: {points}</p>
            ))}
        </div>
    )
}

export function Main() {        
    return ( 
        <div className="main">     
            <h1>Sports Betting For Retards</h1>
            <form>
                <div id="Table" className="Table">
                    <div id="Justin" className="Input">
                        <p>Justin</p> <input type="checkbox"/>
                    </div>
                    <div id="Daniel" className="Input">
                        <p>Daniel</p> <input type="checkbox"/>
                    </div>
                    <div id="Parker" className="Input">
                        <p>Parker</p> <input type="checkbox"/>
                    </div>
                </div>
                <div id="Bet" className="Bet">                  
                    <p>Bet: </p><input type="number" value="0"/>
                </div>
                <input type="submit" value="Submit Wager" className="Submit" onChange={(event) => {}}/>
            </form>

            <Leaderboard />
        </div>
    );
}
