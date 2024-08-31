import { useEffect, useState } from "react";
import { GameState } from "../../shared/schemas/game";
import RoboCourt from "./components/base/RoboCourt";
import { Gavel } from "lucide-react";
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
        <div className="fixed inset-0 w-full h-full flex-col bg-black font-mono text-5xl text-green-500 flex items-center justify-center">
          <span>Loading...</span>
          <Gavel size={50} />
        </div>
      ) : (
        <RoboCourt gameState={gameState} />
      )}
    </>
  );
}

export default App;
