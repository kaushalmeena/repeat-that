import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GameTitle } from "@/components/GameTitle";
import { HelpModal } from "@/components/HelpModal";
import { ScreenView } from "@/components/ScreenView";
import { COLORS } from "@/constants/colors";
import { useBestScore } from "@/hooks/useBestScore";
import { playButtonFeedback } from "@/lib/feedback";

export function MainScreen() {
  const [helpVisible, setHelpVisible] = useState(false);
  const { bestScore } = useBestScore();

  const startGame = () => {
    playButtonFeedback();
    router.push("/game");
  };

  const openHelp = () => {
    playButtonFeedback();
    setHelpVisible(true);
  };

  return (
    <ScreenView>
      <GameTitle title="REPEAT" subtitle="THAT" style={styles.title} />
      <View style={styles.scoreBanner}>
        <Text style={styles.scoreText}>BEST: {bestScore}</Text>
      </View>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.playButton}
        onPress={startGame}
      >
        <Text style={styles.playButtonText}>PLAY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.helpButton}
        onPress={openHelp}
      >
        <Text style={styles.helpButtonText}>How to play?</Text>
      </TouchableOpacity>
      <HelpModal visible={helpVisible} onClose={() => setHelpVisible(false)} />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 40,
  },
  scoreBanner: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: COLORS.secondary,
  },
  scoreText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: COLORS.background,
  },
  playButton: {
    marginTop: 40,
    marginBottom: 20,
    padding: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  playButtonText: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "600",
    color: COLORS.background,
  },
  helpButton: {
    margin: 20,
  },
  helpButtonText: {
    fontSize: 30,
    fontWeight: "400",
    color: COLORS.secondary,
  },
});
