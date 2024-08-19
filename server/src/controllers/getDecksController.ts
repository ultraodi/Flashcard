import express, { Request, Response } from "express";
import Deck from "../models/Deck";

export async function getDecksController(req: Request, res: Response) {
  // Fetch all decks and return it to the user
  const decks = await Deck.find();
  res.json(decks);
}