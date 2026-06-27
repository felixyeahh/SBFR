import { randomBytes } from "crypto";
import { pokerDb } from "@/app/tools/database/poker";
import { type PokerSession, PokerPhase, type Player } from "@/app/tools/database/poker";
import  { type User, CurrentSession} from "@/app/tools/constants";
import { generateDecks, getCards } from "../cardManagement";

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

export async function dealCards (sessionId: string, user: User) {
    const session = await pokerDb.read(sessionId);
    if (!session) return;

    let {cards: community, remainingDeck: deck} = getCards(generateDecks(), 5);
    
    session.community = community;

    const player_index = session.players.findIndex((player) => player.user_id === user.id);
    const {cards: playerCards, remainingDeck: deck2} = getCards(deck, 2);

    session.players[player_index].cards = playerCards;
    session.deck = deck2;

    await pokerDb.set(session);
}
