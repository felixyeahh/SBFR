import type { Dispatch, SetStateAction } from "react";
import { createContext } from "react";
import { Popup } from "reactjs-popup";
import type { SubmitEvent } from "react";

export type OnSubmitContext = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>> 
}

export const OnSubmitContext = createContext<OnSubmitContext>({
    isOpen: false,
    setIsOpen: () => {}
});

type OnSubmitHandlerProps = {
    open: boolean, 
    onClose : () => void,
    onSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}


export function OnSubmitHandler(props: OnSubmitHandlerProps) {
    return <Popup open={props.open} onClose={props.onClose}>
        <div id="SubmitPopup" className="popup-container">
            <form onSubmit={(event) => {props.onSubmit(event)}}> 
                <label form="winner">Winner? </label>
                <input type="text" id="winner" name="winner" required/>
                <input type="submit" value={"✔"}/>
            </form>
        </div>
    </Popup>
}
