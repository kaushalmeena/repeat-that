export function getRandomMoves(count) {
  const tiles = ["A", "B", "C", "D"];
  const moves = [];
  for (let i = 0; i < count; i++) {
    const index = getRandomNumber(0, 3);
    moves.push(tiles[index]);
  }
  return moves;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function isSequenceCorrect(moves1, moves2) {
  if (moves1.length !== moves2.length) {
    return false;
  }
  for (let i = 0; i < moves1.length; i++) {
    if (moves1[i] !== moves2[i]) {
      return false;
    }
  }
  return true;
}
