import express from "express";
import cors from 'cors';
import gameRouter from "./lib/controllers/gameController";

const app = express();

app.use(
	cors({
		origin: ['origin(s)'],
		allowedHeaders: ['Content-Type'],
	})
);

app.use(express.json());

app.use("/game", gameRouter);

const PORT = process.env.PORT || 3005;

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
