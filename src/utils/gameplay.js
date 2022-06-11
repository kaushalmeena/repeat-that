import { MOVE_LETTERS } from "../constants/gameplay";

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomMove() {
  const tiles = Object.values(MOVE_LETTERS);
  const index = getRandomNumber(0, tiles.length - 1);
  return tiles[index];
}

export function getRandomMoves(count) {
  const moves = [];
  for (let i = 0; i < count; i += 1) {
    const move = getRandomMove();
    moves.push(move);
  }
  return moves;
}

export function isSequenceCorrect(moves1, moves2) {
  if (moves1.length !== moves2.length) {
    return false;
  }
  for (let i = 0; i < moves1.length; i += 1) {
    if (moves1[i] !== moves2[i]) {
      return false;
    }
  }
  return true;
}
