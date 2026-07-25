/**
 * The app is three screens with no back stack, so routes are a plain
 * discriminated union instead of a navigation library. Params belong to the
 * branch that needs them: `score` only type checks on the GameOver route.
 */
export type Route =
  | { name: "MainMenu" }
  | { name: "Gameplay" }
  | { name: "GameOver"; score: number };

export type Navigate = (route: Route) => void;
