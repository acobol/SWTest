import "./CharactersList.scss";
import MainPageCharacterCard from "../CharacterBasicCard/CharacterBasicCard";
import LightSaberButton from "../LigthSaberButton/LigthSaberButton";
import { useContext } from "react";
import CharactersContext from "../../contexts/CharactersContext";

function CharactersList() {
  const {charactersLoading, characters, morePages, loadNextPage, error} = useContext(CharactersContext);
  return (
    <div>
      {characters.length ? (
        <ul className="charactersList">
          {characters.map((character) => (
            <MainPageCharacterCard
              key={character.name}
              name={character.name}
              filmsNumber={character.films.length}
              birthYear={character.birth_year}
            />
          ))}
        </ul>
      ) : (
        "No one is here for the moment, waiting for them"
      )}
      {(!charactersLoading && morePages) && <LightSaberButton onClick={loadNextPage} />}
    </div>
  );
}

export default CharactersList;
