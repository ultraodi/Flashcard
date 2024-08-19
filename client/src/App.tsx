import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import './App.css'
import { deleteDecks } from './api/deleteDecks';
import { getDecks, TDeck } from './api/getDecks';
import { createDecks } from './api/createDecks';


function App() {

  const [decks, setDecks] = useState<TDeck[]>([])
  const [title, setTitle] = useState("")

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

  // Handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
    event.preventDefault(); // Prevent the default form submission behavior

    if (title.trim() === '') {
      alert('Please fill in the deck title.');
      return;
    }

    await handleCreateDeck(event); // Calling handleCreateDeck function if the input is valid
  };


  useEffect(() => {
    async function fetchDecks(){
      const newDecks = await getDecks()
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>
        <ul className="decks">
          {
            decks.map((deck) => (
              <li key={deck._id}>
                <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                
                <Link to={`decks/${deck._id}`}>{deck.title}</Link>
              </li>
            ))
          }
        </ul>

        <form onSubmit={handleSubmit}>
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
    </div>
  )
}

export default App
