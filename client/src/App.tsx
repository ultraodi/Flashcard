import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'
import { deleteDecks } from './api/deleteDecks';
import { getDecks, TDeck } from './api/getDecks';
import { createDecks } from './api/createDecks';


function App() {

  const [title, setTitle] = useState("")
  const [decks, setDecks] = useState<TDeck[]>([])

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault(); // informs the browser to not refresh the page on submit button click
    const deck = await createDecks(title);
    setDecks([...decks, deck])
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDecks(deckId)
    // Optimistic update approach
    setDecks(decks.filter((deck) => deck._id !== deckId))
  }

  useEffect(() => {
    async function fetchDecks(){
      const newDecks = await getDecks()
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
      <div className="App">
        <div className="decks">
          {
            decks.map((deck) => (
              <li key={deck._id}>
                <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                
                <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
            ))
          }
        </div>

        <form onSubmit={handleCreateDeck}>
          <label htmlFor='deck-title'>Deck Title</label>
          <input 
            id='deck-title'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value)
            }}
          />
          <button>Create Deck</button>
        </form>
      </div>
  )
}

export default App
