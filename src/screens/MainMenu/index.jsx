import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";

function MainMenu() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText1}>REPEAT</Text>
        <Text style={styles.titleText2}>THAT</Text>
      </View>
      <View style={styles.scoreContainer}></View>
      <View style={styles.buttonContainer}></View>
      <View style={styles.instructionContainer}>
        <Text style={styles.instructionText}>THAT</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "FFE699",
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {},
  titleText1: {},
  titleText2: {},
  scoreContainer: {},
  buttonContainer: {},
  instructionContainer: {},
  instructionText: {},
});

export default MainMenu;
