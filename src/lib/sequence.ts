import { MOVES, type Move } from "@/constants/game";

export function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

export function randomSequence(length: number): Move[] {
  return Array.from({ length }, randomMove);
}

export function sequencesMatch(
  a: readonly Move[],
  b: readonly Move[]
): boolean {
  return a.length === b.length && a.every((move, index) => move === b[index]);
}
