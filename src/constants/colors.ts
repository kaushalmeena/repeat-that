import type { Move } from "@/constants/game";

export const COLORS = {
  primary: "#ECB390",
  secondary: "#DF7861",
  tertiary: "#87AAAA",
  background: "#FCF8E8",
  /** Cream at reduced strength, for secondary text on a filled card. */
  backgroundMuted: "rgba(252, 248, 232, 0.78)",
  /** Dark warm brown, for text that has to stay legible on a lit tile. */
  ink: "#3F2B21",
  scrim: "rgba(0, 0, 0, 0.5)"
} as const;

/**
 * One hue per tile, each with a resting fill and a brighter lit fill. Telling
 * the tiles apart at a glance is the whole game, so they no longer share a
 * single color, and the A-D letters stay on top so it is still playable without
 * color vision. Every fill clears 3:1 against `ink` for the label.
 */
export const TILE_COLORS: Record<Move, { idle: string; lit: string }> = {
  A: { idle: "#CB7259", lit: "#F79A7C" },
  B: { idle: "#BE8B33", lit: "#F0C263" },
  C: { idle: "#5F8C8C", lit: "#95C0C0" },
  D: { idle: "#9878AC", lit: "#C79EDA" }
};
