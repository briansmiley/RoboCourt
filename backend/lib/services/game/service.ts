import { GameState } from "../../../../shared/schemas/game";
import honcho from "../../../utils/honchoClient";
import { IGameService } from "./interface";
import { CoreMessage, generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { HonchoService } from "../honcho/service";
import { formatForVercel } from "../../../utils/formatForVercel";
import redis from "../../../utils/redisClient";
import { randomUUID } from "crypto";


export const GameService = (): IGameService => ({
    create: async () => {

        // in the redis cache, create a new game with a unique id 
        // store the game state according to the schema
        const gameId = randomUUID();
        const newGameState: GameState = {
            // ... initialize your game state according to the schema
            id: gameId,
            startTime: new Date(),
            caseFacts: {
                trueVerdict: "guilty",
                objectiveFacts: "The defendant is guilty of the crime."
            },
            dossier: "The defendant is guilty of the crime.",
            honchoDefendant: {
                appId: "Defendant",
                userId: "Parth Agrawal",
                sessionId: "1234567890"
            },
            gameStage: "prelude"
        };

        await redis.set(`game:${gameId}`, JSON.stringify(newGameState));

        // Add the game ID to a list of games
        await redis.lpush('games:list', gameId);

        return newGameState


    },
    get: async (id: string) => {
        const gameState = await redis.get(id);
        if (!gameState) {
            throw new Error(`Game with ID ${id} not found`);
        }
        return JSON.parse(gameState);
    },
    processMessage: async (message: string, gameState: GameState) => {
        const { appId, userId, sessionId } = gameState.honchoDefendant;
        // this is the user's input message
        // what should happen here is - user input is stored in Honcho. create a new Honcho message
        // and then - full message history from Honcho is sent as context to AI SDK, with system prompt including dossier
        // AI SDK returns a response, which is then stored in Honcho
        // this same response is then sent back to the user as a response to the input message

        const newHonchoUserMessage =
            await honcho.apps.users.sessions.messages.create(
                appId,
                userId,
                sessionId,
                {
                    content: message,
                    is_user: true
                }
            );

        const honchoMessages = await HonchoService().getMessageContents({ appId, userId, sessionId })
        const formattedMessages: CoreMessage[] = formatForVercel(honchoMessages)
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
