export function getRandomMoves(count) {
  const moves = [];
  for (let i = 0; i < count; i++) {
    const number = getRandomNumber(0, 3);
    moves.push(number);
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
