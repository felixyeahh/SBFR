import { userdb } from "~/tools/database/userdb";
import { useCookies, type Options } from "~/tools/cookies";
import { CurrentSession} from "~/tools/constants";

const LoginSuccess = (username: string, [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]) => {    
    setCurrentSession(
        username,
        {
            expires: new Date(Date.now() + 60 * 60 * 24 * 7),
            secure: true,
            path: "/"
        }
    );

    window.location.href = "/";

    return username;
}

const LoginFail = () => {
    console.log("Fail");

    return null;
}

export const LoginHandler = async (username: string, password: string, [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]) => {
    const user = await userdb.read(username);

    if (!user || user?.password != password) {
        return LoginFail();
    }
    return LoginSuccess(username, [currentSession, setCurrentSession]);
}
