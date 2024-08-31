import { CoreAssistantMessage, CoreMessage, CoreUserMessage } from "ai";
import { PageMessage } from "honcho-ai/resources/apps/users/sessions/messages";
export const formatForVercel = (messages: PageMessage): CoreMessage[] => {


    const formattedMessages: CoreMessage[] = messages.items.map(message => {
        if (message.is_user) {
            return {
                role: "user",
                content: message.content
            }
        } else {
            return {
                role: "assistant",
                content: message.content
            }
        }
    });

    return formattedMessages;

}