import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SCREENS } from "./src/constants/screens";
import GameOver from "./src/screens/GameOver";
import Gameplay from "./src/screens/Gameplay";
import MainMenu from "./src/screens/MainMenu";

export default function App() {
  const [screen, setScreen] = useState(SCREENS.MainMenu);
  switch (screen) {
    case SCREENS.GameOver:
      return <GameOver setScreen={setScreen} />;
    case SCREENS.Gameplay:
      return <Gameplay setScreen={setScreen} />;
    case SCREENS.MainMenu:
      return <MainMenu setScreen={setScreen} />;
  }
  return null;
}
