import Honcho from "honcho-ai";
import honchoClient from "../../../utils/honchoClient";
import { IHonchoService } from "./interface";

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
    return {
      appId: app.id,
      userId: user.id,
      sessionId: session.id
    };
  },
  getMessageContents: async ({ appId, userId, sessionId }) => {
    //client.apps.users.sessions.messages.list(appId, userId, sessionId, { ...params }) -> MessagesPage
    const result = await honchoClient.apps.users.sessions.messages.list(
      appId,
      userId,
      sessionId
    );
    return result;
  }
});
