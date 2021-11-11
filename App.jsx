import React, { useState } from "react";
import { SCREENS } from "./src/constants/screens";
import GameOver from "./src/screens/GameOver";
import Gameplay from "./src/screens/Gameplay";
import MainMenu from "./src/screens/MainMenu";

export default function App() {
  const [screenName, setScreenName] = useState(SCREENS.Gameplay);
  const [screenData, setScreenData] = useState({});

  function navigateTo(name, data) {
    setScreenName(name);
    setScreenData(data);
  }

  switch (screenName) {
    case SCREENS.GameOver:
      return <GameOver screenData={screenData} navigateTo={navigateTo} />;
    case SCREENS.Gameplay:
      return <Gameplay screenData={screenData} navigateTo={navigateTo} />;
    case SCREENS.MainMenu:
      return <MainMenu screenData={screenData} navigateTo={navigateTo} />;
  }
  return null;
}
