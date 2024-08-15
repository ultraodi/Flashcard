import express, {Request, Response} from "express";
import mongoose from 'mongoose';

import Deck from "./models/Deck";

const PORT = 3000;

const app = express();

// Express middleware
app.use(express.json());

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
})

mongoose.connect(
  'mongodb+srv://flashcard:5oviezA6R0Mol0kS@cluster0.3w4i9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(PORT);
});