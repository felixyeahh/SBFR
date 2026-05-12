import { useUser } from "~/components/userContext";

export function Shop() {
    const { balance, loading } = useUser();

    return (
        <div>
            <div className="header-main">
                <button onClick={() => window.location.href = "/"} className="button back">&lt;</button>
                <h1 className="title"> Shop 𝔉𝔬𝔯 ℛετα𝔯δˢ</h1>
                <p className="balance">Balance: ${loading ? '...' : balance}</p>
            </div>
        </div>
    )
}
