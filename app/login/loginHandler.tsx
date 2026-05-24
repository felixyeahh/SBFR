import { userdb } from "~/components/database/userdb";
import { useCookies, type Options } from "~/components/cookies";
import { CurrentSession} from "~/components/constants";

const LoginSuccess = (username: string, [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]) => {    
    setCurrentSession(
        username,
        {
            expires: new Date(Date.now() + 60 * 60 * 24 * 7),
            secure: true,
            path: "/"
        }
    );
    console.log("success");
    console.log(currentSession);
    window.location.href = "/";

    return currentSession;
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


