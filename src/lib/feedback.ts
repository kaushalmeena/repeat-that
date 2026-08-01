import {
  type AudioPlayer,
  createAudioPlayer,
  setAudioModeAsync,
} from "expo-audio";
import * as Haptics from "expo-haptics";
import type { Move } from "@/constants/game";
import gameOverTone from "../../assets/audio/game-over.wav";
import tileToneA from "../../assets/audio/tile-a.wav";
import tileToneB from "../../assets/audio/tile-b.wav";
import tileToneC from "../../assets/audio/tile-c.wav";
import tileToneD from "../../assets/audio/tile-d.wav";
import uiTapTone from "../../assets/audio/ui-tap.wav";

/**
 * One cue per tile, plus the buzz that ends a run and a click for ordinary
 * buttons. The click sits well above the tile tones in pitch and below them in
 * level, so navigating never sounds like playing.
 */
type Cue = Move | "gameOver" | "button";

/**
 * Audio and haptics are decoration. A device that will not play them still
 * plays the game, so every failure in here is deliberately swallowed.
 */
function ignore(): void {}

function createPlayers(): Record<Cue, AudioPlayer> {
  // Let whatever the player is already listening to carry on; these tones are
  // incidental. The iOS mute switch is respected by default.
  setAudioModeAsync({ interruptionMode: "mixWithOthers" }).catch(ignore);

  return {
    A: createAudioPlayer(tileToneA),
    B: createAudioPlayer(tileToneB),
    C: createAudioPlayer(tileToneC),
    D: createAudioPlayer(tileToneD),
    gameOver: createAudioPlayer(gameOverTone),
    button: createAudioPlayer(uiTapTone),
  };
}

// Built once on the first cue and kept for the life of the app: the clips are a
// few kilobytes each, and building one per tap would add audible latency.
let players: Record<Cue, AudioPlayer> | null = null;

function playCue(cue: Cue): void {
  try {
    players ??= createPlayers();
    const player = players[cue];
    // Rewind first. A cue can fire again before the last one has finished, and
    // a player parked at the end of its clip will not restart on its own.
    player.pause();
    player.seekTo(0).then(() => player.play(), ignore);
  } catch (error) {
    console.warn("Could not play game audio", error);
  }
}

/** A tile lighting up during playback. Heard, but not felt: nobody tapped. */
export function playMoveFlashFeedback(move: Move): void {
  playCue(move);
}

/** The player tapping a tile. */
export function playMovePressFeedback(move: Move): void {
  playCue(move);
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(ignore);
}

/** Any ordinary button: play, help, dismiss, home, replay. */
export function playTapPressFeedback(): void {
  playCue("button");
  // The lightest of the three haptics — this is chrome, not gameplay.
  Haptics.selectionAsync().catch(ignore);
}

/** A wrong tap, ending the run. */
export function playGameOverFeedback(): void {
  playCue("gameOver");
  Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(
    ignore,
  );
}
