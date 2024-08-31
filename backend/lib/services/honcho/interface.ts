import { Session } from "honcho-ai/resources/apps/users/sessions/sessions.mjs";

export type IHonchoService = {
  create(): Promise<Session>;
};
