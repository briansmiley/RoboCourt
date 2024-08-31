import { GameState } from "../../../../shared/schemas/game";
import honcho from "../../ai/honchoClient";
import { IGameService } from "./interface";
import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { HonchoService } from "../honcho/service";
import { formatForVercel } from "../../../utils/formatForVercel";

export const GameService = (): IGameService => ({
  processMessage: async (message: string, gameState: GameState) => {
    const { appId, userId, sessionId } = gameState.honchoDefendant;
    // this is the user's input message
    // what should happen here is - user input is stored in Honcho. create a new Honcho message
    // and then - full message history from Honcho is sent as context to AI SDK, with system prompt including dossier
    // AI SDK returns a response, which is then stored in Honcho
    // this same response is then sent back to the user as a response to the input message

    const newHonchoUserMessage =
      await honcho.apps.users.sessions.messages.create(
        gameState.honchoDefendant.appId,
        gameState.honchoDefendant.userId,
        gameState.honchoDefendant.sessionId,
        {
          content: message,
          is_user: true
        }
      );

    const honchoMessages = await HonchoService().getMessageContents({
      appId,
      userId,
      sessionId
    });
    const formattedMessages = formatForVercel(honchoMessages);

    const aiResponse = await generateText({
      model: anthropic("claude-3-5-sonnet-20240620"),
      messages: formattedMessages
    });

    const newHonchoAIMessage = await honcho.apps.users.sessions.messages.create(
      appId,
      userId,
      sessionId,
      { content: aiResponse.text, is_user: false }
    );

    return aiResponse.text;
  }
});
