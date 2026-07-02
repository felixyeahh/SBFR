export function shuffle<T>(array: T[]) {
  let currentIndex = array.length;

  while (currentIndex != 0) {

    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export function randomUUID() {
    return String(globalThis.crypto.randomUUID());
}

import { PokerPhase } from "./database/poker";

export function pokerPhaseToString(phase: PokerPhase) {
    let _phase = "";
    switch (phase) {
        case PokerPhase.PREFLOP:
            _phase = "Preflop";
            break;
        case PokerPhase.FLOP:
            _phase = "Flop";
            break;
        case PokerPhase.TURN:
            _phase = "Turn";
            break;
        case PokerPhase.RIVER:
            _phase = "River";
            break;
        case PokerPhase.SHOWDOWN:
            _phase = "Showdown";
            break;
    }
    return _phase;
}