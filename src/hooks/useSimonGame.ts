import { useCallback, useEffect, useRef, useState } from "react";
import {
  FLASH_DURATION_MS,
  FLASH_GAP_MS,
  INITIAL_SEQUENCE_LENGTH,
  type Move
} from "@/constants/game";
import { randomMove, randomSequence, sequencesMatch } from "@/lib/sequence";

export type GamePhase = "watch" | "repeat" | "over";

export type SimonGame = {
  /** Whether the sequence is playing back, awaiting input, or finished. */
  phase: GamePhase;
  score: number;
  /** The tile currently lit during playback, if any. */
  litMove: Move | null;
  pressMove: (move: Move) => void;
};

export function useSimonGame(): SimonGame {
  const [sequence, setSequence] = useState<Move[]>(() =>
    randomSequence(INITIAL_SEQUENCE_LENGTH)
  );
  const [phase, setPhase] = useState<GamePhase>("watch");
  const [litMove, setLitMove] = useState<Move | null>(null);
  const playerMoves = useRef<Move[]>([]);

  // Play the sequence back one tile at a time, then hand control to the
  // player. Both timers live inside this effect so leaving the screen
  // mid-playback cannot fire a flash after the screen is gone.
  useEffect(() => {
    if (phase !== "watch") {
      return;
    }

    let index = 0;
    let timer: ReturnType<typeof setTimeout>;

    const flashNext = () => {
      if (index >= sequence.length) {
        setPhase("repeat");
        return;
      }

      setLitMove(sequence[index]);
      index += 1;

      timer = setTimeout(() => {
        setLitMove(null);
        timer = setTimeout(flashNext, FLASH_GAP_MS);
      }, FLASH_DURATION_MS);
    };

    timer = setTimeout(flashNext, FLASH_GAP_MS);

    return () => clearTimeout(timer);
  }, [phase, sequence]);

  const pressMove = useCallback(
    (move: Move) => {
      if (phase !== "repeat") {
        return;
      }

      playerMoves.current = [...playerMoves.current, move];
      if (playerMoves.current.length < sequence.length) {
        return;
      }

      if (!sequencesMatch(playerMoves.current, sequence)) {
        setPhase("over");
        return;
      }

      playerMoves.current = [];
      setSequence((current) => [...current, randomMove()]);
      setPhase("watch");
    },
    [phase, sequence]
  );

  return {
    phase,
    score: sequence.length - INITIAL_SEQUENCE_LENGTH,
    litMove,
    pressMove
  };
}
