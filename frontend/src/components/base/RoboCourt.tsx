import { useEffect, useState } from "react";
import { GameState } from "../../../../shared/schemas/game";

const API_URL = import.meta.env.VITE_API_URL;
const fetchMessageHistory = async (gameId: string) => {
  const res = await fetch(`${API_URL}/game/${gameId}/messages`);
  const messages: string[] = await res.json();
  return messages;
};
export default function RoboCourt({ gameState }: { gameState: GameState }) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  //initialize message history with starting gamestate
  useEffect(() => {
    fetchMessageHistory(gameState.id).then(setMessages);
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([...messages, input]);
    fetch(`${API_URL}/game/${gameState.id}/newMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: input
      })
    }) // Added missing closing bracket here
      .then(res => res.json())
      .then((data: { aiResponse: string }) => {
        setMessages([...messages, data.aiResponse]);
        setInput("");
      });
  };

  return (
    <div
      className="text-lime-300 h-screen overflow-hidden w-screen relative bg-black p-10 flex flex-col"
      style={{ fontFamily: "Courier New, monospace" }}
    >
      <h1 className="text-lime-300 text-4xl font-bold mb-2">iyana.ai</h1>

      <div className="flex flex-row justify-between">
        {/* <Button text="Beep" onClick={handleBeep} /> */}
      </div>
      <div
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          scrollbarColor: "#8CF349 black",
          scrollbarWidth: "thin"
        }}
        className="flex flex-col"
      >
        {messages.map((message, index: number) => (
          <span key={index}>{message}</span>
        ))}
        {/* This div will be used to scroll into view */}
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center md:flex-row text-orange-500 md:justify-start md:items-center"
      >
        <div className="flex flex-row pl-2 w-full items-center">
          $
          <input
            type="text"
            className="w-full bg-black text-lime-300 font-bold py-2 px-4 appearance-none focus:outline-none "
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
