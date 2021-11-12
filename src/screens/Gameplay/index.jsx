import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { SCREENS } from "../../constants/screens";
import { getRandomMoves, isSequenceCorrect } from "../../utils/gameplay";
import RoundedButton from "./RoundedButton";

export default function Gameplay({ navigateTo }) {
  const [title1, setTitle1] = useState("REPEAT");
  const [title2, setTitle2] = useState("THAT");
  const [score, setScore] = useState(0);

  const [watchMode, setWatchMode] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const level = useRef(2);
  const playerMoves = useRef([]);
  const correctMoves = useRef([]);

  function activateButton(index) {
    setActiveButton(index);
    setTimeout(() => {
      setActiveButton("");
    }, 300);
  }

  function handleNextLevel() {
    setTitle1("WATCH");
    setTitle2("THIS");
    setWatchMode(true);

    level.current += 1;
    playerMoves.current = [];
    correctMoves.current = getRandomMoves(level.current);

    for (let i = 0; i < correctMoves.current.length; i++) {
      const btnIdx = correctMoves.current[i];
      setTimeout(function () {
        activateButton(btnIdx);
      }, (i + 1) * 800);
    }

    setTimeout(function () {
      setTitle1("REPEAT");
      setTitle2("THAT");
      setWatchMode(false);
    }, (correctMoves.current.length + 1) * 800);
  }

  function handleGameOverNavigation() {
    navigateTo(SCREENS.GameOver, { score });
  }

  function handleButtonPress(index) {
    playerMoves.current.push(index);
    if (playerMoves.current.length === correctMoves.current.length) {
      if (isSequenceCorrect(playerMoves.current, correctMoves.current)) {
        handleNextLevel();
        setScore((prevScore) => prevScore + 1);
      } else {
        handleGameOverNavigation();
      }
    }
  }

  useEffect(function () {
    handleNextLevel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText1}>{title1}</Text>
        <Text style={styles.titleText2}>{title2}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <RoundedButton
            text="A"
            disabled={watchMode}
            isPressed={activeButton === "A"}
            onPress={() => handleButtonPress("A")}
          />
          <RoundedButton
            text="B"
            disabled={watchMode}
            isPressed={activeButton === "B"}
            onPress={() => handleButtonPress("B")}
          />
        </View>
        <View style={styles.buttonRow}>
          <RoundedButton
            text="C"
            disabled={watchMode}
            isPressed={activeButton === "C"}
            onPress={() => handleButtonPress("C")}
          />
          <RoundedButton
            text="D"
            disabled={watchMode}
            isPressed={activeButton === "D"}
            onPress={() => handleButtonPress("D")}
          />
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
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText1: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.primary,
  },
  titleText2: {
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.secondary,
  },
  scoreContainer: {
    marginVertical: 20,
  },
  scoreText: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.tertiary,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonRow: {
    flexDirection: "row",
  },
});
