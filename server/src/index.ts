import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import Deck from "./models/Deck";


const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: "*",
})
);
// Express middleware
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  // Fetch all decks and return it to the user

  const decks = await Deck.find();
  console.log(decks)
  res.json(decks);
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
})

mongoose.connect(process.env.MONGO_URL!)
.then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});