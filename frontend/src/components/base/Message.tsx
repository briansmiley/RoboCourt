/**Displays a message block in the chat history */

import { ChatMessage } from "../../lib/types";

type MessageProps = {
  message: ChatMessage;
};
export default function Message({ message }: MessageProps) {
  return (
    <div>
      <h1 className="text-md underline font-semibold">{message.speaker}</h1>
      <p>{message.content}</p>
    </div>
  );
}
