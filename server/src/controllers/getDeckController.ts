import express, { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDeckController(req: Request, res: Response) {
  // Fetch a single deck and return it to the user
  const {deckId} = req.params;
  const deck = await Deck.findById(deckId);
  res.json(deck);
}