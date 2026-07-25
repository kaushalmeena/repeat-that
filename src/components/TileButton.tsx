import { Pressable, StyleSheet, Text } from "react-native";
import { COLORS } from "@/constants/colors";
import type { Move } from "@/constants/game";

export function TileButton({
  move,
  disabled,
  lit,
  onPress
}: {
  move: Move;
  disabled: boolean;
  /** True while the sequence playback is flashing this tile. */
  lit: boolean;
  onPress: (move: Move) => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Tile ${move}`}
      disabled={disabled}
      onPress={() => onPress(move)}
      style={({ pressed }) => [
        styles.container,
        (pressed || lit) && styles.lit
      ]}
    >
      <Text style={styles.label}>{move}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 8
  },
  lit: {
    opacity: 0.5
  },
  label: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "600",
    color: COLORS.background
  }
});
