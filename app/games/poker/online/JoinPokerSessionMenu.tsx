"use client";
import { useOnlinePokerSession } from "./onlinePokerSessionContext";
import type { PokerSession } from "@/app/tools/database/poker";
import createNewSession from "./sessionManagers";
import { joinNewSession, exitSession } from "./sessionManagers";
import { useCookies } from "@/app/tools/cookies";
import { CurrentSession } from "@/app/tools/constants";
import { useUser } from "@/app/components/userContext";
import { useRouter } from "next/navigation";

function SessionList({sessions}: {sessions: PokerSession[]}){
    const {user} = useUser();
    const {loading} = useOnlinePokerSession();
    const [_, setSession] = useCookies(CurrentSession.POKER);
    const router = useRouter();
    return <>
        {user === null ? null : (<>
            <div className="create-session">
                <button className="button" onClick={() => {createNewSession(user, setSession).then(() => {router.refresh()})}}>Create a new session</button>
            </div>
        </>)}
        <div className="sessions-list">
            <h1>Available Sessions</h1>
            {loading ? <p>Loading...</p> : null}
            {!loading && sessions.length === 0 ? <p>No sessions found</p> : null}
            {sessions.map((session) => {
                if (session.id === null) return null;
                return (<div key={session.id} className="session">
                    <p>{session.id}</p>
                    <button className="button" onClick={() => {joinNewSession(user!, session.id ?? "", setSession).then(() => {router.refresh()})}}>Join</button>
                </div>)
            })}
        </div>  
    </>
}

export default function JoinPokerSessionMenu({sessions}: {sessions: PokerSession[]}) {
    const { user } = useUser();
    const { sessionId } = useOnlinePokerSession();
    const [_, setSession] = useCookies(CurrentSession.POKER);
    const router = useRouter();

    if (user === null) return <></>;
    if (typeof sessionId === "undefined") return <SessionList sessions={sessions} />;

    return <>
        <div style={{display: sessionId ? "block" : "none"}}>
            <p>Session ID: {sessionId}</p>
            <button className="button" onClick={() => {exitSession(user.id, sessionId, setSession).then(() => {router.refresh()})}}>Exit Session</button>
        </div>
    </>
}