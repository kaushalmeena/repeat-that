import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GameTitle } from "@/components/GameTitle";
import { ScreenView } from "@/components/ScreenView";
import { TileButton } from "@/components/TileButton";
import { COLORS } from "@/constants/colors";
import { MOVES } from "@/constants/game";
import { useSimonGame } from "@/hooks/useSimonGame";

export default function GamePlayScreen() {
  const { phase, score, round, litMove, pressMove } = useSimonGame();
  const watching = phase === "watch";

  useEffect(() => {
    if (phase === "over") {
      // Replace rather than push: a finished game is not somewhere the back
      // gesture should be able to return to.
      router.replace({ pathname: "/game-over", params: { score } });
    }
  }, [phase, score]);

  return (
    <ScreenView>
      <GameTitle
        title={watching ? "WATCH" : "REPEAT"}
        subtitle={watching ? "THIS" : "THAT"}
      />
      <Text style={styles.roundLabel}>ROUND</Text>
      <Text style={styles.round}>{round}</Text>
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
  roundLabel: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
    color: COLORS.tertiary
  },
  round: {
    marginBottom: 18,
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
