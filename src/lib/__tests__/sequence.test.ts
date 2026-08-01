import { MOVES } from "@/constants/game";
import { randomMove, randomSequence } from "@/lib/sequence";

describe("randomMove", () => {
  it("only ever returns a real move", () => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      expect(MOVES).toContain(randomMove());
    }
  });

  it("reaches both ends of the tile list", () => {
    // Math.random is half-open, so 0 and almost-1 have to map onto the first
    // and last tile for every tile to be reachable.
    const random = jest.spyOn(Math, "random").mockReturnValue(0);
    expect(randomMove()).toBe("A");

    random.mockReturnValue(0.9999999);
    expect(randomMove()).toBe("D");

    random.mockRestore();
  });
});

describe("randomSequence", () => {
  it("returns as many moves as asked for", () => {
    expect(randomSequence(5)).toHaveLength(5);
  });

  it("returns nothing for a length of zero", () => {
    expect(randomSequence(0)).toEqual([]);
  });
});
