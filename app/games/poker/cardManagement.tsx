import type { Card, Rank, Suit } from "@/app/tools/database/poker";
import { shuffle } from "@/app/tools/utils";


export const suits: Suit[] = ["♠", "♥", "♦", "♣"];
export const ranks: Rank[] = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export const generateDecks = (numberOfDecks: number = 1) => {
    const deck: Card[] = [];
    for (let i = 0; i < numberOfDecks; i++) {
        for (const suit of suits) {
            for (const rank of ranks) {
                deck.push({ suit, rank });
            }
        }
    }
    return shuffle(deck);
}

export const getCards = (deck: Card[], numberOfCards: number = 1): { cards: Card[], remainingDeck: Card[] } => {
    if (deck.length < numberOfCards) {
        deck = generateDecks();
    }
    const cards = deck.slice(0, numberOfCards);
    const remainingDeck = deck.slice(numberOfCards);
    return { cards, remainingDeck };
}
