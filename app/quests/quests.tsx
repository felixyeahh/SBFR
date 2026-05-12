import { useUser } from "~/components/userContext";

export function Quests() {
    const { balance, loading } = useUser();

    return (
        <div className="page">
            <div className="header-main">
                <button className="button back" onClick={() => { window.location.href = "/" }}>&lt;</button>
                <h1 className="title">Quests For ℛετα𝔯𝕕ˢ</h1>
                <p className="balance">Balance: ${loading ? '...' : balance}</p>
            </div>
            <div className="quests-container">
                <div className="quest">
                    <h2>Quest 1</h2>
                    <p>Quest 1 description</p>
                    <button>Start Quest</button>
                </div>
            </div>
        </div>
    );
}
