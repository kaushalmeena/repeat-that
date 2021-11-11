import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getBestScore() {
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

export async function setBestScore(score) {
  try {
    await AsyncStorage.setItem('bestScore', score);
  } catch (err) {
    console.log(err)
  }
}