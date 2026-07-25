import {
  FLASH_GAP_STEP_MS,
  INITIAL_SEQUENCE_LENGTH,
  MAX_FLASH_GAP_MS,
  MIN_FLASH_GAP_MS,
  type Move
} from "@/constants/game";
import { randomSequence } from "@/lib/sequence";

export type GamePhase = "watch" | "repeat" | "over";

export type GameState = {
  /** The full sequence for the current round. */
  sequence: Move[];
  /** How many moves of `sequence` the player has entered correctly so far. */
  progress: number;
  phase: GamePhase;
};

/**
 * The rules of the game, kept free of React so they can be read and tested on
 * their own. Every transition returns the state unchanged when it does not
 * apply, which lets callers detect an ignored tap by identity.
 */
export function startGame(): GameState {
  return {
    sequence: randomSequence(INITIAL_SEQUENCE_LENGTH),
    progress: 0,
    phase: "watch"
  };
}

/** Playback has finished; hand control to the player. */
export function startInput(state: GameState): GameState {
  return state.phase === "watch" ? { ...state, phase: "repeat" } : state;
}

/**
 * Score a tap. A wrong tile ends the run straight away rather than at the end
 * of the sequence, so the player is never left entering a run already lost.
 */
export function applyMove(state: GameState, move: Move): GameState {
  if (state.phase !== "repeat") {
    return state;
  }

  if (move !== state.sequence[state.progress]) {
    return { ...state, phase: "over" };
  }

  const progress = state.progress + 1;
  if (progress < state.sequence.length) {
    // Mid-round, so the sequence array is reused rather than rebuilt: the
    // playback effect keys off its identity and must not restart here.
    return { ...state, progress };
  }

  return {
    // A freshly drawn sequence each round, one tile longer. Replaying the last
    // one with a tile bolted on would let the player coast on what they had
    // already memorized and only ever test the final move.
    sequence: randomSequence(state.sequence.length + 1),
    progress: 0,
    phase: "watch"
  };
}

/** The score is however many moves have been added past the opening sequence. */
export function scoreOf(state: GameState): number {
  return state.sequence.length - INITIAL_SEQUENCE_LENGTH;
}

/**
 * The round in play, counting from one. It runs a step ahead of the score: the
 * opening sequence is round 1 and is worth nothing until it is repeated back.
 */
export function roundOf(state: GameState): number {
  return scoreOf(state) + 1;
}

/**
 * Playback tempo. The gap closes as the score climbs, down to a floor, so later
 * rounds are harder to hold on to and not merely longer.
 */
export function flashGapMs(score: number): number {
  return Math.max(
    MIN_FLASH_GAP_MS,
    MAX_FLASH_GAP_MS - score * FLASH_GAP_STEP_MS
  );
}
