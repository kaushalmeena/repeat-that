import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { COLORS } from "../../constants/colors";
import { SCREENS } from "../../constants/screens";
import { fetchBestScore, storeBestScore } from "../../utils/score";
import HomeIcon from "./HomeIcon";
import ReplayIcon from "./ReplayIcon";

function GameOver({ screenData, navigateTo }) {
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchBestScore().then((score) => {
      if (score < screenData.score) {
        setBestScore(screenData.score);
        storeBestScore(screenData.score);
      } else {
        setBestScore(score);
      }
    });
  }, []);

  const handleMainMenuNavigation = () => {
    navigateTo(SCREENS.MainMenu);
  };

  const handleGameplayNavigation = () => {
    navigateTo(SCREENS.Gameplay);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>GAME OVER</Text>
        <Text style={styles.scoreText}>SCORE: {screenData.score}</Text>
        <Text style={styles.bestScoreText}>BEST: {bestScore}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={handleMainMenuNavigation}
          >
            <HomeIcon fill={COLORS.background} height="60" width="60" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.roundedButton}
            onPress={handleGameplayNavigation}
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
    justifyContent: "center"
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
    borderRadius: 8
  },
  titleText: {
    textAlign: "center",
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.background
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.background
  },
  bestScoreText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.background
  },
  buttonContainer: {
    position: "absolute",
    bottom: -50,
    flexDirection: "row"
  },
  roundedButton: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 8
  }
});

GameOver.propTypes = {
  screenData: PropTypes.shape({ score: PropTypes.number }).isRequired,
  navigateTo: PropTypes.func.isRequired
};

export default GameOver;
