import {API_URL} from './config.ts'


export type TDeck = {
  title: string;
  _id: string
};

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
    return await response.json();
}