import { PokerSession, Player, PokerSessionDatabase } from "@/app/tools/database/poker";
import type { User } from "@/app/tools/constants";
import updatePlayer from "./updatePlayer";

export default class PlayerActions {
    private session: PokerSession;
    private user: User;
    private db: PokerSessionDatabase;
    public current_player: Player;

    constructor(session: PokerSession, user: User, db: PokerSessionDatabase) {
        this.session = session;
        this.db = db;
        this.user = user;

        const currentPlayer = session.players.find(p => p.user_id === user.id);
        if (!currentPlayer) throw new Error("Player not found");
        this.current_player = currentPlayer;
    }
    
    nextPlayer = async () => {
        let newIndex = this.session.activePlayerIndex + 1;
        let currentPhase = this.session.phase;
        if (newIndex >= this.session.players.length ) {
            if (!this.session.wasRaised) {
                currentPhase++;
            }
            return await this.db.set({...this.session, activePlayerIndex: 0, phase: currentPhase});
        }
        while(this.session.players[newIndex]?.folded) {
            newIndex++;
        }
        return await this.db.set({...this.session, activePlayerIndex: newIndex});
    }

    fold = async () => {
        await this.nextPlayer();
        if (!this.session.id || !this.user?.id) return;
        await updatePlayer(this.session.id, this.current_player.id, {...this.current_player, folded: true});
    }

    check = async () => {
        await this.nextPlayer();
    }

    bet = async () => {
        await this.nextPlayer();
    }

    call = async () => {
        await this.nextPlayer();

        if (!this.session.id || !this.user?.id) return;
        await updatePlayer(this.session.id, this.current_player.id, {...this.current_player, folded: true});
    }

    raise = async () => {
        await this.nextPlayer();
        
    }

}