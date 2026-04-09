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


export function onSubmitPopupComponent(props: onSubmitPopupComponentProps) {
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

export function OnSubmitHandler(event: SubmitEvent<HTMLFormElement>) {
    const {isOpen, setIsOpen} = useContext(onSubmitContext);


}
