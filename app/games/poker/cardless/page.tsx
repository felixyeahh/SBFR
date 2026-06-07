"use client";
import { findBestHand } from "./cardManagement";
import { generateDecks } from "./cardManagement";
import type { Card, Rank } from "./cardManagement";
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
                

            </div>


            <button onClick={() => setHand(generateDecks(2).slice(0, 7))}>New Hand</button>
            {bestHand.cards.map((card, i) => (
                <p key={i}>{card.rank} {card.suit}</p>
            ))}
        </div>
    )
}