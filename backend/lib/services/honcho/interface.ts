import { Page } from "honcho-ai/pagination";
import { Message } from "honcho-ai/resources/apps/users/sessions/messages";

export type HonchoIdProps = {
    appId: string,
    userId: string,
    sessionId: string
}

export type HonchoMessageList = Page<Message>;

export interface IHonchoService {
    getMessageContents: ({ appId, userId, sessionId }: HonchoIdProps) => Promise<HonchoMessageList>;
}