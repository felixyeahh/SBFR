export class Users {
    static readonly DANIEL = "Daniel";
    static readonly JUSTIN = "Justin";
    static readonly PARKER = "Parker";
    static readonly COLLECTION = "players";
    static readonly POINTS = "points";
    static readonly WAGERS = "wagers";
    static readonly WINS = "wins";
    static readonly IS_ADMIN = "isAdmin";
    static readonly PASSWORD = "password";
}

export interface User {
    name: string;
    points: number;
    wagers: number;
    wins: number;
    password: string;
    isAdmin: boolean;
}

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
    id?: string;
    bet: number;
    betName: string;
    players: string[];
    date_created: Date;
    finished: boolean;
    winner?: string;
    date_finished?: Date;
}

export interface CurrentUserSession {
    username: string;
    session_id: string;
}

export class CurrentSession {
    static readonly COLLECTION = "currentSession";
    static readonly USERNAME = "username";
    static readonly SESSION_ID = "session_id";
}

export class Quests {
    static readonly COLLECTION = "quests";
}

export interface Quest {

}