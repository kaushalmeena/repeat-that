import AsyncStorage from "@react-native-async-storage/async-storage";

const BEST_SCORE_KEY = "best-score";

export async function loadBestScore(): Promise<number> {
  try {
    // Number(null) and Number("") are both 0, which is the right default.
    const stored = Number(await AsyncStorage.getItem(BEST_SCORE_KEY));
    return Number.isFinite(stored) ? stored : 0;
  } catch (error) {
    console.warn("Could not read the stored best score", error);
    return 0;
  }
}

export async function saveBestScore(score: number): Promise<void> {
  try {
    // AsyncStorage rejects anything that is not a string.
    await AsyncStorage.setItem(BEST_SCORE_KEY, String(score));
  } catch (error) {
    console.warn("Could not save the best score", error);
  }
}
