import { useUser, type User } from "~/tools/userContext";

export default function DefaultHeader({ title: title, backbutton: backbutton}: {title?: string | null, backbutton?: boolean}) {
    const { user, loading, balance } = useUser();
    
    return (
        <div className="header-main">
            {backbutton ? (
                <button className="button back" onClick={() => window.location.href = "/"}>&lt;</button>
            ) : null}
            <h1 className="title">{title || "ʂ𝓅Ｏ𝔯τ𝔰 𝔅εττ𝔦𝔫𝔤 𝔉𝔬𝔯 ℛετα𝔯δˢ"}</h1>
            <button 
                className="button login" 
                style={{ display: (user == null) ? "block" : "none" }}
                onClick={() => { window.location.href = "/login" }}>
                &gt; Login &lt;
            </button>
            <p 
                className="balance" 
                style={{ display: (user == null) ? "none" : "block" }}>
                Balance: ${loading ? "..." : balance}
            </p>
        </div>
    )
}
