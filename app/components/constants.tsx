export class Users {
    static readonly DANIEL = "Daniel";
    static readonly JUSTIN = "Justin";
    static readonly PARKER = "Parker";
    static readonly USERS = [Users.DANIEL, Users.JUSTIN, Users.PARKER];
    static readonly COLLECTION = "players";
    static readonly POINTS = "points";
    static readonly WINS = "wins";
}

export interface User {
    name: string;
    points: number;
    wagers: number;
    wins: number;
}

export class Wagers {
    static readonly COLLECTION = "wagers";
    static readonly WINNER = "winner";
    static readonly BET = "bet";
    static readonly LOSERS = "losers";
}

export interface Wager {
    id: string;
    winner: string;
    bet: number;
    losers: string[];
}
