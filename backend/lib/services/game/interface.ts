import { GameState } from "../../../../shared/schemas/game";

export interface IGameService {
  processMessage: (message: string, gameState: GameState) => Promise<string>;
}
