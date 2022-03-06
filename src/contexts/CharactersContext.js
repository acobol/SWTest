import { createContext, useCallback, useState, useRef, useEffect } from "react";
import { getCharacters } from "../api/api";
const CharactersContext = createContext();

export function CharactersContextManager({ children }) {
  const [charactersLoading, setLoadingState] = useState(true);
  const [characters, setCharacters] = useState([]);
  const charactersMap = useRef(new Map());
  const [nextPage, setNextPage] = useState(1);
  const [charactersError, setCharactersError] = useState();

  const addCharacters = useCallback((newCharacters) => {
    setCharacters([...characters, ...newCharacters]);
    newCharacters.forEach((character) => {
      charactersMap.current.set(character.name, character);
    });
  }, [characters, setCharacters]);

  const getCharacterInfo = useCallback((name) => {
    return charactersMap.current.get(name);
  });

  const successCb = useCallback((data) => {
    setLoadingState(false);
    addCharacters(data.results);
    const next = data.next?.split("=")[1];
    setNextPage(next);
  }, [setLoadingState, addCharacters, characters, setNextPage])

  const errorCb = useCallback((err) => {
    setLoadingState(false);
    setCharactersError(err);
  }, [setLoadingState, setCharactersError])

  const loadNextPage = useCallback(() => {
    if (nextPage) {
      setLoadingState(true);
      getCharacters(nextPage, successCb, errorCb);
    }
  }, [nextPage, setLoadingState, successCb, errorCb]);

  const contextValue = {
    charactersLoading,
    characters,
    morePages: !!nextPage,
    addCharacters,
    getCharacterInfo,
    loadNextPage,
    charactersError
  }

  useEffect(() => {
    getCharacters(nextPage, successCb, errorCb)
  }, []);

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
}

export default CharactersContext;
