import honchoClient from "../../../utils/honchoClient";
import { IHonchoService } from "./interface";

const HonchoService = (): IHonchoService => ({
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
  }
});

export default HonchoService;
