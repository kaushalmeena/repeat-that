import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

export default function RoundedButton({ text, disabled, isPressed, onPress }) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        {
          opacity: pressed || isPressed ? 0.5 : 1,
        },
        styles.container,
      ]}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ECB390",
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "600",
    color: "#FCF8E8",
  },
});
