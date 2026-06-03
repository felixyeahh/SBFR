import { Database, type DatabaseEntry } from "./database";

export class Wagers {
    static readonly COLLECTION = "wagers";
    static readonly DATE_CREATED = "date_created";
    static readonly DATE_FINISHED = "date_finished";
    static readonly WINNER = "winner";
    static readonly BET = "bet";
    static readonly PLAYERS = "players";
    static readonly BET_NAME = "betName";
    static readonly FINISHED = "finished";
}

export interface Wager extends DatabaseEntry {
    bet: number;
    betName: string;
    players: string[];
    date_created: Date;
    finished: boolean;
    winner?: string;
    date_finished?: Date;
}


export class WagerDB extends Database<Wager> {
    constructor(db: any) {
        super(db, "wagers");
    }

    public async addWager (players: string[], bet: number, betName: string) {
        return super.add ({
            id: String(globalThis.crypto.randomUUID()),
            bet: bet,
            players: players,
            date_created: new Date(),
            betName: betName,
            finished: false
        } as Wager);
    }
}

import {db} from "./database";
export const wagerdb = new WagerDB(db);
