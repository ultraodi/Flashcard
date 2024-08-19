import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

import './Deck.css'


import { getDeck} from './api/getDeck';
import { TDeck } from './api/getDecks';

import { createCard } from './api/createCard.ts'
import { deleteCard } from './api/deleteCard.ts'



export default function Deck(){
  const [_deck, setDeck] = useState<TDeck | undefined>()
  const [cards, setCards] = useState<string[]>([])
  const [text, setText] = useState("")
  const { deckId } = useParams();
  

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault(); // informs the browser to not refresh the page on submit button click
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards)
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index)
    setCards(newDeck.cards)
  }

  useEffect(() => {
    async function fetchDeck(){
      if (!deckId) return;
      const newDeck = await getDeck(deckId)
      setDeck(newDeck);
      setCards(newDeck.cards)
    }
    fetchDeck();
  }, [deckId])

  return (
      <div className="Deck">
        <ul className="cards">
          {
            cards.map((card, index) => (
              <li key={index}>
                <button onClick={() => handleDeleteCard(index)}>X</button>
                {card}
              </li>
            ))
          }
        </ul>

        <form onSubmit={handleCreateDeck}>
          <label htmlFor='card-text'>Card Text</label>
          <input 
            id='card-text'
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value)
            }}
          />
          <button>Create Card</button>
        </form>
      </div>
  )
} 