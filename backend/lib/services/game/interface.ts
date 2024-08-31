import { GameState } from "../../../../shared/schemas/game";

export interface IGameService {
  create(): Promise<GameState>
  processMessage: (message: string, gameState: GameState) => Promise<string>;
}
