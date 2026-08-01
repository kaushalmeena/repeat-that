import { router, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScreenView } from "@/components/ScreenView";
import { COLORS } from "@/constants/colors";
import { useBestScore } from "@/hooks/useBestScore";
import { HomeIcon } from "@/icons/HomeIcon";
import { ReplayIcon } from "@/icons/ReplayIcon";
import { playTapPressFeedback } from "@/lib/feedback";

export function DeathScreen() {
  // Route params arrive as strings, and this screen can be opened directly by
  // URL, so anything unparseable is treated as no score rather than trusted.
  const { score: rawScore } = useLocalSearchParams<{ score?: string }>();
  const score = Number(rawScore) || 0;

  const { bestScore, isNewBest } = useBestScore(score);

  const goHome = () => {
    playTapPressFeedback();
    // Drop the whole stack back to the menu. Opening this screen from a link
    // leaves nothing to pop, so fall back to replacing it outright.
    if (router.canDismiss()) {
      router.dismissAll();
    } else {
      router.replace("/");
    }
  };

  const playAgain = () => {
    playTapPressFeedback();
    router.replace("/game");
  };

  return (
    <ScreenView>
      <View style={styles.card}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.score}>SCORE: {score}</Text>
        {isNewBest ? (
          // The new best and the score just shown are the same number, so the
          // badge stands in for the BEST line rather than adding to it.
          <View style={styles.newBest}>
            <Text style={styles.newBestText}>NEW BEST!</Text>
          </View>
        ) : (
          <Text style={styles.bestScore}>BEST: {bestScore}</Text>
        )}
        <View style={styles.actions}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Main menu"
            style={styles.actionButton}
            onPress={goHome}
          >
            <HomeIcon fill={COLORS.background} height={60} width={60} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Play again"
            style={styles.actionButton}
            onPress={playAgain}
          >
            <ReplayIcon fill={COLORS.background} height={60} width={60} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 30,
    marginBottom: 50,
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 70,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8
  },
  title: {
    textAlign: "center",
    fontSize: 54,
    fontWeight: "600",
    color: COLORS.background
  },
  score: {
    textAlign: "center",
    fontSize: 34,
    fontWeight: "700",
    color: COLORS.background
  },
  bestScore: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "500",
    color: COLORS.background
  },
  newBest: {
    // Sized to sit in the same vertical space as the BEST line it replaces.
    marginVertical: 2,
    paddingHorizontal: 14,
    paddingVertical: 3,
    backgroundColor: COLORS.background,
    borderRadius: 999
  },
  newBestText: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 1,
    color: COLORS.secondary
  },
  actions: {
    position: "absolute",
    bottom: -50,
    flexDirection: "row"
  },
  actionButton: {
    height: 100,
    width: 100,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.secondary,
    borderRadius: 8
  }
});
