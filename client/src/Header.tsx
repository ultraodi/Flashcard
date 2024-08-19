import "./Header.css"
// import { Link } from "react-router-dom"

export function Header() {
  return (
    <div className="Header">
      <div className="container">
        <div>
          <a href={"/"}>FlashCards</a>
        </div>

        <div>
          <a href={"/"}>Deck</a>
        </div>

        <div>
          <a href={"/login"}>Login</a>
        </div>
      </div>
    </div>
  )
}