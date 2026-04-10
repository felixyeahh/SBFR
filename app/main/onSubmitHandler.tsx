import type { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import { Popup } from "reactjs-popup";
import type { SubmitEvent } from "react";

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
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}


export function OnSubmitPopupComponent(props: onSubmitPopupComponentProps) {
    return (<Popup open={props.open} onClose={props.onClose}>
        <div id="SubmitPopup" className="submit-popup-container" style={{display: props.open ? "block" : "none"}}>
            <form onSubmit={(event) => {props.onSubmit(event)}}> 
                <label form="winner">Winner? </label>
                <input type="text" id="winner" name="winner" required/>
                <input type="submit" value={"✔"}/>
            </form>
        </div>
    </Popup>)
}

export function WinnerReward(winner: string, bet: number) {
    
}

export function OnSubmitHandler(event: SubmitEvent<HTMLFormElement>, isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>) {
    event.preventDefault();
    
    return setIsOpen(true); 
}
