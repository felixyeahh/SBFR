"use client";

import { useUser } from "./userContext";
import Link from "next/link";

export default function DefaultHeader({ title: title, backbutton: backbutton}: {title?: string | null, backbutton?: boolean}) {
    const { user, loading, balance } = useUser();
    
    return (
        <div className="header-main">
            {backbutton ? (
                <Link href="/" className="button back" >&lt;</Link>
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
