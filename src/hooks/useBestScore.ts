import { useEffect, useState } from "react";
import { loadBestScore, saveBestScore } from "@/lib/storage";

/**
 * Reads the persisted best score. When `score` is given and beats the stored
 * value, it is written back and returned as the new best.
 */
export function useBestScore(score?: number): number {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    let active = true;

    loadBestScore().then((stored) => {
      if (!active) {
        return;
      }
      const best = score !== undefined && score > stored ? score : stored;
      setBestScore(best);
      if (best !== stored) {
        void saveBestScore(best);
      }
    });

    return () => {
      active = false;
    };
  }, [score]);

  return bestScore;
}
