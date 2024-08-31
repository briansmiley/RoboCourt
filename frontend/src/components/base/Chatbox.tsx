import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      //submit message to endpoint or whatever
      console.log("Enter key pressed");
    }
  };
  return (
    <div>
      <input
        onKeyDown={handleKeyDown}
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
      ></input>
    </div>
  );
}
