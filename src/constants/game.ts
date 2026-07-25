/** The tiles a player can tap, in the order they are laid out on screen. */
export const MOVES = ["A", "B", "C", "D"] as const;

export type Move = (typeof MOVES)[number];

/** Length of the very first sequence. The score is the length beyond this. */
export const INITIAL_SEQUENCE_LENGTH = 3;

/** How long a tile stays lit during playback. */
export const FLASH_DURATION_MS = 300;

/** Dark pause before each flash during playback. */
export const FLASH_GAP_MS = 800;
