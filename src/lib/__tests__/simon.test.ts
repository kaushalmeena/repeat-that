import {
  FLASH_GAP_STEP_MS,
  INITIAL_SEQUENCE_LENGTH,
  MAX_FLASH_GAP_MS,
  MIN_FLASH_GAP_MS,
  type Move
} from "@/constants/game";
import {
  applyMove,
  flashGapMs,
  type GameState,
  roundOf,
  scoreOf,
  startGame,
  startInput
} from "@/lib/simon";

/** A game sitting in the input phase with a sequence the test controls. */
function awaitingInput(sequence: Move[]): GameState {
  return { sequence, progress: 0, phase: "repeat" };
}

describe("startGame", () => {
  it("opens on playback with the initial sequence and a score of zero", () => {
    const state = startGame();

    expect(state.phase).toBe("watch");
    expect(state.sequence).toHaveLength(INITIAL_SEQUENCE_LENGTH);
    expect(state.progress).toBe(0);
    expect(scoreOf(state)).toBe(0);
  });
});

describe("startInput", () => {
  it("hands control to the player once playback finishes", () => {
    expect(startInput(startGame()).phase).toBe("repeat");
  });

  it("leaves any other phase untouched", () => {
    const over: GameState = { sequence: ["A"], progress: 0, phase: "over" };
    expect(startInput(over)).toBe(over);
  });
});

describe("applyMove", () => {
  it("advances through the sequence on correct taps", () => {
    const next = applyMove(awaitingInput(["A", "B"]), "A");

    expect(next.phase).toBe("repeat");
    expect(next.progress).toBe(1);
  });

  it("ends the run on the first wrong tap, not at the end of the sequence", () => {
    // "D" is wrong at position 0, so the run is over without the remaining two
    // taps being entered at all.
    const next = applyMove(awaitingInput(["A", "B", "C"]), "D");

    expect(next.phase).toBe("over");
  });

  it("ends the run on a wrong tap partway through", () => {
    const started = applyMove(awaitingInput(["A", "B", "C"]), "A");

    expect(applyMove(started, "C").phase).toBe("over");
  });

  it("reuses the sequence array while a round is in progress", () => {
    // The playback effect keys off this identity, so a mid-round tap must not
    // replace the array or the sequence would replay under the player.
    const state = awaitingInput(["A", "B"]);

    expect(applyMove(state, "A").sequence).toBe(state.sequence);
  });

  it("replays a fresh sequence, one tile longer, once the round is finished", () => {
    const state = awaitingInput(["A", "B"]);
    const next = applyMove(applyMove(state, "A"), "B");

    expect(next.phase).toBe("watch");
    expect(next.progress).toBe(0);
    expect(next.sequence).toHaveLength(3);
    expect(next.sequence).not.toBe(state.sequence);
    expect(scoreOf(next)).toBe(3 - INITIAL_SEQUENCE_LENGTH);
  });

  it("redraws the whole sequence rather than appending to the last one", () => {
    // Pin the generator so the new round is predictable: every draw yields "D".
    // An appending implementation would leave ["A", "B", "D"] behind instead.
    const random = jest.spyOn(Math, "random").mockReturnValue(0.99);
    const state = awaitingInput(["A", "B"]);

    const next = applyMove(applyMove(state, "A"), "B");

    expect(next.sequence).toEqual(["D", "D", "D"]);
    random.mockRestore();
  });

  it("ignores taps while the sequence is still playing back", () => {
    const watching = startGame();

    expect(applyMove(watching, "A")).toBe(watching);
  });

  it("ignores taps once the run is over", () => {
    const over: GameState = { sequence: ["A"], progress: 0, phase: "over" };

    expect(applyMove(over, "A")).toBe(over);
  });
});

describe("scoreOf", () => {
  it("counts the moves added past the opening sequence", () => {
    const state: GameState = {
      sequence: new Array(INITIAL_SEQUENCE_LENGTH + 4).fill("A"),
      progress: 0,
      phase: "watch"
    };

    expect(scoreOf(state)).toBe(4);
  });
});

describe("roundOf", () => {
  it("calls the opening sequence round one, before anything is scored", () => {
    const state = startGame();

    expect(roundOf(state)).toBe(1);
    expect(scoreOf(state)).toBe(0);
  });

  it("moves to the next round as soon as one is completed", () => {
    const state = awaitingInput(["A", "B"]);
    const next = applyMove(applyMove(state, "A"), "B");

    expect(roundOf(next)).toBe(roundOf(state) + 1);
  });
});

describe("flashGapMs", () => {
  it("starts at the slowest tempo", () => {
    expect(flashGapMs(0)).toBe(MAX_FLASH_GAP_MS);
  });

  it("closes the gap by one step per point", () => {
    expect(flashGapMs(1)).toBe(MAX_FLASH_GAP_MS - FLASH_GAP_STEP_MS);
    expect(flashGapMs(2)).toBe(MAX_FLASH_GAP_MS - 2 * FLASH_GAP_STEP_MS);
  });

  it("never drops below the floor, however high the score", () => {
    expect(flashGapMs(1000)).toBe(MIN_FLASH_GAP_MS);
    expect(flashGapMs(Number.MAX_SAFE_INTEGER)).toBe(MIN_FLASH_GAP_MS);
  });
});
