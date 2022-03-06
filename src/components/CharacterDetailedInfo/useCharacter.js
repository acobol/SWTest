import { useCallback, useContext, useEffect, useState } from "react";
import { getCharacter } from "../../api/api";
import CharactersContext from "../../contexts/CharactersContext";

export default function useCharacter(name) {
  const {getCharacterInfo} = useContext(CharactersContext);
  const [characterLoading, setCharacterLoading] = useState(true);
  const [character, setCharacter] = useState();
  const [characterError, setCharacterError] = useState();

  const successCb = useCallback((data) => {
    if(data.results.length === 1) {
      setCharacter(data.results[0]);
    } else {
      setCharacterError("Cannot find the requested character");
    }
    setCharacterLoading(false);
  }, [setCharacterLoading, setCharacter, setCharacterError]);

  const errorCb = useCallback((error) => {
    setCharacterError(error);
    setCharacterLoading(false);
  }, [setCharacterLoading, setCharacterError])

  useEffect(() => {
    const char = getCharacterInfo(name);
    if(char) {
      setCharacter(char);
      setCharacterLoading(false);
    } else {
      getCharacter(name, successCb, errorCb);
    }
  }, [])

  return {
    characterLoading,
    character,
    characterError
  }
}