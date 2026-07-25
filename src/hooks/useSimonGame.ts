import { useCallback, useEffect, useRef, useState } from "react";
import { FLASH_DURATION_MS, type Move } from "@/constants/game";
import {
  playFlashFeedback,
  playGameOverFeedback,
  playTapFeedback
} from "@/lib/feedback";
import {
  applyMove,
  flashGapMs,
  type GamePhase,
  type GameState,
  roundOf,
  scoreOf,
  startGame,
  startInput
} from "@/lib/simon";

export type SimonGame = {
  /** Whether the sequence is playing back, awaiting input, or finished. */
  phase: GamePhase;
  score: number;
  /** The round in play, counting from one. */
  round: number;
  /** The tile currently lit during playback, if any. */
  litMove: Move | null;
  pressMove: (move: Move) => void;
};

export function useSimonGame(): SimonGame {
  const [state, setState] = useState<GameState>(startGame);
  const [litMove, setLitMove] = useState<Move | null>(null);

  // Taps can land faster than React re-renders, so the ref is the state of
  // record and `state` is only the copy the screen draws from. Every transition
  // goes through `commit`, which keeps the two in step.
  const latest = useRef(state);
  const commit = useCallback((next: GameState) => {
    latest.current = next;
    setState(next);
  }, []);

  const { phase, sequence } = state;
  const score = scoreOf(state);

  // Play the sequence back a tile at a time, then hand over to the player. Both
  // timers live inside the effect so leaving the screen mid-playback cannot
  // fire a flash after the screen is gone.
  useEffect(() => {
    if (phase !== "watch") {
      return;
    }

    const gap = flashGapMs(score);
    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const flashNext = () => {
      if (index >= sequence.length) {
        commit(startInput(latest.current));
        return;
      }

      const move = sequence[index];
      setLitMove(move);
      playFlashFeedback(move);
      index += 1;

      timer = setTimeout(() => {
        setLitMove(null);
        timer = setTimeout(flashNext, gap);
      }, FLASH_DURATION_MS);
    };

    timer = setTimeout(flashNext, gap);

    return () => {
      clearTimeout(timer);
      // Bailing out mid-flash would otherwise strand a tile in its lit color.
      setLitMove(null);
    };
  }, [phase, sequence, score, commit]);

  const pressMove = useCallback(
    (move: Move) => {
      const current = latest.current;
      const next = applyMove(current, move);
      if (next === current) {
        return;
      }

      if (next.phase === "over") {
        playGameOverFeedback();
      } else {
        playTapFeedback(move);
      }
      commit(next);
    },
    [commit]
  );

  return { phase, score, round: roundOf(state), litMove, pressMove };
}
