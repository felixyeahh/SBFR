import type { Dispatch, SetStateAction } from "react";
import { createContext, useState } from "react";
import { Popup } from "reactjs-popup";
import type { FormEvent } from "react";
import { type Wager, wagerdb } from "~/components/database/wagerdb";
import { userdb } from "~/components/database/userdb";
import { WinnerReward } from "../wagers/winner";
import { Users } from "~/components/userContext";

export type onSubmitContextType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>> 
}

export const onSubmitContext = createContext<onSubmitContextType>({
    isOpen: false,
    setIsOpen: () => {}
});

type onSubmitPopupComponentProps = {
    wager: Wager | null,
    open: boolean, 
    onClose : () => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}


export function OnSubmitPopupComponent(props: onSubmitPopupComponentProps) {
    const [winner, setWinner] = useState<string>("");
    
    const _onOpen = () => {
        if (props.wager == null) {
            throw new Error("Wager is null");
        }
    }
    
    const _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!props.wager) return;
        WinnerReward(winner, props.wager.bet, props.wager.id as string);
        props.onClose();
    }

    return (<Popup open={props.open} onClose={props.onClose} onOpen={_onOpen}>
        <div id="SubmitPopup" className="submit-popup-container" style={{display: props.open ? "block" : "none"}}>
            <form onSubmit={(event) => {_onSubmit(event)}}> 
                <label>Winner: <select name="winner" id={`winner-${props.wager?.id}`} onChange={(e) => {setWinner(e.target.value)}}>
                    <option value="">Select a winner</option>
                    {props.wager?.players.map((player) => (
                        <option key={player} value={player}>{player}</option>
                    ))}
                </select></label>
                <input type="submit" value={"✔"}/>
            </form>
        </div>
    </Popup>)
}

export async function OnSubmitHandler(event: FormEvent<HTMLFormElement>, 
    isOpen: boolean, 
    setIsOpen: Dispatch<SetStateAction<boolean>>, 
    bet: number, 
    betName: string,
) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const users: string[] = [];

    (await userdb.getAll()).forEach((user) => { if (formData.get(user.id)) {users.push(user.id); } });

    await Promise.all(users.map(async (user) => {
        const current_points = (await userdb.read(user)).points;
        await userdb.updateField(user, Users.POINTS, current_points - bet);
    }));

    setIsOpen(!isOpen); 
    const newWager = await wagerdb.addWager(users, bet * users.length, betName);
    return newWager;
}
