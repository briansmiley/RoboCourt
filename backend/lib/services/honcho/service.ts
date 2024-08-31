import honcho from "../../ai/honchoClient";
import { HonchoIdProps, IHonchoService } from "./interface";

export const HonchoService = (): IHonchoService => ({
    getMessageContents: async ({ appId, userId, sessionId }: HonchoIdProps) => {
        //client.apps.users.sessions.messages.list(appId, userId, sessionId, { ...params }) -> MessagesPage
        const result = await honcho.apps.users.sessions.messages.list(appId, userId, sessionId)
        return result;
    }
})
