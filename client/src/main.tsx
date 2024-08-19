import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Header } from './Header.tsx'

import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Deck from './Deck';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/decks/:deckId",
    element: <Deck />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='page'>
      <Header />
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
