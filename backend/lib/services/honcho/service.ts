import honchoClient from "../../../utils/honchoClient";
import { HonchoIdProps, IHonchoService } from "./interface";

export const HonchoService = (): IHonchoService => ({
  create: async () => {
    const uniqueAppName = `Defendant_${new Date().getTime()}`;
    const app = await honchoClient.apps.getOrCreate(uniqueAppName);
    const user = await honchoClient.apps.users.create(app.id, {
      name: "Judge"
    });
    const session = await honchoClient.apps.users.sessions.create(
      app.id,
      user.id,
      { metadata: { location_id: "default" } }
    );
    return session;
  },
  getMessageContents: async ({ appId, userId, sessionId }: HonchoIdProps) => {
    //client.apps.users.sessions.messages.list(appId, userId, sessionId, { ...params }) -> MessagesPage
    const result = await honchoClient.apps.users.sessions.messages.list(
      appId,
      userId,
      sessionId
    );
    return result;
  }
});
