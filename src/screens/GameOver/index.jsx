import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SCREENS } from "../../constants/screens";
import HomeIcon from "./HomeIcon";
import ReplayIcon from "./ReplayIcon";

function GameOver({ navigateTo }) {
  function handleHomeNavigate() {
    navigateTo(SCREENS.MainMenu);
  }
  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <Text style={styles.titleText}>GAME OVER</Text>
        <Text style={styles.scoreText}>SCORE: 1</Text>
        <Text style={styles.bestScoreText}>BEST: 1</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.roundedSquareButton}
            onPress={handleHomeNavigate}
          >
            <HomeIcon fill="#F0E9D2" height="60" width="60" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundedSquareButton}>
            <ReplayIcon fill="#F0E9D2" height="60" width="60" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0E9D2",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContainer: {
    position: "relative",
    marginHorizontal: 20,
    marginBottom: 50,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 70,
    backgroundColor: "#678983",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  titleText: {
    textAlign: "center",
    fontSize: 54,
    fontWeight: "600",
    color: "#F0E9D2",
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: "#F0E9D2",
  },
  bestScoreText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: "#F0E9D2",
  },
  buttonContainer: {
    position: "absolute",
    bottom: -50,
    flexDirection: "row",
  },
  roundedSquareButton: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#181D31",
    borderRadius: 8,
  },
});

export default GameOver;
