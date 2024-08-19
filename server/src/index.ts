import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from "./models/Deck";
import { getDecksController } from "./controllers/getDecksController";
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckcontroller";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckcontroller";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";


const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "*",
})
);
// Express middleware
app.use(express.json());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete('/decks/:deckId', deleteDeckController);
app.get("/decks/:deckId", getDeckController)
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController)

mongoose.connect(process.env.MONGO_URL!)
.then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});