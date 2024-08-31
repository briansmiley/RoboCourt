export interface GameService {
  create(gameState: GameState): Promise<GameState>;
  get(id: string): Promise<GameState>;
}
