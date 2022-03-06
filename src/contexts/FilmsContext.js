import { createContext, useCallback, useEffect, useState, useRef } from "react"
import { getFilms } from "../api/api";

const FilmsContext = createContext();

export function FilmsContextManager({children}) {
  const [filmsLoading, setFilmsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const filmsMap = useRef(new Map());
  const [filmsError, setFilmsError] = useState();
  
  const successCb = useCallback((data) => {
    setFilms(...data.results)
    data.results.forEach((film) => {
      filmsMap.current.set(film.url, film)
    });
    setFilmsLoading(false);
  }, [setFilmsLoading, setFilms, setFilmsError]);

  const errorCb = useCallback((error) => {
    setFilmsError(error);
    setFilmsLoading(false);
  }, [setFilmsLoading, setFilmsError])

  const getFilm = useCallback((url) => {
    return filmsMap.current.get(url);
  });

  useEffect(() => {
    getFilms(successCb, errorCb);
  }, []);

  const contextValue = {
    filmsLoading,
    films,
    getFilm,
    filmsError
  }

  return (
    <FilmsContext.Provider value={contextValue}>
      {children}
    </FilmsContext.Provider>
  )
}

export default FilmsContext;