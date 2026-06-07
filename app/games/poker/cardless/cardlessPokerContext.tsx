import { Card } from "./cardManagement";

export interface Player {
    id: string;
    name: string;
    chips: number;
    folded: boolean;
    cards: Card[];
}

