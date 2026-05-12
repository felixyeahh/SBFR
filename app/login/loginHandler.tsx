import { readUser } from "~/components/firebase";
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
    window.location.href = "/";

    return currentSession;
}

const LoginFail = () => {
    console.log("Fail");

    return null;
}

export const LoginHandler = async (username: string, password: string, [currentSession, setCurrentSession]: [string | undefined, (value: string, options?: Options) => void]) => {
    console.log("Login Handler");
    const user = await readUser(username);

    if (!user || user?.password != password) {
        return LoginFail();
    }
    return LoginSuccess(username, [currentSession, setCurrentSession]);
}


