import { useEffect, useState } from "react";
import { GameState } from "../../shared/schemas/game";
import RoboCourt from "./components/base/RoboCourt";
const apiUrl = import.meta.env.VITE_API_URL;
const makeNewGame = async () => {
  const res = await fetch(`${apiUrl}/game/new`, { method: "POST" });
  const newGame: GameState = await res.json();
  return newGame;
};
function App() {
  const [gameState, setGameState] = useState<GameState | "Loading...">(
    "Loading..."
  );
  useEffect(() => {
    makeNewGame().then(setGameState);
  }, []);
  return (
    <>
      {gameState === "Loading..." ? (
        <div>Loading...</div>
      ) : (
        <RoboCourt gameState={gameState} />
      )}
    </>
  );
}

export default App;
