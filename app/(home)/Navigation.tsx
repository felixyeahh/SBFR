import Link from "next/link";

export function Navigation() {
    return (
        <div className="navigation">
            <Link href="/wagers" className="button wagers">&gt; Wagers &lt;</Link>
            <Link href="/quests" className="button quests">&gt; Quests &lt;</Link>
            <Link href="/dashboard" className="button dashboard">&gt; Dashboard &lt;</Link>
            <Link href="/shop" className="button shop">&gt; Shop &lt;</Link>
            <Link href="/games/poker" className="button poker">&gt; Poker &lt;</Link>
        </div>
    )
}