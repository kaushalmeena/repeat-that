import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";
import {
  BUTTON_PRESS_DELAY,
  MOVE_DELAY,
  MOVE_LETTERS
} from "../../constants/gameplay";
import { SCREENS } from "../../constants/screens";
import {
  getRandomMove,
  getRandomMoves,
  isSequenceCorrect
} from "../../utils/gameplay";
import RoundedButton from "./RoundedButton";

function Gameplay({ navigateTo }) {
  const [title, setTitle] = useState("REPEAT");
  const [subtitle, setSubtitle] = useState("THAT");
  const [score, setScore] = useState(-1);

  const [watchMode, setWatchMode] = useState(false);
  const [activeButton, setActiveButton] = useState("");

  const playerMoves = useRef([]);
  const correctMoves = useRef(getRandomMoves(2));

  const activateButton = (letter, moveIndex) => {
    setActiveButton(letter);
    setTimeout(() => {
      setActiveButton("");
      showNextMove(moveIndex + 1);
    }, BUTTON_PRESS_DELAY);
  };

  const showNextMove = (moveIndex = 0) => {
    if (moveIndex < correctMoves.current.length) {
      const letter = correctMoves.current[moveIndex];
      setTimeout(() => {
        activateButton(letter, moveIndex);
      }, MOVE_DELAY);
    } else {
      setTitle("REPEAT");
      setSubtitle("THAT");
      setWatchMode(false);
    }
  };

  const handleNextLevel = () => {
    setTitle("WATCH");
    setSubtitle("THIS");
    setScore((prevScore) => prevScore + 1);
    setWatchMode(true);

    playerMoves.current = [];
    correctMoves.current = [...correctMoves.current, getRandomMove()];

    showNextMove();
  };

  const handleGameOverNavigation = () => {
    navigateTo(SCREENS.GameOver, { score });
  };

  const handleButtonPress = (letter) => {
    playerMoves.current.push(letter);
    if (playerMoves.current.length === correctMoves.current.length) {
      if (isSequenceCorrect(playerMoves.current, correctMoves.current)) {
        handleNextLevel();
      } else {
        handleGameOverNavigation();
      }
    }
  };

  useEffect(() => {
    handleNextLevel();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>{score}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <RoundedButton
            text={MOVE_LETTERS.A}
            disabled={watchMode}
            isPressed={activeButton === MOVE_LETTERS.A}
            onPress={() => handleButtonPress(MOVE_LETTERS.A)}
          />
          <RoundedButton
            text={MOVE_LETTERS.B}
            disabled={watchMode}
            isPressed={activeButton === MOVE_LETTERS.B}
            onPress={() => handleButtonPress(MOVE_LETTERS.B)}
          />
        </View>
        <View style={styles.buttonRow}>
          <RoundedButton
            text={MOVE_LETTERS.C}
            disabled={watchMode}
            isPressed={activeButton === MOVE_LETTERS.C}
            onPress={() => handleButtonPress(MOVE_LETTERS.C)}
          />
          <RoundedButton
            text={MOVE_LETTERS.D}
            disabled={watchMode}
            isPressed={activeButton === MOVE_LETTERS.D}
            onPress={() => handleButtonPress(MOVE_LETTERS.D)}
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
    justifyContent: "center"
  },
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.primary
  },
  subtitleText: {
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.secondary
  },
  scoreContainer: {
    marginVertical: 20
  },
  scoreText: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.tertiary
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  buttonRow: {
    flexDirection: "row"
  }
});

Gameplay.propTypes = {
  navigateTo: PropTypes.func.isRequired
};

export default Gameplay;
