import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameTitle } from "@/components/GameTitle";
import { ScreenView } from "@/components/ScreenView";
import { TileButton } from "@/components/TileButton";
import { COLORS } from "@/constants/colors";
import { MOVES } from "@/constants/game";
import { useSimonGame } from "@/hooks/useSimonGame";
import type { Navigate } from "@/navigation/routes";

export function GameplayScreen({ navigate }: { navigate: Navigate }) {
  const { phase, score, litMove, pressMove } = useSimonGame();
  const watching = phase === "watch";

  useEffect(() => {
    if (phase === "over") {
      navigate({ name: "GameOver", score });
    }
  }, [phase, score, navigate]);

  return (
    <ScreenView>
      <GameTitle
        title={watching ? "WATCH" : "REPEAT"}
        subtitle={watching ? "THIS" : "THAT"}
      />
      <Text style={styles.score}>{score}</Text>
      <View style={styles.tileGrid}>
        {MOVES.map((move) => (
          <TileButton
            key={move}
            move={move}
            disabled={phase !== "repeat"}
            lit={litMove === move}
            onPress={pressMove}
          />
        ))}
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  score: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.tertiary
  },
  tileGrid: {
    // Two tiles (100 wide + 10 margin a side) per row.
    width: 240,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  }
});
