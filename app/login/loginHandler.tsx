import { userdb } from "../tools/database/userdb";
import { type Options } from "../tools/cookies";

const onLoginSuccess = (username: string, [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]) => {    
    setCurrentSession(
        username,
        {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 31),
            secure: typeof window !== "undefined" && window.location.protocol === "https:",
            path: "/"
        }
    );

    window.location.href = "/";

    return username;
}

const onLoginFail = () => {
    console.log("Fail");

    return null;
}

export async function handleLogin (
    username: string,
    password: string,
    [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]
) {
    const user = await userdb.read(username);

    if (!user || user?.password != password) {
        return onLoginFail();
    }
    return onLoginSuccess(username, [currentSession, setCurrentSession]);
}
