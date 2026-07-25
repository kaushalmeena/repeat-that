import { useState } from "react";
import type { Navigate, Route } from "@/navigation/routes";
import { GameOverScreen } from "@/screens/GameOverScreen";
import { GameplayScreen } from "@/screens/GameplayScreen";
import { MainMenuScreen } from "@/screens/MainMenuScreen";

export function Router() {
  const [route, setRoute] = useState<Route>({ name: "MainMenu" });
  const navigate: Navigate = setRoute;

  switch (route.name) {
    case "MainMenu":
      return <MainMenuScreen navigate={navigate} />;
    case "Gameplay":
      return <GameplayScreen navigate={navigate} />;
    case "GameOver":
      return <GameOverScreen score={route.score} navigate={navigate} />;
  }
}
