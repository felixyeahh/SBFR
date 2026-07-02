import Link from "next/link"

export default async function PokerPage() {

    return (
        <div>
            <Link href="/games/poker/standard" className="button">Poker - Standard</Link>
            <Link href="/games/poker/cardless" className="button">Poker - Cardless</Link>
            <Link href="/games/poker/online" className="button">Poker - Online</Link>
        </div>
    )
}
