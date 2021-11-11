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
  const [demoMode, setDemoMode] = useState(false);
  const [activeButtonIdx, setActiveButtonIdx] = useState(-1);

  const demoInterval = useRef(null);
  const demoIndex = useRef(0);
  const level = useRef(2);
  const playerMoves = useRef([]);
  const correctMoves = useRef([]);

  function handleNextLevel() {
    setTitle1("WATCH");
    setTitle2("THIS");
    setDemoMode(true);

    level.current += 1;
    correctMoves.current = getRandomMoves(level.current);

    demoInterval.current = setInterval(function () {
      const btnIdx = correctMoves.current[demoIndex.current];
      setActiveButtonIdx(btnIdx);
      demoIndex.current += 1;
      if (demoIndex.current === correctMoves.current.length) {
        clearInterval(demoInterval.current);
        setTitle1("REPEAT");
        setTitle2("THAT");
        setDemoMode(false);
        setActiveButtonIdx(-1);
      }
    }, 1000);
  }

  function handleGameOverNavigation() {
    navigateTo(SCREENS.GameOver, { score });
  }

  function handleButtonPress(index) {
    playerMoves.current.push(index);
    if (playerMoves.current.length === correctMoves.current.length) {
      if (isSequenceCorrect(playerMoves.current, correctMoves.current)) {
        handleNextLevel();
        setScore((prevState) => prevState + 1);
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
            disabled={demoMode}
            isPressed={activeButtonIdx === 0}
            onPress={() => handleButtonPress(0)}
          />
          <RoundedButton
            text="B"
            disabled={demoMode}
            isPressed={activeButtonIdx === 1}
            onPress={() => handleButtonPress(1)}
          />
        </View>
        <View style={styles.buttonRow}>
          <RoundedButton
            text="C"
            disabled={demoMode}
            isPressed={activeButtonIdx === 2}
            onPress={() => handleButtonPress(2)}
          />
          <RoundedButton
            text="D"
            disabled={demoMode}
            isPressed={activeButtonIdx === 3}
            onPress={() => handleButtonPress(3)}
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
    marginVertical: 20
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
