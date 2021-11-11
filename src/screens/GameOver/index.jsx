import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { SCREENS } from "../../constants/screens";
import HomeIcon from "./HomeIcon";
import ReplayIcon from "./ReplayIcon";

export default function GameOver({ navigateTo }) {
  function handleHomeNavigate() {
    navigateTo(SCREENS.MainMenu);
  }
  function handleGameplayNavigate() {
    navigateTo(SCREENS.Gameplay);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>GAME OVER</Text>
        <Text style={styles.scoreText}>SCORE: 1</Text>
        <Text style={styles.bestScoreText}>BEST: 1</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={handleHomeNavigate}
          >
            <HomeIcon fill={COLORS.background} height="60" width="60" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={handleGameplayNavigate}
          >
            <ReplayIcon fill={COLORS.background} height="60" width="60" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    position: "relative",
    marginHorizontal: 30,
    marginBottom: 50,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 70,
    backgroundColor: COLORS.primary,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  titleText: {
    textAlign: "center",
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.background,
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.background,
  },
  bestScoreText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.background,
  },
  buttonContainer: {
    position: "absolute",
    bottom: -50,
    flexDirection: "row",
  },
  roundedButton: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
  },
});
