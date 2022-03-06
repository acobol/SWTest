import "./App.scss";

import { CharactersContextManager } from "../../contexts/CharactersContext";
import { Outlet } from "react-router-dom";
import { FilmsContextManager } from "../../contexts/FilmsContext";

function App() {
  return (
    <div className="app">
      <header className="appHeader">
        <p>STAR WARS CHARACTERS</p>
      </header>
      <CharactersContextManager>
        <FilmsContextManager>
          <Outlet />
        </FilmsContextManager>
      </CharactersContextManager>
    </div>
  );
}

export default App;
