/** The tiles a player can tap, in the order they are laid out on screen. */
export const MOVES = ["A", "B", "C", "D"] as const;

export type Move = (typeof MOVES)[number];

/** Length of the very first sequence. The score is the length beyond this. */
export const INITIAL_SEQUENCE_LENGTH = 3;

/** How long a tile stays lit during playback, matching the length of its tone. */
export const FLASH_DURATION_MS = 300;

/** Dark pause between flashes at the start of a run. */
export const MAX_FLASH_GAP_MS = 800;

/** However high the score climbs, the pause never falls below this. */
export const MIN_FLASH_GAP_MS = 260;

/** How much each point shaves off the pause between flashes. */
export const FLASH_GAP_STEP_MS = 45;
