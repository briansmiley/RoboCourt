import { Page } from "honcho-ai/pagination";
import { Message } from "honcho-ai/resources/apps/users/sessions/messages";
import { PageMessage } from "honcho-ai/resources/apps/users/sessions/messages";

export type HonchoIdProps = {
    appId: string,
    userId: string,
    sessionId: string
}


export interface IHonchoService {
    getMessageContents: ({ appId, userId, sessionId }: HonchoIdProps) => Promise<PageMessage>;

}