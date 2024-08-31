import express, { Request, Response } from "express";
import { GameService } from "../services/game/service";
import { HonchoService } from "../services/honcho/service";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/new", async (req: Request, res: Response) => {
  console.log("POST /new");
  try {
    const newGame = await GameService().create();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const game = await GameService().get(req.params.id);
    res.status(200).json(game);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/:id/messages", async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const gameState = await GameService().get(gameId);
  try {
    const messages = await HonchoService().getMessageContents(
      gameState.honchoDefendant
    );
    const rawMessages = messages.items.map(message => message.content);
    res.status(200).json(rawMessages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/:id/newMessage", async (req: Request, res: Response) => {
  const gameId = req.params.id;
  const { message } = req.body;
  const gameState = await GameService().get(gameId);

  try {
    const aiResponse = await GameService().processMessage(message, gameState);
    res.status(200).json({ aiResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
