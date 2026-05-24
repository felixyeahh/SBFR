import { Database } from "./database";

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

export interface Wager {
    id: string;
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

    public async addWager (users: string[], bet: number, betName: string) {
        const _id = String(globalThis.crypto.randomUUID());
    
        const wager: Wager = {
            id: _id,
            bet: bet,
            players: users,
            date_created: new Date(),
            betName: betName,
            finished: false
        };
    
        return super.add(wager);
    }
}

import {db} from "./database";
export const wagerdb = new WagerDB(db);
