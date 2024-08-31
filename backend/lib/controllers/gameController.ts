import express, { Request, Response } from "express";
import { GameService } from "../services/game/service";

const router = express.Router();

router.get("/test", async (req: Request, res: Response) => {
    res.send("Hello World!");

});

router.post('/new', async (req: Request, res: Response) => {


});

router.get('/:id', async (req: Request, res: Response) => {

});

router.post('/:id/message', async (req: Request, res: Response) => {
    const { message } = req.body;


});

export default router;