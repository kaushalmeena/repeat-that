import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { ReplayIcon } from "@/components/icons/ReplayIcon";
import { ScreenView } from "@/components/ScreenView";
import { COLORS } from "@/constants/colors";
import { useBestScore } from "@/hooks/useBestScore";
import type { Navigate } from "@/navigation/routes";

export function GameOverScreen({
  score,
  navigate
}: {
  score: number;
  navigate: Navigate;
}) {
  const bestScore = useBestScore(score);

  return (
    <ScreenView>
      <View style={styles.card}>
        <Text style={styles.title}>GAME OVER</Text>
        <Text style={styles.score}>SCORE: {score}</Text>
        <Text style={styles.bestScore}>BEST: {bestScore}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Main menu"
            style={styles.actionButton}
            onPress={() => navigate({ name: "MainMenu" })}
          >
            <HomeIcon fill={COLORS.background} height={60} width={60} />
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Play again"
            style={styles.actionButton}
            onPress={() => navigate({ name: "Gameplay" })}
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
