import AsyncStorage from '@react-native-async-storage/async-storage';

export async function fetchBestScore() {
  try {
    const value = await AsyncStorage.getItem('bestScore');
    if (value !== null) {
      return Number(value);
    }
  } catch (err) {
    console.log(err)
  }
  return 0;
}

export async function storeBestScore(score) {
  try {
    await AsyncStorage.setItem('bestScore', score);
  } catch (err) {
    console.log(err)
  }
}