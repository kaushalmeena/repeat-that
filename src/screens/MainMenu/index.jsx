import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getBestScore } from "../../utils/score";
import HelpModal from "./HelpModal";

export default function MainMenu() {
  const [visible, setVisible] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(function () {
    getBestScore().then(function (score) {
      setBestScore(score);
    });
  }, []);

  function handleOpenModal() {
    setVisible(true);
  }

  function handleCloseModal() {
    setVisible(false);
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.titleText1}>REPEAT</Text>
          <Text style={styles.titleText2}>THAT</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>BEST: {bestScore}</Text>
        </View>
        <View style={styles.mainContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Text style={styles.playButtonText}>PLAY</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={handleOpenModal}>
            <Text style={styles.helpButtonText}>How to play?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <HelpModal visible={visible} onClose={handleCloseModal} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF9B6",
    alignItems: "center",
    justifyContent: "center",
  },
  topContainer: {
    marginVertical: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText1: {
    fontSize: 64,
    fontWeight: "700",
    color: "#FF9292",
  },
  titleText2: {
    fontSize: 54,
    fontWeight: "600",
    color: "#E8AA8C",
  },
  scoreContainer: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: "#E2DCD5",
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: "#5E616A",
  },
  mainContainer: {
    marginTop: 40,
    marginBottom: 20,
  },
  playButton: {
    padding: 20,
    backgroundColor: "#FF9292",
    borderRadius: 8,
  },
  playButtonText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: "#FFF9B6",
  },
  bottomContainer: {
    margin: 20,
  },
  helpButtonText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#E8AA8C",
  },
});
