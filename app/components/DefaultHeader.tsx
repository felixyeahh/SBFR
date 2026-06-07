"use client";
import { useUser } from "./userContext";
import Link from "next/link";
import { useCookies } from "../tools/cookies";
import { CurrentSession } from "../tools/constants";
import { useRouter } from "next/navigation";

export default function DefaultHeader({ title: title, backbutton: backbutton, signout: signout}: {title?: string | null, backbutton?: boolean, signout?: boolean}) {
    const { user, loading, balance } = useUser();
    const [currentSession, setCurrentSession] = useCookies(CurrentSession.COLLECTION);
    const router = useRouter();
    
    const _signout = signout && user != null;

    const handleSignout = () => {
        if (currentSession) {    
            setCurrentSession("", {
                expires: new Date(0),
                path: "/"
            });
            router.push("/login");
        }
    }
    return (
        <div className="header-main">
            {backbutton ? (
                <Link href="/" className="button back" >&lt;</Link>
            ) : null}
            {_signout ? (
                <button onClick={handleSignout} className="button signout">Sign Out</button>
            ) : null}
            <h1 className="title">{title || "ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯δˢ"}</h1>
            <Link 
                href="/login" 
                className="button login" 
                style={{ display: (user == null) ? "block" : "none" }}>
                &gt; Login &lt;
            </Link>
            <p 
                className="balance" 
                style={{ display: (user == null) ? "none" : "block" }}>
                Balance: ${loading ? "..." : balance}
            </p>
        </div>
    )
}
