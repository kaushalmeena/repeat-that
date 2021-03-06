import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";
import { SCREENS } from "../../constants/screens";
import { fetchBestScore } from "../../utils/score";
import HelpModal from "./HelpModal";

function MainMenu({ navigateTo }) {
  const [visible, setVisible] = useState(false);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    fetchBestScore().then((score) => {
      setBestScore(score);
    });
  }, []);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleGameplayNavigation = () => {
    navigateTo(SCREENS.Gameplay);
  };

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
          <TouchableOpacity
            style={styles.playButton}
            onPress={handleGameplayNavigation}
          >
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
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center"
  },
  topContainer: {
    marginVertical: 40,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  titleText1: {
    fontSize: 64,
    fontWeight: "700",
    color: COLORS.primary
  },
  titleText2: {
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.secondary
  },
  scoreContainer: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: COLORS.secondary
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: COLORS.background
  },
  mainContainer: {
    marginTop: 40,
    marginBottom: 20
  },
  playButton: {
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 8
  },
  playButtonText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: COLORS.background
  },
  bottomContainer: {
    margin: 20
  },
  helpButtonText: {
    fontSize: 30,
    fontWeight: "400",
    color: COLORS.secondary
  }
});

MainMenu.propTypes = {
  navigateTo: PropTypes.func.isRequired
};

export default MainMenu;
