import type { FormEvent } from "react";

export function Login() {

    const _onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        return;
    }

    return (
        <div className="login-page">
            <div className="header-main">
                <button className="button back" onClick={() => { window.location.href = "/" }}>&lt;</button>
                <h1 className="title">Login</h1>
                <p className="balance">Balance: $TODO</p>
            </div>
            <div className="login-container">
                <form id="login-form" className="login-form" onSubmit={(e) => {_onSubmit(e)}}>
                    <div className="control">
                        <h1>Login</h1>

                        <div className="block-cube block-input">
                            <input name="username" type="text" placeholder="Username" />
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
                            <input name="password" type="password" placeholder="Password" />
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
