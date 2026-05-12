import type { FormEvent } from "react";
import { useState } from "react";
import { LoginHandler } from "./loginHandler";
import { useCookies } from "~/components/cookies";
import { CurrentSession } from "~/components/constants";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isFailed, setIsFailed] = useState(false);
    const [currentSession, setCurrentSession] = useCookies(CurrentSession.COLLECTION);

    const _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await LoginHandler(username, password, [currentSession, setCurrentSession]);

        if (result == null) {
            return setIsFailed(true);
        }
    }

    return (
        <div className="login-page">
            <div className="header-main">
                <button className="button back" onClick={() => { window.location.href = "/" }}>&lt;</button>
                <h1 className="title">Login</h1>
            </div>
            <div className="login-container">
                <form id="login-form" className="login-form" onSubmit={(e) => {_onSubmit(e)}}>
                    <div className="control">
                        <h1>{isFailed ? "Login Failed: Incorrect Username/Password" : "Login"}</h1>

                        <div className="block-cube block-input">
                            <input name="username" type="text" placeholder="Username" onChange={(e) => {setUsername(e.target.value)}}/>
                            <div className="bg-top">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg-right">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg">
                                <div className="bg-inner"></div>
                            </div>
                        </div>
                        <div className="block-cube block-input">
                            <input name="password" type="password" placeholder="Password" onChange={(e) => {setPassword(e.target.value)}} />
                            <div className="bg-top">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg-right">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg">
                                <div className="bg-inner"></div>
                            </div>
                        </div>
                        <div className="block-cube block-cube-hover">
                            <div className="bg-top">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg-right">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="bg">
                                <div className="bg-inner"></div>
                            </div>
                            <div className="text">
                                <input type="submit" value="Log In" className="login-btn" />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
