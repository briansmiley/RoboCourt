import { HonchoDefendant } from "../../../../shared/schemas/game";
import { PageMessage } from "honcho-ai/resources/apps/users/sessions/messages";

export interface IHonchoService {
  create(): Promise<HonchoDefendant>;
  getMessageContents: ({
    appId,
    userId,
    sessionId
  }: HonchoDefendant) => Promise<PageMessage>;
}
