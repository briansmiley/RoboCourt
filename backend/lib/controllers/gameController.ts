import express, { Request, Response } from "express";
import { GameService } from "../services/game/service";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    res.send("Hello World!");

});

router.post('/new', async (req: Request, res: Response) => {
    try {
        const newGame = await GameService().create();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/:id', async (req: Request, res: Response) => {
    try {
        const game = await GameService().get(req.params.id);
        res.status(200).json(game);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


router.post('/:id/message', async (req: Request, res: Response) => {
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