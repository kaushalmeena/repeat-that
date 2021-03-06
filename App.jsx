import React, { useState } from "react";
import { SCREENS } from "./src/constants/screens";
import GameOver from "./src/screens/GameOver";
import Gameplay from "./src/screens/Gameplay";
import MainMenu from "./src/screens/MainMenu";

export default function App() {
  const [screenName, setScreenName] = useState(SCREENS.MainMenu);
  const [screenData, setScreenData] = useState({});

  const navigateTo = (name, data = {}) => {
    setScreenName(name);
    setScreenData(data);
  };

  switch (screenName) {
    case SCREENS.GameOver:
      return <GameOver screenData={screenData} navigateTo={navigateTo} />;
    case SCREENS.Gameplay:
      return <Gameplay screenData={screenData} navigateTo={navigateTo} />;
    case SCREENS.MainMenu:
      return <MainMenu screenData={screenData} navigateTo={navigateTo} />;
    default:
  }
  return null;
}
