import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { loadBestScore, saveBestScore } from "@/lib/storage";

/**
 * Reads the persisted best score. When `score` is given and beats the stored
 * value it is written back, returned as the new best, and flagged so the screen
 * can say so.
 */
export function useBestScore(score?: number): {
  bestScore: number;
  isNewBest: boolean;
} {
  const [best, setBest] = useState({ bestScore: 0, isNewBest: false });

  // Re-read whenever the screen regains focus rather than only on mount. The
  // menu stays mounted underneath the game in the navigation stack, so a
  // mount-only read would still be showing the score from before the last run.
  useFocusEffect(
    useCallback(() => {
      let active = true;

      loadBestScore().then((stored) => {
        if (!active) {
          return;
        }
        const isNewBest = score !== undefined && score > stored;
        setBest({ bestScore: isNewBest ? score : stored, isNewBest });
        if (isNewBest) {
          void saveBestScore(score);
        }
      });

      return () => {
        active = false;
      };
    }, [score])
  );

  return best;
}
