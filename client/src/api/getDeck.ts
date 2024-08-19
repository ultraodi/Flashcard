import {API_URL} from './config.ts'
import { TDeck } from "./getDecks.ts"


export async function getDeck(deckId: string): Promise<TDeck> {
  const response = await fetch(`${API_URL}/decks/${deckId}`);
    return await response.json();
}