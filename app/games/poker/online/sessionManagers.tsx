import { randomBytes } from "crypto";
import { pokerDb, Card } from "@/app/tools/database/poker";
import { type PokerSession, PokerPhase, type Player } from "@/app/tools/database/poker";
import  { type User, CurrentSession} from "@/app/tools/constants";
import { generateDecks, getCards } from "../cardManagement";
import { EvaluatedHand, findBestHand, compareHands } from "./bestCard";

export default async function createNewSession (user: User, setSession: (value: string, options?: any) => void) {
    const player: Player = {
        id: 0,
        user_id: user.id,
        chips: 1000,
        cards: [],
        folded: false
    }
    
    const sessionId = randomBytes(16).toString("hex");

    const pokerSession: PokerSession = {
        id: sessionId,
        players: [player],
        community: [],
        deck: [],
        phase: PokerPhase.PREFLOP,
        pot: 0,
        ante: 0,
        owner: player,
        currentBet: 0,
        wasRaised: false,
        activePlayerIndex: 0,
        isStarted: false
    };
    await pokerDb.set(pokerSession);

    setSession(
        sessionId,
        {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            path: "/"
        }
    );
}

export async function joinNewSession (user: User, session: string, setSession: (value: string, options?: any) => void) {
    const pokerSession = await pokerDb.read(session);
    if (!pokerSession) {
        return false;
    }
    const player: Player = {
        id: pokerSession.players.length,
        user_id: user.id,
        chips: 1000,
        cards: [],
        folded: false
    }
    const playerAlreadyInSession = pokerSession.players.find((player) => player.user_id === user.id);
    if (!playerAlreadyInSession) {
        pokerSession.players.push(player);
    }
    await pokerDb.set(pokerSession);
    setSession(
        session,
        {
            expires: new Date(Date.now() + 1000 * 60 * 60),
            path: "/"
        }
    );
}

export async function exitSession (playerId: string, sessionId: string, setSession: (value: string, options?: any) => void) {
    const session = await pokerDb.read(sessionId);

    setSession(
        "",
        {
            expires: new Date(Date.now()),
            path: "/"
        }
    );

    if (!session) return false;

    if (session.owner.user_id === playerId) {
        await pokerDb.delete(sessionId);
    } else {
        session.players = session.players.filter((player) => player.user_id !== playerId);
        await pokerDb.set(session);
    }
}

export async function dealCards (sessionId: string) {
    const session = await pokerDb.read(sessionId);
    if (!session) return;

    let {cards: community, remainingDeck: deck} = getCards(generateDecks(), 5);
    
    session.community = community;
    let updatedPlayers: Player[] = session.players;
    let updatedDeck: Card[] = deck;
    
    for (let player of session.players) {
        const {cards: playerCards, remainingDeck: deck2} = getCards(updatedDeck, 2);
        updatedPlayers[player.id].cards = playerCards;
        updatedDeck = deck2;
    }

    session.deck = updatedDeck;
    session.players = updatedPlayers;

    await pokerDb.set(session);
}

export async function endRound(sessionId: string) {
    const session = await pokerDb.read(sessionId);

    if (!session) return;

    let winnerHand: EvaluatedHand | null = null;
    let winnerIndex: number | null = null;

    for (let i = 0; i < session.players.length; i++) {
        const player = session.players[i];
        if (player.folded) continue;
        const bestHandForPlayer = findBestHand([...player.cards, ...session.community]);
        if (!winnerHand || compareHands(bestHandForPlayer, winnerHand) > 0) {
            winnerHand = bestHandForPlayer;
            winnerIndex = i;
        }
    }

    if (!winnerHand || !winnerIndex) return;

    session.players[winnerIndex].chips += session.pot;
    session.pot = 0;
    session.phase = PokerPhase.PREFLOP;
    session.activePlayerIndex = 0;
    session.currentBet = 0;
    session.wasRaised = false;
    session.isStarted = false;

    await pokerDb.set(session);
}
