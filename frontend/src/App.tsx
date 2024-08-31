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
  // const [loading, setLoading] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    makeNewGame().then(newGameState => {
      setGameState(newGameState);
      // Trigger fade-in effect after a short delay
      setTimeout(() => setFadeIn(true), 100);
    });
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center font-mono text-5xl text-green-500 w-full h-full bg-black">
      {!showGame ? (
        gameState ? (
          <button
            className={`border-green-500 p-2 text-5xl flex flex-col items-center justify-center ${
              fadeIn ? "opacity-100" : "opacity-0"
            } transition-opacity duration-[3000ms]`}
            onClick={() => setShowGame(true)}
          >
            <span>Start</span>
            <Gavel size={50} />
          </button>
        ) : (
          <div className="fixed inset-0  flex-col  flex items-center justify-center">
            ...Loading
          </div>
        )
      ) : (
        gameState && <RoboCourt gameState={gameState} />
      )}
    </div>
  );
}

export default App;
