import "./CharacterDetailedInfo.scss";
import { Link, useParams } from "react-router-dom";
import useCharacter from "./useCharacter";
import { useContext } from "react";
import FilmsContext from "../../contexts/FilmsContext";

function CharacterDetailedInfo() {
  const params = useParams();
  const { characterLoading, character, characterError } = useCharacter(
    params.characterName
  );
  const { getFilm, filmsLoading, filmsError } = useContext(FilmsContext);

  return (
    <div className="characterCard">
      <Link className="backButton" to="/">
        {"<--"}
      </Link>
      {characterLoading ? (
        <div>"Seeking for the character"</div>
      ) : characterError ? (
        <div>{characterError}</div>
      ) : (
        <div>
          <h2>{character.name}</h2>
          <div className="characterInfo">
            <div className="attribute">
              Height: <span>{character.height}cm</span>
            </div>
            <div className="attribute">
              Gender: <span>{character.gender}</span>
            </div>
            <div className="attribute">
              Mass: <span>{character.mass}kg</span>
            </div>
            <div className="attribute">
              Hair color: <span>{character.hair_color}</span>
            </div>
            <div className="attribute">
              Eye color: <span>{character.eye_color}</span>
            </div>
            <div className="attribute">
              Skin color: <span>{character.skin_color}</span>
            </div>
            <div className="attribute">
              Birth year: <span>{character.birth_year}</span>
            </div>
          </div>
          <div className="characterFilms">
            <h3>{character.films.length} Films</h3>
            {!filmsLoading && !filmsError && (
              <ul>
                {character.films.map((filmUrl) => {
                  const film = getFilm(filmUrl);
                  const yearsSinceRelease =
                    new Date().getFullYear() -
                    new Date(film.release_date).getFullYear();
                  return (
                    <li key={film.title}>
                      <div>
                        {film.title}: <span>{yearsSinceRelease} years ago</span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CharacterDetailedInfo;
