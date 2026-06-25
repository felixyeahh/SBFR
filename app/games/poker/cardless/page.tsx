"use client";
import { findBestHand } from "./bestCard";
import { generateDecks } from "./cardManagement";
import type { Card } from "@/app/tools/database/poker";
import { useState } from "react";


export default function CardlessPokerPage () {
    const deck = generateDecks(1);
    const [community, setCommunity] = useState<Card[]>(deck.slice(0, 5));
    const [hand, setHand] = useState<Card[]>(deck.slice(0, 2));

    const bestHand = findBestHand(hand.concat(community));
    return (
        <div>
            <h1>Cardless Poker</h1>
            <div className="community-cards">

            </div>

            <div className="player-hand">
                <p>Your hand:</p>
                <p>{hand.map((card, i) => (<p key={i}>{card.rank} {card.suit}</p>))}</p>

            </div>
            <div className="table-info">
                <p className="ante text-glow">Ante: $<input className="ante text-glow" value={""} onChange={e => (Number(e.target.value))} /></p>
                <p className="pot text-glow">Pot: ${}</p>
                <p className="phase text-glow">{}</p>
            </div>
            
            <div className="players-container">
                <p>Players</p>
            </div>


            <button onClick={() => setHand(generateDecks(2).slice(0, 7))}>New Hand</button>
            {bestHand.cards.map((card, i) => (
                <p key={i}>{card.rank} {card.suit}</p>
            ))}
        </div>
    )
}