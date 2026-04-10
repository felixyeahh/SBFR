import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { Popup } from "reactjs-popup";
import type { FormEvent } from "react";
import { Users } from "~/components/constants";
import { addWager, updateField, readUser } from "~/components/firebase";

export type onSubmitContextType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>> 
}

export const onSubmitContext = createContext<onSubmitContextType>({
    isOpen: false,
    setIsOpen: () => {}
});

type onSubmitPopupComponentProps = {
    open: boolean, 
    onClose : () => void,
    onSubmit: (event: FormEvent<HTMLFormElement>) => void
}


export function OnSubmitPopupComponent(props: onSubmitPopupComponentProps) {
    return (<Popup open={props.open} onClose={props.onClose}>
        <div id="SubmitPopup" className="submit-popup-container" style={{display: props.open ? "block" : "none"}}>
            <form onSubmit={(event) => {props.onSubmit(event)}}> 
                <label form="winner">Winner? </label>
                <input type="" id="winner" name="winner" required/>
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

    Users.USERS.forEach((user) => { if (formData.get(user)) {users.push(user); } });

    await addWager(users, bet * users.length, betName);
    
    // Use Promise.all to wait for all the updates to finish!
    await Promise.all(users.map(async (user) => {
        const current_points = (await readUser(user)).points;
        await updateField(user, Users.POINTS, current_points - bet);
    }));
    
    return setIsOpen(!isOpen); 
}
