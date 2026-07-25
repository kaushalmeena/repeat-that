import { MOVES, type Move } from "@/constants/game";

export function randomMove(): Move {
  return MOVES[Math.floor(Math.random() * MOVES.length)];
}

export function randomSequence(length: number): Move[] {
  return Array.from({ length }, randomMove);
}
