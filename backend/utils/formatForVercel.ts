import { HonchoMessageList } from "../lib/services/honcho/interface"

export const formatForVercel = (messages: HonchoMessageList) => {

    const formattedMessages = messages.flatMap(page =>
        page.items.map(message => ({
            role: message.is_user ? 'user' : 'assistant',
            content: message.content
        }))
    ).flat(); // Flatten the array if you want a single array of messages

    return formattedMessages;

}