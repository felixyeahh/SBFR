export type Suit = "♠" | "♥" | "♦" | "♣";
export type Rank = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";

export interface Card {
  rank: Rank;
  suit: Suit;
}

enum HandRank {
  HighCard = 0, 
  Pair = 1, 
  TwoPair = 2, 
  ThreeOfAKind = 3, 
  Straight = 4,
  Flush = 5, 
  FullHouse = 6, 
  FourOfAKind = 7, 
  StraightFlush = 8, 
  RoyalFlush = 9
}
export const HAND_NAMES: Record<HandRank, string> = {
  0: "High card",
  1: "One pair",
  2: "Two pair",
  3: "Three of a kind",
  4: "Straight",
  5: "Flush",
  6: "Full house",
  7: "Four of a kind",
  8: "Straight flush",
  9: "Royal flush",
};

export interface EvaluatedHand {
  rank: HandRank;
  name: string;
  tiebreakers: number[];
  cards: Card[];
}

// ── Constants ────────────────────────────────────────────────────────────────

const RANK_VALUE: Record<Rank, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8,
  "9": 9, "10": 10, J: 11, Q: 12, K: 13, A: 14,
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function combinations<T>(arr: T[], k: number): T[][] {
  const result: T[][] = [];
  function helper(start: number, combo: T[]): void {
    if (combo.length === k) { result.push([...combo]); return; }
    for (let i = start; i < arr.length; i++) {
      combo.push(arr[i]);
      helper(i + 1, combo);
      combo.pop();
    }
  }
  helper(0, []);
  return result;
}

function groupBy<T>(arr: T[], key: (item: T) => string): Record<string, T[]> {
  return arr.reduce<Record<string, T[]>>((acc, item) => {
    const k = key(item);
    (acc[k] ??= []).push(item);
    return acc;
  }, {});
}

// ── Core 5-card evaluator ────────────────────────────────────────────────────

function evaluate5(cards: Card[]): EvaluatedHand {
  const vals = cards.map((c) => RANK_VALUE[c.rank]).sort((a, b) => b - a);
  const byRank = groupBy(cards, (c) => c.rank);
  const bySuit = groupBy(cards, (c) => c.suit);

  const isFlush = Object.values(bySuit).some((g) => g.length === 5);

  // Straight detection (including A-low wheel: A-2-3-4-5)
  const uniqVals = [...new Set(vals)].sort((a, b) => b - a);
  let isStraight = false;
  let straightHigh = 0;

  if (uniqVals.length === 5 && uniqVals[0] - uniqVals[4] === 4) {
    isStraight = true;
    straightHigh = uniqVals[0];
  } else if (
    vals.includes(14) &&
    uniqVals.slice(-4).join() === [2, 3, 4, 5].join()
  ) {
    // Wheel: treat ace as 1
    isStraight = true;
    straightHigh = 5;
  }

  // Build kicker list ordered by group size desc, then card value desc.
  // This naturally encodes tiebreak priority for every hand type.
  const kickers: number[] = [];
  ([4, 3, 2, 1] as const).forEach((count) => {
    Object.entries(byRank)
      .filter(([, g]) => g.length === count)
      .map(([r]) => RANK_VALUE[r as Rank])
      .sort((a, b) => b - a)
      .forEach((v) => {
        for (let i = 0; i < count; i++) kickers.push(v);
      });
  });

  const counts = Object.values(byRank)
    .map((g) => g.length)
    .sort((a, b) => b - a);

  let rank: HandRank;
  let tiebreakers: number[];

  if (isFlush && isStraight) {
    const isRoyal = straightHigh === 14 && vals[4] === 10;
    rank = isRoyal ? 9 : 8;
    tiebreakers = [straightHigh];
  } else if (counts[0] === 4) {
    rank = 7; tiebreakers = kickers;
  } else if (counts[0] === 3 && counts[1] === 2) {
    rank = 6; tiebreakers = kickers;
  } else if (isFlush) {
    rank = 5; tiebreakers = vals;
  } else if (isStraight) {
    rank = 4; tiebreakers = [straightHigh];
  } else if (counts[0] === 3) {
    rank = 3; tiebreakers = kickers;
  } else if (counts[0] === 2 && counts[1] === 2) {
    rank = 2; tiebreakers = kickers;
  } else if (counts[0] === 2) {
    rank = 1; tiebreakers = kickers;
  } else {
    rank = 0; tiebreakers = vals;
  }

  return { rank, name: HAND_NAMES[rank], tiebreakers, cards };
}

// ── Tiebreaker comparator ────────────────────────────────────────────────────

/**
 * Compare two evaluated hands.
 * Returns a negative number if `a` loses, 0 for a tie, positive if `a` wins.
 */
export function compareHands(a: EvaluatedHand, b: EvaluatedHand): number {
  if (a.rank !== b.rank) return a.rank - b.rank;
  const len = Math.max(a.tiebreakers.length, b.tiebreakers.length);
  for (let i = 0; i < len; i++) {
    const diff = (a.tiebreakers[i] ?? 0) - (b.tiebreakers[i] ?? 0);
    if (diff !== 0) return diff;
  }
  return 0;
}

// ── Main export ──────────────────────────────────────────────────────────────

/**
 * Find the best 5-card poker hand from 5–7 cards (Texas Hold'em).
 *
 * @param cards - Array of 5, 6, or 7 Card objects.
 * @returns The best possible EvaluatedHand, including the exact 5 cards used
 *          and a tiebreakers array ready for head-to-head comparison.
 *
 * @example
 * const result = findBestHand([
 *   { rank: "A", suit: "♠" }, { rank: "K", suit: "♠" },
 *   { rank: "Q", suit: "♠" }, { rank: "J", suit: "♠" },
 *   { rank: "10", suit: "♠" }, { rank: "2", suit: "♥" },
 *   { rank: "7", suit: "♦" },
 * ]);
 * // => { rank: 9, name: "Royal flush", cards: [...], tiebreakers: [14] }
 */
export function findBestHand(cards: Card[]): EvaluatedHand {
  if (cards.length < 5 || cards.length > 7) {
    throw new Error(`Expected 5–7 cards, got ${cards.length}`);
  }

  const combos = combinations(cards, 5);
  let best: EvaluatedHand | null = null;

  for (const combo of combos) {
    const ev = evaluate5(combo);
    if (!best || compareHands(ev, best) > 0) best = ev;
  }

  return best!;
}