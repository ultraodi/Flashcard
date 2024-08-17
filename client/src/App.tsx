import { useState, useEffect } from 'react'
import './App.css'

type TDeck = {
  title: string;
  _id: string
};

function App() {

  const [title, setTitle] = useState("")
  const [decks, setDecks] = useState<TDeck[]>([])

  async function handleCreateDeck(e: React.FormEvent){
    e.preventDefault(); // informs the browser to not refresh the page on submit button click
    await fetch("http://localhost:3000/decks",
    {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks(){
      const response = await fetch("http://localhost:3000/decks");
      const newDecks = await response.json()
      setDecks(newDecks);
    }
    fetchDecks();
  }, [])

  return (
      <div className="App">
        <div className="decks">
          {
            decks.map((decks) => (
              <li key={decks._id}>{decks.title}</li>
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
