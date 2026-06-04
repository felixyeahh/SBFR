"use client";
import Link from "next/link";
import { useUser } from "../tools/userContext";

export function Navigation() {
    const { isAdmin } = useUser();
    return (
        <div className="navigation">
            <Link href="/wagers" className="button wagers">&gt; Wagers &lt;</Link>
            <Link href="/quests" className="button quests">&gt; Quests &lt;</Link>
            {isAdmin ? <Link href="/dashboard" className="button dashboard">&gt; Dashboard &lt;</Link> : null}
            <Link href="/shop" className="button shop">&gt; Shop &lt;</Link>
            <Link href="/games/poker" className="button poker">&gt; Porker &lt;</Link>
        </div>
    )
}